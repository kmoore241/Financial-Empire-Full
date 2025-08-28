// tests/setupTests.ts
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

// Polyfill fetch in environments that don't provide it (optional)
try {
  // @ts-expect-error: typeof fetch may be undefined in some Node versions
  if (typeof fetch === 'undefined') {
    await import('whatwg-fetch');
  }
} catch {
  // ignore if polyfill is not installed
}

// Initialize i18n for components/hooks using translations (optional)
try {
  await import('@/i18n');
} catch {
  // If i18n isn't present yet, ignore—tests that need it can import directly.
}

// Restore all mocks after each test to avoid cross-test pollution
afterEach(() => {
  vi.restoreAllMocks();
});
