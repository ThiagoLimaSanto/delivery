import { useHandleOrder } from '../../hook/useHandleOrder';

export function CartsOrderSummary() {
  const { order } = useHandleOrder();
  return (
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
  );
}
