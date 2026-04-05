import type {
  OrderWithUserAndItems,
  PaginatedResponse,
} from '../../hook/useOrder';
import { ItemGridOrder } from '../ItemGridOrder';
import { statusConfig } from '../../types/Order';

type GridOrdersProps = {
  data: PaginatedResponse<OrderWithUserAndItems>;
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
              payment={order.typePayment}
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
