const API_HOST = process.env.API_HOST;

const ENDPOINTS = Object.freeze({
  AUTH: {
    login: `${API_HOST}/auth/login`
  },
  PRODUCTS: {
    labs: `${API_HOST}/labs/`,
    list: `${API_HOST}/products/`,
    save: `${API_HOST}/products/`,
    detail: `${API_HOST}/products/`,
    categories: `${API_HOST}/categories/`,
    activeSubstances: `${API_HOST}/products/active-substances`
  },
  INSURANCE: {
    list: `${API_HOST}/insurances/`
  },
  CART: {
    list: `${API_HOST}/carts/`,
    save: `${API_HOST}/carts/`,
    update: `${API_HOST}/carts`,
    delete: `${API_HOST}/carts`,
    clear: `${API_HOST}/carts/`
  },
  ORDER: {
    summary: `${API_HOST}/orders/summary`,
    list: `${API_HOST}/orders/`,
    detail: `${API_HOST}/orders/`,
    save: `${API_HOST}/orders/`,
    update: `${API_HOST}/orders`,
    delete: `${API_HOST}/orders`,
    sendToCashier: `${API_HOST}/orders/sent-to-cashie`
  }
});

export const API = Object.freeze(ENDPOINTS);
