import { createBrowserRouter } from 'react-router-dom';
import { App } from '../../App';
import { Login } from '../../pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
