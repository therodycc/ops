import * as axios from 'axios';
// ----------------------------------------------------------------------

// Bearer and x-profile-id are being set on jwt.js util
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
