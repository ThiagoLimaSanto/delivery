import { NavLink } from 'react-router-dom';
import { useHandleOrder } from '../../hook/useHandleOrder';
import { CartsOrderSummary } from '../CartsOrderSummary';

export function OrderSummary() {
  const { totalPrice, totalPriceWithDelivery } = useHandleOrder();
  return (
    <div className='hidden sm:block bg-white p-4 w-87.5 max-h-135 shadow-md rounded'>
      <div className='flex flex-col gap-4'>
        <p className='text-black font-bold'>Seu Pedido</p>
        <NavLink to={'/cardapio'} className='text-red-600  cursor-pointer'>
          Ver Cardápio
        </NavLink>
        <CartsOrderSummary />
        <div className='flex flex-col gap-2'>
          <p className='text-[#a6a6a6] flex justify-between'>
            Subtotal{' '}
            <span className='text-black'>R$ {totalPrice.toFixed(2)}</span>
          </p>
          <p className='text-[#a6a6a6] flex justify-between'>
            Taxa de entrega <span className='text-black'>R$ 3,90</span>
          </p>
          <p className='flex justify-between text-black font-bold'>
            Total <span>R$ {totalPriceWithDelivery.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
