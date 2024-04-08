import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Example Order page with mock data',
};

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
