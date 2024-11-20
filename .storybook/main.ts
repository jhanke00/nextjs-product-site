import type { StorybookConfig } from '@storybook/nextjs';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mock': path.resolve(__dirname, '../src/mock'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@type': path.resolve(__dirname, '../src/type'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@': path.resolve(__dirname, '..'),
      };
    }
    return config;
  },
};

export default config;
