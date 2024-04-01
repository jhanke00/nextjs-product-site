import Image from 'next/image';

export const NoRecords = () => {
  return (
    <div className='flex justify-center'>
      <Image src='/no-records.webp' alt='No Records' className='dark:invert' width={500} height={24} priority />
    </div>
  );
};

export default NoRecords;
