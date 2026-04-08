import { useNavigate } from 'react-router-dom';
import type { Category } from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import {
  usePostProduct,
  useUpdateProduct,
  type MenuPost,
  type MenuUpdate,
} from '../../hook/useMenu';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { FormMenu } from '../FormMenu';

type ManageMenuProps = {
  data: Category[] | undefined;
  selectedItem: MenuUpdate | null;
  title?: string;
};

export function ManageMenu({ data, selectedItem, title }: ManageMenuProps) {
  const { clickPostMenu, handleCLickPostMenu } = UseHandleModal();

  const navigate = useNavigate();
  const { mutateAsync: menu } = usePostProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const handleSubmit = async (data: MenuPost) => {
    if (selectedItem?.id) {
      await updateProduct({ id: selectedItem.id, data: data });
    } else {
      await menu(data);
    }
    handleCLickPostMenu(clickPostMenu);
    navigate('/z_admin/cardapio');
  };
  return (
    <MainModalTemplate
      title={title}
      handleClick={handleCLickPostMenu}
      click={!clickPostMenu}
    >
      <FormMenu
        title={title}
        dataCategory={data}
        handleSubmit={handleSubmit}
        data={selectedItem}
      />
    </MainModalTemplate>
  );
}
