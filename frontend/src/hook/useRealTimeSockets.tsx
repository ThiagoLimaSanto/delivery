import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from './useWebSocket';

export function useTablesSocket() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.emit('join:tables');

    const handleUpdate = data => {
      // Invalida a busca por mesas para pegar os status mais atuais (ocupada/livre)
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    };

    socket.on('table:update', handleUpdate);

    return () => {
      socket.emit('leave:tables');
      socket.off('table:update', handleUpdate);
    };
  }, [socket, queryClient]);
}

export function useProductsSocket() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleProductUpdate = (data: any) => {
      if (
        data.action === 'product_availability_changed' ||
        data.action === 'product_created'
      ) {
        queryClient.invalidateQueries({ queryKey: ['menu'] });
        return;
      }

      queryClient.setQueriesData({ queryKey: ['menu'] }, (old: any) => {
        if (!old || !Array.isArray(old)) return old;

        switch (data.action) {
          case 'product_updated':
            return old.map(p =>
              String(p.id) === String(data.payload.id)
                ? { ...p, ...data.payload }
                : p,
            );

          case 'product_deleted':
            return old.filter(p => String(p.id) !== String(data.payload.id));

          default:
            return old;
        }
      });
    };

    socket.on('product:update', handleProductUpdate);

    return () => {
      socket.off('product:update', handleProductUpdate);
    };
  }, [socket, queryClient]);
}

export function useCommandsSocket() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleCommandUpdate = (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['command'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    };

    socket.on('command:update', handleCommandUpdate);

    return () => {
      socket.off('command:update', handleCommandUpdate);
    };
  }, [socket, queryClient]);
}

export function useOrdersSocket() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.emit('join:orders');

    const handleOrderUpdate = (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['order'] });
    };

    socket.on('order:update', handleOrderUpdate);

    return () => {
      socket.off('order:update', handleOrderUpdate);
      socket.emit('leave:orders');
    };
  }, [socket, queryClient]);
}
