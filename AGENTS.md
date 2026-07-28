# 17design Project Guide

## Product

17design.fun is Richart J (阿Jay)'s long-term personal design and tools website.
The intended direction is a portfolio and personal hub for visual design, AI
automation, websites, and applications. Keep the existing Lift Log strength
training check-in as a small tool within the site rather than the entire
homepage direction.

## Working Style

- Communicate with 阿Jay in Chinese; lead with the result.
- Prefer focused, maintainable changes over broad rewrites.
- Preserve existing user changes and verify relevant builds before handoff.
- Do not hard-code or reveal passwords, API keys, private keys, or sync keys.

## Repository

- Main UI: `app/page.tsx`
- Styles: `app/globals.css`
- Production build: `npm run build`
- GitHub is the source-of-truth repository; commit only work that is ready to
  be preserved.

## Hosting

Production is served directly from Richart J's Tencent Cloud server at
`https://17design.fun`. It is not dependent on the old Sites custom-domain
route. The server has a public frontend service and a separate private
training-progress API behind `https://api.17design.fun`.

For source changes, update this repository first. Server deployment automation
has not yet been configured, so avoid claiming a change is live until the
server has pulled, built, and restarted successfully.
