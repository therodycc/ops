import React from 'react';
import { connect } from 'socket.io-client';

const API_HOST = process.env.API_HOST;

export const orderSocket = connect(API_HOST, {
  path: '/orders/websocket',
  transports: ['websocket']
});
// export const orderDeliverySocket = connect(`${API_HOST}/order-delivery/websocket`);
export const SocketContext = React.createContext(null);
