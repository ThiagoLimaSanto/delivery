import { createContext } from 'react';
import type { Address } from '../../hook/useAddress';

export type AddressContextType = {
  address: Address[];
  updateAddressByID: (addressId: string) => Promise<void>;
  removeAddressById: (addressId: string) => Promise<void>;
  getAddressById: (addressId: string) => Address | undefined;
};

export const AddressContext = createContext<AddressContextType | null>(null);
