import { NavBarAdmin } from '../../components/NavBarAdmin';
import { SidebarAdmin } from '../../components/SideBarAdmin';

type MainTemplateAdminProps = {
  children: React.ReactNode;
};

export function MainTemplateAdmin({ children }: MainTemplateAdminProps) {
  return (
    <div className='bg-[#15171e] w-full min-h-screen flex'>
      <SidebarAdmin />
      <div className='flex-1'>
        <NavBarAdmin />
        {children}
      </div>
    </div>
  );
}
