import { FiClock, FiDollarSign, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { CartsAdmin } from '../CartsAdmin';

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
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 '>
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
            title='Clientes Novos'
            value={'22'}
            Icon={FiUsers}
            color='#3b82f6'
          />
          <CartsAdmin
            title='Tempo Médio'
            value={'28min'}
            Icon={FiClock}
            color='#32c560'
          />
        </div>
      </div>
      <div className='p-4'>
        <div className=' bg-[#1A1E26] rounded-2xl flex flex-col justify-between border border-[#3b3b3b]'>
          <span className='text-white text-2xl py-7 px-5 uppercase tracking-wider font-semibold '>
            Pedidos Recentes
          </span>
          <div className='border-t border-[#3b3b3b] w-full p-4 justify-between text-white flex'>
            <div>
              <p className='text-lg'>Joao da Silva</p>
              <p className='text-md text-[#858a8d]'>
                2x Smash Burguer, 1x batata
              </p>
            </div>
            <div className='flex flex-col items-end  gap-2 w-1/2'>
              <p className='text-xl font-bold'>RS 39,90</p>
              <p className='text-sm bg-orange-400/40 rounded-full px-2 text-yellow-500'>
                Preparando
              </p>
            </div>
          </div>
          <div className='border-t border-[#3b3b3b] w-full p-4 justify-between text-white flex'>
            <div className=''>
              <p className='text-lg'>Thiago Lima</p>
              <p className='text-md text-[#858a8d]'>1x Smash Burguer</p>
            </div>
            <div className='flex flex-col items-end gap-2 w-1/2'>
              <p className='text-xl font-bold'>RS 19,90</p>
              <p className='text-sm bg-green-400/40 rounded-full px-2 text-[#32c560]'>
                Pronto
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
