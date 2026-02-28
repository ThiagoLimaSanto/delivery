import type { ModalProps } from '../../types/Modal';

export function ModalOverlay({
  click = true,
  handleModal,
  clickCarrinho = true,
}: ModalProps) {
  const isOpen = click || clickCarrinho;

  return (
    <div
      onClick={handleModal}
      className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-2`}
    />
  );
}
