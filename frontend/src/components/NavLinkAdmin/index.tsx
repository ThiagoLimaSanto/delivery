import { NavLink } from 'react-router-dom';
import { UseHandleModal } from '../../hook/useHandleModal';

type NavLinkAdminProps = {
  Icon: React.ElementType;
  title: string;
  to: string;
};

export function NavLinkAdmin({ Icon, title, to }: NavLinkAdminProps) {
  const { clickSideBarAdmin } = UseHandleModal();
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ${clickSideBarAdmin ? 'gap-4' : 'justify-center'} ${
          isActive
            ? 'bg-[#142e21] border-r-2 border-[#32c560] text-[#32c560] hover:brightness-125'
            : 'text-[#ccc] brightness-80 hover:brightness-100 hover:bg-[#37373a]'
        } rounded-lg py-2 px-2 cursor-pointer transition-all duration-100`
      }
    >
      <Icon />
      {clickSideBarAdmin && <p>{title}</p>}
    </NavLink>
  );
}
