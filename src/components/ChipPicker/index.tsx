import { useCallback } from 'react';

export type ChipPickerProps = {
  title?: string;
  chipOptions: string[];
  selectedChips: string[];
  handleSelectedChipsChange: (chipsList: string[]) => void;
};

export const ChipPicker = ({ chipOptions, selectedChips, handleSelectedChipsChange, title }: ChipPickerProps) => {
  const handleChipSelected = useCallback(
    (chip: string) => {
      if (selectedChips.includes(chip)) {
        handleSelectedChipsChange(selectedChips.filter((i) => i !== chip));
      } else {
        handleSelectedChipsChange([...selectedChips, chip]);
      }
    },
    [selectedChips, handleSelectedChipsChange]
  );

  return (
    <div className='flex flex-col gap-2 flex-wrap'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <div className='flex gap-2 flex-wrap'>
        {chipOptions.map((op) => (
          <div key={'chip-' + op}>
            <button
              onClick={() => handleChipSelected(op)}
              className={`${selectedChips.includes(op) ? 'bg-purple-700' : 'bg-gray-500'} rounded-md p-2`}
            >
              {op}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
