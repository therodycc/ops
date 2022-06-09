const DEV = Object.freeze({
  AUTH: {
    login: 'https://dev-api.farmacianetzer.com/v1/auth/login'
  },
  PRODUCTS: {
    labs: 'https://dev-api.farmacianetzer.com/v1/labs',
    list: 'https://dev-api.farmacianetzer.com/v1/products',
    save: 'https://dev-api.farmacianetzer.com/v1/products',
    detail: 'https://dev-api.farmacianetzer.com/v1/products',
    categories: 'https://dev-api.farmacianetzer.com/v1/categories',
    activeSubstances: 'https://dev-api.farmacianetzer.com/v1/products'
  },
  CART: {
    list: 'https://dev-api.farmacianetzer.com/v1/carts',
    save: 'https://dev-api.farmacianetzer.com/v1/carts',
    update: 'https://dev-api.farmacianetzer.com/v1/carts',
    delete: 'https://dev-api.farmacianetzer.com/v1/carts',
    clear: 'https://dev-api.farmacianetzer.com/v1/carts'
  }
});

const STAGING = Object.freeze({
  AUTH: {
    login: 'https://stg-api.farmacianetzer.com/v1/auth/login'
  },
  PRODUCTS: {
    labs: 'https://stg-api.farmacianetzer.com/v1/labs',
    list: 'https://stg-api.farmacianetzer.com/v1/products',
    save: 'https://stg-api.farmacianetzer.com/v1/products',
    detail: 'https://stg-api.farmacianetzer.com/v1/products',
    categories: 'https://stg-api.farmacianetzer.com/v1/categories',
    activeSubstances: 'https://stg-api.farmacianetzer.com/v1/products'
  },
  CART: {
    list: 'https://stg-api.farmacianetzer.com/v1/carts',
    save: 'https://stg-api.farmacianetzer.com/v1/carts',
    update: 'https://stg-api.farmacianetzer.com/v1/carts',
    delete: 'https://stg-api.farmacianetzer.com/v1/carts',
    clear: 'https://stg-api.farmacianetzer.com/v1/carts'
  }
});

const PROD = Object.freeze({
  AUTH: {
    login: 'https://api.farmacianetzer.com/v1/auth/login'
  },
  PRODUCTS: {
    labs: 'https://api.farmacianetzer.com/v1/labs',
    list: 'https://api.farmacianetzer.com/v1/products',
    save: 'https://api.farmacianetzer.com/v1/products',
    detail: 'https://api.farmacianetzer.com/v1/products',
    categories: 'https://api.farmacianetzer.com/v1/categories',
    activeSubstances: 'https://api.farmacianetzer.com/v1/products'
  },
  CART: {
    list: 'https://api.farmacianetzer.com/v1/carts',
    save: 'https://api.farmacianetzer.com/v1/carts',
    update: 'https://api.farmacianetzer.com/v1/carts',
    delete: 'https://api.farmacianetzer.com/v1/carts',
    clear: 'https://api.farmacianetzer.com/v1/carts'
  }
});

let endpoints = DEV;

const env = process.env.ENV || 'development';

if (env === 'production') endpoints = PROD;
else if (env === 'staging') endpoints = STAGING;

export const API = Object.freeze({
  ...endpoints
});
