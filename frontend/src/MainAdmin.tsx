import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';

export function MainAdmin() {
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
