export const SocketManager = {
  order: {
    emitToAll: (io, action, payload) => {
      io.emit('order:update', { action, payload });
    },

    emitToRoom: (io, room, action, payload) => {
      io.to(room).emit('order:update', { action, payload });
    },
  },

  table: {
    emit: (io, action, payload) => {
      io.to('tables').emit('table:update', { action, payload });
    },
  },

  product: {
    emit: (io, action, payload) => {
      io.to('products').emit('product:update', { action, payload });
    },
  },
};
