import { CreateOrderDto } from '../interfaces/order/order';
import axios from '../utils/axios';
import { API } from './api';

const get = () => {
  return axios.get(API.ORDER.list).catch(error => {
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

export const orderService = {
  get,
  add,
  summary
};
