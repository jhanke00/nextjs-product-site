import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
const useDataHook = () => {
  const getLargeProductsList = () => {
    return largeData;
  };
  const getSmallProductsList = () => {
    return smallData;
  };

  return { getLargeProductsList, getSmallProductsList };
};

export default useDataHook;
