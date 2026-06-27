---
title: "SatpolPP Videostream"
description: "YouTube-like video streaming platform for Satpol PP DKI Jakarta, upload field operation documentation, transcode to HLS, and serve with comments and interactions."
tags: ["Satpol PP", "Video Streaming", "Full-Stack", "Infrastructure"]
role: "Lead & Backend Developer"
position: ["personal", "lead", "fullstack", "frontend", "backend"]
type: "from scratch"
stack:
  [
    "Go",
    "GIN",
    "ConnectRPC",
    "Protobuf",
    "React",
    "Vite",
    "hls.js",
    "Mantine UI",
    "TypeScript",
    "TanStack Query",
    "PostgreSQL",
    "MinIO",
    "FFmpeg",
    "Docker",
    "Caddy",
  ]
cover: "../../assets/projects/satpol-videostream/cover.svg"
coverAlt: "Satpol VideoStream project preview"
year: 2026
status: "active"
featured: true
---

## Problem

Operational documentation (raids, enforcement, field activities) was scattered across personal phones and WhatsApp groups. No centralized, moderated platform for the public to see Satpol PP's field work or for leadership to track documentation output.

## Solution

Built a monorepo with Go backend (GIN + ConnectRPC), Protobuf API contract, React + Vite frontend with hls.js player, and FFmpeg HLS transcoding pipeline. Integrates with SISAPPRA auth and runs under the same domain. MinIO for raw and transcoded storage, Mantine UI dark mode, TanStack Query for data fetching.

## Outcome

Petugas can upload directly from SISAPPRA mobile, videos are auto-transcoded to HLS for adaptive streaming, and the public can browse, search, like, and comment on operational documentation through a YouTube-like interface.
