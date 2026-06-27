import type { APIRoute } from "astro";
import {
  buildOpenRouterMessages,
  createOutOfScopeResponse,
  isLikelyOutOfScope,
  isOutOfScopeReply,
  sanitizeChatMessages,
} from "@lib/assistant";

export const prerender = false;

function getLLMUrl(env?: RuntimeEnv) {
  const base = getEnv("LLM_BASE_URL", env) || "https://api.deepseek.com/v1";
  return `${base.replace(/\/+$/, "")}/chat/completions`;
}

// ponytail: single retry for cold-start / transient network failures.
async function fetchWithRetry(url: string, init: RequestInit, retries = 1): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      lastError = new Error(`LLM API returned ${response.status}`);
    } catch (err) {
      lastError = err;
    }
    if (i < retries) await new Promise((r) => setTimeout(r, 400));
  }
  throw lastError ?? new Error("fetch failed after retries");
}
const encoder = new TextEncoder();

const RATE_WINDOW_MS = 15_000;
const RATE_MAX_REQUESTS = 5;
const RATE_PRUNE_SIZE = 100;
const rateMap = new Map<string, number[]>();
type RuntimeEnv = Record<string, string | undefined>;

function pruneRateMap(now: number) {
  const windowStart = now - RATE_WINDOW_MS;

  for (const [ip, timestamps] of rateMap) {
    const active = timestamps.filter((ts) => ts > windowStart);
    if (active.length > 0) {
      rateMap.set(ip, active);
    } else {
      rateMap.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  // ponytail: global O(n) prune only after a small cap; use edge KV if abuse traffic matters.
  if (rateMap.size > RATE_PRUNE_SIZE) {
    pruneRateMap(now);
  }

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

function getEnv(name: string, runtimeEnv?: RuntimeEnv) {
  return runtimeEnv?.[name] ?? (import.meta.env[name] as string | undefined);
}

function getEnvNumber(name: string, fallback: number, runtimeEnv?: RuntimeEnv) {
  const raw = getEnv(name, runtimeEnv);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function getEnvBool(name: string, runtimeEnv?: RuntimeEnv) {
  return getEnv(name, runtimeEnv)?.toLowerCase() === "true";
}

function buildLLMBody(messages: ReturnType<typeof sanitizeChatMessages>, runtimeEnv?: RuntimeEnv) {
  const body: Record<string, unknown> = {
    model: getEnv("LLM_MODEL", runtimeEnv) || "deepseek-v4-flash",
    messages: buildOpenRouterMessages(messages),
    temperature: getEnvNumber("LLM_TEMPERATURE", 0.2, runtimeEnv),
    max_tokens: getEnvNumber("LLM_MAX_TOKENS", 500, runtimeEnv),
  };

  if (getEnvBool("LLM_REASONING", runtimeEnv)) {
    body.reasoning = { enabled: true };
  }

  return JSON.stringify(body);
}

function getClientIp(request: Request) {
  return request.headers.get("CF-Connecting-IP") ?? "127.0.0.1";
}

export const POST: APIRoute = async ({ request, locals }) => {
  const runtimeEnv = (locals as { runtime?: { env?: RuntimeEnv } } | undefined)?.runtime?.env;
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
    return jsonResponse(
      { reply: "Ask a question about Alfian's resume or selected work.", actions: [] },
      400,
    );
  }

  if (isLikelyOutOfScope(latestUserMessage.content)) {
    return jsonResponse(createOutOfScopeResponse());
  }

  const apiKey = getEnv("LLM_API_KEY", runtimeEnv);
  const model = getEnv("LLM_MODEL", runtimeEnv);

  if (!apiKey || !model) {
    return jsonResponse({
      reply:
        "The assistant is not configured yet. You can still contact Alfian directly for questions about his work.",
      actions: createOutOfScopeResponse().actions,
    });
  }

  const shouldStream = (body as { stream?: boolean }).stream === true;
  const llmBody = buildLLMBody(messages, runtimeEnv);

  if (!shouldStream) {
    try {
      const response = await fetchWithRetry(getLLMUrl(runtimeEnv), {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: llmBody,
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

  const streamBody = JSON.stringify({ ...JSON.parse(llmBody), stream: true });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetchWithRetry(getLLMUrl(runtimeEnv), {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
          body: streamBody,
        });

        if (!response.ok || !response.body) {
          controller.enqueue(
            sseEvent({
              error: true,
              reply:
                "The assistant is unavailable right now. Send Alfian a message directly instead.",
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
            reply:
              fullReply ||
              "The assistant did not return an answer. Send Alfian a message directly instead.",
            actions: fullReply && outOfScope ? createOutOfScopeResponse().actions : [],
          }),
        );
      } catch {
        controller.enqueue(
          sseEvent({
            error: true,
            reply:
              "The assistant is unavailable right now. Send Alfian a message directly instead.",
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
