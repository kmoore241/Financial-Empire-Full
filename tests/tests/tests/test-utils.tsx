// tests/test-utils.tsx
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

type Options = {
  route?: string;
} & Omit<RenderOptions, 'wrapper'>;

const Providers: React.FC<{ route: string; children: ReactNode }> = ({ route, children }) => (
  <MemoryRouter initialEntries={[route]}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </MemoryRouter>
);

/**
 * Render with common app providers (router + i18n).
 * - Returns Testing Library utilities AND a preconfigured `user` from user-event.
 * - Accepts all normal `render` options plus `route`.
 */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...renderOptions }: Options = {}
) {
  const user = userEvent.setup();
  const utils = render(ui, {
    wrapper: ({ children }) => <Providers route={route}>{children}</Providers>,
    ...renderOptions,
  });
  return { user, ...utils };
}

// Re-export RTL helpers if you like:
// export * from '@testing-library/react';
