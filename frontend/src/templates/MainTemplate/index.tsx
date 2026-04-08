import { MainSideBar } from '../../components/MainSideBar';
import { ManageAddressesModal } from '../../components/ManageAddressesModal';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';
import { ProfileModal } from '../../components/ProfileModal';

type MainTemplateProps = { children: React.ReactNode };

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <NavBar />
      <ProfileModal />
      <ManageAddressesModal />
      <ModalOverlay />
      <MainSideBar />
      <div className='mt-20 h-[calc(100vh-120px)]'>{children}</div>
    </>
  );
}
