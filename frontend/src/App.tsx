import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';
import { OrderProvider } from './context/order/OrderProvider';

export function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <OrderProvider>
            <Outlet />
          </OrderProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
