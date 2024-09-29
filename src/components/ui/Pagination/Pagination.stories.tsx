import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '.';
import { within, expect } from '@storybook/test';

// Mock Pagination Data
const mockPaginationProps = {
  currentPage: 1,
  totalPages: 5,
  onNext: () => {},
  onPrev: () => {},
};

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...mockPaginationProps,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paginationText = canvas.getByText(/Page 1 of 5/i);
    await expect(paginationText).toBeInTheDocument();
  },
};
