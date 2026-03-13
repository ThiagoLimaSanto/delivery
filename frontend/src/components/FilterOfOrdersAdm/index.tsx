import { NotificationDot } from '../NotificationDot';

type FilterOfOrdersAdmProps = {
  handleFilter: (filtro: string) => void;
  namefilter: React.ReactNode;
  filter: string;
  notification?: boolean;
};

export function FilterOfOrdersAdm({
  handleFilter,
  namefilter,
  filter,
  notification = false,
}: FilterOfOrdersAdmProps) {
  return (
    <p
      onClick={() => handleFilter(String(namefilter))}
      className={`cursor-pointer px-3 py-1 flex ${filter === namefilter ? 'text-white bg-[#111217] rounded-lg' : ''}`}
    >
      {namefilter} {notification && <NotificationDot />}
    </p>
  );
}
