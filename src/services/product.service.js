import axios from 'axios';
const ENDPOINT =
  'https://func-products-dev.azurewebsites.net/api/list?code=CT3%2FW39iTffquauI3wyQMg1Jg7iA00E3aay3bVtLcME7w9CSdf4Y1w%3D%3D';

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
  filter
};
