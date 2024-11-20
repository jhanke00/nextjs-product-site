# Product Search

## Author

Wellington Leandrini Ramos

## Feature

- Search for a product by name ou category:
  When searching by name, the system will return all products that include the searched name. The input should have at least 5 characters.
  When searching by category, the system will return all the products that match the category searched for.
  All the products matching the results will be displayed in a scrollable container.

## Testing

- The unit tests were written using Jest and React Testing Library. To run the tests, use the following command: `pnpm test`

- The integration tests (E2E) were written using Cypress. To run the tests, follow these steps:
  1. Start the development server by running `pnpm dev`.
  2. Run Cypress by running `pnpm cypress:run`. Or if you want to open the Cypress test runner, run `pnpm cypress:open`.
- Manual test.
  1. Run `pnpm i` to install the dependencies.
  2. Run `pnpm dev` to start the development server.
  3. Open your browser and navigate to `http://localhost:3000/product-search`.
  4. Fill in the input field or select a category and click the search button.
  5. Verify that the search results are displayed correctly.
  6. If you want to reset the search results, click the reset button.

## Storybook

- Storybook is used to create a sandbox environment for UI development. It allows developers to test and develop UI components without the need for a full-fledged development environment.
- To run Storybook, use the following command:

```bash
pnpm storybook
```

## Folder Structure

- `app/product-search/layout.tsx` - Product Search page layout
- `app/product-search/page.tsx` - Product Search Main Page
- `src/components/ui` - UI Components (global components without logic)
- `src/components/product-search` - Product Search Components (components with logic)
- `src/components/form/product-search` - Product Search Form Components (components with logic)
- `src/utils/*` - Reusable utility functions

## Fix

- Handle Storybook aliases. Storybook could not handle the relative paths correctly. To sort it out, I added the following code to the `storybook/main.ts` file:

```typescript
const config: StorybookConfig = {
  // ...other configurations
  webpackFinal: async (config) => {
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
    // ...other configurations
  },
};
```
