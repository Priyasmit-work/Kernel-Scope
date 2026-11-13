# KernelScope

Premium Linux desktop system monitor. Windows Task Manager usability + developer dashboards + eBPF kernel diagnostics. Must feel like a native desktop app, not an admin website.

> **Handoff note for Claude / new session:** Read this file first. The user codes everything themselves in VS Code on Windows. Claude's job is to guide, explain, and supply code snippets one step at a time. Do not dump the whole project.

## Stack (final)
- Frontend: React + TypeScript + Vite, react-router-dom, Recharts, Zustand
- Desktop shell: Tauri (added later)
- Agent: C userspace (added later, built in WSL2 Ubuntu)
- Kernel telemetry: C/libbpf eBPF (added later, WSL2)
- API: REST + WebSocket/SSE

## Design tokens
| Token | Value |
|---|---|
| Background | `#0B1120` |
| Sidebar | `#101A2C` |
| Card | `#151F33` |
| Elevated | `#1C2940` |
| Primary blue | `#3B82F6` |
| Highlight blue | `#60A5FA` |
| Cyan | `#22D3EE` |
| Success / Warning / Critical | `#22C55E` / `#F59E0B` / `#EF4444` |
| Text primary / secondary | `#F8FAFC` / `#94A3B8` |

Fonts: Inter (UI), JetBrains Mono (technical values).
Layout: sidebar 240px, toolbar 64px, content padding 24px, card radius 12-14px, spacing 16px.
Avoid: pure black, heavy gradients, heavy shadows, neon.

## Shell
- Toolbar: branding, hostname, live/pause, Simple/Advanced toggle, notifications, settings
- Sidebar: MONITOR (Overview, Processes, CPU, Memory, Network) / DIAGNOSTICS (TCP Diagnostics, Events & Alerts) / APPLICATION (Settings)
- Ctrl+K command palette; Simple/Advanced mode saved between sessions

## Pages (8)
Overview, Processes (sortable/searchable table + right detail panel + confirmed End Process), CPU, Memory, Network (tabs: Overview/Connections/Interfaces), TCP Diagnostics, Events & Alerts (timeline + filters), Settings.

**User's specific request:** the Overview **CPU card also shows the top processes** (top 3 by CPU, each links to its process). Everything else in Overview stays as designed.

## Rules
- Never show unavailable telemetry as zero. Show "Unavailable" / "n/a".
- Never present mock values as real. Label mock data clearly.
- Show units and timestamps. Keyboard navigation and accessible contrast.
- Loading, empty, unavailable, permission-denied states everywhere.
- Don't claim a feature works until it is connected to real telemetry and tested.

## Folder structure (start with frontend only)
```
kernelscope/
├── .gitignore
├── README.md
└── desktop/
    └── src/
        ├── main.tsx, App.tsx
        ├── styles/    tokens.css, global.css
        ├── components/  layout/ (Sidebar, Toolbar, AppShell), ui/ (Card, Button, Badge)
        ├── pages/     Overview, Processes, Cpu, Memory, Network, TcpDiagnostics, Events, Settings (.tsx)
        ├── services/mock/
        └── types/
```
Add later: `desktop/src-tauri/`, `agent/`, `ebpf/`.

## Environment
Windows + VS Code. Frontend and Tauri run natively on Windows (Node 20+, Rust, MS C++ Build Tools). Agent and eBPF need Linux: use WSL2 Ubuntu, repo inside the WSL filesystem.
Extensions: ESLint, Prettier, ES7+ React snippets, Error Lens.

## Status
- [x] HTML prototype of all 8 pages with mock data (single file, vanilla JS), used as the visual/behaviour reference
- [x] Folder structure and VS Code setup agreed
- [x] Create Vite project in `desktop/`, install deps
- [x] `tokens.css` + `global.css`
- [x] AppShell (Sidebar + Toolbar), routing
- [x] Reusable UI components, mock data service
- [x] Build pages in order: Overview, Processes, CPU, Memory, Network, TCP, Events, Settings
- [ ] Command palette, mode persistence, pause/resume
- [ ] Tauri shell, C agent, eBPF collectors, real data, tests, packaging

## Next step
Write `tokens.css` and `global.css`, then AppShell.
