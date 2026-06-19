import type { ChatMessage, ChatQuickAction } from "@app-types/content";

export const chatMessages = [
  {
    id: "user-portfolio-help",
    role: "user",
    content: "Can you help me understand what Alfian can build?",
    timestamp: "10:30 AM",
  },
  {
    id: "assistant-profile-summary",
    role: "assistant",
    content:
      "Alfian builds modern web applications, AI-assisted workflows, and polished product interfaces. He is strongest when turning rough ideas into clear flows, usable interfaces, and maintainable implementation systems.",
  },
] satisfies ChatMessage[];

export const chatQuickActions = [
  {
    label: "Review My Website",
    prompt: "Review my website and suggest the highest-impact improvements.",
  },
  {
    label: "Show Projects",
    prompt: "Show Alfian's selected projects and the role he played in each one.",
  },
  {
    label: "Suggest Improvements",
    prompt: "Suggest improvements for product experience, performance, and SEO.",
  },
  {
    label: "Contact Alfian",
    prompt: "Help me contact Alfian about a project or collaboration.",
  },
] satisfies ChatQuickAction[];
