import { useNavigate } from 'react-router-dom';
import type { Category } from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import {
  usePostProduct,
  useUpdateProduct,
  type MenuPostPayload,
  type MenuUpdate,
} from '../../hook/useMenu';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { FormMenu } from '../FormMenu';

type ManageMenuProps = {
  data: Category[] | undefined;
  selectedItem: MenuUpdate | null;
  title?: string;
  setSelectedItem: (item: MenuUpdate | null) => void;
};

export function ManageMenu({
  data,
  selectedItem,
  title,
  setSelectedItem,
}: ManageMenuProps) {
  const { clickPostMenu, handleCLickPostMenu } = UseHandleModal();

  const navigate = useNavigate();
  const { mutateAsync: menu } = usePostProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const handleSubmit = async (data: MenuPostPayload) => {
    if (selectedItem?.id) {
      await updateProduct({ id: selectedItem.id, data: data });
    } else {
      await menu(data);
    }
    setSelectedItem(null);
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
        key={String(clickPostMenu)}
        title={title}
        dataCategory={data}
        handleSubmit={handleSubmit}
        data={selectedItem}
      />
    </MainModalTemplate>
  );
}
