import { UseHandleModal } from '../../hook/useHandleModal';

export function ModalOverlay() {
  const { click, clickCarrinho, handleModal, handleModalCarrinho } =
    UseHandleModal();
  const isOpen = click || clickCarrinho;

  return (
    <div
      onClick={() => {
        handleModal(true);
        handleModalCarrinho(true);
      }}
      className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-2`}
    />
  );
}
