import { useGetActivesTables } from '../../hook/useTables';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { Spinner } from '../Spinner';

export function TablesWaiter() {
  const { data, isLoading } = useGetActivesTables();

  if (isLoading) return <Spinner />;

  return (
    <CartsTemplate>
      <p className='text-white mb-2 text-lg'>Selecione a Mesa</p>
      <select
        name='table'
        id='table'
        className='text-[#858a8d] border border-[#3b3b3b] rounded-lg p-2 cursor-pointer'
      >
        {data &&
          data.map(table => (
            <>
              <option key={table.id} value={table.number}>
                Mesa {table.number}
              </option>
            </>
          ))}
      </select>
    </CartsTemplate>
  );
}
