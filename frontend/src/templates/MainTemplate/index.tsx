import { Footer } from '../../components/Footer';
import { FooterOverlay } from '../../components/FooterOverlay';
import { MainSideBar } from '../../components/MainSideBar';
import { ManageAddressesModal } from '../../components/ManageAddressesModal';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';
import { ProfileModal } from '../../components/ProfileModal';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';

type MainTemplateProps = { children: React.ReactNode; footerOverlay?: boolean };

export function MainTemplate({ children, footerOverlay }: MainTemplateProps) {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

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
