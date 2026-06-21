import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { chatMessages, chatQuickActions } from "@content/chatbot";
import { ChatPanel } from "./chat-panel";

describe("ChatPanel", () => {
  test("renders static assistant preview content with accessible prompt input", () => {
    const html = renderToStaticMarkup(
      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, real content"
        messages={chatMessages}
        quickActions={chatQuickActions}
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
      />,
    );

    expect(html).toContain("Alfian Assistant");
    expect(html).toContain("Static preview, real content");
    expect(html).toContain("Show Work");
    expect(html).toContain("Discuss new project");
    expect(html).toContain('aria-label="Ask Alfian Assistant"');
  });

  test("can render quick actions as decorative chips", () => {
    const html = renderToStaticMarkup(
      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, curated answers"
        messages={chatMessages}
        quickActions={chatQuickActions.slice(0, 1)}
        quickActionMode="chip"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
      />,
    );

    expect(html).toContain("Show Work");
    expect(html).not.toContain("Discuss new project");
    expect(html).not.toContain("<button");
  });

  test("renders assistant message actions as links", () => {
    const html = renderToStaticMarkup(
      <ChatPanel
        title="Alfian Assistant"
        description="Interactive assistant"
        messages={[
          {
            id: "out-of-scope",
            role: "assistant",
            content: "I don't have enough context to answer that.",
            actions: [{ label: "Send me a message", href: "https://wa.me/6285725359530" }],
          },
        ]}
        quickActions={[]}
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about Alfian"
      />,
    );

    expect(html).toContain("Send me a message");
    expect(html).toContain("https://wa.me/6285725359530");
  });

  test("can render without its own frame for embedded page shells", () => {
    const html = renderToStaticMarkup(
      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, curated answers"
        messages={chatMessages}
        quickActions={chatQuickActions.slice(0, 2)}
        framed={false}
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
      />,
    );

    expect(html).not.toContain(
      "rounded-[1.55rem] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5",
    );
  });
});
