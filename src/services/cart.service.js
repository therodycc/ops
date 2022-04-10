import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    list: 'https://func-cart-dev.azurewebsites.net/api/all?code=ixBbBiDLaNSL%2F9LMunZBEFDVywDkXhDscl6FGheMR6WoKZ13qfJC8A%3D%3D',
    save: 'https://func-cart-dev.azurewebsites.net/api/create?code=wLWxaxce7m7pJ64XPVkmo8xZt4aiMA4TJJkau61YUwn3v7Mb8ZWxDg%3D%3D',
    update:
      'https://func-cart-dev.azurewebsites.net/api/update?code=wjTISghoPx2cizs%2Fx%2FNboFaq5qDtO7qaCODzfYEpVeGkaqZmv9qLAQ%3D%3D',
    clear:
      'https://func-cart-dev.azurewebsites.net/api/clear?code=jvH8clA2zTkNHk22CTrOAwGl8Nnp3Wc5NJ5w49lhxXPbVRCi1Po7sQ%3D%3D'
  },
  PROD: {
    list: 'https://func-cart-dev.azurewebsites.net/api/all?code=ixBbBiDLaNSL%2F9LMunZBEFDVywDkXhDscl6FGheMR6WoKZ13qfJC8A%3D%3D',
    save: 'https://func-cart-dev.azurewebsites.net/api/create?code=wLWxaxce7m7pJ64XPVkmo8xZt4aiMA4TJJkau61YUwn3v7Mb8ZWxDg%3D%3D',
    update:
      'https://func-cart-dev.azurewebsites.net/api/update?code=wjTISghoPx2cizs%2Fx%2FNboFaq5qDtO7qaCODzfYEpVeGkaqZmv9qLAQ%3D%3D',
    clear:
      'https://func-cart-dev.azurewebsites.net/api/clear?code=jvH8clA2zTkNHk22CTrOAwGl8Nnp3Wc5NJ5w49lhxXPbVRCi1Po7sQ%3D%3D'
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
