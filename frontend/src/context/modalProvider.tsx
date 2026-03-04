import { useState } from 'react';
import { ModalContext } from './modalContext';

type ModalPrividerProps = {
    children: React.ReactNode;
}

export function ModalProvider({ children }: ModalPrividerProps) {
  const [click, setClick] = useState(false);
  const [clickCarrinho, setClickCarrinho] = useState(false);
  const handleModal = (click?: boolean) => {
    setClick(!click);
  };

  const handleModalCarrinho = (clickCarrinho?: boolean) => {
    setClickCarrinho(!clickCarrinho);
  };

  return (
    <ModalContext.Provider
      value={{ handleModal, handleModalCarrinho, click, clickCarrinho }}
    >
      {children}
    </ModalContext.Provider>
  );
}
