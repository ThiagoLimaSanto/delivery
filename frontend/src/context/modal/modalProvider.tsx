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
  const [addressClick, setAddressClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [manageAddressesCLick, setManageAddressesCLick] = useState(false);
  const [clickSideBarAdmin, setClickSideBarAdmin] = useState(false);
  const [clickPostMenu, setClickPostMenu] = useState(false);

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

  const handleAddressClick = (addressClick?: boolean) => {
    setAddressClick(!addressClick);
  };

  const handleProfileClick = (profileClick?: boolean) => {
    setProfileClick(!profileClick);
  };

  const handleManageAddressesCLick = (manageAddressesCLick?: boolean) => {
    setManageAddressesCLick(!manageAddressesCLick);
  };

  const handleClickSideBarAdmin = (clickSideBarAdmin?: boolean) => {
    setClickSideBarAdmin(!clickSideBarAdmin);
  };

  const handleCLickPostMenu = (clickPostMenu?: boolean) => {
    setClickPostMenu(!clickPostMenu);
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
        handleAddressClick,
        addressClick,
        handleProfileClick,
        profileClick,
        handleManageAddressesCLick,
        manageAddressesCLick,
        handleClickSideBarAdmin,
        clickSideBarAdmin,
        handleCLickPostMenu,
        clickPostMenu,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
