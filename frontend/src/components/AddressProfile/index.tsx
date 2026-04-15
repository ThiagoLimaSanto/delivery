import { FiEdit2, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import { LayoutTemplateProfile } from '../../templates/LayoutTemplateProfile';

export function AddressProfile() {
  return (
    <LayoutTemplateProfile>
      <div className='flex justify-between mb-4'>
        <h2 className='font-semibold text-xl'>Meus Endereços</h2>
        <button className='flex gap-2 items-center justify-center bg-[#3B82F6] text-white p-2 rounded-lg text-sm cursor-pointer hover:brightness-110 transition duration-100'>
          <FiPlus />
          Adicionar
        </button>
      </div>
      <div>
        <div className='flex justify-between items-center p-4 border border-[#3B82F6] bg-[#d3e1f7] rounded-lg cursor-pointer'>
          <div className='flex gap-2 items-center'>
            <FiMapPin color='#3B82F6' size={25} />
            <p className='text-sm'>Rua dos Bobos, 0, Jardim america - Morrinhos, GO</p>
          </div>
          <div className='flex items-center gap-4'>
            <button className='cursor-pointer hover:text-[#3B82F6]'>
              <FiEdit2 />
            </button>
            <button className='cursor-pointer hover:text-red-600'>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </LayoutTemplateProfile>
  );
}
