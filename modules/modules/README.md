
# Modules (Financial Empire)

Feature-level modules composed from shared components, contexts, and light services.
Drop into `src/modules` and import as needed.

## Structure
- `auth/` — gates & guards
- `bots/` — orchestrator/backtester stubs
- `lms/` — course catalog, player, adaptive quiz
- `news/` — simple news service + sentiment
- `market/` — mock price feed + sentiment index
- `notifications/` — toast provider wrapper
- `reporting/` — CSV/JSON exports, certificate generator (placeholder)
- `storage/` — centralized localStorage helpers
- `index.js` — barrel exports

All modules are dependency-light (React + Tailwind). Replace mock services with real APIs later.
