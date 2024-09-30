export type RangePickerProps = {
  title?: string;
  min?: number;
  max: number;
  value: number;
  handleValueChange: (value: number) => void;
};

export const RangePicker = ({ title, handleValueChange, value, max, min = 0 }: RangePickerProps) => {
  return (
    <div className='flex flex-col gap-2 flex-wrap'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <div className='flex justify-between'>
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <input
        type='range'
        min={min}
        step={1}
        value={value}
        max={max}
        onChange={(e) => handleValueChange(Number(e.target.value))}
      />
      <span className='flex justify-center'>{value}</span>
    </div>
  );
};
