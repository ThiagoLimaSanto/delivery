import { useState } from 'react';
import { LuPlus, LuTag } from 'react-icons/lu';
import { GridMenuAdmin } from '../../../components/GridMenuAdmin';
import { ManageMenu } from '../../../components/ManageMenu';
import { ManagerCategories } from '../../../components/ManagerCategories';
import { SearchProduct } from '../../../components/SearchProduct';
import { Spinner } from '../../../components/Spinner';
import { useCategories } from '../../../hook/useCategories';
import { UseHandleModal } from '../../../hook/useHandleModal';
import { type MenuUpdate } from '../../../hook/useMenu';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export function MenuAdmin() {
  const { data, isLoading } = useCategories();
  const {
    handleCLickPostMenu,
    clickPostMenu,
    manageCategoriesCLick,
    handleManageCategoriesCLick,
  } = UseHandleModal();
  const [selectedItem, setSelectedItem] = useState<MenuUpdate | null>(null);
  const [title, setTitle] = useState<string>('');

  if (isLoading) return <Spinner />;
  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='sm:flex sm:justify-between sm:items-center'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Cardápio
          </h1>
          <div className='flex gap-4 mt-4'>
            <button
              onClick={() => handleManageCategoriesCLick(manageCategoriesCLick)}
              className='text-white bg-orange-400 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'
            >
              <LuTag />
              Categorias
            </button>
            <button
              onClick={() => {
                setTitle('Novo Produto');
                setSelectedItem(null);
                handleCLickPostMenu(clickPostMenu);
              }}
              className='text-white bg-green-600 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'
            >
              <LuPlus />
              Novo Item
            </button>
          </div>
        </div>
        <SearchProduct />
        <div className='mt-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <GridMenuAdmin
              setTitle={setTitle}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
      </div>
      <ManagerCategories />
      <ManageMenu data={data} selectedItem={selectedItem} title={title} />
    </MainTemplateAdmin>
  );
}
