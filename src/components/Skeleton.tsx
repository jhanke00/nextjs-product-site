export default function Skeleton() {
  return (
    <tr className='w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-full rounded bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-full rounded bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-full rounded bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-full rounded bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-full rounded bg-gray-200'></div>
      </td>
    </tr>
  );
}
