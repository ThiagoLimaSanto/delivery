import { useContext } from 'react';
import { AddressContext } from '../context/address/addressContext';

export function useAddresContext() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('AddressContext must be used within a OrderProvider');
  }
  return context;
}
