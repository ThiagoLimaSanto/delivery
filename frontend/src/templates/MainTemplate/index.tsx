import { Footer } from '../../components/Footer';
import { FooterOverlay } from '../../components/FooterOverlay';
import { MainSideBar } from '../../components/MainSideBar';
import { ManageAddressesModal } from '../../components/ManageAddressesModal';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';
import { ProfileModal } from '../../components/ProfileModal';

type MainTemplateProps = { children: React.ReactNode; footerOverlay?: boolean };

export function MainTemplate({ children, footerOverlay }: MainTemplateProps) {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <NavBar />
      <ProfileModal />
      <ManageAddressesModal />
      <ModalOverlay />
      <MainSideBar />

      <main className='flex-1'>{children}</main>

      {footerOverlay ? <FooterOverlay /> : <Footer />}
    </div>
  );
}
