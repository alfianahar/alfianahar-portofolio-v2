import type { ChatMessage, ChatQuickAction } from "@app-types/content";

export const chatMessages = [
  {
    id: "user-capability-check",
    role: "user",
    content: "What kind of systems can Alfian build?",
    timestamp: "10:30 AM",
  },
  {
    id: "assistant-resume-summary",
    role: "assistant",
    content:
      "Alfian builds fullstack systems across robotics UI, REST APIs, Apollo GraphQL with ROS integrations, WebRTC workflows, and Golang microservices. He is also deepening practical AI engineering for smarter product and automation flows.",
  },
] satisfies ChatMessage[];

export const chatQuickActions = [
  {
    label: "Review Website",
    prompt: "Review my website and suggest the highest-impact improvements.",
  },
  {
    label: "Show Work",
    prompt: "Show Alfian's selected fullstack and robotics work.",
  },
  {
    label: "Discuss AI",
    prompt: "Discuss practical AI engineering and automation ideas with Alfian.",
  },
] satisfies ChatQuickAction[];
