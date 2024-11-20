import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Search',
  description: 'Simple product search page',
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
