import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AddressModal } from '../../components/AddressModal/index.tsx';
import { Spinner } from '../../components/Spinner/index.tsx';
import { useGetDefaultAddress } from '../../hook/useAddress.tsx';
import { UseHandleModal } from '../../hook/useHandleModal.tsx';
import { useHandleOrder } from '../../hook/useHandleOrder.tsx';
import { MainTemplate } from '../../templates/MainTemplate/index.tsx';

export function Payment() {
  const { data, isLoading } = useGetDefaultAddress();
  const [active, setActive] = useState(true);
  const [activePayment, setActivePayment] = useState(true);
  const { order, totalPrice, totalPriceWithDelivery } = useHandleOrder();
  const { handleAddressClick, addressClick } = UseHandleModal();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MainTemplate>
      <>
        <AddressModal />
        <div className='h-[calc(100vh-80px)] mt-20'>
          <div className='h-full flex justify-center gap-12 xl:gap-30 w-[90%] p-4 mx-auto'>
            <div className='flex flex-col items-center max-w-87.5'>
              <h1 className='text-2xl lg:text-3xl font-bold xl:text-4xl'>
                Finalize seu pedido
              </h1>
              <div className='w-full flex flex-col mt-4'>
                <div className='flex gap-8 mt-4'>
                  <p
                    onClick={() => setActive(!false)}
                    className={`${active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                  >
                    Entrega
                  </p>
                  <p
                    onClick={() => setActive(!true)}
                    className={`${!active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                  >
                    Retirada
                  </p>
                </div>
                <div className='my-8'>
                  {active ? (
                    <>
                      {data ? (
                        <>
                          <p>
                            {data.street}, {data.number}
                          </p>
                          <p>
                            {data.district} - {data.city}/{data.state}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>Nenhum endereço cadastrado!</p>
                          <p className=''>
                            Cadastrar um novo endereço.{' '}
                            <span
                              onClick={() => handleAddressClick(addressClick)}
                              className='text-red-500 cursor-pointer'
                            >
                              clique aqui.
                            </span>
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Rua Centro, 204</p>
                      <p>Rua de frente ao cemiterio - Morrinhos/GO</p>
                    </>
                  )}
                </div>
              </div>
              <div className='w-full flex flex-col border-t border-[#a6a6a6]'>
                <div className='flex gap-8 mt-8'>
                  <p
                    onClick={() => setActivePayment(!false)}
                    className={`${activePayment ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                  >
                    Pague pelo site
                  </p>
                  <p
                    onClick={() => setActivePayment(!true)}
                    className={`${!activePayment ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                  >
                    Pague na entrega
                  </p>
                </div>
                <div className='mt-6 flex flex-col gap-8'>
                  {activePayment ? (
                    <>
                      <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
                        Pague pelo Pix
                      </button>
                      <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
                        Pague pelo Cartão
                      </button>
                    </>
                  ) : (
                    <div className='flex gap-4 flex-wrap'>
                      <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
                        Dinheiro
                      </button>
                      <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
                        Cartão Credito
                      </button>
                      <button className='px-3 py-2 hover:bg-[#D7ECDF]  border border-[#ccc] rounded-full cursor-pointer text-black'>
                        {' '}
                        Cartão Debido
                      </button>
                    </div>
                  )}
                </div>
                <div className='w-full'>
                  <button className='w-full py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white cursor-pointer rounded-lg font-bold mt-6 flex items-center justify-center'>
                    Agendar Pedido
                  </button>
                </div>
              </div>
            </div>
            <div className='hidden sm:block bg-white p-4 w-87.5 max-h-135 shadow-md rounded'>
              <div className='flex flex-col gap-4'>
                <p className='text-black font-bold'>Seu Pedido</p>
                <NavLink
                  to={'/cardapio'}
                  className='text-red-600  cursor-pointer'
                >
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
                    <span className='text-black'>
                      R$ {totalPrice.toFixed(2)}
                    </span>
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
          </div>
        </div>
      </>
    </MainTemplate>
  );
}
