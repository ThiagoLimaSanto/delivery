import { HiOutlineLocationMarker } from 'react-icons/hi';

export function HeroHome() {
  return (
    <section className='bg-[url("/images/bg.png")] bg-cover bg-center h-screen w-screen'>
      <div className='flex flex-col gap-4 justify-center items-center h-full'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold'>
          Burguer House
        </h1>
        <span className='text-white flex font-medium items-center justify-center gap-2'>
          <HiOutlineLocationMarker />
          Rua Dev Sucesso, 12, Morrinhos, GO
        </span>
        <div className='bg-green-600 px-4 py-1 mt-4 rounded-lg'>
          <span className='text-white font-medium'>
            Seg á Dom - 18:00 ás 23:00
          </span>
        </div>
      </div>
    </section>
  );
}
