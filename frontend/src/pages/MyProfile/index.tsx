import { FiUser } from 'react-icons/fi';
import { AccountProfile } from '../../components/AccountProfile';
import { AddressProfile } from '../../components/AddressProfile';
import { PessoalInfoProfile } from '../../components/PessoaInfoProfile';
import { MainTemplate } from '../../templates/MainTemplate';

export function MyProfile() {
  return (
    <MainTemplate>
      <div className='m-32 mx-auto max-w-5xl'>
        <div className='px-4 flex gap-4 items-center mb-4'>
          <div className='bg-[#d3e1f7] rounded-full p-2 lg:p-4'>
            <FiUser color='#3B82F6' size={35} />
          </div>
          <div>
            <h1 className='text-xl font-bold lg:text-2xl'>Matheus Silva</h1>
            <p className='text-sm'>Membro desde janeiro de 2026</p>
          </div>
        </div>
        <div className='p-4 grid gap-8 grid-cols-1 lg:grid-cols-2'>
          <AccountProfile />
          <div className='flex flex-col gap-8'>
            <PessoalInfoProfile />
            <AddressProfile />
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
