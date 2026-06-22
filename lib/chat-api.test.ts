import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { POST } from "../src/pages/api/chat";

function createRequest(body: unknown) {
  return new Request("https://example.com/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("chat API", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.OPENROUTER_MODEL;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("returns contact actions for obvious out-of-scope prompts", async () => {
    const response = await POST({
      request: createRequest({ messages: [{ role: "user", content: "weather today" }] }),
    } as never);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.actions).toHaveLength(2);
    expect(json.reply).toContain("I don't have enough context");
  });

  test("returns model reply for in-scope prompts", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    process.env.OPENROUTER_MODEL = "test-model";
    globalThis.fetch = (async () =>
      Response.json({
        choices: [{ message: { content: "Alfian builds robotics UI and backend APIs." } }],
      })) as unknown as typeof globalThis.fetch;

    const response = await POST({
      request: createRequest({
        messages: [{ role: "user", content: "Tell me about Alfian robotics work" }],
      }),
    } as never);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.reply).toContain("robotics UI");
    expect(json.actions).toEqual([]);
  });

  test("streams delta chunks and final reply for in-scope prompts", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    process.env.OPENROUTER_MODEL = "test-model";

    const sseChunks = [
      'data: {"choices":[{"delta":{"content":"Alfian"}}]}',
      'data: {"choices":[{"delta":{"content":" builds"}}]}',
      'data: {"choices":[{"delta":{"content":" robots."}}]}',
      "data: [DONE]",
    ];

    let chunkIndex = 0;
    const mockBody = new ReadableStream({
      pull(controller) {
        if (chunkIndex < sseChunks.length) {
          controller.enqueue(new TextEncoder().encode(sseChunks[chunkIndex] + "\n"));
          chunkIndex++;
        } else {
          controller.close();
        }
      },
    });

    globalThis.fetch = (async () =>
      new Response(mockBody, { status: 200 })) as unknown as typeof globalThis.fetch;

    const response = await POST({
      request: createRequest({
        messages: [{ role: "user", content: "Tell me about Alfian robotics work" }],
        stream: true,
      }),
    } as never);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/event-stream");

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let full = "";
    const events: Array<Record<string, unknown>> = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      full += decoder.decode(value, { stream: true });

      const lines = full.split("\n");
      full = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data: ")) {
          try {
            events.push(JSON.parse(trimmed.slice(6)));
          } catch {
            // skip
          }
        }
      }
    }

    const deltas = events.filter((e) => "delta" in e);
    const final = events.find((e) => "reply" in e);

    expect(deltas).toHaveLength(3);
    expect(deltas.map((d) => d.delta)).toEqual(["Alfian", " builds", " robots."]);
    expect(final).toBeDefined();
    expect(final!.reply).toBe("Alfian builds robots.");
    expect(final!.actions).toEqual([]);
  });
});
