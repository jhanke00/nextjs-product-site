import { Dispatch, SetStateAction } from 'react';

export default interface FilterContextProps {
  ratingFilter: number;
  setRatingFilter: Dispatch<SetStateAction<number>>;
  priceFilter: [number, number];
  setPriceFilter: Dispatch<SetStateAction<[number, number]>>;
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
}
