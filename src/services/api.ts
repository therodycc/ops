const API_HOST = process.env.API_HOST;
const API_VERSION = process.env.API_VERSION;

const products = 'http://localhost:3';

const ENDPOINTS = Object.freeze({
  AUTH: {
    login: `http://localhost:3100/login`
  },
  PRODUCTS: {
    labs: `http://localhost:3500/labs`,
    list: `http://localhost:3500`,
    save: `http://localhost:3500`,
    detail: `http://localhost:3500`,
    categories: `http://localhost:3500/categories`,
    activeSubstances: `http://localhost:3500`
  },
  CART: {
    list: `http://localhost:3700/carts`,
    save: `http://localhost:3700/carts`,
    update: `http://localhost:3700/carts`,
    delete: `http://localhost:3700/carts`,
    clear: `http://localhost:3700/carts`
  },
  ORDER: {
    list: `http://localhost:3000/carts`
  }
});

export const API = Object.freeze(ENDPOINTS);
