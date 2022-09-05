import { CreateOrderDto } from '../interfaces/order/order';
import axios from '../utils/axios';
import { API } from './api';

const get = () => {
  return axios.get(API.ORDER.list).catch(error => {
    throw new Error('Error al obtener las ordenes');
  });
};

const detail = (id: string) => {
  return axios.get(`${API.ORDER.detail}${id}`).catch(error => {
    throw new Error('Error al obtener las ordenes');
  });
};

const summary = (page: number, size: number) => {
  return axios.get(`${API.ORDER.summary}?page=${page}&size=${size}`).catch(error => {
    throw new Error('Error al obtener las ordenes');
  });
};

const add = (cart: CreateOrderDto) => {
  return axios.post(API.ORDER.save, cart).catch(error => {
    throw new Error('Error al crear la orden');
  });
};

const sendToCashier = ({ orderId }: { orderId: string }) => {
  return axios.post(API.ORDER.sendToCashier, { orderId }).catch(error => {
    console.log('🪲 ~ sendToCashier ~ error', error);
    return Promise.resolve({ error: { message: 'Error al enviar la orden a caja' } });
  });
};

export const orderService = {
  get,
  add,
  detail,
  summary,
  sendToCashier
};
