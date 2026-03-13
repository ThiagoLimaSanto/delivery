import { LuPlus, LuSearch, LuTag } from 'react-icons/lu';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';
import { Image } from '../../../components/Image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export function MenuAdmin() {
  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='sm:flex sm:justify-between sm:items-center'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Cardápio
          </h1>
          <div className='flex gap-4 mt-4'>
            <button className='text-white bg-orange-400 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
              <LuTag />
              Categorias
            </button>
            <button className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
              <LuPlus />
              Novo Item
            </button>
          </div>
        </div>
        <div className='flex gap-4 mt-8 lg:max-w-5xl'>
          <div className='flex justify-center text-[#ccc] p-2 items-center gap-2 border border-[#3b3b3b] rounded-lg w-1/2'>
            <LuSearch />
            <input
              className='outline-none w-full'
              type='text'
              placeholder={'Buscar item...'}
            />
          </div>
          <button className='text-[#ccc] border border-[#3b3b3b] flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
            Todas Categorias
          </button>
        </div>
        <div className='mt-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1550547660-d9450f859349'
                    }
                    className='w-15 h-15 object-cover object-center'
                    alt={'hamburguer'}
                  />
                  <div>
                    <p className='font-bold'>Smash Burguer</p>
                    <p className='text-sm text-[#858a8d]'>Burguers</p>
                  </div>
                </div>
                <p className='text-[#32c560] font-bold text-lg'>R$ 15,90</p>
              </div>
              <div className='border-b border-[#28282b] pb-4 mt-2'>
                <p className='text-[#858a8d]'>
                  Pão brioche, 2x carne 90g, cheddar, cebola caramelizada
                </p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <div>
                  <p className='text-sm text-[#858a8d]'>Disponível</p>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <FiEdit2 className='cursor-pointer' size={20} />
                  <FiTrash2 color='red' className='cursor-pointer' size={20} />
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1550547660-d9450f859349'
                    }
                    className='w-15 h-15 object-cover object-center'
                    alt={'hamburguer'}
                  />
                  <div>
                    <p className='font-bold'>Smash Burguer</p>
                    <p className='text-sm text-[#858a8d]'>Burguers</p>
                  </div>
                </div>
                <p className='text-[#32c560] font-bold text-lg'>R$ 15,90</p>
              </div>
              <div className='border-b border-[#28282b] pb-4 mt-2'>
                <p className='text-[#858a8d]'>
                  Pão brioche, 2x carne 90g, cheddar, cebola caramelizada
                </p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <div>
                  <p className='text-sm text-[#858a8d]'>Disponível</p>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <FiEdit2 className='cursor-pointer' size={20} />
                  <FiTrash2 color='red' className='cursor-pointer' size={20} />
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1550547660-d9450f859349'
                    }
                    className='w-15 h-15 object-cover object-center'
                    alt={'hamburguer'}
                  />
                  <div>
                    <p className='font-bold'>Smash Burguer</p>
                    <p className='text-sm text-[#858a8d]'>Burguers</p>
                  </div>
                </div>
                <p className='text-[#32c560] font-bold text-lg'>R$ 15,90</p>
              </div>
              <div className='border-b border-[#28282b] pb-4 mt-2'>
                <p className='text-[#858a8d]'>
                  Pão brioche, 2x carne 90g, cheddar, cebola caramelizada
                </p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <div>
                  <p className='text-sm text-[#858a8d]'>Disponível</p>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <FiEdit2 className='cursor-pointer' size={20} />
                  <FiTrash2 color='red' className='cursor-pointer' size={20} />
                </div>
              </div>
            </div>
            <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1550547660-d9450f859349'
                    }
                    className='w-15 h-15 object-cover object-center'
                    alt={'hamburguer'}
                  />
                  <div>
                    <p className='font-bold'>Smash Burguer</p>
                    <p className='text-sm text-[#858a8d]'>Burguers</p>
                  </div>
                </div>
                <p className='text-[#32c560] font-bold text-lg'>R$ 15,90</p>
              </div>
              <div className='border-b border-[#28282b] pb-4 mt-2'>
                <p className='text-[#858a8d]'>
                  Pão brioche, 2x carne 90g, cheddar, cebola caramelizada
                </p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <div>
                  <p className='text-sm text-[#858a8d]'>Disponível</p>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <FiEdit2 className='cursor-pointer' size={20} />
                  <FiTrash2 color='red' className='cursor-pointer' size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplateAdmin>
  );
}
