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

const outOfScopePatterns = [
  "don't have enough context",
  "don't have enough information",
  "cannot answer",
  "can't answer",
  "cannot help",
  "can't help",
  "can only discuss",
  "outside my scope",
  "outside the scope",
  "not able to",
  "unable to",
  "no information",
  "not mentioned in the context",
  "the context does not",
  "there is no information",
  "send alfian a message",
];

export function isOutOfScopeReply(reply: string): boolean {
  const normalized = reply.toLowerCase();
  return outOfScopePatterns.some((pattern) => normalized.includes(pattern));
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
        "Answer ONLY from the provided context below about Alfian's resume, skills, experience, and selected work.",
        "If the context does not contain the answer, or the question is outside Alfian's resume and work, respond with exactly this text: \"I don't have enough context to answer that. I can only discuss Alfian's resume, skills, experience, and selected work. For anything else, send Alfian a message directly.\"",
        'Do not invent facts. Do not claim live web access. Do not use phrases like "I\'m sorry" or "I can\'t help with that" — use only the exact out-of-scope text above when you cannot answer. Keep answers concise and useful.',
        "When the user asks about experience, projects, or selected work, format the answer in markdown: use a short heading, then bullets grouped by role or company, and bold the role or company names. Avoid long plain paragraphs when a structured summary would be easier to scan.",
        "Contact options for visitors: WhatsApp at +6285725359530 or email alfian.aswinda@gmail.com.",
        "Context:",
        assistantContext,
      ].join("\n\n"),
    },
    ...messages,
  ];
}
