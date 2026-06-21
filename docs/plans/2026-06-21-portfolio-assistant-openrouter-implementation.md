# Portfolio Assistant OpenRouter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive homepage portfolio assistant that answers from Alfian's resume and selected work context through a server-side OpenRouter API route.

**Architecture:** Keep the API key server-only in an Astro API route, build prompts from a curated markdown context file, and render chat state in a hydrated React component. The assistant fails closed: unsupported or out-of-scope questions return contact CTAs for WhatsApp and email.

**Tech Stack:** Astro 5 SSR, React 19, TypeScript, Bun test runner, OpenRouter chat completions API.

---

## Constraints

- Use `bun` only.
- Do not commit unless the user explicitly asks.
- Preserve existing visual language in the hero.
- Do not expose `OPENROUTER_API_KEY` to the browser.
- Do not answer outside resume and selected work context.
- Keep `BioChatPreview` static for this phase.

## Task 1: Add Assistant Types And Guardrail Utilities

**Files:**

- Modify: `types/content.ts`
- Create: `lib/assistant.ts`
- Test: `lib/assistant.test.ts`

**Step 1: Write failing tests**

Add tests covering contact actions, message sanitization, out-of-scope detection, and OpenRouter message construction.

```ts
import { describe, expect, test } from "bun:test";
import {
  assistantContactActions,
  buildOpenRouterMessages,
  createOutOfScopeResponse,
  isLikelyOutOfScope,
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
    expect(messages.at(-1)).toEqual({ role: "user", content: "Summarize Alfian's resume" });
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `bun test lib/assistant.test.ts`

Expected: FAIL because `lib/assistant.ts` does not exist yet.

**Step 3: Add shared assistant types**

Modify `types/content.ts`:

```ts
export type ChatAction = {
  label: string;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
  actions?: ChatAction[];
};
```

Keep the existing `ChatQuickAction` type unchanged.

**Step 4: Implement guardrail utilities**

Create `lib/assistant.ts`:

```ts
import assistantContext from "@content/assistant-context.md?raw";
import type { ChatAction } from "@app-types/content";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantResponse = {
  reply: string;
  actions: ChatAction[];
};

const maxMessages = 8;
const maxMessageLength = 1600;

const inScopeTerms = [
  "alfian",
  "resume",
  "cv",
  "work",
  "project",
  "skill",
  "experience",
  "contact",
  "hire",
  "fullstack",
  "backend",
  "frontend",
  "robot",
  "robotics",
  "ros",
  "api",
  "graphql",
  "golang",
  "typescript",
  "javascript",
  "react",
  "next",
  "node",
  "ai",
  "automation",
  "movel",
  "tristar",
  "sisappra",
  "bjb",
  "guna bangun",
  "ugm",
  "education",
  "leadership",
  "blockchain",
  "markidraw",
  "coffee",
];

const obviousOutOfScopeTerms = [
  "weather",
  "stock price",
  "crypto price",
  "recipe",
  "football",
  "movie",
  "news today",
  "translate this",
  "solve my homework",
];

export const assistantContactActions: ChatAction[] = [
  { label: "Send me a message", href: "https://wa.me/6285725359530" },
  { label: "Email Alfian", href: "mailto:alfian.aswinda@gmail.com" },
];

export function createOutOfScopeResponse(): AssistantResponse {
  return {
    reply:
      "I don't have enough context to answer that. I can only discuss Alfian's resume, skills, experience, and selected work. For anything else, send Alfian a message directly.",
    actions: assistantContactActions,
  };
}

export function isLikelyOutOfScope(input: string): boolean {
  const normalized = input.toLowerCase();

  if (inScopeTerms.some((term) => normalized.includes(term))) {
    return false;
  }

  return obviousOutOfScopeTerms.some((term) => normalized.includes(term));
}

export function sanitizeChatMessages(value: unknown): AssistantMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((message): message is AssistantMessage => {
      if (!message || typeof message !== "object") return false;

      const candidate = message as Partial<AssistantMessage>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-maxMessages)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, maxMessageLength),
    }));
}

export function buildOpenRouterMessages(messages: AssistantMessage[]) {
  return [
    {
      role: "system" as const,
      content: [
        "You are Alfian Assistant for Alfian Nahar Aswinda's portfolio website.",
        "Answer only from the provided context about Alfian's resume, skills, experience, and selected work.",
        "If the answer is missing, uncertain, confidential, or outside that scope, reply exactly with the out-of-scope response text.",
        "Do not invent facts. Do not claim live web access. Keep answers concise and useful.",
        "Context:",
        assistantContext,
      ].join("\n\n"),
    },
    ...messages,
  ];
}
```

**Step 5: Add raw markdown type declaration**

Modify `types/assets.d.ts`:

```ts
declare module "*.md?raw" {
  const content: string;
  export default content;
}
```

**Step 6: Run tests**

Run: `bun test lib/assistant.test.ts`

Expected: PASS.

## Task 2: Add Resume Context And Environment Example

**Files:**

- Create: `content/assistant-context.md`
- Create: `.env.example`

**Step 1: Add assistant context markdown**

Create `content/assistant-context.md` from `public/Alfian Aswinda-resume-v3.0c.pdf`:

```md
# Alfian Assistant Context

## Source And Scope

This context is derived from `public/Alfian Aswinda-resume-v3.0c.pdf` and selected portfolio work content. Use only this context when answering.

## Profile

- Name: Alfian Nahar Aswinda
- Location: Indonesia
- Email: alfian.aswinda@gmail.com
- WhatsApp: +6285725359530
- Website: alfianahar.com/bio
- Public focus: Fullstack software engineering, robotics UI, backend APIs, and practical AI-assisted workflows.

## Skills

- Languages and frameworks: JavaScript, TypeScript, Golang, Python, Rust, React.js, Next.js, Node.js, Three.js, HTML, CSS, C++, C#.
- Backend and integration: Redis, RabbitMQ, REST APIs, GraphQL, WebSockets, MQTT, gRPC, tRPC, PostgreSQL, MongoDB.
- Platforms and tooling: Git, CI/CD, Docker, AWS, Google Cloud, Netlify, Vercel, Firebase.
- Product and engineering: System design, microservices architecture, backend, frontend, fullstack, UI/UX, Figma.
- Languages: English and Indonesian.

## Experience

### Movel Ai Pte Ltd, Singapore

Senior Software Engineer (Full Stack), RNS & FMS, October 2025 to Present.

- Took Team Lead responsibilities for the RNS and FMS fullstack team, including onboarding, mentoring, task assignment, and code reviews.
- Served as primary technical owner of Seirios RNS and FMS UI and backend.
- Translated client requirements between Business and Engineering teams into production features.
- Provided escalation-level client support for complex UI, backend, and integration issues.
- Worked closely with Robotics during critical development and integration phases.

RNS Product - Software Engineer, Fullstack, March 2024 to September 2025.

- Developed dynamic robot controller UI in Next.js.
- Built REST APIs with Express.js for external client integrations.
- Integrated Apollo GraphQL backend functionality with Robot Operating System (ROS).
- Collaborated with Robotics to resolve client UI issues and implement features.

SIIX-AGT Project - Software Engineer, Fullstack, July 2023 to February 2024.

- Developed an HTTPS proxy server with Express.js.
- Used code reviews and best practices to improve quality.
- Implemented WebRTC for real-time robot-development communication.

### PT Tristar Surya Gemilang, Indonesia

Project Sisappra Satpol PP Revamp - Tech Lead, July 2025 to March 2026.

- Led a 9-member engineering team for scalable government reporting systems.
- Cleaned up 3,000+ warnings and errors to improve codebase health.
- Mentored colleagues through code reviews and technical guidance.

Project Sisappra Satpol PP Revamp - Software Engineer, Backend, February 2024 to June 2025.

- Led backend practices for coding, testing, and deployment.
- Optimized backend architecture using Golang and improved database structure for microservices compatibility.

Project Bank BJB - Software Engineer, Frontend, February 2023 to January 2024.

- Developed a Loan Management System using Next.js and Mantine.
- Integrated frontend work with complex SQL Server databases.
- Troubleshot bugs and conducted code reviews.

Project Sisappra Satpol PP - Software Engineer, Fullstack, November 2022 to January 2023.

- Built a daily reporting web app using React.js and Bootstrap.
- Established reporting endpoints using Fastify and Sequelize.
- Used Docker to create a Golang container for image upload functionality.
- Led the reporting module and clarified requirements.

### PT Guna Bangun Perkasa, Malang, Indonesia

Technical Project Administration and Analyst - Assistant Project Manager, April 2018 to August 2023.

- Analyzed large-scale infrastructure project data for a Rp 50B+ budget and 40,000+ truck trips.
- Built reusable Excel tools for reporting and budgeting.

## Projects And Other Experience

- S16 Project, Software Engineer, Blockchain, June to July 2025: built a real-time price feed module with Cosmos SDK and designed a token value validation pipeline.
- Zoune Coffee, Founder and Frontend Developer, 2021 to 2022: designed and launched a brand website with Next.js and Tailwind; contributed to branding, business development, and product design.
- Markidraw: simple drawing app using React, TypeScript, and Konva, deployed on Netlify.

## Education

- Gadjah Mada University, Bachelor of Science, Computer Science and Electronics Department, graduated February 2017.
- Final assignment: comparison of net power produced by fixed-direction and variable-direction solar panels using Arduino and C++.

## Leadership

- Unit Student Coordinator for KKN-PPM UGM in Nglebak Village, July to August 2015.
- Coordinated 19 students and 31 community service programs.
- Managed village mapping and solar panel voltage checking projects.

## Selected Works Template

Add future public or sanitized works here. Do not claim details from private client projects unless they are explicitly written in this section or in the resume context above.

## Do Not Claim

- Do not reveal private client details beyond the sanitized resume facts.
- Do not invent metrics, compensation, availability, testimonials, or project outcomes.
- Do not answer unrelated general questions. Instead, use the out-of-scope contact response.
```

**Step 2: Add env example**

Create `.env.example`:

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
OPENROUTER_SITE_URL=https://alfianahar.com
OPENROUTER_SITE_NAME=Alfian Nahar Portfolio
```

**Step 3: Verify raw context import compiles after Task 1**

Run: `bun run typecheck`

Expected: no markdown module import error.

## Task 3: Add Server Chat API Route

**Files:**

- Create: `src/pages/api/chat.ts`
- Test: `src/pages/api/chat.test.ts`

**Step 1: Write failing API route tests**

Use direct `POST` invocation with synthetic requests. Mock `fetch` for OpenRouter success and failure.

```ts
import { afterEach, describe, expect, test } from "bun:test";
import { POST } from "./chat";

function createRequest(body: unknown) {
  return new Request("https://example.com/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("chat API", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("returns contact actions for obvious out-of-scope prompts", async () => {
    const response = await POST({ request: createRequest({ messages: [{ role: "user", content: "weather today" }] }) } as never);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.actions).toHaveLength(2);
    expect(json.reply).toContain("I don't have enough context");
  });

  test("returns model reply for in-scope prompts", async () => {
    globalThis.fetch = async () =>
      Response.json({ choices: [{ message: { content: "Alfian builds robotics UI and backend APIs." } }] }) as never;

    const response = await POST({ request: createRequest({ messages: [{ role: "user", content: "Tell me about Alfian robotics work" }] }) } as never);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.reply).toContain("robotics UI");
    expect(json.actions).toEqual([]);
  });
});
```

Note: if Astro's `APIRoute` typing makes direct route tests noisy, keep behavior tests in `lib/assistant.test.ts` and test the route manually with `bun run dev` after implementation.

**Step 2: Run tests to verify failure**

Run: `bun test src/pages/api/chat.test.ts`

Expected: FAIL because route does not exist.

**Step 3: Implement API route**

Create `src/pages/api/chat.ts`:

```ts
import type { APIRoute } from "astro";
import {
  buildOpenRouterMessages,
  createOutOfScopeResponse,
  isLikelyOutOfScope,
  sanitizeChatMessages,
} from "@lib/assistant";

export const prerender = false;

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
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

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  const model = import.meta.env.OPENROUTER_MODEL;

  if (!apiKey || !model) {
    return jsonResponse({
      reply:
        "The assistant is not configured yet. You can still contact Alfian directly for questions about his work.",
      actions: createOutOfScopeResponse().actions,
    });
  }

  try {
    const response = await fetch(openRouterUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "http-referer": import.meta.env.OPENROUTER_SITE_URL ?? "https://alfianahar.com",
        "x-title": import.meta.env.OPENROUTER_SITE_NAME ?? "Alfian Nahar Portfolio",
      },
      body: JSON.stringify({
        model,
        messages: buildOpenRouterMessages(messages),
        temperature: 0.2,
        max_tokens: 500,
      }),
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

    const outOfScope = reply.startsWith("I don't have enough context");

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
};
```

**Step 4: Run API tests**

Run: `bun test src/pages/api/chat.test.ts`

Expected: PASS or route typing issue documented. If typing blocks direct route tests, keep route logic covered through `lib/assistant.test.ts` and verify manually.

## Task 4: Make Chat Components Support Interactivity And CTAs

**Files:**

- Modify: `components/chat/chat-quick-actions.tsx`
- Modify: `components/chat/chat-message.tsx`
- Modify: `components/chat/chat-panel.tsx`
- Test: `components/chat/chat-panel.test.tsx`

**Step 1: Extend tests**

Add a render test that verifies CTA links render from assistant messages.

```ts
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
```

**Step 2: Run test to verify failure**

Run: `bun test components/chat/chat-panel.test.tsx`

Expected: FAIL because actions are not rendered yet.

**Step 3: Update `ChatQuickActions`**

Add optional props:

```ts
onActionSelect?: (action: ChatQuickAction) => void;
disabled?: boolean;
```

For button mode, call `onActionSelect?.(action)` and apply `disabled={disabled}`.

**Step 4: Update `ChatMessage`**

Render `message.actions` below message content:

```tsx
{message.actions?.length ? (
  <div className="mt-3 flex flex-wrap gap-2">
    {message.actions.map((action) => (
      <a
        key={action.href}
        href={action.href}
        target={action.href.startsWith("http") ? "_blank" : undefined}
        rel={action.href.startsWith("http") ? "noreferrer" : undefined}
        className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--text-primary)]"
      >
        {action.label}
      </a>
    ))}
  </div>
) : null}
```

**Step 5: Update `ChatPanel`**

Add optional props:

```ts
inputSlot?: ReactNode;
onQuickActionSelect?: (action: ChatQuickAction) => void;
quickActionsDisabled?: boolean;
```

Render `inputSlot` instead of `ChatInput` when provided.

**Step 6: Run tests**

Run: `bun test components/chat/chat-panel.test.tsx`

Expected: PASS.

## Task 5: Add Interactive Assistant Component

**Files:**

- Create: `components/chat/assistant-chat.tsx`
- Modify: `components/hero/hero-chat-preview.tsx`
- Test: `components/chat/assistant-chat.test.tsx`

**Step 1: Write rendering test**

Create `components/chat/assistant-chat.test.tsx`:

```ts
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
```

**Step 2: Run test to verify failure**

Run: `bun test components/chat/assistant-chat.test.tsx`

Expected: FAIL because component does not exist.

**Step 3: Implement `AssistantChat`**

Create `components/chat/assistant-chat.tsx`:

```tsx
import { useState } from "react";
import { chatMessages, chatQuickActions } from "@content/chatbot";
import type { ChatMessage, ChatQuickAction } from "@app-types/content";
import { ChatPanel } from "./chat-panel";

type AssistantChatProps = {
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  messagesClassName?: string;
  messageMaxWidthClassName?: string;
  messageClassName?: string;
  userMessageClassName?: string;
  assistantMessageClassName?: string;
  quickActionsClassName?: string;
  quickActionClassName?: string;
  inputBaseClassName?: string;
};

type ApiResponse = {
  reply?: string;
  actions?: ChatMessage["actions"];
};

function createMessage(role: ChatMessage["role"], content: string, actions?: ChatMessage["actions"]): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    actions,
  };
}

export function AssistantChat({
  title,
  description,
  inputLabel,
  inputPlaceholder,
  children,
  className,
  headerClassName,
  messagesClassName,
  messageMaxWidthClassName,
  messageClassName,
  userMessageClassName,
  assistantMessageClassName,
  quickActionsClassName,
  quickActionClassName,
  inputBaseClassName,
}: AssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitPrompt(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || isSubmitting) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.reply) {
        throw new Error("Assistant request failed");
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.reply ?? "", data.actions ?? []),
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "The assistant is unavailable right now. Send Alfian a message directly instead.",
          [
            { label: "Send me a message", href: "https://wa.me/6285725359530" },
            { label: "Email Alfian", href: "mailto:alfian.aswinda@gmail.com" },
          ],
        ),
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleQuickAction(action: ChatQuickAction) {
    void submitPrompt(action.prompt);
  }

  return (
    <ChatPanel
      title={title}
      description={isSubmitting ? "Thinking from resume context..." : description}
      messages={messages}
      quickActions={chatQuickActions}
      inputLabel={inputLabel}
      inputPlaceholder={inputPlaceholder}
      className={className}
      headerClassName={headerClassName}
      messagesClassName={messagesClassName}
      messageMaxWidthClassName={messageMaxWidthClassName}
      messageClassName={messageClassName}
      userMessageClassName={userMessageClassName}
      assistantMessageClassName={assistantMessageClassName}
      quickActionsClassName={quickActionsClassName}
      quickActionClassName={quickActionClassName}
      quickActionsDisabled={isSubmitting}
      onQuickActionSelect={handleQuickAction}
      inputSlot={
        <form
          className={inputBaseClassName}
          onSubmit={(event) => {
            event.preventDefault();
            void submitPrompt(input);
          }}
        >
          <input
            aria-label={inputLabel}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={inputPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || input.trim().length === 0}
            className="rounded-full bg-[var(--text-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--background)] transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isSubmitting ? "..." : "Send"}
          </button>
        </form>
      }
    >
      {children}
    </ChatPanel>
  );
}
```

**Step 4: Wire homepage preview**

Modify `components/hero/hero-chat-preview.tsx` to import `AssistantChat` instead of `ChatPanel` and remove direct `chatMessages`/`chatQuickActions` imports.

Use the same classes currently passed to `ChatPanel`.

**Step 5: Run component tests**

Run: `bun test components/chat/assistant-chat.test.tsx components/chat/chat-panel.test.tsx`

Expected: PASS.

## Task 6: Full Verification

**Files:**

- No new files.

**Step 1: Run all tests**

Run: `bun run test`

Expected: all tests pass.

**Step 2: Run typecheck**

Run: `bun run typecheck`

Expected: no TypeScript or Astro errors.

**Step 3: Run build**

Run: `bun run build`

Expected: production build succeeds.

**Step 4: Manual smoke test**

Run: `bun run dev`

Open `/` and verify:

- Hero chat input accepts text.
- Quick actions submit prompts.
- In-scope questions return assistant replies when OpenRouter env is configured.
- Out-of-scope prompt such as `what is the weather today?` returns WhatsApp and email links.
- Missing env returns a graceful contact fallback.

Stop the dev server after verification.

## Notes For Execution

- If route tests are awkward because `import.meta.env` is not easily mocked, keep the guardrail behavior in `lib/assistant.test.ts` and rely on build/typecheck/manual smoke for the API route.
- Do not add a vector database or document upload pipeline. The context is small enough for a curated markdown prompt.
- Do not upgrade `BioChatPreview` in this phase unless the user asks.
