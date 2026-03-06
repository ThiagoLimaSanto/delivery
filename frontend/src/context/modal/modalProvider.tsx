import { useState } from 'react';
import { ModalContext } from './modalContext';

type ModalPrividerProps = {
  children: React.ReactNode;
};

export function ModalProvider({ children }: ModalPrividerProps) {
  const [click, setClick] = useState(false);
  const [clickCarrinho, setClickCarrinho] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderClick, setOrderClick] = useState(false);
  const handleModal = (click?: boolean) => {
    setClick(!click);
  };

  const handleModalCarrinho = (clickCarrinho?: boolean) => {
    setClickCarrinho(!clickCarrinho);
  };

  const handleOpen = (open?: boolean) => {
    setOpen(!open);
  };

  const handleOrderClick = (orderClick?: boolean) => {
    setOrderClick(!orderClick);
  };

  return (
    <ModalContext.Provider
      value={{
        handleModal,
        handleModalCarrinho,
        click,
        clickCarrinho,
        open,
        orderClick,
        handleOrderClick,
        handleOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
