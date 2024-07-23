import type { Metadata } from 'next';
import { setupDatabase } from '@/src/lib/db';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Example product page with mock data',
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setupDatabase();

  return children;
}
