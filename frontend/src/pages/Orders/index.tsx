import { Image } from '../../components/Image';
import { MainTemplate } from '../../templates/MainTemplate';

export function Orders() {
  return (
    <MainTemplate>
      <section className='mt-30 h-calc(100vh-80px) w-screen z-2'>
        <div className='w-[90%] lg:max-w-7xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-semibold text-black mb-6 md:mb-10 xl:mb-20'>
              Meus Pedidos
            </h1>
            <p className='text-2xl text-black'>Histórico</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 mb-16 md:gap-10 bg-[#F2F2F2]'>
            <div>
              <p className='mb-2'>Data: {'01/01/2023'}</p>
              <div className='flex flex-col gap-2 bg-white rounded-md'>
                <div className='flex gap-4 min-h-0 max-h-80 p-4'>
                  <div className='w-25 h-25'>
                    <Image
                      src={
                        'https://images.unsplash.com/photo-1550547660-d9450f859349'
                      }
                      className='w-full h-full object-cover object-center'
                      alt={'hamburguer'}
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                      <p>{'Nome do produto'}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                      <p>(Quantidade: {1})</p>
                    </div>
                    <p>R$ {'R$ 99,99'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
