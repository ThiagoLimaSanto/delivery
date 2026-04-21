import { FiPlus } from 'react-icons/fi';
import { OrderSummaryWaiter } from '../../components/OrderSummaryWaiter';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { MainTemplateAdmin } from '../../templates/MainTemplateAdmin';

export function Waiter() {
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
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 max-h-100 overflow-y-auto'>
            <CartsTemplate>
              <div className='flex justify-between items-center'>
                <div className='text-white'>
                  <p>Filé à Parmegiana</p>
                  <p className='text-sm mt-2 text-[#858a8d]'>R$ 0,00</p>
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
            <CartsTemplate>
              <div className='flex justify-between items-center'>
                <div className='text-white'>
                  <p>Filé à Parmegiana</p>
                  <p className='text-sm mt-2 text-[#858a8d]'>R$ 0,00</p>
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
            <CartsTemplate>
              <div className='flex justify-between items-center'>
                <div className='text-white'>
                  <p>Filé à Parmegiana</p>
                  <p className='text-sm mt-2 text-[#858a8d]'>R$ 0,00</p>
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
          </div>
        </div>
        <OrderSummaryWaiter />
      </div>
    </MainTemplateAdmin>
  );
}
