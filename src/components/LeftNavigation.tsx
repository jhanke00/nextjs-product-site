'use client';
import { House, ShoppingCart, Package } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LeftNavigation() {
  const pathname = usePathname();

  return (
    <aside className='w-60 h-screen p-2 rounded-b-md bg-[#1E293B] text-white text-sm'>
      <ul>
        <Link href='/'>
          <li
            className={`h-[40px] flex items-center gap-2 pl-[5px] rounded-md mb-[10px]  cursor-pointer hover:bg-blue-600 hover:text-white ${pathname === '/' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            <House />
            Home
          </li>
        </Link>
        <Link href='/productslist'>
          <li
            className={`h-[40px] flex items-center gap-2 pl-[5px] rounded-md mb-[10px] cursor-pointer hover:bg-blue-600 hover:text-white ${pathname?.includes('/productslist') ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            <Package />
            Products
          </li>
        </Link>
        <Link href='/orders'>
          <li
            className={`h-[40px] flex items-center gap-2 pl-[5px] rounded-md mb-[10px] cursor-pointer hover:bg-blue-600 hover:text-white active:bg-blue-600 ${pathname === '/orders' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            <ShoppingCart />
            Orders
          </li>
        </Link>
      </ul>
    </aside>
  );
}
