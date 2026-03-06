import { UseHandleModal } from '../../hook/useHandleModal';

export function ModalOverlay() {
  const {
    click,
    clickCarrinho,
    handleModal,
    handleModalCarrinho,
    open,
    handleOpen,
    orderClick,
    handleOrderClick,
  } = UseHandleModal();
  const isOpen = click || clickCarrinho || open || orderClick;

  return (
    <div
      onClick={() => {
        handleModal(true);
        handleModalCarrinho(true);
        handleOpen(true);
        handleOrderClick(true);
      }}
      className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-2`}
    />
  );
}
