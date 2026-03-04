import { NavLink } from 'react-router-dom';

type SideBarProps = {
  children: React.ReactNode;
  to: string;
};

export function SideBarText({ children, to }: SideBarProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center w-full h-15 bg-amber-500text-black cursor-pointer hover:bg-[#f1f1f1] ${isActive ? 'bg-[#f1f1f1]' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}
