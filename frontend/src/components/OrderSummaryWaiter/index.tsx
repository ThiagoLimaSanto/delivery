import { CartsTemplate } from '../../templates/CartsTemplate';
import { CartsOrderSummary } from '../CartsOrderSummary';

export function OrderSummaryWaiter() {
  return (
    <div className='h-screen'>
      <CartsTemplate>
        <h2 className='text-white mb-6 text-lg'>Pedido Atual</h2>
        <div className='flex flex-col justify-between h-full text-white'>
          <div className='overflow-y-auto max-h-30 pr-4 [scrollbar-gutter:stable]'>
            <CartsOrderSummary />
          </div>
          <div className='text-white pb-4'>
            <p className='text-sm font-light mb-2'>Observações:</p>
            <textarea
              className='border border-[#3b3b3b] rounded-lg p-2 outline-none text-sm w-full'
              name='obs'
              id='obs'
              placeholder='Ex: Sem cebola, sem molho, sem pimenta...'
            ></textarea>
          </div>
          <div className='border-t border-[#3b3b3b] pt-4 max-h-sm'>
            <p className='text-[#858a8d] flex justify-between items-center mb-4'>
              Total:{' '}
              <span className='font-bold text-white text-lg'>R$ 0,00</span>
            </p>
            <button className='bg-[#32c560] text-white font-bold hover:brightness-110 rounded-lg p-2 w-full cursor-pointer'>
              Finalizar Pedido
            </button>
          </div>
        </div>
      </CartsTemplate>
    </div>
  );
}
