import { useHandleOrder } from '../../hook/useHandleOrder';

export function CartsOrderSummary() {
  const { order } = useHandleOrder();
  return (
    <div className='flex-1 flex flex-col gap-4'>
      {order &&
        order.map(item => (
          <div
            key={item.productId}
            className='flex flex-col gap-4 border-b border-[#3b3b3b] pb-2'
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
  );
}
