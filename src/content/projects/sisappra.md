---
title: "SISAPPRA"
shortDescription: "Integrated information system for Satpol PP DKI Jakarta covering 38 modules; personnel, licensing, reporting, finance, and operational management."
tags: ["Satpol PP", "Enterprise", "Full-Stack", "Dashboard"]
role: "Lead Developer & Architect"
position: ["lead", "fullstack"]
type: "from scratch"
stack:
  [
    "Go",
    "GIN",
    "GORM",
    "Next.js",
    "Mantine UI",
    "TypeScript",
    "Redux",
    "Redis",
    "TanStack Query",
    "PostgreSQL",
    "Docker",
  ]
cover: "../../assets/projects/sisappra/cover.svg"
coverAlt: "SISAPPRA project preview"
outcome: "Delivered a production-grade modular platform serving thousands of Satpol PP personnel across DKI Jakarta."
year: 2024
status: "active"
featured: true
order: 2
links:
  caseStudy: "/work/sisappra"
---

## Problem

Satpol PP DKI Jakarta lacked a unified digital system to manage personnel, licensing, reporting, finance, and field operations. Data was siloed across spreadsheets and paper documents, making coordination and oversight inefficient.

## Solution

Built a modular platform with Go microservices (GIN + GORM) and a Next.js frontend (Mantine UI). Split into specialized backends — api-gateway, pelaporan, perizinan, keuangan, kepegawaian, notifikasi, tramtibum, file — with PostgreSQL. Generated typed API clients from Swagger specs for end-to-end type safety.

## Outcome

38 modules in production handling user management, personnel data, licensing (PTSP), financial programs, field reporting (mobile + web), asset management, room booking, warehouse inventory, and grievance tracking. Ongoing development of mobile reporting, performance management, AI chatbot, and analytics modules.
