import { HiOutlineXMark } from 'react-icons/hi2';
import type { ModalProps } from '../../types/Modal';

export function SideBarCart({
  clickCarrinho,
  handleModalCarrinho,
}: ModalProps) {
  return (
    <div
      className={`${clickCarrinho ? 'translate-x-0' : 'translate-x-full'} fixed shadow-xl transform transition-transform duration-700 ease-in-out top-20 h-[calc(100vh-5rem)]  right-0 w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white z-3`}
    >
      <div className='p-5 flex flex-col h-full'>
        <button
          onClick={handleModalCarrinho}
          className='flex items-center text-black cursor-pointer w-8'
        >
          <HiOutlineXMark size={30} />
        </button>

        <h2 className='text-center mt-4 text-2xl font-semibold text-[#333]'>
          Seu Carrinho
        </h2>

        <div className='flex-1 flex flex-col mt-8 min-h-0'>
          <div className='overflow-y-auto flex flex-col gap-4 flex-1 min-h-0 pr-2'>
            <div className='flex flex-col gap-4 border-b border-[#ccc] pb-2'>
              <p>Smash Burguer</p>
              <div className='w-full flex justify-between'>
                <p>(Quantidade: 1)</p>
                <div className='flex gap-4'>
                  <button className='cursor-pointer text-green-600 hover:text-green-700'>Adicionar</button>
                  <button className='cursor-pointer text-red-500 hover:text-red-600'>Remover</button>
                </div>
              </div>
              <p>R$ 18,90</p>
            </div>
            <div className='flex flex-col gap-4 border-b border-[#ccc] pb-2'>
              <p>Smash Burguer</p>
              <div className='w-full flex justify-between'>
                <p>(Quantidade: 1)</p>
                <div className='flex gap-4'>
                  <button className='cursor-pointer text-green-600 hover:text-green-700'>Adicionar</button>
                  <button className='cursor-pointer text-red-500 hover:text-red-600'>Remover</button>
                </div>
              </div>
              <p>R$ 18,90</p>
            </div>
          </div>

          <div className='mt-6'>
            <h3 className='mb-2 text-black font-bold'>Endereço de Entrega:</h3>
            <form>
              <input
                className='outline-none border-2 border-[#ccc] w-full px-2 py-1'
                type='text'
                placeholder='Digite o endereço de entrega...'
              />
            </form>
          </div>
        </div>

        <button className='w-full py-3 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white cursor-pointer rounded-lg font-bold mt-6'>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
