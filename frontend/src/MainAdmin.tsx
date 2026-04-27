import { Outlet } from 'react-router-dom';
import { MessagesContainer } from './components/MessagesContainer';
import { AuthProvider } from './context/infra/AuthProvider';
import { ModalProvider } from './context/modal/modalProvider';

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
