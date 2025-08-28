// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: true,

    // Quality-of-life toggles
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,

    // Useful when components use relative URLs, localStorage, etc.
    // environmentOptions: { jsdom: { url: 'http://localhost/' } },

    // CI niceties:
    // reporters: ['default', 'junit'],
    // outputFile: { junit: './reports/junit.xml' },

    // Lightweight coverage (toggle on in CI as needed)
    // coverage: {
    //   reporter: ['text', 'html'],
    //   reportsDirectory: './coverage',
    //   include: ['src/**/*.{ts,tsx}'],
    //   exclude: ['**/*.stories.tsx', 'src/**/__mocks__/**'],
    // },
  },
});
