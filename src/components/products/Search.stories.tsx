import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fireEvent } from '@storybook/test';
import Search from './Search';

const meta = {
  title: 'Components/Product Search',
  component: Search,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: { appDirectory: true },
  },
  args: {
    params: {
      search: '',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');

    await expect(input).toHaveValue('');

    await fireEvent.change(input, { target: { value: 'test' } });
    await expect(input).toHaveValue('test');
  },
};
