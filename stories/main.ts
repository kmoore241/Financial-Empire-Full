// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  docs: { autodocs: 'tag' },
  // Ensure the @ alias from tsconfig.json works inside Storybook's Vite build
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    return config;
  },
  // Optionally serve static assets (uncomment if you use /public)
  // staticDirs: ['../public'],
};

export default config;
