'use client';
import Link from '@/node_modules/next/link';
import { usePathname } from '@/node_modules/next/dist/client/components/navigation';
export default function BreadCrumb({ breadcrumbs }: any) {
  const pathname = usePathname();
  return (
    <div className='flex items-center gap-2 pb-4 text-blue-600 font-bold text-lg'>
      {breadcrumbs.map((list: any, idx: number) => {
        const isAppendDevider = idx + 1 !== breadcrumbs.length;
        return (
          <div key={idx} className='flex gap-2'>
            <div className={`${list.active ? 'text-blue-900' : 'text-blue-600'}`}>
              <Link href={list.href}>{list.label}</Link>
            </div>
            {isAppendDevider && <div>/</div>}
          </div>
        );
      })}
    </div>
  );
}
