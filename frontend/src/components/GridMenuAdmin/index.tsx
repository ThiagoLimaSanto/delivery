import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { UseHandleModal } from '../../hook/useHandleModal';
import {
  useChangeAvailableProduct,
  useDeleteProduct,
  useMenuAdmin,
  type MenuUpdate,
} from '../../hook/useMenu';
import { Image } from '../Image';
import { Spinner } from '../Spinner';

type GridMenuAdminProps = {
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuUpdate | null>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export function GridMenuAdmin({
  setSelectedItem,
  setTitle,
}: GridMenuAdminProps) {
  const { mutateAsync: changeAvailableProduct } = useChangeAvailableProduct();
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

  const handleChangeAvailable = (id: string) => changeAvailableProduct(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {data &&
        data.map(menu => (
          <div
            className={`bg-[#1A1E26] ${menu.available ? '' : 'opacity-50'} rounded-lg overflow-hidden p-2 text-white flex flex-col justify-between`}
          >
            <div className='pb-4'>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <Image
                    src={menu.image}
                    className='w-15 h-15 object-cover object-center'
                    alt={menu.name}
                  />
                  <div>
                    <p className='font-bold'>{menu.name}</p>
                    <p className='text-sm text-[#858a8d]'>
                      {menu.category.name}
                    </p>
                  </div>
                </div>
                <p className='text-[#32c560] font-bold text-lg'>
                  R$ {menu.price.toFixed(2)}
                </p>
              </div>
              <div className='mt-2'>
                <p className='text-[#858a8d]'>{menu.description}</p>
              </div>
            </div>
            <div className='flex justify-between items-center py-4 border-t border-[#28282b]'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => handleChangeAvailable(menu.id)}
                  className='bg-[#32c560] rounded-full w-12 h-6 cursor-pointer flex items-center'
                >
                  <span
                    className={`bg-black rounded-full w-5 h-5 inline-block transition-transform duration-300 ease-in-out ${menu.available ? ' translate-x-6' : ' translate-x-1'}`}
                  ></span>
                </button>
                <p className='text-sm text-[#858a8d]'>
                  {menu.available ? 'Disponível' : 'Indisponível'}
                </p>
              </div>
              <div className='flex justify-center items-center gap-4'>
                <FiEdit2
                  onClick={() => {
                    setTitle('Editar');
                    setSelectedItem({
                      id: menu.id,
                      name: menu.name,
                      description: menu.description,
                      price: menu.price,
                      image: menu.image,
                      categoryId: menu.category.id,
                    });
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
