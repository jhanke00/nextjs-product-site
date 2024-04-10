import smallData from '@/src/mock/large/users.json';

const userDetail = ({ params }: { params: { userId: string } }) => {
  const data = [...smallData];
  console.log(data);
  const user = data.find((item) => item.id === params.userId);
  //const user = data.find(item);
  if (!user) {
    return <p>Product not Found</p>;
  }

  return (
    <table className='flex min-h-screen flex-col p-24'>
      <tbody>
        <tr>
          <th colSpan={2}>User Detail </th>
        </tr>
        <tr>
          <th>Fistname</th>
          <td>{user.firstName}</td>
        </tr>
        <tr>
          <th>Lastname</th>
          <td> {user.lastName}</td>
        </tr>
        <tr>
          <th>Phone No</th>
          <td> {user.phoneNumber}</td>
        </tr>
        <tr>
          <th>Email: </th>
          <td>{user.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default userDetail;
