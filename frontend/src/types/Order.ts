import { FiCheck, FiClock, FiPackage, FiTruck, FiX } from 'react-icons/fi';
import { GiChefToque } from 'react-icons/gi';

export type StatusConfig = {
  buttonIcons?: React.ElementType;
  colorText: string;
  colorBg: string;
  icon: React.ElementType;
  buttonText?: string;
};

export const statusConfig: Record<string, StatusConfig> = {
  PENDENTE: {
    colorText: 'text-[#32c560]',
    colorBg: 'bg-[#204532]',
    icon: FiClock,
    buttonText: 'Aceitar',
    buttonIcons: FiCheck,
  },
  PREPARANDO: {
    colorText: 'text-yellow-400',
    colorBg: 'bg-yellow-900',
    icon: GiChefToque,
    buttonIcons: FiPackage,
    buttonText: 'Despachar',
  },
  SAIU_PARA_ENTREGA: {
    colorText: 'text-blue-400',
    colorBg: 'bg-blue-900',
    icon: FiTruck,
    buttonText: 'Saiu para entrega',
  },
  CANCELADO: {
    colorText: 'text-red-400',
    colorBg: 'bg-red-900',
    icon: FiX,
    buttonText: 'Cancelado',
  },
};
