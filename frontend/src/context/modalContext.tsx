import { createContext } from 'react';

export type ModalContextType = {
  click: boolean;
  clickCarrinho: boolean;
  handleModal: (click?: boolean) => void;
  handleModalCarrinho: (clickCarrinho?: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
