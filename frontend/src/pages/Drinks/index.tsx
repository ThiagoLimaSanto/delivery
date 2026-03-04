import { MdShoppingCart } from 'react-icons/md';
import { Image } from '../../components/Image';
import { MenuTemplate } from '../../templates/MenuTemplate.tsx';

export function Drinks() {
  return (
    <MenuTemplate title={'Bebidas'}>
      <div className='flex flex-col gap-2 bg-white rounded-md transition duration-300 ease-in-out lg:hover:scale-105'>
        <div className='h-1/2 w-full'>
          <Image
            src='https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Coca Lata'
            className='w-full h-full object-center object-cover rounded-md rounded-b-none'
          />
        </div>
        <div className='h-1/2 p-4 flex flex-col justify-between'>
          <div>
            <p className='font-bold text-[20px] text-[#333] mb-4'>Coca Cola</p>
            <p>Coca Lata 350ml</p>
          </div>
          <div className='flex flex-col items-center justify-between gap-2'>
            <strong className='font-bold text-[22px] w-full'>R$ 6,00</strong>
            <button className='flex items-center justify-center gap-1 bg-green-700 rounded-lg py-3 cursor-pointer w-full hover:bg-green-600 transition-colors duration-300'>
              <MdShoppingCart className='text-lg text-white' size={20} />{' '}
              <span className='text-white font-bold text-lg'>Pedir</span>
            </button>
          </div>
        </div>
      </div>
    </MenuTemplate>
  );
}
