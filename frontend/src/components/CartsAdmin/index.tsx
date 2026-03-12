import { CartsTemplate } from '../../templates/CartsTemplate';

type CartsAdminProps = {
  title: string;
  value: string;
  Icon: React.ElementType;
  color: string;
};

export function CartsAdmin({ title, value, Icon, color }: CartsAdminProps) {
  return (
    <CartsTemplate>
      <Icon color={color} size={25} className='mb-2' />
      <span className='text-white text-2xl'>{value}</span>
      <p className='text-[#858a8d] text-md'>{title}</p>
    </CartsTemplate>
  );
}
