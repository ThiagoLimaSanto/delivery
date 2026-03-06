import { UseHandleModal } from '../../hook/useHandleModal';

export function ModalOverlay() {
  const {
    click,
    clickCarrinho,
    handleModal,
    handleModalCarrinho,
    open,
    handleOpen,
  } = UseHandleModal();
  const isOpen = click || clickCarrinho || open;

  return (
    <div
      onClick={() => {
        handleModal(true);
        handleModalCarrinho(true);
        handleOpen(true);
      }}
      className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-2`}
    />
  );
}
