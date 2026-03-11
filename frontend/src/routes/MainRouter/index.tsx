import { createBrowserRouter } from 'react-router-dom';
import { App } from '../../App';
import { About } from '../../pages/About';
import { Admin } from '../../pages/Admin';
import { Category } from '../../pages/Category';
import { Contact } from '../../pages/Contact';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Menu } from '../../pages/Menu';
import { MyProfile } from '../../pages/MyProfile';
import { Orders } from '../../pages/Orders';
import { Payment } from '../../pages/Payment';
import { Register } from '../../pages/Register';

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
      {
        path: '/pedido/finalizar',
        element: <Payment />,
      },
      {
        path: '/meuspedidos',
        element: <Orders />,
      },
      {
        path: 'meusdados',
        element: <MyProfile />,
      },
      {
        path: '/z_admin',
        element: <Admin />,
      },
    ],
  },
]);
