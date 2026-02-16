import { WebSocket } from 'ws';

const clients = new Set<WebSocket>();

export const WebSocketManager = {
  handleConnection: (socket: WebSocket) => {
    console.log('Cliente Conectado!');
    clients.add(socket);

    socket.on('close', () => {
      clients.delete(socket);
      console.log('Cliente Desconectado!');
    });
  },

  notifyNewOrder: (type: string, orderData: any) => {
    const message = JSON.stringify({ type, orderData });
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  },
};
