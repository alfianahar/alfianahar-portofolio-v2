---
title: "Hotel Linen Ops"
description: "Fleet management system for autonomous mobile robots transporting linen trolleys across hotel floors. Sanitized public version, original runs in production under NDA."
tags: ["React", "Elysia.js", "TypeScript", "Robotics", "Full-Stack", "IoT"]
role: "Fullstack Developer"
position: ["personal", "lead", "fullstack", "frontend", "backend"]
type: "from scratch"
stack:
  [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Elysia.js",
    "SQLite",
    "Docker",
    "MQTT",
    "Caddy",
  ]
cover: "../../assets/projects/hotel-linen-ops/cover.svg"
coverAlt: "Hotel Linen Ops basement map dashboard with elevator call panel"
year: 2026
status: "completed"
featured: true
links:
  live: "https://alfianahar.github.io/hotel-linen-amr-ops/"
  repo: "https://github.com/alfianahar/hotel-linen-amr-ops"
---

## Note

This is a sanitized public version of a production fleet management system (originally SEER TCP). Branding, facility names, and proprietary identifiers have been replaced with neutral terms. The stack and architecture match the original.

## Problem

A hotel uses autonomous mobile robots (AMRs) to ferry clean and soiled linen trolleys between the basement dispatch and ward floors. The operations team needed a unified platform to monitor robot positions on an interactive map, dispatch trolley moves, manage the fleet, control elevator/lift calls, and handle automatic door access, all without touching the underlying robotics stack's CLI.

## Solution

Built a full-stack system with a React + Vite frontend and an Elysia.js API backend on Bun. The backend communicates with robots via TCP modbus for real-time commands and status. The map screen fills the viewport with an interactive floor plan, station markers showing live trolley assignments, and a side panel for dispatching robots, calling lifts, or operating RFID cabinets and doors. The frontend was split into a separate Docker container from the backend, with Caddy as the reverse proxy handling TLS and routing.

### Dashboard with fleet popover

![Fleet popover open on dashboard](../../assets/projects/hotel-linen-ops/04-fleet-popover.png)

### Elevator station detail with Call Lift

![Elevator call panel](../../assets/projects/hotel-linen-ops/05-elevator-call.png)

### Robot Library (CRUD)

![Robot library edit form](../../assets/projects/hotel-linen-ops/02-library.png)

### Lift Control

![Lift control page](../../assets/projects/hotel-linen-ops/03-lift.png)

## Outcome

A full-stack deployment running in production with a Docker Compose stack (backend API, frontend SPA, Caddy reverse proxy). The sanitized version is hosted on GitHub Pages as a single-page frontend demo with all state simulated in localStorage, demonstrating the complete operator workflow: see robot positions on the interactive map, open a station to assign a trolley and dispatch a robot, monitor the live task queue, manage the fleet from the library, and call the lift to any floor.

## Links

- [GitHub](https://github.com/alfianahar/hotel-linen-amr-ops)
- [Live Demo](https://alfianahar.github.io/hotel-linen-amr-ops/)
