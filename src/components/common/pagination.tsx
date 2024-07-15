import Button from './button';
import { PaginationType } from '@/src/type/orders/index';
const Pagination = ({ currentPage, totalPages, nextPage, prevPage }: PaginationType) => {
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
