import assistantContext from "@content/assistant-context.md?raw";
import type { ChatAction } from "@app-types/content";

// ponytail: eager glob — all project .md files inlined at build, auto-scales as projects grow.
// Falls back to empty in test runner where import.meta.glob is not available.
const projectModules: Record<string, string> = (() => {
  try {
    if (typeof import.meta.glob === "function") {
      return import.meta.glob("/src/content/projects/*.md", {
        query: "?raw",
        import: "default",
        eager: true,
      }) as Record<string, string>;
    }
  } catch {
    // import.meta.glob not available (e.g. Bun test runner)
  }
  return {};
})();

const projectsContext = Object.entries(projectModules)
  .map(([path, content]) => {
    const name = path.split("/").pop()?.replace(".md", "") ?? "";
    return `---\nProject: ${name}\n${content}`;
  })
  .join("\n\n");

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantResponse = {
  reply: string;
  actions: ChatAction[];
};

const maxMessages = 16;
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
  "hotel",
  "linen",
  "amr",
  "pkm",
  "cirinten",
  "puskesmas",
  "nutrition",
  "satpol",
  "videostream",
  "streaming",
  "pricefeed",
  "cosmos",
  "oracle",
  "portfolio",
  "s16",
  "zoune",
  "halo",
  "hallo",
  "hello",
  "hi",
  "hai",
  "hey",
  "apa kabar",
  "pagi",
  "siang",
  "sore",
  "malam",
  "selamat",
  "diri",
  "profil",
  "latar belakang",
  "bangun",
  "buat",
  "kerjakan",
  "develop",
  "tanya",
  "bisa",
  "github",
  "linkedin",
  "detail",
  "jelasin",
  "jelaskan",
  "lanjut",
  "gimana",
  "cara",
  "contoh",
  "lebih",
  "spesifik",
  "teknis",
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
  return !inScopeTerms.some((term) => normalized.includes(term));
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
        "Use the provided context below for factual information about Alfian's resume, skills, experience, and projects. For follow-up questions, clarifications, or details about topics already discussed in the conversation above, use the conversation history.",
        "If the user asks something outside Alfian's background and it is not already being discussed in the conversation, respond with exactly this text: \"I don't have enough context to answer that. I can only discuss Alfian's resume, skills, experience, and selected work. For anything else, send Alfian a message directly.\"",
        'Do not invent facts. Do not claim live web access. Keep answers concise and useful.',
        "For greetings like 'halo', 'hello', 'hi', 'apa kabar', respond warmly in the user's language and invite questions about Alfian's work.",
        "When answering about experience or projects, format in markdown: short heading, then bullets with bold role/company names.",
        "Contact options: WhatsApp +6285725359530 or alfian.aswinda@gmail.com.",
        "## Context",
        assistantContext,
        projectsContext,
      ].join("\n\n"),
    },
    ...messages,
  ];
}
