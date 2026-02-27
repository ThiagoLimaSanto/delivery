import { useState } from 'react';
import { ModalOverlay } from '../../components/ModalOverlay';
import { NavBar } from '../../components/NavBar';
import { SideBar } from '../../components/SideBar';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';

export function Home() {
  const { loading } = useAuth();

  const [click, setClick] = useState(false);

  function handleModal() {
    setClick(!click);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <NavBar handleModal={handleModal} />
      <ModalOverlay
        className='w-screen h-screen z-3'
        click={click}
        handleModal={handleModal}
      />
      <SideBar click={click} handleModal={handleModal} />
      
    </div>
  );
}
