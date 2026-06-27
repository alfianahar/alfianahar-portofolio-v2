---
title: "Hotel Linen Ops (Sanitized)"
description: "Web-based operations dashboard for managing autonomous mobile robots that move linen trolleys across hospital floors. Sanitized version of a private repository, branding and NDA references removed."
tags: ["Frontend", "Dashboard", "Robotics", "Full-Stack"]
role: "Fullstack Developer"
position: ["personal", "lead", "fullstack", "frontend"]
type: "from scratch"
stack:
  [
    "React 19",
    "Vite 8",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Radix UI",
    "React Router 7",
    "Lucide React",
    "localStorage",
  ]
cover: "../../assets/projects/hotel-linen-ops/cover.svg"
coverAlt: "Hotel Linen Ops basement map dashboard with elevator call panel"
year: 2026
status: "completed"
featured: true
order: 6
---

## Note

This is a sanitized public version. The original is a private repository under NDA. Branding, facility names, and proprietary identifiers have been replaced with neutral terms (e.g. "Hotel Linen Ops" instead of the real project, "Chute" renamed to "Dirty Linen"). The stack, architecture, and features below match the original.

## Problem

A hospital uses autonomous mobile robots to ferry clean and soiled linen trolleys between the basement dispatch and each ward floor. The operations team needed a single web dashboard to see the live map, monitor robot status, manage the fleet, dispatch tasks, and control the elevator, without going through the underlying robotics stack's CLI tools.

## Solution

Built a frontend-only dashboard with React 19 + Vite 8 + TypeScript. All state is held in a central StorageContext that mirrors what a backend would do (assignments, queue, robot locations, door configs) but persists to localStorage so the demo runs with no infrastructure. The map screen fills the viewport with an interactive floor plan, station markers, and a side panel for actions like dispatching a robot, opening the RFID cabinet, or calling the lift to a specific floor.

### Dashboard with fleet and task popovers

![Dashboard with fleet popover](../../assets/projects/hotel-linen-ops/01-dashboard.png)

### Elevator station detail with Call Lift

![Elevator call panel](../../assets/projects/hotel-linen-ops/05-elevator-call.png)

### Robot Library (CRUD)

![Robot library edit form](../../assets/projects/hotel-linen-ops/02-library.png)

### Lift Control

![Lift control page](../../assets/projects/hotel-linen-ops/03-lift.png)

### Fleet popover

![Fleet popover open on dashboard](../../assets/projects/hotel-linen-ops/04-fleet-popover.png)

## Outcome

A runnable demo of the full operator workflow: see robot positions on the basement map, open a station to assign a trolley and dispatch a robot, monitor the live task queue from a popover on the dashboard, add or remove robots from the library, and call the lift to any floor. Hosted on GitHub Pages for the sanitized version; the original runs against the live robotics backend in the hospital's private network.

## Links

- [GitHub](https://github.com/alfianahar/hotel-linen-amr-ops)
- [Live Demo](https://alfianahar.github.io/hotel-linen-amr-ops/)
