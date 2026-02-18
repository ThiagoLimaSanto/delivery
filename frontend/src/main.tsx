import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MessagesContainer } from './components/MessagesContainer/index.tsx';
import './global/global.css';
import { router } from './routes/MainRouter/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessagesContainer>
      <RouterProvider router={router} />
    </MessagesContainer>
  </StrictMode>,
);
