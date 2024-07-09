import Header from './Header';
import LeftNavigation from './LeftNavigation';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-w-screen min-h-screen'>
      <Header />
      <div className='flex justify-start items-start'>
        <LeftNavigation />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
