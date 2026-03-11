import { HiOutlineXMark } from 'react-icons/hi2';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { UseHandleModal } from '../../hook/useHandleModal';
import { useHandleOrder } from '../../hook/useHandleOrder';

export function SideBarCart() {
  const { clickCarrinho, handleModalCarrinho } = UseHandleModal();
  const {
    increaseQuantity,
    decreaseQuantity,
    order,
    totalPrice,
    totalItems,
    removeItem,
  } = useHandleOrder();

  return (
    <div
      className={`${clickCarrinho ? 'translate-x-0' : 'translate-x-full'} fixed shadow-xl transform transition-transform duration-700 ease-in-out top-20 h-[calc(100vh-5rem)]  right-0 w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white z-3`}
    >
      <div className='p-5 flex flex-col h-full'>
        <button
          onClick={() => handleModalCarrinho(clickCarrinho)}
          className='flex items-center text-black cursor-pointer w-8'
        >
          <HiOutlineXMark size={30} />
        </button>

        <h2 className='text-center mt-4 text-2xl font-semibold text-[#333]'>
          Seu Carrinho
        </h2>

        {totalItems > 0 ? (
          <>
            <div className='flex-1 flex flex-col mt-8 min-h-0'>
              <div className='overflow-y-auto flex flex-col gap-4 flex-1 min-h-0 pr-2'>
                {order &&
                  order.map(item => (
                    <div key={item.productId} className='flex flex-col gap-4 border-b border-[#ccc] pb-2'>
                      <div className='flex justify-between'>
                        <p>{item.name}</p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className='cursor-pointer'
                        >
                          <MdDelete size={23} />
                        </button>
                      </div>
                      <div className='w-full flex justify-between'>
                        <p>(Quantidade: {item.quantity})</p>
                        <div className='flex gap-4'>
                          <button
                            onClick={() => increaseQuantity(item.productId)}
                            className='cursor-pointer text-green-600 hover:text-green-700'
                          >
                            Adicionar
                          </button>
                          <button
                            onClick={() => {
                              if (item.quantity > 1)
                                decreaseQuantity(item.productId);
                            }}
                            className='cursor-pointer text-red-500 hover:text-red-600'
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <p className='text-xl font-semibold'>
                Total: R$ {totalPrice.toFixed(2)}
              </p>
              <Link
                onClick={() => handleModalCarrinho(clickCarrinho)}
                to={'/pedido/finalizar'}
                className='w-full py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white cursor-pointer rounded-lg font-bold mt-6 flex items-center justify-center'
              >
                Escolher forma de Pagamento
              </Link>
            </div>
          </>
        ) : (
          <div className='flex-1 flex flex-col mt-8 min-h-0'>
            <p className='text-center font-semibold'>
              Seu carrinho esta vazio!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
