import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modalProvider';

export function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
