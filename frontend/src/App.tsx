import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';
import { OrderProvider } from './context/order/OrderProvider';
import { AddressProvider } from './context/address/AddressProvider';

export function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <AddressProvider>
            <OrderProvider>
              <Outlet />
            </OrderProvider>
          </AddressProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
