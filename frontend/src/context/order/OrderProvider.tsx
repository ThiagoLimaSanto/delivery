import { useEffect, useReducer } from 'react';
import type { MenuType } from '../../types/Product';
import { OrderContext } from './orderContext';
import { orderReducer } from './OrderReducer';

type OrderProviderProps = {
  children: React.ReactNode;
};

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, dispatch] = useReducer(orderReducer, [], () => {
    const data = localStorage.getItem('order');
    return data ? (JSON.parse(data) as MenuType[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order));
  }, [order]);

  const addToCart = (item: MenuType) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const increaseQuantity = (productId: string) => {
    dispatch({ type: 'INCREASE', payload: productId });
  };

  const decreaseQuantity = (productId: string) => {
    dispatch({ type: 'DECREASE', payload: productId });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <OrderContext.Provider
      value={{
        order,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        totalPriceWithDelivery: totalPrice + 3.9,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
