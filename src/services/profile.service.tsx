import axios from '../utils/axios';
import { API } from './api';

const getByPhone = (phone: number) => {
  return axios.get(`${API.PROFILE.getByPhone}?phone=${phone}`).catch(error => {
    console.log('🪲 - | -  error', error);
    return Promise.resolve({ message: 'An error has ocurred getting the profile info' });
  });
};

export const profileService = {
  getByPhone
};
