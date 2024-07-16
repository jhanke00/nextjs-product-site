import Button from './button';
import { PaginationType } from '@/src/type/orders/index';
import { useEffect } from 'react';
const Pagination = ({ data, pageSize, setCurrentPage, currentPage }: PaginationType) => {
  const totalPages = Math.ceil(data.length / pageSize);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className='pagination'>
      <Button className='primary-button' buttonText='Previous' handleClick={prevPage} disable={currentPage === 1} />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className='primary-button'
        buttonText='Next'
        handleClick={nextPage}
        disable={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
