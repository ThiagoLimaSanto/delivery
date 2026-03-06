import { useState } from 'react';
import { ModalContext } from './modalContext';

type ModalPrividerProps = {
  children: React.ReactNode;
};

export function ModalProvider({ children }: ModalPrividerProps) {
  const [click, setClick] = useState(false);
  const [clickCarrinho, setClickCarrinho] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModal = (click?: boolean) => {
    setClick(!click);
  };

  const handleModalCarrinho = (clickCarrinho?: boolean) => {
    setClickCarrinho(!clickCarrinho);
  };

  const handleOpen = (open?: boolean) => {
    setOpen(!open);
  };

  return (
    <ModalContext.Provider
      value={{
        handleModal,
        handleModalCarrinho,
        click,
        clickCarrinho,
        open,
        handleOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
