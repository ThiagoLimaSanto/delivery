import { FiEdit2, FiUser } from 'react-icons/fi';
import { LayoutTemplateProfile } from '../../templates/LayoutTemplateProfile';
import { FiMail, FiPhone} from 'react-icons/fi';

export function PessoalInfoProfile() {
  return (
    <LayoutTemplateProfile>
      <div className='flex justify-between mb-4'>
        <h2 className='font-semibold text-xl'>Informaçoes Pessoais</h2>
        <button className='flex gap-2 items-center justify-center bg-[#3B82F6] text-white p-2 rounded-lg text-sm cursor-pointer hover:brightness-110 transition duration-100'>
          <FiEdit2 />
          Editar
        </button>
      </div>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
        <div className='flex items-center gap-2 bg-white p-4 rounded-lg'>
          <FiUser color='#000' />
          <p className='text-sm font-semibold'>
            Nome: <span className='font-medium text-md'>Matheus Silva</span>
          </p>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 rounded-lg'>
          <FiMail color='#000' />
          <p className='text-sm font-semibold'>
            Email:{' '}
            <span className='font-medium text-md'>matheus@example.com</span>
          </p>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 rounded-lg'>
          <FiPhone color='#000' />
          <p className='text-sm font-semibold'>
            Telefone:{' '}
            <span className='font-medium text-md'>(11) 99999-9999</span>
          </p>
        </div>
      </div>
    </LayoutTemplateProfile>
  );
}
