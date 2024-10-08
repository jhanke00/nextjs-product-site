import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from '.';
import { within, expect } from '@storybook/test';
import { Product } from '@/src/type/products';

// Mock Product Data
const mockProduct: Product = {
  id: '1',
  name: 'Sample Product',
  price: '49.99',
  description: 'This is a sample product description.',
  category: 'Electronics',
  rating: 4.5,
  numReviews: 100,
  countInStock: 20,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const productName = canvas.getByText(mockProduct.name);
    await expect(productName).toBeInTheDocument();
  },
};
