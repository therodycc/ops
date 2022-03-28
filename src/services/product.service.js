import axios from 'axios';

const list = (page = 1, offset = 20) => {
  return axios
    .get(
      'https://func-products-dev.azurewebsites.net/api/all?code=GancUfR9H2pimxLpQ5ARY9%2FkaAnQnitN4BwJ3FRHnbViMcduT9puVg%3D%3D'
    )
    .catch((error) => {
      throw new Error('Error al obtener lista de productos.');
    });
};

export const productService = {
  list,
};
