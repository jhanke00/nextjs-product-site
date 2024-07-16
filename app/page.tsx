import Link from '@/node_modules/next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <Link href='/users'>
          <h2 className='text-2xl font-semibold'>User Order Page</h2>
        </Link>
      </div>
    </main>
  );
}
