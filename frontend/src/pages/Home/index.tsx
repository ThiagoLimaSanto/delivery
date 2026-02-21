import { HiOutlineMenu } from 'react-icons/hi';
import { Image } from '../../components/Image';
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../../hook/useAuth';
import { useState } from 'react';
import { SideBar } from '../../components/SideBar';

export function Home() {
  const { loading } = useAuth();
  const [click, setClick] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  function handleModal() {
    setClick(!click);
  }

  return (
    <div>
      <nav className='flex justify-between my-4 fixed inset-0 px-8 pb-2'>
        <div className='flex gap-4'>
          <HiOutlineMenu
            onClick={handleModal}
            className='cursor-pointer'
            size={40}
          />
        </div>
        <div>
          <button className='flex items-center justify-center text-amber-50 bg-[#97448F] py-2 px-8 cursor-pointer hover:bg-[#973b8e] transition duration-100 hover:scale-102 rounded-full'>
            Entrar
          </button>
        </div>
      </nav>
      <div
        onClick={handleModal}
        className={`${click ? 'block' : 'hidden'} absolute backdrop-blur-[1px] bg-black/30 w-screen h-screen`}
      ></div>
      <div
        className={`${click ? 'left-0' : '-left-full'} transition-all  duration-700 absolute inset-0 w-1/2 bg-white`}
      >
        <div className='p-5'>
          <button
            onClick={handleModal}
            className='flex items-center justify-center text-black cursor-pointer'
          >
            X
          </button>
        </div>
        <SideBar>Início</SideBar>
        <SideBar>Cardápio</SideBar>
        <SideBar>Categorias</SideBar>
        <SideBar>Sobre nós</SideBar>
        <SideBar>Contatos</SideBar>
      </div>
      <section className='w-screen h-screen'>
        <Image
          src='/images/home.webp'
          alt='Burguer House'
          className='h-1/2 w-full object-cover'
        />
      </section>
    </div>
  );
}
