type Props = {
  labelCssClass?: string;
  label: string;
  value: any;
  inputType?: string;
  max?: number;
  min?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ labelCssClass = '', label, value, max, min, inputType = 'text', handleChange }: Props) {
  const extraProps = inputType === 'number' ? { max, min } : {};

  return (
    <label className={labelCssClass}>
      {label}
      <input
        className='bg-white text-black m-2 ml-1 p-1'
        type={inputType}
        value={value}
        onChange={handleChange}
        {...extraProps}
      />
    </label>
  );
}
