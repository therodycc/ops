import axios from '../utils/axios';
import { API } from './api';

const login = async ({ email, password }) => {
  const profile = await axios.post(API.AUTH.login, { email, password }).catch(error => {
    throw new Error('Usuario o contraseña invalido.');
  });
  return profile.data;
};

export const authService = {
  login
};
