# Chatbot Preview UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract the repeated hero and bio chatbot preview UI into shared static chat primitives, then complete final QA and polish.

**Architecture:** Keep page-specific visual shells in `components/hero` and `components/bio`, and move repeated message, quick-action, input, and panel internals into `components/chat`. The chatbot remains static and data-driven from `content/chatbot.ts`; no backend, prompt state, or fake AI behavior is added.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4, Bun test runner, ESLint, Prettier.

---

### Task 1: Add Shared Chat Component Coverage

**Files:**

- Create: `components/chat/chat-panel.test.tsx`
- Read: `content/chatbot.ts`
- Read: `types/content.ts`

**Step 1: Write the failing test**

Create `components/chat/chat-panel.test.tsx` with render-to-static-markup tests for the future shared panel:

```tsx
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
    expect(html).toContain("Can you help me understand what Alfian can build?");
    expect(html).toContain("Review My Website");
    expect(html).toContain('aria-label="Ask Alfian Assistant"');
  });

  test("can render quick actions as decorative chips", () => {
    const html = renderToStaticMarkup(
      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, curated answers"
        messages={chatMessages}
        quickActions={chatQuickActions.slice(0, 2)}
        quickActionMode="chip"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
      />,
    );

    expect(html).toContain("Show Projects");
    expect(html).not.toContain("Contact Alfian");
    expect(html).not.toContain("<button");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `bun test components/chat/chat-panel.test.tsx`

Expected: FAIL because `components/chat/chat-panel.tsx` does not exist yet.

**Step 3: Do not commit**

Do not create a git commit unless the user explicitly asks for one.

---

### Task 2: Create Shared Static Chat Primitives

**Files:**

- Create: `components/chat/chat-message.tsx`
- Create: `components/chat/chat-quick-actions.tsx`
- Create: `components/chat/chat-input.tsx`
- Create: `components/chat/chat-panel.tsx`
- Use: `types/content.ts`
- Use: `lib/utils.ts`

**Step 1: Implement `ChatMessage`**

Create a component that accepts `message: ChatMessage`, optional `className`, optional `userClassName`, and optional `assistantClassName`. It should preserve the current bubble behavior:

```tsx
import type { ChatMessage as ChatMessageType } from "@app-types/content";
import { cn } from "@lib/utils";

type ChatMessageProps = {
  message: ChatMessageType;
  className?: string;
  userClassName?: string;
  assistantClassName?: string;
};

export function ChatMessage({
  message,
  className,
  userClassName,
  assistantClassName,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
        message.role === "user" ? cn("ml-auto", userClassName) : assistantClassName,
        className,
      )}
    >
      {message.content}
    </div>
  );
}
```

**Step 2: Implement `ChatQuickActions`**

Create a component that accepts `actions: ChatQuickAction[]`, optional `mode: "button" | "chip"`, optional `className`, and optional `itemClassName`. In button mode, render `<button type="button">`; in chip mode, render `<span>`.

**Step 3: Implement `ChatInput`**

Create a static input mock component that renders the status dot and placeholder text inside a labeled region. Use `aria-label={label}` on the wrapper because this is not a real form control.

**Step 4: Implement `ChatPanel`**

Create a shared panel component that renders:

- Assistant header with optional avatar initials and optional status label.
- Optional children below the header for hero side cards.
- Message list using `.map()` and `ChatMessage`.
- Quick actions using `ChatQuickActions`.
- Static prompt preview using `ChatInput`.

Expose class override props for the wrapper, header, avatar, status, messages, quick actions, and input so hero and bio can preserve their themes without duplicating TSX structure.

**Step 5: Run focused test**

Run: `bun test components/chat/chat-panel.test.tsx`

Expected: PASS.

**Step 6: Do not commit**

Do not create a git commit unless the user explicitly asks for one.

---

### Task 3: Refactor Hero Chat Preview

**Files:**

- Modify: `components/hero/hero-chat-preview.tsx`
- Test: `components/hero/hero-section.test.tsx`
- Use: `components/chat/chat-panel.tsx`
- Use: `content/chatbot.ts`

**Step 1: Replace duplicated internals**

Keep the outer hero card and floating label. Replace the duplicated assistant header, message map, quick-action map, and input mock with `ChatPanel`.

**Step 2: Preserve hero-only side cards**

Pass the current `sideCards.map(...)` block as `children` to `ChatPanel` so the hero remains visually richer than the bio page.

**Step 3: Preserve visual classes**

Configure `ChatPanel` class props so the hero still uses:

- White/light panel background.
- Dark user message bubble.
- Muted assistant message bubble.
- Button-style quick actions.
- White prompt mock background.

**Step 4: Run focused tests**

Run: `bun test components/chat/chat-panel.test.tsx components/hero/hero-section.test.tsx`

Expected: PASS.

**Step 5: Do not commit**

Do not create a git commit unless the user explicitly asks for one.

---

### Task 4: Refactor Bio Chat Preview

**Files:**

- Modify: `components/bio/bio-chat-preview.tsx`
- Test: `components/bio/bio-page.test.tsx`
- Use: `components/chat/chat-panel.tsx`
- Use: `content/chatbot.ts`

**Step 1: Replace duplicated internals**

Keep the outer `<section>` and `aria-label`. Replace the duplicated header, message map, quick-action chips, and input mock with `ChatPanel`.

**Step 2: Preserve compact bio behavior**

Pass `chatQuickActions.slice(0, 2)` and use `quickActionMode="chip"`.

**Step 3: Preserve dark visual classes**

Configure class props so bio still uses:

- Transparent dark shell.
- White user bubble with dark text.
- Translucent assistant bubble.
- Decorative chip quick actions.
- Blue input status dot.

**Step 4: Run focused tests**

Run: `bun test components/chat/chat-panel.test.tsx components/bio/bio-page.test.tsx`

Expected: PASS.

**Step 5: Do not commit**

Do not create a git commit unless the user explicitly asks for one.

---

### Task 5: Final QA And Documentation Polish

**Files:**

- Modify if verification passes: `README.md`
- Modify if verification passes: `AGENTS.md`
- Modify only if needed: files surfaced by QA checks

**Step 1: Run full automated checks**

Run:

```bash
bun run test
bun run format:check
bun run lint
bun run typecheck
bun run build
```

Expected: all commands pass.

**Step 2: Fix concrete issues only**

If any command fails, inspect the failure and make the smallest correct fix. Do not redesign unrelated UI.

**Step 3: Update progress docs after checks pass**

In `README.md`, mark Bio Page, Shared Chatbot Preview UI, and Final QA And Polish as complete, and remove stale language saying Phase 6 is incomplete.

In `AGENTS.md`, update Status from `In Progress` to complete and remove the pending list.

**Step 4: Re-run full checks**

Run:

```bash
bun run test
bun run format:check
bun run lint
bun run typecheck
bun run build
```

Expected: all commands pass after doc updates.

**Step 5: Inspect git status**

Run: `git status --short`

Expected: only intentional files changed.

**Step 6: Do not commit**

Do not create a git commit unless the user explicitly asks for one.
