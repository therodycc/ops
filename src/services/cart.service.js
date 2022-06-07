import axios from '../utils/axios';
import { API } from './api';

const get = () => {
  return axios.get(API.CART.list).catch(error => {
    throw new Error('Error al obtener los elementos del carrito');
  });
};

const add = cart => {
  return axios.post(API.CART.save, cart).catch(error => {
    throw new Error('Error al guardar producto en el carrito');
  });
};

const clear = cart => {
  return axios.delete(API.CART.clear).catch(error => {
    throw new Error('Error al borrar elementos del carrito');
  });
};

const update = data => {
  return axios.put(`${API.CART.update}&productId=${data.productId}`, data).catch(error => {
    throw new Error('Error al actualizar producto en el carrito');
  });
};

export const cartService = {
  get,
  add,
  clear,
  update
};
