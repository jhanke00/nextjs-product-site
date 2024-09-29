import type { Meta, StoryObj } from '@storybook/react';
import FiltersSidebar from '.';
import { within, expect } from '@storybook/test';

// Mock FiltersSidebar Props
const mockFiltersSidebarProps = {
  ratingFilter: 3,
  setRatingFilter: ((value: number) => {}) as React.Dispatch<React.SetStateAction<number>>,
  priceRange: { min: 10, max: 100 },
  setPriceRange: ((range: { min: number; max: number }) => {}) as React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >,
  categoryFilter: '',
  setCategoryFilter: ((category: string) => {}) as React.Dispatch<React.SetStateAction<string>>,
  categories: ['Electronics', 'Books', 'Clothing', 'Home'],
};

const meta: Meta<typeof FiltersSidebar> = {
  title: 'Components/FiltersSidebar',
  component: FiltersSidebar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...mockFiltersSidebarProps,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ratingText = canvas.getByText(/3 Stars/i);
    const priceRangeText = canvas.getByDisplayValue(/10/i);
    const categorySelect = canvas.getByDisplayValue(/All Categories/i);

    await expect(ratingText).toBeInTheDocument();
    await expect(priceRangeText).toBeInTheDocument();
    await expect(categorySelect).toBeInTheDocument();
  },
};
