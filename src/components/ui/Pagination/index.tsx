interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Pagination({ currentPage, totalPages, onNext, onPrev }: PaginationProps) {
  return (
    <div className='flex justify-around w-full border-t-2 pt-4'>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
