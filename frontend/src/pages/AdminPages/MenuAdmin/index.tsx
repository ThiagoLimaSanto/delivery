import { LuPlus, LuTag } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { FormMenu } from '../../../components/FormMenu';
import { GridMenuAdmin } from '../../../components/GridMenuAdmin';
import { SearchProduct } from '../../../components/SearchProduct';
import { Spinner } from '../../../components/Spinner';
import { useCategories } from '../../../hook/useCategories';
import { UseHandleModal } from '../../../hook/useHandleModal';
import { usePostProduct, type MenuPost } from '../../../hook/useMenu';
import { MainModalTemplate } from '../../../templates/MainModalTemplate';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export function MenuAdmin() {
  const navigate = useNavigate();
  const { mutateAsync: menu } = usePostProduct();
  const { data, isLoading } = useCategories();
  const { handleCLickPostMenu, clickPostMenu } = UseHandleModal();

  const handleSubmit = async (data: MenuPost) => {
    menu(data);
    navigate('/admin/menu');
  };

  if (isLoading) return <Spinner />;
  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='sm:flex sm:justify-between sm:items-center'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Cardápio
          </h1>
          <div className='flex gap-4 mt-4'>
            <button className='text-white bg-orange-400 flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
              <LuTag />
              Categorias
            </button>
            <button
              onClick={() => handleCLickPostMenu(clickPostMenu)}
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
            <GridMenuAdmin />
          </div>
        </div>
      </div>
      <MainModalTemplate click={!clickPostMenu}>
        <FormMenu title={'Adicionar'} data={data} handleSubmit={handleSubmit} />
      </MainModalTemplate>
    </MainTemplateAdmin>
  );
}
