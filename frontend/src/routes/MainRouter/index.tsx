import { createBrowserRouter } from 'react-router-dom';
import { App } from '../../App';
import { MainAdmin } from '../../MainAdmin';
import { MainWaiter } from '../../MainWaiter';
import { About } from '../../pages/About';
import { Admin } from '../../pages/AdminPages/Admin';
import { MenuAdmin } from '../../pages/AdminPages/MenuAdmin';
import { OrdersAdmin } from '../../pages/AdminPages/OrdersAdmin';
import { Contact } from '../../pages/Contact';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/login';
import { Menu } from '../../pages/Menu';
import { MyProfile } from '../../pages/MyProfile';
import { Orders } from '../../pages/Orders';
import { Payment } from '../../pages/Payment';
import { Register } from '../../pages/Register';
import { Waiter } from '../../pages/waiter';

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
        element: <MainAdmin />,
        children: [
          {
            path: '/z_admin/dashboard',
            element: <Admin />,
          },
          {
            path: '/z_admin/cardapio',
            element: <MenuAdmin />,
          },
          {
            path: '/z_admin/pedidos',
            element: <OrdersAdmin />,
          },
          {
            path: '/z_admin/financas',
            element: <MyProfile />,
          },
        ],
      },
      {
        path: '/garcom',
        element: <MainWaiter />,
        children: [
          {
            path: '/garcom/dashboard',
            element: <Waiter />,
          },
        ],
      },
    ],
  },
]);
