import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    list: 'http://localhost:7072/api/all/',
    save: 'http://localhost:7072/api/create',
    update: 'http://localhost:7072/api/update/',
    clear: 'http://localhost:7072/api/clear/'
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

const save = cart => {
  return axios.post(env.save, cart).catch(error => {
    throw new Error('Error al guardar producto en el carro');
  });
};

const clear = cart => {
  return axios.delete(env.clear).catch(error => {
    throw new Error('Error al borrar elementos del carrito');
  });
};

const update = cart => {
  return axios.update(`${env.update}&productId=${card.product.id}`, cart).catch(error => {
    throw new Error('Error al actualizar producto en el carro');
  });
};

export const productService = {
  get,
  save,
  clear,
  update
};
