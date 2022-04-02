import axios from 'axios';
import { id } from 'date-fns/locale';

const ENDPOINTS = {
  DEV: {
    list: 'http://localhost:7071/api/list/',
    save: 'http://localhost:7071/api/create',
    detail: 'http://localhost:7071/api/detail/',
    categories: 'http://localhost:7071/api/categories/',
    activeSubstances: 'http://localhost:7071/api/active-substance/'
  },
  PROD: {
    list: 'https://dev-api.farmacianazir.com/products',
    save: 'https://dev-api.farmacianazir.com/products',
    detail: 'https://dev-api.farmacianazir.com/products/detail',
    categories: 'https://dev-api.farmacianazir.com/products/categories',
    activeSubstances: 'https://dev-api.farmacianazir.com/active-substances/'
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const getProductTypes = () => {
  return axios.get(env.categories).catch(error => {
    throw new Error('Error las sustancias activas');
  });
};

const getActiveSubstances = () => {
  return axios.get(env.activeSubstances).catch(error => {
    throw new Error('Error al obtener las sustancias activas');
  });
};

const list = (page = 1, offset = 20) => {
  return axios.get(env.list).catch(error => {
    throw new Error('Error al obtener lista de productos.');
  });
};

const filter = name => {
  return axios.get(`${env.list}?name=${name}`).catch(error => {
    throw new Error('Error al obtener lista de productos.');
  });
};

const detail = id => {
  return axios.get(`${env.detail}?productId=${id}`).catch(error => {
    throw new Error('Error al obtener el detalle del producto.');
  });
};

const save = product => {
  return axios
    .post(env.save, product, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .catch(error => {
      throw new Error('Error al guardar producto');
    });
};

export const productService = {
  list,
  save,
  filter,
  detail,
  getProductTypes,
  getActiveSubstances
};
