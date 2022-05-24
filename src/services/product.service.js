import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    labs: 'https://dev-api.farmacianetzer.com/v1/labs',
    list: 'https://dev-api.farmacianetzer.com/v1/products',
    save: 'https://dev-api.farmacianetzer.com/v1/products',
    detail: 'https://dev-api.farmacianetzer.com/v1/products',
    categories:  'https://dev-api.farmacianetzer.com/v1/categories',
    activeSubstances:  'https://dev-api.farmacianetzer.com/v1/products',
  },
  PROD: {
    labs: 'https://api.farmacianetzer.com/v1/labs',
    list: 'https://api.farmacianetzer.com/v1/products',
    save: 'https://api.farmacianetzer.com/v1/products',
    detail: 'https://api.farmacianetzer.com/v1/products',
    categories:  'https://api.farmacianetzer.com/v1/categories',
    activeSubstances:  'https://api.farmacianetzer.com/v1/products',
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const getProductTypes = () => {
  return axios.get(env.categories).catch(error => {
    throw new Error('Error al obtener las categorias de productos');
  });
};

const getDrugLabs = () => {
  return axios.get(env.labs).catch(error => {
    throw new Error('Error al obtener los laboratorios');
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
  getDrugLabs,
  getProductTypes,
  getActiveSubstances
};
