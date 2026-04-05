import { useNavigate } from 'react-router-dom';
import { useAddresContext } from '../../hook/useAddressContext';
import { useHandleOrder } from '../../hook/useHandleOrder';
import { usePostOrder } from '../../hook/useOrder';

export type TypePaymentEnum = 'DINHEIRO' | 'PIX' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO';

export function SubmitOrderButton({typePayment}: {typePayment: TypePaymentEnum}) {
  const navigate = useNavigate();
  const { order } = useHandleOrder();
  const { getDefaultAddress } = useAddresContext();
  const { mutate } = usePostOrder();
  const data = {
    addressId: getDefaultAddress()?.id,
    typePayment: typePayment,
    items: order.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
  const handleSubmit = () => {
    mutate(data);
    navigate('/meuspedidos');
  };

  return (
    <div className='w-full'>
      <button
        disabled={!getDefaultAddress}
        onClick={handleSubmit}
        className='w-full py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white cursor-pointer rounded-lg font-bold mt-6 flex items-center justify-center'
      >
        Agendar Pedido
      </button>
    </div>
  );
}
