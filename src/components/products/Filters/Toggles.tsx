import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { nonNullishValues } from '@/src/utils/helpers';
import Input from '@components/Input';

type Props = {
  params: {
    topRated?: boolean;
    withReviews?: boolean;
    inStock?: boolean;
  };
  onChange: () => void;
};

export default function Filters({ params, onChange }: Props) {
  const router = useRouter();

  const [toggles, setToggles] = useState({
    topRated: params.topRated,
    withReviews: params.withReviews,
    inStock: params.inStock,
  });

  const makeHandleSelectToggle = (param: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;

      setToggles((prev) => {
        const newToggles = { ...prev, [param]: checked };

        const newParams = new URLSearchParams({
          ...nonNullishValues(params),
          page: '1',
          ...{
            topRated: !!newToggles.topRated + '',
            withReviews: !!newToggles.withReviews + '',
            inStock: !!newToggles.inStock + '',
          },
        });

        router.push(`/products?${newParams}`);
        onChange();

        return newToggles;
      });
    };
  };

  return (
    <>
      <Input
        labelCssClass='flex items-center justify-between cursor-pointer hover:underline'
        inputType='checkbox'
        value={toggles.topRated}
        label='Top rated'
        handleChange={makeHandleSelectToggle('topRated')}
      />
      <Input
        labelCssClass='flex items-center justify-between cursor-pointer hover:underline'
        inputType='checkbox'
        value={toggles.withReviews}
        label='With reviews'
        handleChange={makeHandleSelectToggle('withReviews')}
      />
      <Input
        labelCssClass='flex items-center justify-between cursor-pointer hover:underline'
        inputType='checkbox'
        value={toggles.inStock}
        label='In stock'
        handleChange={makeHandleSelectToggle('inStock')}
      />
    </>
  );
}
