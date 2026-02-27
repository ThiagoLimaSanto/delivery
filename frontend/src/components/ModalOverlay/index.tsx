import type { ModalProps } from '../../types/Modal';

export function ModalOverlay({
  click = true,
  handleModal,
  clickCarrinho = true,
  className,
}: ModalProps) {
  return (
    <div
      onClick={handleModal}
      className={`${click || clickCarrinho ? 'block' : 'hidden'} absolute backdrop-blur-[1px] bg-black/30 ${className}`}
    ></div>
  );
}
