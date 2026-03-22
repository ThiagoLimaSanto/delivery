import { NavLink } from 'react-router-dom';
import { useHandleOrder } from '../../hook/useHandleOrder';

export function OrderSummary() {
  const { order, totalPrice, totalPriceWithDelivery } = useHandleOrder();
  return (
    <div className='hidden sm:block bg-white p-4 w-87.5 max-h-135 shadow-md rounded'>
      <div className='flex flex-col gap-4'>
        <p className='text-black font-bold'>Seu Pedido</p>
        <NavLink to={'/cardapio'} className='text-red-600  cursor-pointer'>
          Ver Cardápio
        </NavLink>
        <div className='flex-1 flex flex-col  min-h-0'>
          <div className='overflow-y-auto flex flex-col gap-4 flex-1 min-h-0 max-h-80 pr-2'>
            {order &&
              order.map(item => (
                <div
                  key={item.productId}
                  className='flex flex-col gap-4 border-b border-[#ccc] pb-2'
                >
                  <div className='flex justify-between'>
                    <p>{item.name}</p>
                  </div>
                  <div className='w-full flex justify-between'>
                    <p>(Quantidade: {item.quantity})</p>
                  </div>
                  <p>R$ {item.price.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>
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
