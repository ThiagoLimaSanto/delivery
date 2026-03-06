import { createContext } from 'react';

export type ModalContextType = {
  click: boolean;
  clickCarrinho: boolean;
  handleModal: (click?: boolean) => void;
  handleModalCarrinho: (clickCarrinho?: boolean) => void;
  handleOpen: (open?: boolean) => void;
  open: boolean;
};

export const ModalContext = createContext<ModalContextType | null>(null);
