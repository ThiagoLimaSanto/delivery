import { Drinks } from '../../components/Drinks';
import { HeroHome } from '../../components/HeroHome';
import { MainSideBar } from '../../components/MainSideBar';
import { Menu } from '../../components/Menu';
import { ModalOverlay } from '../../components/ModalOverlay';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';
import { MainTemplate } from '../../templates/MainTemplate.tsx';

export function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MainTemplate>
        <ModalOverlay />
        <MainSideBar />
        <HeroHome />
        <Menu />
        <Drinks />
      </MainTemplate>
    </>
  );
}
