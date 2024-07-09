import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products List',
  description: 'Example products list page with mock data',
};

export default function ProductslistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
