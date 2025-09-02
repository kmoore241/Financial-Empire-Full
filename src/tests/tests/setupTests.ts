// src/tests/setupTests.ts
import '@testing-library/jest-dom';

// If your environment ever lacks fetch, add the dev dep and uncomment:
// import 'whatwg-fetch';

// Try to preload i18n if it exists (no top-level await)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@/i18n');
} catch {
  // i18n is optional for tests
}

afterEach(() => {
  jest.restoreAllMocks();
});
