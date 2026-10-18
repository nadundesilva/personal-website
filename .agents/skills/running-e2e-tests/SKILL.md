---
name: running-e2e-tests
description: "Use whenever running E2E or component tests, starting or stopping the local test server, instrumenting for coverage, or investigating a Cypress failure that only happens in CI or in one browser, even if the request just says 'run the tests'. Covers how to run the Cypress E2E and component suites, against the static export locally or the same way CI does: browser selection, the local Caddy test server, and coverage instrumentation."
---

# Running E2E Tests

## Run against the production static export, never the dev server

Running `pnpm run cypress:e2e:run` while the Next.js dev server (`pnpm run dev`) is active produces intermittent and persistent failures. The root cause is HMR: in dev mode, the hot-update mechanism fires immediately after soft-navigation RSC fetches, causing the router to treat its tree as stale and abort `pushState`. The URL never updates, so `cy.location("pathname")` assertions time out. MDX article pages are especially susceptible because they trigger more HMR work (images, nested layouts, more code paths).

**Always stop the dev server before running Cypress.** Quick local flow, no coverage:

```bash
pnpm run build
pnpm run serve -l 3000 &
pnpm run cypress:e2e:run      # headless
# pnpm run cypress:open       # interactive UI (pick E2E testing)
```

## Runtime, browsers and narrowing a run

- A full E2E run is slow (it runs against an instrumented, unminified build) and the component suite is much faster, but either can outlast a foreground shell command's time limit. Run the full suite in the background, or narrow it: `pnpm run cypress:e2e:run --spec cypress/e2e/<name>.cy.tsx`.
- CI runs electron, chrome, firefox and edge, each independently (`fail-fast: false`). Locally, pick one with `pnpm run cypress:e2e:run --browser firefox`; a failure that only reproduces in CI is often browser-specific.

## Running component tests

```bash
pnpm run cypress:component:run                 # no server needed
pnpm run cypress:component:run --headed     # for specs that assert hover-driven CSS
```

CI runs component tests headed: headless Chrome and Edge report `hover: none`, which breaks any assertion on hover-driven CSS, whereas headed mode reports `hover: hover`. Run those specs headed locally too (it needs a display).

## Running E2E like CI

Mirrors the `run-e2e-tests` job in `.github/workflows/deploy-site.yaml`. Use it when a spec depends on the real hostname/TLS/headers (e.g. `security.cy.tsx`) or when reproducing a CI-only failure.

```bash
BUILD_TYPE=test NODE_ENV=development pnpm run instrument
BUILD_TYPE=test NODE_ENV=development pnpm run build
WEBSITE_BUILD_DIR=out source .github/scripts/start-server.sh
CYPRESS_BASE_URL=https://nadundesilva.com pnpm run cypress:e2e:run
bash .github/scripts/stop-server.sh
```

- `.github/scripts/start-server.sh` generates a self-signed root CA and leaf cert, writes a Caddyfile, runs `caddy:alpine` in Docker (`--network=host`, container `caddy-server`, port 443) serving `WEBSITE_BUILD_DIR`, appends `127.0.0.1 nadundesilva.com` to `/etc/hosts`, trusts the root CA system-wide, and exports `NODE_EXTRA_CA_CERTS`. It requires `WEBSITE_BUILD_DIR`, `sudo`, and Docker.
- The Caddyfile includes every header under the `/*` pattern of `${WEBSITE_BUILD_DIR}/_headers`, so security headers match production.
- `.github/scripts/stop-server.sh` runs `docker stop`/`docker rm` on `caddy-server`.
- **`start-server.sh` must be run with `source`, not `bash`** — the exported `NODE_EXTRA_CA_CERTS` must survive into the calling shell. In CI it is also written to `GITHUB_ENV`, since the export dies with the step.
- **`pnpm run instrument` rewrites source files in place** (`nyc instrument --in-place`) — it mutates `.ts`/`.tsx` files under version control. Only run it when coverage numbers are needed, and revert the instrumented files afterwards (`git checkout -- <files>`); never leave them in the working tree.
- Each run appends another line to `/etc/hosts`; remove stale `nadundesilva.com` entries when done.
- **Restart the server after every rebuild.** `next build` deletes and recreates `out/` (`fs.rm(outDir)` in Next's export step), while the container bind-mounts that directory, so Docker keeps serving the old, deleted one. Run `stop-server.sh`, then `source start-server.sh` again.
- **`BUILD_TYPE=test` changes the build**: it disables the PWA service worker and Sentry, leaves the bundle unminified (readable stack traces), and adds `'unsafe-eval'` to the CSP. For that reason `security.cy.tsx` can only assert that CSP directives are _included_; the exact production policy is pinned in `utils/common/csp.test.ts`.
