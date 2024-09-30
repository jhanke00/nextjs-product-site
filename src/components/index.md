# Components

Create reusable components here.
src\components\StarRating\index.tsx - Component that is used to filter based in the rating, once you click in the start it will filter based on the value of the star, once you click again in the same star the rating filter will br cleared.

src\components\RangePicker\index.tsx - Component that is used to filter based in the maximum price of the product.

src\components\ChipPicker\index.tsx - Component that is used to filter based in category, once you click in the category the filter will only show the products within the category that was specified, you can select multiple categories at same time and unselect the categories just clicking again in the category.

OBS: That was a problem in tailwind configuration file, on line 6 instead of `'./src/components/**/*.{js,ts,jsx,tsx,mdx}',` it was `'./components/**/*.{js,ts,jsx,tsx,mdx}',` that caused tailwind classes to not render properly. I fixed, but if it wasn't the case just change it back. :D
