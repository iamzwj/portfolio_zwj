# Project Memory

## Current State

- The project is a mobile-first Lift Log check-in app with a lightweight
  17design personal-tools homepage.
- Lift Log contains a four-day dumbbell strength plan and local check-in state.
- Optional cloud sync stores training progress through `api.17design.fun`.
  The API uses a user-entered sync secret; the actual secret exists only in the
  server environment and must never be copied into the repository or chat.

## Infrastructure

- Domain: `17design.fun`
- Source repository: `iamzwj/17design` on GitHub
- Server: Tencent Cloud Lighthouse, Ubuntu, 2 CPU cores, 2 GB memory
- Frontend: Nginx proxies the site service on the server.
- API: a separate Node service persists the current single-user training data.
- HTTPS is active for both the main site and API domain.

## Direction

The next larger product evolution is to make the main site a design portfolio
and personal hub. Possible future additions include a user login system,
PostgreSQL for application data, and object storage/CDN for media. Do not use
the public website server as a personal password vault.

## Deployment Note

Automatic deployment from GitHub has been deferred. Until it is configured,
production updates still require the server to retrieve the latest source,
build it, and restart the frontend service.
