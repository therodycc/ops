import axios from '../utils/axios';
import { API } from './api';

const getProductTypes = () => {
  return axios.get(API.PRODUCTS.categories).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener las categorias de productos' } });
  });
};

const getDrugLabs = () => {
  return axios.get(API.PRODUCTS.labs).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener los laboratorios' } });
  });
};

const getActiveSubstances = () => {
  return axios.get(API.PRODUCTS.activeSubstances).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener las sustancias activas' } });
  });
};

const list = (page = 1, offset = 20) => {
  return axios.get(API.PRODUCTS.list).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener lista de productos.' } });
  });
};

const filter = name => {
  return axios.get(`${API.PRODUCTS.list}?name=${name}`).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener lista de productos.' } });
  });
};

const detail = id => {
  return axios.get(`${API.PRODUCTS.detail}?productId=${id}`).catch(error => {
    Promise.resolve({ error: { message: 'Error al obtener el detalle del producto.' } });
  });
};

const save = product => {
  return axios
    .post(API.PRODUCTS.save, product, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .catch(error => {
      Promise.resolve({ error: { message: 'Error al guardar producto' } });
    });
};

export const productService = {
  list,
  save,
  filter,
  detail,
  getDrugLabs,
  getProductTypes,
  getActiveSubstances
};
