import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    list: 'https://dev-api.farmacianetzer.com/v1/carts',
    save: 'https://dev-api.farmacianetzer.com/v1/carts',
    update: 'https://dev-api.farmacianetzer.com/v1/carts',
    clear: 'https://dev-api.farmacianetzer.com/v1/carts'
  },
  PROD: {
    list: 'https://api.farmacianetzer.com/v1/carts',
    save: 'https://api.farmacianetzer.com/v1/carts',
    update: 'https://api.farmacianetzer.com/v1/carts',
    clear: 'https://api.farmacianetzer.com/v1/carts'
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const get = () => {
  return axios.get(env.list).catch(error => {
    throw new Error('Error al obtener los elementos del carrito');
  });
};

const add = cart => {
  return axios.post(env.save, cart).catch(error => {
    throw new Error('Error al guardar producto en el carrito');
  });
};

const clear = cart => {
  return axios.delete(env.clear).catch(error => {
    throw new Error('Error al borrar elementos del carrito');
  });
};

const update = data => {
  return axios.put(`${env.update}&productId=${data.productId}`, data).catch(error => {
    throw new Error('Error al actualizar producto en el carrito');
  });
};

export const cartService = {
  get,
  add,
  clear,
  update
};
