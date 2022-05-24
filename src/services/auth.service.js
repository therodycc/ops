import axios from 'axios';

const ENDPOINTS = {
  DEV: {
    login:   'https://dev-api.farmacianetzer.com/v1/auth/login',
  },
  PROD: {
    login: 'https://api.farmacianetzer.com/v1/auth/login',
  }
};
const env = process.env.NODE_ENV === 'development' ? ENDPOINTS.DEV : ENDPOINTS.PROD;

const login = async (email, password) => {
  const profile = await axios.post(env.login, { email, password }).catch(error => {
    throw new Error('Usuario o contraseña invalido.');
  });
  return profile.data;
};

export const authService = {
  login
};
