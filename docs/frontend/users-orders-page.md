# Frontend

- This Feature Show all the of the orders for a specific user

# Users List

- Listed all of the users
- Having option to view the specific user orders - called view orders.
- Added Pagniation to easily view the users list

# View Orders for a specific users

- Shows all of the orders for a specific users
- Orders shows - how much was spent(Sub Total) and Products that were ordered(Item Details) for a specific users.
- Calculated Total spent by the user
- Back to users list

## Folder Structure

- `app/page.tsx` - Added View Users Link
- `app/pages/users.tsx` - View Users List and provide the link to specific user orders page
- `app/pages/orders.tsx` - Order View Page - (url: '/orders?userId=123')
- `src/mock/large/orders.json` - Mock JSON for Orders list
- `src/mock/large/users.json` - Mock JSON for Users list
