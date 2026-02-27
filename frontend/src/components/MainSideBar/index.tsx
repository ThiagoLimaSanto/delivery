import type { ModalProps } from '../../types/Modal';
import { SideBar } from '../SideBar';
import { SideBarCart } from '../SideBarCart';

export function MainSideBar({
  click,
  handleModal,
  clickCarrinho,
  handleModalCarrinho,
}: ModalProps) {
  return (
    <>
      <SideBar click={click} handleModal={handleModal} />
      <SideBarCart
        clickCarrinho={clickCarrinho}
        handleModalCarrinho={handleModalCarrinho}
      />
    </>
  );
}
