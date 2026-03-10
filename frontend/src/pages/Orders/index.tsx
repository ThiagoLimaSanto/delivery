import { Image } from '../../components/Image';
import { MainTemplate } from '../../templates/MainTemplate';

export function Orders() {
  return (
    <MainTemplate>
      <section className='mt-30 h-screen w-screen z-2'>
        <div className='w-[90%] lg:max-w-7xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-semibold text-black mb-6 md:mb-10 xl:mb-20'>
              Meus Pedidos
            </h1>
            <p className='text-2xl text-black'>Histórico</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 px-4 mb-16 md:gap-10 bg-[#F2F2F2]'>
            <div className='flex gap-2 bg-white rounded-md'>
              <div>
                <Image
                  src='https://images.unsplash.com/photo-1550547660-d9450f859349'
                  alt='Smash'
                  className='w-20 h-20 object-center object-cover rounded-md rounded-br-none rounded-tr-none'
                />
              </div>
              <div>
                <p>Nome do Produto</p>
                <p>Quantidade</p>
                <p>Valor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
