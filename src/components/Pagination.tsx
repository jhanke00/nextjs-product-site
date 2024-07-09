import { useState, useEffect } from 'react';

export default function Pagination({ data, setChunkOfData, isSearch }: any) {
  const rowsPerPage = 10;
  const [offSet, setOffSet] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonsList, setButtonsList] = useState([]);

  const getButtonList = () => {
    let buttons = [];
    let size = Math.round(data.length / rowsPerPage);
    var n = size >= rowsPerPage ? rowsPerPage : size === 0 ? 1 : size;
    let j = 1;
    for (var i = j; i <= n; i++) {
      buttons.push(
        <button
          className={`w-[30px] p-1 mx-1 rounded-md hover:bg-blue-500 ${currentPage == i ? 'bg-blue-500' : 'bg-gray-300'}`}
          key={i}
          onClick={(e) => handleButtonClick(e.target)}
        >
          {i}
        </button>
      );
      if (currentPage > n) {
        buttons = [];
        j = currentPage;
        n = i + rowsPerPage;
      }
    }
    setButtonsList(buttons as any);
  };

  const getChunkOfData = () => {
    setChunkOfData(data.slice(offSet, currentPage * rowsPerPage));
  };

  const handleButtonClick = (i: any) => {
    const val = parseInt(i.innerHTML);
    setOffSet(val * rowsPerPage - rowsPerPage);
    setCurrentPage(val);
  };

  const handlePrevPage = () => {
    setOffSet((currentPage - 1) * rowsPerPage - rowsPerPage);
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setOffSet(currentPage * rowsPerPage);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getChunkOfData();
    getButtonList();
  }, [data]);

  useEffect(() => {
    getButtonList();
    getChunkOfData();
  }, [currentPage]);

  useEffect(() => {
    setOffSet(0);
    setCurrentPage(1);
  }, [isSearch]);

  return data?.length > 0 ? (
    <div className='flex flex-col items-center'>
      <p className='p-3'>
        Showing {offSet + 1} to {currentPage * rowsPerPage} items of {data.length}
      </p>
      <div className='flex justify-center items-center gap-2'>
        <button
          className='w-[70px] p-1 bg-gray-300 rounded-md disabled:cursor-not-allowed'
          onClick={handlePrevPage}
          disabled={currentPage == 1 ? true : false}
        >
          Prev
        </button>
        <div>
          {buttonsList.map((buttons: any) => {
            return buttons;
          })}
        </div>
        <button
          className='w-[70px] p-1 bg-gray-300 rounded-md disabled:cursor-not-allowed'
          onClick={handleNextPage}
          disabled={(Math.round(data.length / rowsPerPage) || 1) == currentPage ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  ) : null;
}
