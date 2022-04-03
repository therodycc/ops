import jwtDecode from 'jwt-decode';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const getUserFromToken = accessToken => {
  if (!accessToken) return false;

  const user = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  // Token has expired
  if (currentTime > user.exp) return null;

  return user;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const setSession = accessToken => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

    const user = getUserFromToken(accessToken);

    axios.defaults.headers['x-profile-id'] = user?.id;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers['x-profile-id'];
  }
};

export { isValidToken, setSession, getUserFromToken };
