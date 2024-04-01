import { IPaginator } from '@/src/type/paginator/index';
import React, { useMemo } from 'react';

export const Paginator = (props: IPaginator) => {
  const getPageSizeUI = useMemo(() => {
    return (
      <div className='me-4'>
        <p>{props.recordsPerPageTitle ?? 'Records Per Page'}</p>
        <select
          id='pageSize'
          value={props.pageSize}
          onChange={props.pageSizeChangeHandler}
          className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        >
          {props.pageSizes.map((pageSize: number, index: number) => {
            return (
              <option key={index} value={pageSize}>
                {pageSize}
              </option>
            );
          })}
        </select>
      </div>
    );
  }, [props.recordsPerPageTitle, props.pageSize, props.pageChangeHandler, props.pageSizes]);

  const getPagination = useMemo(() => {
    return (
      <div className='flex items-center justify-end me-4'>
        {getPageSizeUI}
        <div className='ms-4'>
          <p className='pe-2'>{props.perPageLabel ?? 'Page'}</p>
          <select
            id='pagenumber'
            value={props.currentPage}
            onChange={props.pageChangeHandler}
            className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            {Array.from({ length: props.totalPages }).map((_, index: number) => {
              return (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }, [props.currentPage, props.pageChangeHandler, props.totalPages, props.pageSizes]);

  return <>{getPagination}</>;
};

export default Paginator;
