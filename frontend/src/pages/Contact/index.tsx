import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { MainTemplate } from '../../templates/MainTemplate/index.tsx';

export function Contact() {
  return (
    <MainTemplate>
      <section>
        <div className='mt-30 w-[90%] mx-auto'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold text-black mb-4 text-center'>
              Fale Conosco
            </h1>
            <p>
              Tem alguma dúvida, sugestão ou reclamação? Estamos aqui para você!
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
              <div>
                <h2>Informações</h2>
                <p>Visite-nos ou entre em contato pelos canais abaixo.</p>
              </div>
              <div>
                <div>
                  <h3>
                    <FiMapPin />
                    Endereço
                  </h3>
                  <p>
                    R. Rio Grande do Sul, 1-85, <br /> Morrinhos - GO, 75650-000
                  </p>
                </div>
                <div>
                  <h3>
                    <FiPhone />
                    Telefone / WhatsApp
                  </h3>
                  <p>(64) 9 9999-9999</p>
                </div>
                <div>
                  <h3>
                    <FiClock />
                    Horário de Funcionamento
                  </h3>
                  <p>Segunda a Sexta, das 8h a 18h</p>
                </div>
              </div>
              <div>
                <h4>Siga-nos</h4>
                <span>
                  <FiInstagram />
                </span>
                <span>
                  <FiFacebook />
                </span>
              </div>
            </div>
            <div className='w-full h-40 mx-auto px-4 my-10'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.1310415174307!2d-49.10507412530504!3d-17.73846367382223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a09469d09e682d%3A0x92769dbb94f22da9!2sR.%20Rio%20Grande%20do%20Sul%2C%20185%2C%20Morrinhos%20-%20GO%2C%2075650-000!5e0!3m2!1spt-BR!2sbr!4v1776279986312!5m2!1spt-BR!2sbr'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
