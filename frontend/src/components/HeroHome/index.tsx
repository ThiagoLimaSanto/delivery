import { HiOutlineLocationMarker } from 'react-icons/hi';

export function HeroHome() {
  return (
    <div className='bg-black mt-20'>
      <section className='relative h-[calc(100vh-80px)] w-screen overflow-hidden'>
        <div className='absolute inset-0 bg-[url("/images/hamburguer.webp")] bg-cover bg-center blur-[1px]'></div>
        <div className='absolute inset-0 bg-black/40'></div>

        <div className='relative flex flex-col gap-4 justify-center items-center h-full text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold mb-2'>
            Zap Lanches
          </h1>

          <span className='text-white flex font-medium items-center justify-center gap-2'>
            <HiOutlineLocationMarker />
            R. Rio Grande do Sul, 1-85, Morrinhos - GO, 75650-000
          </span>

          <div className='bg-green-600 px-4 py-1 mt-4 rounded-lg'>
            <span className='text-white font-medium'>
              Seg á Dom - 18:00 ás 00:00
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
