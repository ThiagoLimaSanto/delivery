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
    addressClick,
    handleAddressClick
  } = UseHandleModal();
  const isOpen = click || clickCarrinho || open || orderClick || addressClick;

  return (
    <div
      onClick={() => {
        handleModal(true);
        handleModalCarrinho(true);
        handleOpen(true);
        handleOrderClick(true);
        handleAddressClick(true);
      }}
      className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-2`}
    />
  );
}
