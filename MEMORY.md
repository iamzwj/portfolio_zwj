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

### Portfolio subdomain

- Portfolio source: `iamzwj/portfolio_zwj`; public URL:
  `https://portfolio.17design.fun`.
- It runs as the isolated `portfolio-zwj.service` on port `3001`; Nginx
  proxies only this subdomain to that service. Do not alter the existing main
  site or API services while deploying the portfolio.
- Pushes to `main` run `.github/workflows/deploy.yml`: CI verifies the build,
  uploads the source bundle to the Tencent Cloud server, builds with Node 22,
  then restarts the portfolio service. Deployment credentials are stored only
  in GitHub Actions Secrets.
- `public/hero-background.mp4` remains on the server after the first release
  and is copied into new releases, so routine source updates do not re-upload
  the large background video.

## Direction

The next step is to define a new portfolio structure and visual direction
before rebuilding any case study. Add persistence, user accounts, or media
infrastructure only when a real feature requires them.
