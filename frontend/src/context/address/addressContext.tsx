import { createContext } from 'react';
import type { Address } from '../../hook/useAddress';

export type AddressContextType = {
  address: Address[] | undefined;

  createAddress: (data: Address) => Promise<void>;

  updateAddressByID: (data: Address) => Promise<void>;

  removeAddressById: (addressId: string) => Promise<void>;

  istoggleDefault: (addressId: string) => Promise<void>;

  getAddressById: (id: string) => Address | undefined;

  getDefaultAddress: () => Address | undefined;
};

export const AddressContext = createContext<AddressContextType | null>(null);