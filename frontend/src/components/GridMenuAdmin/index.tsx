import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { UseHandleModal } from '../../hook/useHandleModal';
import {
  useDeleteProduct,
  useMenuAdmin,
  type MenuAdmin,
} from '../../hook/useMenu';
import { Image } from '../Image';
import { Spinner } from '../Spinner';

type GridMenuAdminProps = {
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuAdmin | null>>;
};

export function GridMenuAdmin({ setSelectedItem }: GridMenuAdminProps) {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const search = searchParams.get('search');
  const params = {
    categoria: categoria || undefined,
    search: search || undefined,
  };
  const { mutate } = useDeleteProduct();
  const { data, isLoading } = useMenuAdmin(params);
  const { handleCLickPostMenu, clickPostMenu } = UseHandleModal();

  const handleDelete = (id: string) => mutate(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {data &&
        data.map(menu => (
          <div className='bg-[#1A1E26] rounded-lg overflow-hidden p-2 text-white'>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <Image
                  src={menu.image}
                  className='w-15 h-15 object-cover object-center'
                  alt={menu.name}
                />
                <div>
                  <p className='font-bold'>{menu.name}</p>
                  <p className='text-sm text-[#858a8d]'>{menu.category.name}</p>
                </div>
              </div>
              <p className='text-[#32c560] font-bold text-lg'>
                R$ {menu.price.toFixed(2)}
              </p>
            </div>
            <div className='border-b border-[#28282b] pb-4 mt-2'>
              <p className='text-[#858a8d]'>{menu.description}</p>
            </div>
            <div className='flex justify-between items-center py-4'>
              <div>
                <p className='text-sm text-[#858a8d]'>
                  {menu.available ? 'Disponível' : 'Indisponível'}
                </p>
              </div>
              <div className='flex justify-center items-center gap-4'>
                <FiEdit2
                  onClick={() => {
                    setSelectedItem(menu);
                    handleCLickPostMenu(clickPostMenu);
                  }}
                  className='cursor-pointer'
                  size={20}
                />
                <FiTrash2
                  onClick={() => handleDelete(String(menu.id))}
                  color='red'
                  className='cursor-pointer'
                  size={20}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
