import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import Page from './page';

const meta = {
  title: 'Components/Product Search',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
