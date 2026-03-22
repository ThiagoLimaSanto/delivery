import type { FilterType } from '../../pages/AdminPages/OrdersAdmin';
import { NotificationDot } from '../NotificationDot';

type FilterOfOrdersAdmProps = {
  handleFilter: (filtro: FilterType) => void;
  namefilter: FilterType;
  filter: FilterType;
  notification?: boolean;
  handleStatus: (status: FilterType) => void;
};

export function FilterOfOrdersAdm({
  handleStatus,
  handleFilter,
  namefilter,
  filter,
  notification = false,
}: FilterOfOrdersAdmProps) {
  return (
    <div
      onClick={() => {
        handleFilter(namefilter);
        handleStatus(namefilter);
      }}
      className={`cursor-pointer px-3 py-1 flex ${
        filter === namefilter
          ? 'text-white bg-[#111217] rounded-lg'
          : ''
      }`}
    >
      {namefilter} {notification && <NotificationDot />}
    </div>
  );
}