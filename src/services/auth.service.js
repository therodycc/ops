import axios from 'axios';

const ENDPOINTS = {
  DEV: {
    login:
      'https://func-authenticate-dev.azurewebsites.net/api/login?code=V0hDygagvUYoBZxOapPADfIGE1OJfLr93GAo0Noskxqis%2FXjtJHaQQ%3D%3D'
  },
  PROD: {
    login:
      'https://func-authenticate-dev.azurewebsites.net/api/login?code=V0hDygagvUYoBZxOapPADfIGE1OJfLr93GAo0Noskxqis%2FXjtJHaQQ%3D%3D'
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
