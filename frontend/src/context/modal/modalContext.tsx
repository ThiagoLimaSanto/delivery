import { createContext } from 'react';

export type ModalContextType = {
  click: boolean;
  clickCarrinho: boolean;
  open: boolean;
  orderClick: boolean;
  addressClick: boolean;
  profileClick: boolean;
  manageAddressesCLick: boolean;
  clickSideBarAdmin: boolean;
  handleClickSideBarAdmin: (clickSideBarAdmin?: boolean) => void;
  handleManageAddressesCLick: (manageAddressesCLick?: boolean) => void;
  handleProfileClick: (profileClick?: boolean) => void;
  handleAddressClick: (addressClick?: boolean) => void;
  handleOrderClick: (orderClick?: boolean) => void;
  handleModal: (click?: boolean) => void;
  handleModalCarrinho: (clickCarrinho?: boolean) => void;
  handleOpen: (open?: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
