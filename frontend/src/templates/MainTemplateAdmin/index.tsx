import { NavBarAdmin } from '../../components/NavBarAdmin';
import { SidebarAdmin } from '../../components/SideBarAdmin';

type MainTemplateAdminProps = {
  children: React.ReactNode;
  sidebar?: boolean;
};

export function MainTemplateAdmin({
  children,
  sidebar = true,
}: MainTemplateAdminProps) {
  return (
    <div className='bg-[#15171e] w-full min-h-screen flex'>
      {sidebar && <SidebarAdmin />}
      <div className='flex-1'>
        <NavBarAdmin />
        {children}
      </div>
    </div>
  );
}
