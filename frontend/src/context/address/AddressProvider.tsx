import { type ReactNode } from 'react';
import {
  useDeleteAddres,
  useGetAllAddress,
  usePostAddress,
  useToggleDefaultAddress,
  useUpdateAddress,
  type Address,
} from '../../hook/useAddress';
import { AddressContext } from './addressContext';

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const { data: allAddresses } = useGetAllAddress();

  const { mutateAsync: updateAddress } = useUpdateAddress();
  const { mutateAsync: removeAddress } = useDeleteAddres();
  const { mutateAsync: create } = usePostAddress();
  const { mutateAsync: toggleDefault } = useToggleDefaultAddress();

  const createAddress = async (data: Address) => {
    await create(data);
  };

  const updateAddressByID = async (data: Address) => {
    await updateAddress(data);
  };

  const removeAddressById = async (addressId: string) => {
    await removeAddress(addressId);
  };

  const istoggleDefault = async (addressId: string) => {
    await toggleDefault(addressId);
  };

  const getAddressById = (id: string) => {
    return allAddresses
      ?.map(address => address)
      .find(address => address.id === id) as Address;
  };

  const getDefaultAddress = () => {
    return allAddresses?.find(address => address.isDefault) as Address;
  };

  return (
    <AddressContext.Provider
      value={{
        address: allAddresses,
        getDefaultAddress,
        createAddress,
        updateAddressByID,
        removeAddressById,
        istoggleDefault,
        getAddressById,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
