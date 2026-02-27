import { useState } from 'react';
import { Drinks } from '../../components/Drinks';
import { HeroHome } from '../../components/HeroHome';
import { MainSideBar } from '../../components/MainSideBar';
import { Menu } from '../../components/Menu';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';

export function Home() {
  const { loading } = useAuth();

  const [click, setClick] = useState(false);
  const [clickCarrinho, setClickCarrinho] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar
        handleModal={() => setClick(!click)}
        handleModalCarrinho={() => setClickCarrinho(!clickCarrinho)}
      />
      <ModalOverlay
        className='w-screen h-screen z-3'
        click={click}
        handleModal={() => {
          setClick(false);
          setClickCarrinho(false);
        }}
        clickCarrinho={clickCarrinho}
      />
      <MainSideBar
        handleModal={() => setClick(!click)}
        handleModalCarrinho={() => setClickCarrinho(!clickCarrinho)}
        click={click}
        clickCarrinho={clickCarrinho}
      />
      <HeroHome />
      <Menu />
      <Drinks />
    </>
  );
}
