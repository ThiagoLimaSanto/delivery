import { MdShoppingCart } from 'react-icons/md';
import { Image } from '../Image';

export function Menu() {
  return (
    <main>
      <h2 className='text-center mt-8 mb-15 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold'>
        Conheça o nosso Cardápio
      </h2>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 px-4 mb-16 md:gap-10'>
        <div className='flex flex-col  gap-2 bg-white rounded-md'>
          <div className='h-1/2 w-full'>
            <Image
              src='/images/hamb-2.png'
              alt='Smash'
              className='w-full h-full object-center object-cover rounded-md rounded-b-none'
            />
          </div>
          <div className='h-1/2 p-4 flex flex-col justify-between'>
            <div>
              <p className='font-bold text-[20px] text-[#333] mb-4'>
                Hamburguer Smash
              </p>
              <p className='text-[14px]'>
                Pão levinho de fermentalção natural da Trigou, burguer 160g,
                queijo prato e maionese da casa. queijo prato e maionese da
                casa.
              </p>
            </div>
            <div className='flex flex-col items-center justify-between gap-2'>
              <strong className='font-bold text-[22px] w-full'>R$ 18,90</strong>
              <button className='flex items-center justify-center gap-1 bg-green-700 rounded-lg py-3 cursor-pointer w-full hover:bg-green-600 transition-colors duration-300'>
                <MdShoppingCart className='text-lg text-white' size={20} />{' '}
                <span className='text-white font-bold text-lg'>Pedir</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
