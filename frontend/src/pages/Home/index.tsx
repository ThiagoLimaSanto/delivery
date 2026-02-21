import { useState } from 'react';
import { Carousel } from '../../components/Carousel';
import { Heading } from '../../components/Heading';
import { Image } from '../../components/Image';
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
      <section className='w-screen h-screen'>
        <div className='h-[60%] w-full mb-8'>
          <ModalOverlay className='w-full h-[60%] z-1 ' />
          <Image
            src='/images/home.webp'
            alt='Burguer House'
            className='w-full h-full object-cover'
          />
        </div>
        <Heading Tag='h3'>CATEGORIAS</Heading>
        <Carousel />
      </section>
    </div>
  );
}
