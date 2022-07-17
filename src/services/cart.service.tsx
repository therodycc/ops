import { CartDto } from '../interfaces/cart/cart';
import axios from '../utils/axios';
import { API } from './api';

const get = () => {
  return axios.get(API.CART.list).catch(error => {
    throw new Error('Error al obtener los elementos del carrito');
  });
};

const add = (cart: CartDto) => {
  cart.profileId = axios.defaults.headers['x-profile-id'];
  return axios.post(API.CART.save, cart).catch(error => {
    throw new Error('Error al guardar producto en el carrito');
  });
};

const clear = () => {
  return axios.delete(API.CART.clear).catch(error => {
    throw new Error('Error al borrar elementos del carrito');
  });
};

const remove = id => {
  return axios.delete(`${API.CART.delete}/${id}`).catch(error => {
    throw new Error('Error al borrar elemento del carrito');
  });
};

const update = data => {
  return axios.put(`${API.CART.update}/${data.cartId}`, data).catch(error => {
    throw new Error('Error al actualizar producto en el carrito');
  });
};

export const cartService = {
  get,
  add,
  clear,
  remove,
  update
};
