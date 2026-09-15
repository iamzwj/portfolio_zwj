# Project Memory

## Current State

- The project is a mobile-first personal design portfolio for Richart J
  (阿Jay), covering visual design, AIGC, AI automation, websites, and apps.
- The former Lift Log training tool, its local state, and its cloud-sync UI
  were intentionally removed in July 2026 to keep the project focused.
- The current visual direction uses a restrained Cyberpunk / Glitch system:
  dark neon tokens, chamfered panels, terminal details, scanlines, and
  reduced-motion support on the personal homepage.
- All website portfolio cases and derived web assets were intentionally removed
  in July 2026 so the portfolio can be redesigned from a clean slate. The
  original source files under the Desktop `Richart/作品集/作品集2025` folder
  remain untouched.

## Infrastructure

- Domain: `17design.fun`
- Source repository: `iamzwj/17design` on GitHub
- Server: Tencent Cloud Lighthouse, Ubuntu, 2 CPU cores, 2 GB memory
- Frontend: Nginx proxies the site service on the server.
- API: a separate Node service persists the current single-user training data.
- HTTPS is active for both the main site and API domain.

## Direction

The next step is to define a new portfolio structure and visual direction
before rebuilding any case study. Add persistence, user accounts, or media
infrastructure only when a real feature requires them.

## Deployment Note

Automatic deployment from GitHub has been deferred. Until it is configured,
production updates still require the server to retrieve the latest source,
build it, and restart the frontend service.
