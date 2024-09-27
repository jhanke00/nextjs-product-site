# Frontend

Documentation on any Frontend capabilities or changes made.

# Prodcuts Listing Page

- Displaying All Products from Mock Data:
  We have implemented a feature that enables the display of all products available in our mock data. Users can now easily browse through the entire product catalog, providing them with a comprehensive view of our offerings.

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

# Prodcuts Detail Single Page

- Single Page Description for Products:
  We have introduced a feature that offers detailed product descriptions on a single page. Users can now access comprehensive information about each product, including specifications, pricing, and additional details, all in one centralized location. This enhancement aims to provide users with a better understanding of our products, facilitating informed decision-making during their shopping experience.

## Folder Structure

- `app/products/layout.tsx` - Product page layout
- `app/products/page.tsx` - Product Main Page
- `app/products/[productId]/page.tsx` - Page for the single page description
- `src/mock/small/products-new.json` - Mock JSON for Prodcut list
- `src/mock/large/products-new.json` - Mock JSON for Prodcut list

# Components

## Product Card

The **Product Card** component is designed to display individual product details in a visually appealing and organized manner. This component enhances the user experience by providing key information about each product in a concise format.

![Product Card](./images/ProductCard.png)

### File Location

- `src/components/ui/ProductCard/index.tsx`

### Usage

To use the Product Card component, import it into your desired file and pass the product object as a prop.

```tsx
import ProductCard from '@/src/components/ui/ProductCard';

<ProductCard product={product} />;
```

### Props

The **Product Card** component accepts the following prop:

| Prop Name | Type      | Description                                                                                                                                  |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `product` | `Product` | An object containing the details of the product to display. It should conform to the `Product` type defined in `src/type/products/index.ts`. |

### Product Type Structure

The `Product` type includes the following properties:

| Property       | Type     | Description                                  |
| -------------- | -------- | -------------------------------------------- |
| `id`           | `string` | The unique identifier for the product.       |
| `name`         | `string` | The name of the product.                     |
| `price`        | `string` | The price of the product.                    |
| `description`  | `string` | A brief description of the product.          |
| `category`     | `string` | The category to which the product belongs.   |
| `rating`       | `number` | The product's average rating (from 0 to 5).  |
| `numReviews`   | `number` | The total number of reviews for the product. |
| `countInStock` | `number` | The number of items available in stock.      |

### Component Structure

The **Product Card** component is structured as follows:

- **Material-UI Components**:
  - `Card`: The main container for the product details.
  - `CardContent`: Holds the content of the card.
  - `Typography`: Used for displaying text elements (name, description, price, etc.).
  - `Chip`: Displays the product category.
  - `Rating`: Displays the product rating visually.

### Example

Here's a complete example of how to implement the **Product Card**:

```tsx
import React from 'react';
import ProductCard from '@/src/components/ui/ProductCard';

const product = {
  id: '1',
  name: 'Sample Product',
  price: '49.99',
  description: 'This is a sample product description.',
  category: 'Electronics',
  rating: 4.5,
  numReviews: 100,
  countInStock: 20,
};

const ExampleComponent = () => {
  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
};

export default ExampleComponent;
```

### Visual Design

Refer to Storybook for detailed visuals and interactive examples.
