import { useContext } from "react";
import { OrderContext } from "../context/order/orderContext";

export function useHandleOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useHandleOrder must be used within a OrderProvider');
  }
  return context;
}
