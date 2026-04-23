import { FiPlus } from 'react-icons/fi';
import { OrderSummaryWaiter } from '../../components/OrderSummaryWaiter';
import { Spinner } from '../../components/Spinner';
import { useMenu } from '../../hook/useMenu';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { MainTemplateAdmin } from '../../templates/MainTemplateAdmin';

export function Waiter() {
  const { data, isLoading } = useMenu();

  if (isLoading) return <Spinner />;
  return (
    <MainTemplateAdmin sidebar={false}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <CartsTemplate>
            <p className='text-white mb-2 text-lg'>Selecione a Mesa</p>
            <select
              name='table'
              id='table'
              className='text-[#858a8d] border border-[#3b3b3b] rounded-lg p-2 cursor-pointer'
            >
              <option value='1'>Mesa 1</option>
              <option value='2'>Mesa 2</option>
              <option value='3'>Mesa 3</option>
            </select>
          </CartsTemplate>
          <h2 className='text-white font-bold text-lg mt-4'>Menu</h2>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 max-h-100 overflow-y-auto pr-4 [scrollbar-gutter:stable]'>
            {data &&
              data.map(product => (
                <CartsTemplate key={product.id}>
                  <div className='flex justify-between items-center'>
                    <div className='text-white'>
                      <p>{product.name}</p>
                      <p className='text-sm mt-2 text-[#858a8d]'>
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                    <button>
                      <FiPlus
                        size={40}
                        color='#000'
                        className='cursor-pointer bg-[#32c560] p-2 rounded-full'
                      />
                    </button>
                  </div>
                </CartsTemplate>
              ))}
          </div>
        </div>
        <OrderSummaryWaiter />
      </div>
    </MainTemplateAdmin>
  );
}
