import axios from '../utils/axios';

const ENDPOINTS = {
  DEV: {
    list: 'https://func-products-dev.azurewebsites.net/api/list?code=I1N1gBVBYA7jgWz94HgvvOUXs7BOIk3PQXLJNxdEVqiSsHxX8hNSbQ%3D%3D',
    save: 'https://func-products-dev.azurewebsites.net/api/create?code=KCuWFbU%2F5XPBP8RwYOGpDdafa1ZFrax40qM3ekpDdziXtuZaUyHCzw%3D%3D',
    detail:
      'https://func-products-dev.azurewebsites.net/api/detail?code=aAFbDQgwDtsFue2qx2hU0rdtdHUN3LuRyxYziHaBVBA1Xf53yXiYLA%3D%3D',
    categories:
      'https://func-products-dev.azurewebsites.net/api/categories?code=Z%2FTzUVbOsiMoBTTgqQldorbGcCMAqe3w9KnJ5eoMnxBGaNS%2Fkj1n2A%3D%3D',
    activeSubstances:
      'https://func-products-dev.azurewebsites.net/api/active-substance?code=T2UTcbuoKKCvNhbmiwNcarKrd2kJmM2D9SrMV4ZcywzXSkUcEey97g%3D%3D'
  },
  PROD: {
    list: 'https://func-products-dev.azurewebsites.net/api/list?code=I1N1gBVBYA7jgWz94HgvvOUXs7BOIk3PQXLJNxdEVqiSsHxX8hNSbQ%3D%3D',
    save: 'https://func-products-dev.azurewebsites.net/api/create?code=KCuWFbU%2F5XPBP8RwYOGpDdafa1ZFrax40qM3ekpDdziXtuZaUyHCzw%3D%3D',
    detail:
      'https://func-products-dev.azurewebsites.net/api/detail?code=aAFbDQgwDtsFue2qx2hU0rdtdHUN3LuRyxYziHaBVBA1Xf53yXiYLA%3D%3D',
    categories:
      'https://func-products-dev.azurewebsites.net/api/categories?code=Z%2FTzUVbOsiMoBTTgqQldorbGcCMAqe3w9KnJ5eoMnxBGaNS%2Fkj1n2A%3D%3D',
    activeSubstances:
      'https://func-products-dev.azurewebsites.net/api/active-substance?code=T2UTcbuoKKCvNhbmiwNcarKrd2kJmM2D9SrMV4ZcywzXSkUcEey97g%3D%3D'
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const getProductTypes = () => {
  return axios.get(env.categories).catch(error => {
    throw new Error('Error al obtener las categorias de productos');
  });
};

const getDrugLabs = () => {
  return axios.get(env.categories).catch(error => {
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
  return axios.get(`${env.list}&name=${name}`).catch(error => {
    throw new Error('Error al obtener lista de productos.');
  });
};

const detail = id => {
  return axios.get(`${env.detail}&productId=${id}`).catch(error => {
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
