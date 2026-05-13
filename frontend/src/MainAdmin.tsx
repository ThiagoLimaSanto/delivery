import { Outlet } from 'react-router-dom';
import { MessagesContainer } from './components/MessagesContainer';
import { Spinner } from './components/Spinner';
import { ModalProvider } from './context/modal/modalProvider';
import { useAuth } from './hook/useAuth';

export function MainAdmin() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MessagesContainer>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </MessagesContainer>
    </>
  );
}
