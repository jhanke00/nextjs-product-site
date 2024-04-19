import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Search Page',
  description: 'A product listing page with functionalities like Search, Filter, and many more.',
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
