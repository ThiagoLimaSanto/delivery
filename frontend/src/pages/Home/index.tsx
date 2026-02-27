import { useState } from 'react';
import { MainSideBar } from '../../components/MainSideBar';
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
    <div>
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
    </div>
  );
}
