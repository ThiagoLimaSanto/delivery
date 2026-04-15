import { useState } from 'react';
import { FiLogIn, FiMapPin, FiUser, FiEdit2 } from 'react-icons/fi';
import { MenuItemProfile } from '../MenuItemProfile';
import { LayoutTemplateProfile } from '../../templates/LayoutTemplateProfile';

export function AccountProfile() {
  const [open, setOpen] = useState('meus-dados');
  return (
    <LayoutTemplateProfile className='max-h-50!'>
      <MenuItemProfile
        value='meus-dados'
        active={open}
        onClick={() => setOpen('meus-dados')}
        Icon={FiUser}
      >
        Meus Dados
      </MenuItemProfile>
      <MenuItemProfile
        value='editar-dados'
        active={open}
        onClick={() => setOpen('editar-dados')}
        Icon={FiEdit2}
      >
        Editar Dados
      </MenuItemProfile>
      <MenuItemProfile
        value='enderecos'
        active={open}
        onClick={() => setOpen('enderecos')}
        Icon={FiMapPin}
      >
        Endereços
      </MenuItemProfile>
      <MenuItemProfile
        value='sair'
        active={open}
        Icon={FiLogIn}
        className='text-red-600! hover:bg-red-100!'
        colorIcon='text-red-600!'
      >
        Sair
      </MenuItemProfile>
    </LayoutTemplateProfile>
  );
}
