import {
  LuChefHat,
  LuShoppingBag,
  LuUtensilsCrossed
} from 'react-icons/lu';
import { UseHandleModal } from '../../hook/useHandleModal';
import { NavLinkAdmin } from '../NavLinkAdmin';

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
        <div
          className={`flex ${clickSideBarAdmin ? 'p-4' : 'p-2'} items-center gap-4 border-b border-[#3b3b3b]`}
        >
          <LuChefHat
            size={30}
            color='#32c560'
            className='bg-[#204532] h-10 w-10 rounded-lg p-1'
          />
          {clickSideBarAdmin && (
            <div>
              <p className='text-white text-2xl uppercase tracking-wide'>
                Burguer <br /> House
              </p>
              <p className='text-[#858a8d] text-sm'>Painel Admin</p>
            </div>
          )}
        </div>
        <div className={`space-y-2`}>
          <NavLinkAdmin
            Icon={LuChefHat}
            title={'DashBoard'}
            to={'/z_admin/dashboard'}
          />
          <NavLinkAdmin
            Icon={LuUtensilsCrossed}
            title={'Cardápio'}
            to={'/z_admin/cardapio'}
          />
          <NavLinkAdmin
            Icon={LuShoppingBag}
            title={'Pedidos'}
            to={'/z_admin/pedidos'}
          />
        </div>
      </div>
    </>
  );
}
