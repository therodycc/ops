import axios from 'axios';
const ENDPOINT =
  'https://func-products-dev.azurewebsites.net/api/list?code=CT3%2FW39iTffquauI3wyQMg1Jg7iA00E3aay3bVtLcME7w9CSdf4Y1w%3D%3D';

const getProductTypes = () => {
  return axios
    .get(
      'https://func-products-dev.azurewebsites.net/api/categories?code=SrfkoHnE9fjhybHaQoGU57Xxmw9IS5MH7ih8W4oCcywVLnM1BBSEwA%3D%3D'
    )
    .catch(error => {
      throw new Error('Error las sustancias activas');
    });
};

const getActiveSubstances = () => {
  return axios
    .get(
      'https://func-products-dev.azurewebsites.net/api/active-substance?code=cpmqjOnaMi%2FVV7JxkYZzYHYrKriN8Mh%2FqFqMny8Of3RvLnk1Wj5Bdg%3D%3D'
    )
    .catch(error => {
      throw new Error('Error las sustancias activas');
    });
};

const list = (page = 1, offset = 20) => {
  return axios.get(ENDPOINT).catch(error => {
    throw new Error('Error al obtener lista de productos.');
  });
};

const filter = name => {
  return axios.get(`${ENDPOINT}&name=${name}`).catch(error => {
    throw new Error('Error al obtener lista de productos.');
  });
};

export const productService = {
  list,
  filter,
  getProductTypes,
  getActiveSubstances
};
