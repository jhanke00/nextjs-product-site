import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users and Orders',
  description: 'Users and Orders',
};

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
