# stories

Storybook stories for core components and feature suites (CSF 3, React + TS).

## Included
- UI: Button, Card, Progress (shadcn/ui)
- Layout wrapper
- Suites: DashboardSuite, AdminSuite

## Quick Setup
1) Initialize Storybook
```bash
npx storybook@latest init
```
2) Ensure `@` alias works (we provided `.storybook/main.ts` with `vite-tsconfig-paths`).  
3) Global context (optional, already scaffolded):
   - `.storybook/preview.ts` wraps stories with `MemoryRouter` and loads `src/styles/globals.css` + `src/i18n`.

## Scripts
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## Notes
- All stories use CSF 3 and `tags: ["autodocs"]` where useful.
- If your component paths differ, update the `@/…` imports in each story.
