import { createContext } from 'react';
import type { MenuType } from '../../types/Product';

export type OrderContextType = {
  order: MenuType[]
  addToCart: (item: MenuType) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  totalPriceWithDelivery: number
}

export const OrderContext = createContext<OrderContextType | null>(null);
