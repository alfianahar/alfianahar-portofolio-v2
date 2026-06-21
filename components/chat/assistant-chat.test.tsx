import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AssistantChat } from "./assistant-chat";

describe("AssistantChat", () => {
  test("renders interactive input and send button", () => {
    const html = renderToStaticMarkup(
      <AssistantChat
        title="Alfian Assistant"
        description="Resume and selected work"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about Alfian's work..."
      />,
    );

    expect(html).toContain("Alfian Assistant");
    expect(html).toContain("Ask about Alfian&#x27;s work...");
    expect(html).toContain("Send");
  });
});
