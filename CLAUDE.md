# v

npm-workspaces monorepo: a React 19 host app with module-federated micro-frontends and a shared UI package. Built with vite-plus (`vp`).

## Layout

- `apps/host` (`@v/app`) — main app, port 5000 (HTTPS, dev certs in `certificates/`)
- `apps/mfe-test1`, `apps/mfe-test2` — federated remotes on ports 5001 / 5002
- `packages/ui` (`@v/shared-ui`) — shared components, built with `vp pack`

## Commands

Run from the repo root unless noted.

- `npm run dev` — start the host app
- `vp check` — format + lint + typecheck (run before finishing any change)
- `vp check --fix` — auto-fix format/lint
- `npm run ready` — full check, all tests, all builds
- `npm test` in `apps/host` — unit tests (Vitest)
- `npm run test:visuals` in `apps/host` — Playwright visual tests

## Code style

Follow the `code-conventions` skill when writing or editing code.

## Rules

- Never edit `dist/` folders — they are build output committed by the release script
- Never run `npm run release` or `deploy` scripts — they commit, tag and push
- Dev certificates (`*.pem`) are committed on purpose
- PR titles must match `PR-<number>: <title>`
