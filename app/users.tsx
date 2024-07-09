'use client';
import { useState , useMemo} from 'react';
import Link from 'next/link';
import UsersList from '@/src/utils/userdata';
import Pagination from '@/src/components/footer/pagination';

let PageSize = 10;

export default function Users() {
const [currentPage, setCurrentPage] = useState(1);  
const userData = UsersList();

const currentUserData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col'>
     <div className='items-left p-4 text-center font-bold text-2xl'>
        Users Table
     </div> 
      <div className='items-left ml-8 mb-2.5'>
        Select any userName to get the corresponding order details
      </div> 
      <div className='z-10 max-w-5xl w-full font-mono text-sm lg:flex items-center p-8'>
        <div>
           <div className="overflow-y-auto"> 
             <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-bold text-xl">Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-bold text-xl">Email</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-bold text-xl">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                {currentUserData.map((user : any) => (
                    <tr className="even:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                            <Link href={`/users/${user.id}`}>
                              <p className='w-[250px]'>{user.firstName} {user.lastName}</p>
                            </Link>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                            <p className='w-[250px]'>{user.email} </p>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                          <p className='w-[250px]'>{user.phoneNumber} </p>
                        </td>
                    </tr>
                ))}
                </tbody>
             </table>

           </div>
        </div>
      </div>

       <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={userData.length}
        pageSize={PageSize}
        onPageChange={(page :any) => setCurrentPage(page)}
      /> 
    </main>
  );
}