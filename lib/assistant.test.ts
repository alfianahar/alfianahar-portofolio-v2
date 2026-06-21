import { describe, expect, test } from "bun:test";
import {
  assistantContactActions,
  buildOpenRouterMessages,
  createOutOfScopeResponse,
  isLikelyOutOfScope,
  isOutOfScopeReply,
  sanitizeChatMessages,
} from "./assistant";

describe("assistant guardrails", () => {
  test("returns deterministic contact actions for out-of-scope responses", () => {
    const response = createOutOfScopeResponse();

    expect(response.reply).toContain("I don't have enough context");
    expect(response.actions).toEqual(assistantContactActions);
  });

  test("detects obvious out-of-scope prompts", () => {
    expect(isLikelyOutOfScope("what is the weather in Tokyo today?")).toBe(true);
    expect(isLikelyOutOfScope("what robotics UI work has Alfian built?")).toBe(false);
  });

  test("sanitizes messages to supported roles and length", () => {
    const messages = sanitizeChatMessages([
      { role: "system", content: "ignored" },
      { role: "user", content: "  Tell me about Alfian's backend work  " },
      { role: "assistant", content: "x".repeat(5000) },
    ]);

    expect(messages).toHaveLength(2);
    expect(messages[0]).toEqual({ role: "user", content: "Tell me about Alfian's backend work" });
    expect(messages[1].content.length).toBeLessThanOrEqual(1600);
  });

  test("builds OpenRouter messages with system prompt first", () => {
    const messages = buildOpenRouterMessages([
      { role: "user", content: "Summarize Alfian's resume" },
    ]);

    expect(messages[0].role).toBe("system");
    expect(messages[0].content).toContain("Alfian Nahar Aswinda");
    expect(messages[0].content).toContain("I don't have enough context to answer that");
    expect(messages[0].content).toContain("Contact options");
    expect(messages.at(-1)).toEqual({ role: "user", content: "Summarize Alfian's resume" });
  });

  test("detects model refusal replies across variations", () => {
    expect(isOutOfScopeReply("I don't have enough context to answer that.")).toBe(true);
    expect(isOutOfScopeReply("I cannot answer that question.")).toBe(true);
    expect(isOutOfScopeReply("I'm unable to help with this request.")).toBe(true);
    expect(isOutOfScopeReply("The context does not contain that information.")).toBe(true);
    expect(isOutOfScopeReply("There is no information about that topic.")).toBe(true);
    expect(isOutOfScopeReply("I'm sorry but I can't help with that.")).toBe(true);
    expect(isOutOfScopeReply("not mentioned in the context")).toBe(true);
    expect(isOutOfScopeReply("Alfian builds robotics UI and backend APIs.")).toBe(false);
    expect(isOutOfScopeReply("His stack includes React, Golang, and GraphQL.")).toBe(false);
  });
});
