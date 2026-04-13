import { FiClock, FiDollarSign, FiShoppingBag } from 'react-icons/fi';
import { CartsAdmin } from '../CartsAdmin';
import { RecentOrdersAdmin } from '../RecentOrdersAdmin';

export function HomeAdmin() {
  return (
    <>
      <div className='p-4'>
        <div className='mb-8 rounded-2xl w-full bg-[url("https://images.pexels.com/photos/12325274/pexels-photo-12325274.jpeg")] overflow-hidden bg-cover bg-center h-48 sm:h-55 lg:h-70 flex items-center relative'>
          <div className='z-2 bg-black/30 w-full h-full absolute'></div>
          <h1 className='text-white tracking-widest text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl z-3 font-semibold p-8 uppercase'>
            Bem-Vindo de volta
          </h1>
        </div>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
          <CartsAdmin
            title='Pedidos Hoje'
            value={'47'}
            Icon={FiShoppingBag}
            color='#32c560'
          />
          <CartsAdmin
            title='Faturamento'
            value={'R$ 3900'}
            Icon={FiDollarSign}
            color='orange'
          />
          <CartsAdmin
            title='Tempo Médio'
            value={'28min'}
            Icon={FiClock}
            color='#32c560'
          />
        </div>
      </div>
      <RecentOrdersAdmin />
    </>
  );
}
