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
    clear: 'https://dev-api.farmacianetzer.com/v1/carts'
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
    clear: 'https://api.farmacianetzer.com/v1/carts'
  }
});

console.log('NEXT_PUBLIC_ENV', process.env.NEXT_PUBLIC_ENV);
console.log('ENV', process.env.ENV);
console.log('.env', process.env);
const isDev = process.env.ENV === 'development';

export const API = Object.freeze({
  AUTH: isDev ? DEV.AUTH : PROD.AUTH,
  CART: isDev ? DEV.CART : PROD.CART,
  PRODUCTS: isDev ? DEV.PRODUCTS : PROD.PRODUCTS
});
