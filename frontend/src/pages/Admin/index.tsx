import { HomeAdmin } from "../../components/HomeAdmin";
import { NavBarAdmin } from "../../components/NavBarAdmin";
import { SidebarAdmin } from "../../components/SideBarAdmin";

export function Admin() {
  return (
    <div className='bg-[#15171e] w-full min-h-screen flex'>
      <SidebarAdmin />
      <div className='flex-1'>
        <NavBarAdmin />
        <HomeAdmin />
      </div>
    </div>
  );
}