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
      "Alfian builds fullstack systems across robotics UI, REST APIs, Apollo GraphQL with ROS integrations, WebRTC workflows, and Golang microservices. He is also deepening practical AI engineering for smarter product and automation flows.",
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
