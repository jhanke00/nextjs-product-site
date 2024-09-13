# Components Folder

The `components` folder contains reusable React components that are used throughout the application. Each component is designed to encapsulate a specific piece of UI and functionality, making it easy to manage and maintain the frontend code.

## Folder Structure

- `orders/`

  - `OrderItem.tsx`:
    - **Description**: Renders a single order item card, displaying product details, quantities, and pricing information.
    - **Styling**: Uses `OrderItem.module.css` for modern card design, hover effects, and responsive layout.
  - `OrderList.tsx`:
    - **Description**: Displays a list of `OrderItem` components for a specific user. Includes handling for empty states and iterates through orders.
    - **Styling**: Relies on CSS module styling from `OrderList.module.css` to manage layout and responsiveness.

- `users/`
  - `UserInfo.tsx`:
    - **Description**: Displays detailed information about a single user, including name, email, and phone number. Features a modern, clean look with subtle animations.
    - **Styling**: Styled using `UserInfo.module.css` for layout, color scheme, and animations.

## Components

### `OrderItem.tsx`

- **Purpose**: To display detailed information about an individual order, including product name, quantity, price, and total spent.
- **Props**:
  - `order`: An object representing the order details.
- **Styling**:
  - `OrderItem.module.css`: Includes card styling, hover effects, and responsive design adjustments.
- **Key Features**:
  - Modern card layout
  - Enhanced visual design
  - Smooth hover animations
  - Responsive design for different screen sizes

### `OrderList.tsx`

- **Purpose**: To render a list of order items for a specific user. It iterates over the orders and displays each using `OrderItem`.
- **Props**:
  - `orders`: An array of order objects.
- **Styling**:
  - `OrderList.module.css`: Manages layout and responsiveness of the list of orders.
- **Key Features**:
  - Handles empty states gracefully
  - Uses `OrderItem` for detailed display of each order
  - Responsive design to ensure usability on various devices

### `UserInfo.tsx`

- **Purpose**: To display detailed information about a user, including their first name, last name, email, and phone number.
- **Props**:
  - `user`: An object representing the user's details.
- **Styling**:
  - `UserInfo.module.css`: Includes styling for the user information layout, color scheme, and animations.
- **Key Features**:
  - Clean and modern design
  - Subtle animations for enhanced user experience
  - Responsive design for different screen sizes

## Styling

- **CSS Modules**:
  - Each component uses a dedicated CSS module for styling. This approach helps in maintaining scoped styles and preventing unintended global style conflicts.
- **Responsive Design**:
  - Components are designed to be responsive and adapt to various screen sizes using media queries and flexbox.
