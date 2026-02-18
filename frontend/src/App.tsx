import { Outlet } from 'react-router-dom';
import { AuthProvider } from './infra/AuthProvider';

export function App() {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}
