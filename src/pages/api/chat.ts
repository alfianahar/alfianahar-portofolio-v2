import type { APIRoute } from "astro";
import {
  buildOpenRouterMessages,
  createOutOfScopeResponse,
  isLikelyOutOfScope,
  isOutOfScopeReply,
  sanitizeChatMessages,
} from "@lib/assistant";

export const prerender = false;

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const encoder = new TextEncoder();

const RATE_WINDOW_MS = 15_000;
const RATE_MAX_REQUESTS = 5;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  let timestamps = rateMap.get(ip) ?? [];
  timestamps = timestamps.filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_MAX_REQUESTS) {
    rateMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, timestamps] of rateMap) {
    const filtered = timestamps.filter((ts) => ts > cutoff);
    if (filtered.length === 0) {
      rateMap.delete(ip);
    } else {
      rateMap.set(ip, filtered);
    }
  }
}, 60_000).unref();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function sseEvent(data: unknown) {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

function streamResponse(stream: ReadableStream) {
  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}

function getEnv(name: string) {
  return import.meta.env[name] as string | undefined;
}

function getEnvNumber(name: string, fallback: number) {
  const raw = getEnv(name);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function getEnvBool(name: string) {
  return getEnv(name)?.toLowerCase() === "true";
}

function buildOpenRouterBody(messages: ReturnType<typeof sanitizeChatMessages>) {
  const body: Record<string, unknown> = {
    model: getEnv("OPENROUTER_MODEL"),
    messages: buildOpenRouterMessages(messages),
    temperature: getEnvNumber("OPENROUTER_TEMPERATURE", 0.2),
    max_tokens: getEnvNumber("OPENROUTER_MAX_TOKENS", 500),
  };

  if (getEnvBool("OPENROUTER_REASONING")) {
    body.reasoning = { enabled: true };
  }

  return JSON.stringify(body);
}

function getClientIp(request: Request) {
  return request.headers.get("CF-Connecting-IP") ?? "127.0.0.1";
}

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return jsonResponse(
      {
        reply: "You're sending messages too quickly. Please wait a moment and try again.",
        actions: createOutOfScopeResponse().actions,
      },
      429,
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ reply: "Invalid request body.", actions: [] }, 400);
  }

  const messages = sanitizeChatMessages((body as { messages?: unknown }).messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return jsonResponse({ reply: "Ask a question about Alfian's resume or selected work.", actions: [] }, 400);
  }

  if (isLikelyOutOfScope(latestUserMessage.content)) {
    return jsonResponse(createOutOfScopeResponse());
  }

  const apiKey = getEnv("OPENROUTER_API_KEY");
  const model = getEnv("OPENROUTER_MODEL");

  if (!apiKey || !model) {
    return jsonResponse({
      reply:
        "The assistant is not configured yet. You can still contact Alfian directly for questions about his work.",
      actions: createOutOfScopeResponse().actions,
    });
  }

  const shouldStream = (body as { stream?: boolean }).stream === true;
  const openRouterBody = buildOpenRouterBody(messages);

  if (!shouldStream) {
    try {
      const response = await fetch(openRouterUrl, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
          "http-referer": getEnv("OPENROUTER_SITE_URL") ?? "https://alfianahar.com",
          "x-title": getEnv("OPENROUTER_SITE_NAME") ?? "Alfian Nahar Portfolio",
        },
        body: openRouterBody,
      });

      if (!response.ok) {
        return jsonResponse({
          reply: "The assistant is unavailable right now. Send Alfian a message directly instead.",
          actions: createOutOfScopeResponse().actions,
        });
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        return jsonResponse({
          reply: "The assistant did not return an answer. Send Alfian a message directly instead.",
          actions: createOutOfScopeResponse().actions,
        });
      }

      const outOfScope = isOutOfScopeReply(reply);

      return jsonResponse({
        reply,
        actions: outOfScope ? createOutOfScopeResponse().actions : [],
      });
    } catch {
      return jsonResponse({
        reply: "The assistant is unavailable right now. Send Alfian a message directly instead.",
        actions: createOutOfScopeResponse().actions,
      });
    }
  }

  const streamBody = JSON.stringify({ ...JSON.parse(openRouterBody), stream: true });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(openRouterUrl, {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
            "http-referer": getEnv("OPENROUTER_SITE_URL") ?? "https://alfianahar.com",
            "x-title": getEnv("OPENROUTER_SITE_NAME") ?? "Alfian Nahar Portfolio",
          },
          body: streamBody,
        });

        if (!response.ok || !response.body) {
          controller.enqueue(
            sseEvent({
              error: true,
              reply: "The assistant is unavailable right now. Send Alfian a message directly instead.",
              actions: createOutOfScopeResponse().actions,
            }),
          );
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullReply = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data) as {
                choices?: { delta?: { content?: string } }[];
              };
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullReply += content;
                controller.enqueue(sseEvent({ delta: content }));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }

        const outOfScope = isOutOfScopeReply(fullReply);

        controller.enqueue(
          sseEvent({
            reply: fullReply || "The assistant did not return an answer. Send Alfian a message directly instead.",
            actions: fullReply && outOfScope ? createOutOfScopeResponse().actions : [],
          }),
        );
      } catch {
        controller.enqueue(
          sseEvent({
            error: true,
            reply: "The assistant is unavailable right now. Send Alfian a message directly instead.",
            actions: createOutOfScopeResponse().actions,
          }),
        );
      } finally {
        controller.close();
      }
    },
  });

  return streamResponse(stream);
};
