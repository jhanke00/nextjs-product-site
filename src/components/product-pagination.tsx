import { Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface PaginationProps {
  initialPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({ initialPage, totalPages, onPageChange }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className='w-full flex justify-center pt-4'>
      <Pagination
        color='warning'
        showControls
        isCompact={isMobile}
        initialPage={initialPage}
        total={totalPages}
        onChange={onPageChange}
        size={isMobile ? 'sm' : 'lg'}
      />
    </div>
  );
}
