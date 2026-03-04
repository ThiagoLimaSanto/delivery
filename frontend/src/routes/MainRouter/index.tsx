import { createBrowserRouter } from 'react-router-dom';
import { App } from '../../App';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Menu } from '../../components/Menu';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/cardapio',
        element: <Menu />,
      },
    ],
  },
]);
