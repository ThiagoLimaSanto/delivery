import { LuChefHat } from 'react-icons/lu';
import { UseHandleModal } from '../../hook/useHandleModal';
import { LuUtensilsCrossed, LuShoppingBag, LuDollarSign } from 'react-icons/lu';

export function SidebarAdmin() {
  const { clickSideBarAdmin, handleClickSideBarAdmin } = UseHandleModal();

  return (
    <>
      <div
        onClick={() => handleClickSideBarAdmin(clickSideBarAdmin)}
        className={`w-screen z-5 fixed h-screen md:hidden bg-black/50 ${clickSideBarAdmin ? 'block' : 'hidden'} `}
      ></div>
      <div
        className={`
          border-r border-[#3b3b3b]
          fixed md:relative z-50 min-h-screen bg-[#111217] shrink-0
          transition-all duration-300 ease-in-out overflow-hidden
      
          ${
            clickSideBarAdmin
              ? 'translate-x-0 w-60'
              : '-translate-x-full md:translate-x-0 md:w-12'
          }
        `}
      >
        <div className='flex items-center gap-4 p-4 border-b border-[#3b3b3b] '>
          <LuChefHat
            size={30}
            color='#32c560'
            className='bg-[#204532] h-10 w-10 rounded-lg p-1'
          />
          <div>
            <p className='text-white text-2xl uppercase tracking-wide'>
              Burguer <br /> House
            </p>
            <p className='text-[#858a8d] text-sm'>Painel Admin</p>
          </div>
        </div>
        <div className='p-4 space-y-2'>
          <div className='flex gap-4 items-center bg-[#142e21] rounded-lg py-1 px-2 border-r-2 border-[#32c560] cursor-pointer'>
            <LuUtensilsCrossed color='#32c560' />
            <p className='text-[#32c560]'>Dashboard</p>
          </div>
          <div className='flex gap-4 items-center bg-[#142e21] rounded-lg py-1 px-2 border-r-2 border-[#32c560] cursor-pointer'>
            <LuUtensilsCrossed color='#32c560' />
            <p className='text-[#32c560]'>Pedidos</p>
          </div>
          <div className='flex gap-4 items-center bg-[#142e21] rounded-lg py-1 px-2 border-r-2 border-[#32c560] cursor-pointer'>
            <LuShoppingBag color='#32c560' />
            <p className='text-[#32c560]'>Dashboard</p>
          </div>
          <div className='flex gap-4 items-center bg-[#142e21] rounded-lg py-1 px-2 border-r-2 border-[#32c560] cursor-pointer'>
            <LuDollarSign color='#32c560' />
            <p className='text-[#32c560]'>Finanças</p>
          </div>
        </div>
      </div>
    </>
  );
}
