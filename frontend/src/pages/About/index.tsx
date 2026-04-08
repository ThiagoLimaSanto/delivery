import { Image } from '../../components/Image/index.tsx';
import { MainTemplate } from '../../templates/MainTemplate/index.tsx';

export function About() {
  return (
    <MainTemplate>
      <section>
        <div className='mt-30 w-[90%] mx-auto'>
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold text-black mb-6 md:mb-10 xl:mb-20 text-center'>
            Sobre Nós
          </h1>
          <div className='flex flex-col gap-8 md:flex-row'>
            <div className='md:w-1/2 '>
              <Image
                src='https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=500&fit=crop'
                alt='Sobre Nos'
                className='w-full h-full object-center object-cover'
              />
            </div>
            <div className='flex flex-col w-full justify-center'>
              <p className='text-[#858a8d] mb-3'>
                Desde 2025, o Rei da Chapa nasceu da paixão por hambúrgueres
                artesanais. Nosso segredo? Ingredientes selecionados e muito
                amor em cada preparo.
              </p>
              <p className='text-[#858a8d]'>
                <span className='text-[#6C757D] font-bold'>Carne Fresca</span> -
                100% bovina selecionada <br />
                <span className='text-[#6C757D] font-bold'>
                  Entrega Rápida
                </span>{' '}
                - Máximo 40 minutos <br />
                <span className='text-[#6C757D] font-bold'>
                  Pagamento Fácil
                </span>{' '}
                - PIX, cartão ou dinheiro <br />
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
