import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MainTemplate } from '../../templates/MainTemplate/index.tsx';

export function Contact() {
  return (
    <MainTemplate>
      <section className='h-screen'>
        <div className='mt-30 md:mt-25 p-4 md:absolute md:top-[40%] lg:top-[30%] md:left-1/2 md:h-100 md:w-[80%] md:-translate-y-1/2 md:-translate-x-1/2'>
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold text-black mb-6 md:mb-10 xl:mb-20 text-center'>
            Entre em Contato
          </h1>
          <div className='flex justify-center items-center h-100'>
            <div className='flex flex-col w-full justify-center'>
              <p className='flex gap-2 justify-center items-center'>
                <HiOutlineLocationMarker color='red' /> - Localizção
              </p>
              <p className='flex gap-2 justify-center items-center'>
                <FaWhatsapp color='green' /> - WhatsApp
              </p>
              <p className='flex gap-2 justify-center items-center'>
                <FaInstagram className='bg-linear-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full' />{' '}
                - Instagram
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
