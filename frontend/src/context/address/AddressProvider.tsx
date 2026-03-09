import { useMemo, type ReactNode } from 'react';
import {
  useDeleteAddres,
  useGetAllAddress,
  useUpdateAddress,
} from '../../hook/useAddress';
import { AddressContext } from './addressContext';

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const { data: allAddresses } = useGetAllAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const { mutateAsync: removeAddress } = useDeleteAddres();

  const contextValue = useMemo(() => {
    const updateAddressByID = async (addressId: string) => {
      await updateAddress(addressId);
    };

    const removeAddressById = async (addressId: string) => {
      await removeAddress(addressId);
    };

    const getAddressById = (id: string) => allAddresses?.find(a => a.id === id);

    return {
      address: allAddresses ?? [],
      updateAddressByID,
      removeAddressById,
      getAddressById,
    };
  }, [allAddresses, updateAddress, removeAddress]);

  return (
    <AddressContext.Provider value={contextValue}>
      {children}
    </AddressContext.Provider>
  );
}
