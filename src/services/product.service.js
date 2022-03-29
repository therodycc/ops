import axios from 'axios';

console.log('NODE_ENV', process.env.NODE_ENV);

const ENDPOINTS = {
  DEV: {
    list: 'http://localhost:7071/api/list/',
    save: 'http://localhost:7071/api/create',
    categories: 'http://localhost:7071/api/categories/',
    activeSubstances: 'http://localhost:7071/api/active-substance/'
  },
  PROD: {
    list: 'https://func-products-dev.azurewebsites.net/api/list?code=CT3%2FW39iTffquauI3wyQMg1Jg7iA00E3aay3bVtLcME7w9CSdf4Y1w%3D%3D',
    save: 'https://func-products-dev.azurewebsites.net/api/create?code=HGJyhFD3SNlOG8TdmvI%2FKCfxL79Ydl64JCEwjrNCd3ct8Cx3P1BPgA%3D%3D',
    categories:
      'https://func-products-dev.azurewebsites.net/api/categories?code=SrfkoHnE9fjhybHaQoGU57Xxmw9IS5MH7ih8W4oCcywVLnM1BBSEwA%3D%3D',
    activeSubstances:
      'https://func-products-dev.azurewebsites.net/api/active-substance?code=cpmqjOnaMi%2FVV7JxkYZzYHYrKriN8Mh%2FqFqMny8Of3RvLnk1Wj5Bdg%3D%3D'
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

const save = product => {
  return axios
    .post(env.list, product, {
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
  getProductTypes,
  getActiveSubstances
};
