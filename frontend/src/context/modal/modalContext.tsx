import { createContext } from 'react';

export type ModalContextType = {
  click: boolean;
  clickCarrinho: boolean;
  open: boolean;
  orderClick: boolean;
  handleOrderClick: (orderClick?: boolean) => void;
  handleModal: (click?: boolean) => void;
  handleModalCarrinho: (clickCarrinho?: boolean) => void;
  handleOpen: (open?: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
