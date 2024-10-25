import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import products from '@/src/mock/small/products.json';
import List from './List';

const meta = {
  title: 'Components/Products List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts = products.map((product, idx) => ({
  id: idx,
  name: product.name,
  price: +product.price,
  description: product.description,
  category: product.category,
  countInStock: product.countInStock,
  rating: Math.round(product.rating),
  numReviews: product.numReviews,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const Default: Story = {
  args: {
    products: mockProducts,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const productNames = canvas.getAllByRole('heading', { level: 3 });
    await expect(productNames).toHaveLength(50);
  },
};

export const Loading: Story = {
  args: {
    products: mockProducts.slice(0, 3),
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByTestId('container');

    await expect(loader.classList.contains('animate-pulse')).toBeTruthy();
    await expect(loader.classList.contains('pointer-events-none')).toBeTruthy();
  },
};
