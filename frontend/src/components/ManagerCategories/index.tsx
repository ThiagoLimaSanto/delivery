import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  useCategories,
  useDeleteCategory,
  usePostCategory,
  useUpdateCategory,
  type Category,
} from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { FormCategories } from '../FormCategories';
import { Spinner } from '../Spinner';

export function ManagerCategories() {
  const navigate = useNavigate();
  const { handleCLickPostMenu, clickPostMenu } = UseHandleModal();
  const [title, setTitle] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Category | undefined>(
    undefined,
  );
  const { manageCategoriesCLick, handleManageCategoriesCLick } =
    UseHandleModal();
  const { data, isLoading } = useCategories();
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: create } = usePostCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const handleSubmit = async (data: Category) => {
    if (selectedItem) {
      await updateCategory(data);
    } else {
      await create(data);
    }

    setSelectedItem(undefined);
    handleCLickPostMenu(clickPostMenu);
    navigate('/z_admin/cardapio');
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <MainModalTemplate
      title='Categorias'
      handleClick={handleManageCategoriesCLick}
      click={!manageCategoriesCLick}
    >
      <div className='flex flex-col gap-4 mb-4'>
        {data &&
          data.map(data => (
            <div key={data.id} className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <FiEdit2
                  onClick={() => {
                    setTitle('Editar');
                    setSelectedItem(data);
                  }}
                  size={20}
                  className='cursor-pointer hover:text-blue-600 transition-colors duration-100'
                />
                <FiTrash2
                  onClick={() => deleteCategory(data.id)}
                  size={20}
                  className='cursor-pointer hover:text-red-600 transition-colors duration-100'
                />
              </div>
              <div
                className={`border border-[#ccc] p-3 rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-100 flex-1 mb-4`}
              >
                <p>{data.name}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          setTitle('Adicionar');
        }}
        className=' transition-colors duration-300 bg-green-600 hover:bg-green-700 py-2 px-3 w-1/3 rounded-lg cursor-pointer text-white font-bold'
      >
        Nova Categoria
      </button>
      <FormCategories
        data={selectedItem}
        handleSubmit={handleSubmit}
        title={title}
      />
    </MainModalTemplate>
  );
}
