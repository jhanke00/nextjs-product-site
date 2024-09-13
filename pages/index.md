# Pages Folder

Documentation on the page components within the `pages` folder.

## Overview

The `pages` folder contains the main page components of the application, each responsible for rendering different parts of the user interface. These pages are connected to specific routes and handle the layout and logic for displaying content to the user.

## Folder Structure

- `orders/`

  - `[userId]/`
    - `index.tsx`
      - **Description**: Displays a list of orders for a specific user.
      - **Features**:
        - Fetches and displays all orders for the user identified by `userId`.
        - Shows the total amount spent by the user.
        - Utilizes `OrderList` component to display individual order details.
      - **Data Fetching**:
        - Uses `getServerSideProps` to fetch data from the server before rendering the page.
    - `style.module.css`
      - **Description**: Contains the styles for the `index.tsx` page.
      - **Features**:
        - Styles the layout and elements of the orders page.
        - Includes responsive design adjustments and hover effects.

- `users/`
  - `[id]/`
    - `index.tsx`
      - **Description**: Displays detailed information about a specific user.
      - **Features**:
        - Shows user details such as name, email, and phone number.
        - Includes a link to navigate back to the user's order list page.
        - Uses `UserInfo` component to present user information.
      - **Data Fetching**:
        - Uses `getServerSideProps` to fetch user data from the server before rendering the page.
    - `style.module.css`
      - **Description**: Contains the styles for the `index.tsx` page.
      - **Features**:
        - Styles the layout and elements of the user information page.
        - Includes animations and responsive design adjustments for a professional appearance.

## Pages Details

### `[userId]/index.tsx`

- **Purpose**: To show all orders for a specific user.
- **Components Used**:
  - `OrderList`: Displays the list of orders for the user.
- **Props**:
  - `orders`: List of orders for the user.
  - `totalSpent`: Total amount spent by the user.
  - `user`: User details.
- **Data Fetching**:
  - Fetches data using `getServerSideProps`.

### `[userId]/style.module.css`

- **Purpose**: To style the `index.tsx` page under the `orders/[userId]` route.
- **Features**:
  - Styles for the orders list page, including layout, hover effects, and responsive design.

### `[id]/index.tsx`

- **Purpose**: To display detailed information about a specific user.
- **Components Used**:
  - `UserInfo`: Shows detailed information about the user.
- **Props**:
  - `user`: User details including ID, name, email, and phone number.
- **Data Fetching**:
  - Fetches data using `getServerSideProps`.

### `[id]/style.module.css`

- **Purpose**: To style the `index.tsx` page under the `users/[id]` route.
- **Features**:
  - Styles for the user information page, including layout, animations, and responsive design.

## Usage

- **Routing**:

  - Pages are automatically routed based on their file structure. For example, `pages/orders/[userId]/index.tsx` is accessible via `/orders/[userId]`.

- **Data Fetching**:

  - Use `getServerSideProps` for server-side data fetching that needs to be done before the page is rendered. This ensures that the page is populated with the necessary data when it loads.

- **Component Integration**:
  - Integrate page components with other parts of the application as needed. For example, use `OrderList` and `UserInfo` components within their respective pages to render content.

## Considerations

- **Dynamic Routing**:

  - Ensure dynamic routes (e.g., `[userId]`, `[id]`) handle missing or invalid parameters gracefully.

- **Server-Side Rendering**:
  - Use `getServerSideProps` for pages that require server-side rendering to ensure fresh data is available on each request.
