import type { ChatMessage, ChatQuickAction } from "@app-types/content";

export const chatMessages = [
  {
    id: "user-capability-check",
    role: "user",
    content: "What kind of systems can Alfian build?",
  },
  {
    id: "assistant-resume-summary",
    role: "assistant",
    content:
      "Alfian builds full-stack and AI-powered systems using TypeScript, Python, Go, and React, from enterprise platforms and robotics dashboards to blockchain modules, analytics, RAG, and automation.",
  },
] satisfies ChatMessage[];

export const chatQuickActions = [
  {
    label: "Show Work",
    prompt: "Show Alfian's selected work.",
  },
  {
    label: "Discuss new project",
    prompt: "Discuss new project",
  },
] satisfies ChatQuickAction[];
