import { showMessage } from '../../adapters/ShowMessage';
import { useHandleOrder } from '../../hook/useHandleOrder';
import { usePostCommand } from '../../hook/useOrder';
import { CartsTemplate } from '../../templates/CartsTemplate';
import { CartsOrderSummary } from '../CartsOrderSummary';

type OrderSummaryWaiterProps = {
  tableId: string;
};

export function OrderSummaryWaiter({ tableId }: OrderSummaryWaiterProps) {
  const { mutateAsync: createCommand } = usePostCommand();
  const { totalPrice, clearCart, order } = useHandleOrder();
  const data = {
    tableId,
    items: order.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const handleSubmit = () => {
    if (!tableId) return showMessage.error('Selecione uma Mesa!');
    if (data.items.length === 0) return showMessage.error('Selecione um item!');
    createCommand(data);
    clearCart();
  };
  return (
    <div className='h-screen'>
      <CartsTemplate>
        <h2 className='text-white mb-6 text-lg'>Pedido Atual</h2>
        <div className='flex flex-col justify-between h-full text-white'>
          <div className='overflow-y-auto max-h-50 pr-4 [scrollbar-gutter:stable]'>
            <CartsOrderSummary />
          </div>
          <div className='text-white pb-4 mt-4'>
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
              <span className='font-bold text-white text-lg'>
                R$ {totalPrice.toFixed(2)}
              </span>
            </p>
            <button
              onClick={() => handleSubmit()}
              className='bg-[#32c560] text-white font-bold hover:brightness-110 rounded-lg p-2 w-full cursor-pointer'
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </CartsTemplate>
    </div>
  );
}
