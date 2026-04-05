export const SocketManager = {
  notifyNewOrder: (io: any, type: string, orderData: any) => {
    io.emit("orderUpdate", {
      type,
      orderData,
    });
  },
};