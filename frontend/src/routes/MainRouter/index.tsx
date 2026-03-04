import { createBrowserRouter } from 'react-router-dom';
import { App } from '../../App';
import { About } from '../../pages/About';
import { Drinks } from '../../pages/Drinks';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Menu } from '../../pages/Menu';
import { Register } from '../../pages/Register';
import { Contact } from '../../pages/Contact';
import { Category } from '../../pages/Category';

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
      {
        path: '/bebidas',
        element: <Drinks />,
      },
      {
        path: '/categorias',
        element: <Category />,
      },
      {
        path: '/sobre',
        element: <About />,
      },
      {
        path: '/contato',
        element: <Contact />,
      },
    ],
  },
]);
