import { FiX } from 'react-icons/fi';
import {
  useChangeStatusOrder,
  useOrderCancel,
  type OrderWithUserAndItems,
} from '../../hook/useOrder';

type ItemGridOrderType = {
  status?: string;
  order: OrderWithUserAndItems;
  IconsStatus: React.ElementType;
  colorTextStatus: string;
  colorBgStatus: string;
  buttonText?: string;
  payment: string;
  declineButton?: boolean;
  total: number;
  ButtonIcons?: React.ElementType;
};

export function ItemGridOrder({
  ButtonIcons,
  order,
  IconsStatus,
  colorTextStatus,
  colorBgStatus,
  buttonText,
  payment,
  total,
  declineButton = false,
}: ItemGridOrderType) {
  const { mutate } = useChangeStatusOrder();
  const { mutate: deleteOrder } = useOrderCancel();
  const handleToggleStatus = () => {
    mutate(order.id);
  };

  const handleDeleteOrder = () => {
    deleteOrder(order.id);
  };
  return (
    <div className='bg-[#1A1E26] flex flex-col gap-4 rounded-lg border border-[#3b3b3b] p-4 text-white'>
      <div className='flex justify-between'>
        <p
          className={`flex items-center justify-center gap-2 ${colorTextStatus} text-sm ${colorBgStatus} rounded-full px-2`}
        >
          <IconsStatus />
          {order.status}
        </p>
        <p className='text-[#858a8d]'>
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className='text-white font-bold text-xl'>{order.user.name}</p>
        <p className='text-md text-[#858a8d]'>
          {order.user.addresses[0].street +
            ', ' +
            order.user.addresses[0].number}
        </p>
        <p className='text-md text-[#858a8d]'>{order.user.phone}</p>
      </div>
      <div className='bg-[#1F232B] p-4 rounded-lg'>
        <div>
          {order.items.map(item => (
            <div key={item.productId} className='flex justify-between'>
              <p className='font-semibold'>
                {item.quantity}x {item.product.name}
              </p>
              <p>R$ {item.product.price.toFixed(2)}</p>
            </div>
          ))}
          <div className='flex flex-col gap-2 border-t border-[#3b3b3b] mt-2 pt-2'>
            <p className=' text-[#ccc] text-sm flex justify-between'>
              Taxa de Entrega <span>R$ 3,00</span>
            </p>
            <p className='font-extrabold flex justify-between'>
              Total: <span>R$ {(total + 3).toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='bg-[#1F232B] p-2 rounded-lg text-[#858a8d]'>{payment}</p>
        <div className='flex gap-4'>
          {declineButton && (
            <button
              onClick={handleDeleteOrder}
              className='text-red-700 border border-red-700 bg-[#111217] flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'
            >
              <FiX />
              Recusar
            </button>
          )}
          {ButtonIcons && (
            <button
              onClick={handleToggleStatus}
              className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'
            >
              <ButtonIcons />
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
