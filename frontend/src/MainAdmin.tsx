import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';
import { MessagesContainer } from './components/MessagesContainer';

export function MainAdmin() {
  return (
    <>
      <AuthProvider>
        <MessagesContainer>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </MessagesContainer>
      </AuthProvider>
    </>
  );
}
