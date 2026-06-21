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
    content: `### Alfian's experience

- **Movel Ai Pte Ltd** - Senior Software Engineer (Full Stack), RNS & FMS (Oct 2025 - Present)
  - Team lead for full-stack development, mentoring, code reviews, and client escalation support.
  - Primary technical owner of Seirios RNS and FMS UI and backend; integrates robotics and client requirements.

- **RNS Product** - Software Engineer (Full Stack) (Mar 2024 - Sep 2025)
  - Built dynamic robot controller UI in Next.js and REST APIs with Express.js.
  - Integrated Apollo GraphQL backend with ROS and collaborated with Robotics on UI issues.

- **SIIX-AGT Project** - Software Engineer (Full Stack) (Jul 2023 - Feb 2024)
  - Developed an HTTPS proxy server in Express.js.
  - Implemented WebRTC for real-time robot communication.

- **PT Tristar Surya Gemilang**
  - **Project Sisappra Satpol PP Revamp** - Tech Lead (Jul 2025 - Mar 2026): led a 9-member team, cleaned 3,000+ code warnings and errors, and mentored staff.
  - **Project Sisappra Satpol PP Revamp** - Backend Engineer (Feb 2024 - Jun 2025): led backend practices, optimized Golang architecture, and improved database structure for microservices.
  - **Project Bank BJB** - Frontend Engineer (Feb 2023 - Jan 2024): built a Loan Management System with Next.js and Mantine, integrated SQL Server, and handled bug fixes and code reviews.
  - **Project Sisappra Satpol PP** - Full-Stack Engineer (Nov 2022 - Jan 2023): created a daily reporting web app with React and Bootstrap, set up Fastify and Sequelize endpoints, and led the reporting module.

- **PT Guna Bangun Perkasa** - Technical Project Administration and Analyst (Assistant Project Manager) (Apr 2018 - Aug 2023)
  - Analyzed infrastructure data for a Rp 50B+ budget and 40,000+ truck trips.
  - Built reusable Excel tools for reporting and budgeting.

- **Other work** - S16 Project, Zoune Coffee, Markidraw, Gadjah Mada University, and student leadership at KKN-PPM UGM.

If you want, I can also break this down by **engineering strengths**, **leadership**, or **selected projects**.
`,
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
