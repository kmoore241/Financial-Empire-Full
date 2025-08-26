# tests

Vitest + Testing Library setup for Financial Empire.

## Install (once)

```bash
# with npm
npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom vite-tsconfig-paths @testing-library/user-event

# or with pnpm
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom vite-tsconfig-paths @testing-library/user-event
```
> If your Node environment lacks `fetch`, also install a polyfill:
```bash
npm i -D whatwg-fetch
```

## Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:cov": "vitest run --coverage"
  }
}
```

## Tips

- **Path alias**: The config enables `@/` via `vite-tsconfig-paths`.
- **Reset between tests**: use `vi.restoreAllMocks()` and clear storage in `beforeEach` within each test file as needed.
- **Absolute URLs**: If components rely on absolute URLs/localStorage defaults, set a jsdom URL in `vitest.config.ts`:
  ```ts
  // test: { environmentOptions: { jsdom: { url: 'http://localhost/' } } }
  ```
- **API mocking**: Consider adding MSW if you want stable, realistic API mocks in stories/tests.

## Files

- `vitest.config.ts` — root config enabling jsdom + path alias
- `tests/setupTests.ts` — loads jest-dom, optional fetch polyfill, initializes i18n, restores mocks
- `tests/test-utils.tsx` — `renderWithProviders` helper (router + i18n + user-event)
- `tests/hooks/useLocalStorage.test.ts` — sample hook test
- `tests/services/chartService.test.ts` — service test with `fetch` mock

> If you don’t have `src/i18n` yet, the setup will skip it gracefully.
