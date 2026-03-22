import { FiCheck, FiClock, FiPackage, FiTruck, FiX } from 'react-icons/fi';
import { GiChefToque } from 'react-icons/gi';
import type {
  OrderWithUserAndItems,
  PaginatedResponse,
} from '../../hook/useOrder';
import { ItemGridOrder } from '../ItemGridOrder';

type StatusConfig = {
  buttonIcons?: React.ElementType;
  colorText: string;
  colorBg: string;
  icon: React.ElementType;
  buttonText?: string;
};

type GridOrdersProps = {
  data: PaginatedResponse<OrderWithUserAndItems>;
};

const statusConfig: Record<string, StatusConfig> = {
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

export function GridOrders({ data }: GridOrdersProps) {
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data.data.map(order => {
          const config = statusConfig[order.status];
          return (
            <ItemGridOrder
              key={order.id}
              total={order.total}
              order={order}
              payment='Pix'
              status={config.buttonText}
              IconsStatus={config.icon}
              ButtonIcons={config.buttonIcons}
              colorTextStatus={config.colorText}
              colorBgStatus={config.colorBg}
              buttonText={config.buttonText}
              declineButton={order.status === 'PENDENTE'}
            />
          );
        })}
      </div>
    </div>
  );
}
