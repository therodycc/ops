import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    list: 'http://localhost:7010/api/all/',
    add: 'http://localhost:7010/api/create',
    update: 'http://localhost:7010/api/update/',
    clear: 'http://localhost:7010/api/clear/'
  },
  PROD: {
    list: 'https://dev-api.farmacianazir.com/cart',
    save: 'https://dev-api.farmacianazir.com/cart',
    update: 'https://dev-api.farmacianazir.com/cart',
    clear: 'https://dev-api.farmacianazir.com/cart'
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const get = () => {
  return axios.get(env.list).catch(error => {
    throw new Error('Error al obtener los elementos del carrito');
  });
};

const add = cart => {
  return axios.post(env.add, cart).catch(error => {
    throw new Error('Error al guardar producto en el carrito');
  });
};

const clear = cart => {
  return axios.delete(env.clear).catch(error => {
    throw new Error('Error al borrar elementos del carrito');
  });
};

const update = data => {
  return axios.put(`${env.update}?productId=${data.productId}`, data).catch(error => {
    throw new Error('Error al actualizar producto en el carrito');
  });
};

export const cartService = {
  get,
  add,
  clear,
  update
};
