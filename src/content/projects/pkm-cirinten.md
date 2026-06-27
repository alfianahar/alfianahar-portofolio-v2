---
title: "Puskesmas Cirinten"
description: "Nutrition aid management system for Puskesmas Cirinten, tracking food assistance distribution to pregnant women and toddlers with web dashboard and offline mobile app."
tags: ["Full-Stack", "Healthcare", "Dashboard", "Maps"]
role: "Fullstack Developer"
position: ["fullstack", "frontend", "backend"]
type: "from scratch"
stack:
  [
    "Go",
    "GIN",
    "GORM",
    "React",
    "Vite",
    "Mantine UI",
    "TypeScript",
    "TanStack Query",
    "PostgreSQL",
    "OpenStreetMap",
    "Docker",
    "Flutter",
    "SQLite",
  ]
cover: "../../assets/projects/pkm-cirinten/01-login.png"
coverAlt: "PKM Cirinten login page"
year: 2024
status: "completed"
featured: true
---

## Problem

Puskesmas Cirinten lacked a digital system to track the distribution of nutritional aid to pregnant women and toddlers. Data was recorded manually, making it difficult to monitor coverage, prevent duplication, and report program outcomes.

## Solution

Built a full-stack platform with Go backend (GIN + GORM + PostgreSQL) and React web dashboard (Mantine UI + TanStack Query). The dashboard visualizes recipient locations and reporting status on an interactive OpenStreetMap (via react-leaflet) so field coordinators can monitor coverage and validate home visits at a glance. Led a 2-person team, handled fullstack development and directed a partner building the Flutter + SQLite mobile app that works offline-first: data stored locally on-device and syncs to the backend when internet is available.

### Login

![Login page](../../assets/projects/pkm-cirinten/01-login.png)

### Dashboard Ibu Hamil

![Dashboard Ibu Hamil with map](../../assets/projects/pkm-cirinten/03-dashboard-ibu-hamil.png)

### Dashboard Balita

![Dashboard Balita](../../assets/projects/pkm-cirinten/04-dashboard-balita.png)

### Data tables

![Data Balita](../../assets/projects/pkm-cirinten/06-data-balita.png)
![Pengguna](../../assets/projects/pkm-cirinten/08-data-pengguna.png)

## Outcome

Puskesmas staff can now manage recipient registration, track aid distribution in real-time, and generate program reports through both web dashboard and mobile app, with offline capability for field workers.
