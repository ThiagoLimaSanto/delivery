import { useState } from 'react';
import { MainTemplate } from '../../templates/MainTemplate.tsx';
import { NavLink } from 'react-router-dom';

export function Payment() {
  const [active] = useState(true);

  return (
    <MainTemplate>
      <div className='h-[calc(100vh-80px)]'>
        <div className='h-full flex justify-center gap-12 xl:gap-30 w-[90%] p-4 mx-auto'>
          <div className='flex flex-col items-center max-w-87.5'>
            <h1 className='text-2xl lg:text-3xl font-bold xl:text-4xl'>Finalize seu pedido</h1>
            <div className='w-full flex flex-col mt-4'>
              <div className='flex gap-8 mt-4'>
                <p
                  className={`${active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                >
                  Entrega
                </p>
                <p
                  className={`${!active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                >
                  Retirada
                </p>
              </div>
              <div className='my-8'>
                <p>R. Caraiba, 106</p>
                <p>Rua abaixo do posto de saude sao francisco - Morrinhos/GO</p>
              </div>
            </div>
            <div className='w-full flex flex-col border-t border-[#a6a6a6]'>
              <div className='flex gap-8 mt-8'>
                <p
                  className={`${active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                >
                  Pague pelo site
                </p>
                <p
                  className={`${!active ? 'border-black text-red-600' : 'border-transparent text-[#a6a6a6;] hover:border-[#a6a6a6]'} pb-2 border-b-2 cursor-pointer`}
                >
                  Pague na entrega
                </p>
              </div>
              <div className='mt-6 flex flex-col gap-8'>
                <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
                  Pague pelo Pix
                </button>
                <button className='cursor-pointer py-3 border border-[#a6a6a6] rounded-lg w-60'>
                  Pague pelo Cartão
                </button>
              </div>
              <div className='w-full'>
                <button className='w-full py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white cursor-pointer rounded-lg font-bold mt-6 flex items-center justify-center'>
                  Agendar Pedido
                </button>
              </div>
            </div>
          </div>
          <div className='hidden sm:block bg-white p-4 w-87.5 h-87.5 shadow-md rounded'>
            <div className='flex flex-col gap-4'>
              <p className='text-[#a6a6a6]'>Seu Pedido</p>
              <NavLink to={'/cardapio'} className='text-black mb-4 cursor-pointer'>Ver Cardápio</NavLink>
              <div className='flex flex-col gap-4 border-b border-[#ccc] pb-2'>
                <p>Smash Burguer</p>
                <div className='w-full flex gap-4 justify-between'>
                  <p>(Quantidade: 1)</p>  
                </div>
                <p>R$ 18,90</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-[#a6a6a6] flex justify-between'>Subtotal <span className='text-black'>R$ 18,90</span></p>
                <p className='text-[#a6a6a6] flex justify-between'>Taxa de entrega <span className='text-black'>R$ 3,00</span></p>
                <p className='flex justify-between text-black font-bold'>Total <span>R$ 21,90</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
