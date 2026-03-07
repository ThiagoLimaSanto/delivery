import { useRef, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { Image } from '../../components/Image/index.tsx';
import { Order } from '../../components/Order/index.tsx';
import { Spinner } from '../../components/Spinner/index.tsx';
import { UseHandleModal } from '../../hook/useHandleModal.tsx';
import { useHandleOrder } from '../../hook/useHandleOrder.tsx';
import { useMenu } from '../../hook/useMenu.tsx';
import { MenuTemplate } from '../../templates/MenuTemplate/index.tsx';
import type { ProductType } from '../../types/Product.ts';

export function Menu() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const comment = useRef<HTMLTextAreaElement | null>(null);
  const { order } = useHandleOrder();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
  });
  const { data, isLoading } = useMenu(categoria);
  const { orderClick, handleOrderClick } = UseHandleModal();

  if (isLoading) {
    return <Spinner />;
  }

  console.log(order);

  return (
    <MenuTemplate title={categoria || 'Menu'}>
      <Order comment={comment} selectedProduct={selectedProduct} />
      {data &&
        data.map(menu => (
          <div
            key={menu.id}
            className='flex flex-col gap-2 bg-white rounded-md transition duration-300 ease-in-out lg:hover:scale-105'
          >
            <div className='h-1/2 w-full'>
              <Image
                src={menu.image}
                alt={menu.name}
                className='w-full h-full object-center object-cover rounded-md rounded-b-none'
              />
            </div>
            <div className='h-1/2 p-4 flex flex-col justify-between'>
              <div>
                <p className='font-bold text-[20px] text-[#333] mb-4'>
                  {menu.name}
                </p>
                <p className='text-[14px]'>{menu.description}</p>
              </div>
              <div className='flex flex-col items-center justify-between gap-2'>
                <strong className='font-bold text-[22px] w-full'>
                  R$ {menu.price.toFixed(2)}
                </strong>
                <button
                  onClick={() => {
                    handleOrderClick(orderClick);
                    setSelectedProduct({ ...menu, id: String(menu.id) });
                  }}
                  className='flex items-center justify-center gap-1 bg-green-600 rounded-lg py-3 cursor-pointer w-full hover:bg-green-700 transition-colors duration-300'
                >
                  <MdShoppingCart className='text-lg text-white' size={20} />{' '}
                  <span className='text-white font-bold text-lg'>Pedir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </MenuTemplate>
  );
}
