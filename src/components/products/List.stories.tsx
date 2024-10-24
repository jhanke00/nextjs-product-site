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

export const Default: Story = {
  args: {
    productData: products.map((product, idx) => ({
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
    })),
    currentPage: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const productNames = canvas.getAllByRole('heading', { level: 3 });
    await expect(productNames).toHaveLength(50);
  },
};
