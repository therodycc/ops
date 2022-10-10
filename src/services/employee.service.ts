import { Role } from '../enums/roles';
import axios from '../utils/axios';
import { API } from './api';

const getAllDeliveries = () => {
  return axios.get(`${API.EMPLOYEE.employees}?role=${Role.DELIVERY}`).catch(error => {
    console.log('🪲 - | -  error', error);
    return Promise.resolve({ message: 'Error al obtener los deliveries' });
  });
};

export const employeeService = {
  getAllDeliveries
};
