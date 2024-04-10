import smallData from '@/src/mock/small/users.json';

const userDetail = ({ params }: { params: { userId: string } }) => {
  const data = [...smallData];
  console.log(data);
  const user = data.find((item) => item.id === params.userId);
  //const user = data.find(item);
  if (!user) {
    return <p>Product not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      <h1 className='text-2xl font-semibold'>User Detail :</h1>
      <h3 className={`mb-3 text-2xl font-semibold`}>{user.firstName}</h3>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Fistname: {user.firstName}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Lastname: {user.lastName}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Phone No: {user.phoneNumber}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Email: {user.email}</p>
    </div>
  );
};

export default userDetail;
