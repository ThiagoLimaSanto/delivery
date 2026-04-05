import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';
import { OrderProvider } from './context/order/OrderProvider';
import { AddressProvider } from './context/address/AddressProvider';
import { SocketProvider } from './context/socket/WebSocketProvider';

export function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <SocketProvider>
            <AddressProvider>
              <OrderProvider>
                <Outlet />
              </OrderProvider>
            </AddressProvider>
          </SocketProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
