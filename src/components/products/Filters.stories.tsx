import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fireEvent, fn } from '@storybook/test';
import Filters from './Filters';

const meta = {
  title: 'Components/Product Filters',
  component: Filters,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: { appDirectory: true },
  },
  args: {
    categories: ['Electronics', 'Clothing', 'Books'],
    priceRange: [0, 500],
    params: {
      category: 'Electronics',
      minPrice: 0,
      maxPrice: 250,
      topRated: false,
      withReviews: false,
      inStock: false,
    },
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const categorySelect = canvas.getByRole('combobox');
    const minPriceInput = canvas.getByRole('spinbutton', { name: /min price/i });
    const maxPriceInput = canvas.getByRole('spinbutton', { name: /max price/i });
    const topRatedCheckbox = canvas.getByRole('checkbox', { name: /top rated/i });
    const withReviewsCheckbox = canvas.getByRole('checkbox', { name: /with reviews/i });
    const inStockCheckbox = canvas.getByRole('checkbox', { name: /in stock/i });

    await expect(categorySelect).toHaveValue('Electronics');
    await expect(minPriceInput).toHaveValue(0);
    await expect(maxPriceInput).toHaveValue(250);
    await expect(topRatedCheckbox).not.toBeChecked();
    await expect(withReviewsCheckbox).not.toBeChecked();
    await expect(inStockCheckbox).not.toBeChecked();

    await fireEvent.change(categorySelect, { target: { value: 'Books' } });
    await expect(categorySelect).toHaveValue('Books');

    await fireEvent.change(minPriceInput, { target: { value: 100 } });
    await expect(minPriceInput).toHaveValue(100);

    await fireEvent.change(maxPriceInput, { target: { value: 500 } });
    await expect(maxPriceInput).toHaveValue(500);

    await fireEvent.click(topRatedCheckbox);
    await expect(topRatedCheckbox).toBeChecked();

    await fireEvent.click(withReviewsCheckbox);
    await expect(withReviewsCheckbox).toBeChecked();

    await fireEvent.click(inStockCheckbox);
    await expect(inStockCheckbox).toBeChecked();

    expect(args.onChange).toHaveBeenCalledTimes(4);
  },
};
