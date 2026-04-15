import { useState } from 'react';
import { FiEdit2, FiLogIn, FiMapPin, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hook/useAuth';
import { LayoutTemplateProfile } from '../../templates/LayoutTemplateProfile';
import { MenuItemProfile } from '../MenuItemProfile';

export function AccountProfile() {
  const { logout } = useAuth();
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
        onClick={logout}
      >
        Sair
      </MenuItemProfile>
    </LayoutTemplateProfile>
  );
}
