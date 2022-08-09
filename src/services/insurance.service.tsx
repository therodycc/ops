import axios from '../utils/axios';
import { API } from './api';

const get = () => {
  return axios.get(API.INSURANCE.list).catch(error => {
    throw new Error('Error al obtener los seguros medicos');
  });
};

export const insuranceService = {
  get
};
