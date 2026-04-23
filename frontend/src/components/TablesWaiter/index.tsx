import { useGetActivesTables } from '../../hook/useTables';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { Spinner } from '../Spinner';

type TablesWaiterProps = {
  setTableId: React.Dispatch<React.SetStateAction<string>>;
};

export function TablesWaiter({ setTableId }: TablesWaiterProps) {
  const { data, isLoading } = useGetActivesTables();

  if (isLoading) return <Spinner />;

  return (
    <CartsTemplate>
      <p className='text-white mb-2 text-lg'>Selecione a Mesa</p>

      <select
        name='table'
        id='table'
        className='text-[#858a8d] border border-[#3b3b3b] rounded-lg p-2 cursor-pointer'
        onChange={e => setTableId(e.target.value)}
      >
        <option value=''>Selecionar</option>
        {data?.map(table => (
          <option key={table.id} value={table.id}>
            Mesa {table.number} {table.isOccupied ? ' - (Ocupada)' : ''}
          </option>
        ))}
      </select>
    </CartsTemplate>
  );
}
