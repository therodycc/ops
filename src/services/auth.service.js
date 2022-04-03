import axios from 'axios';

const login = async (email, password) => {
  const profile = await axios
    .post(
      'https://func-authenticate-dev.azurewebsites.net/api/login?code=V0hDygagvUYoBZxOapPADfIGE1OJfLr93GAo0Noskxqis%2FXjtJHaQQ%3D%3D',
      {
        email,
        password
      }
    )
    .catch(error => {
      throw new Error('Usuario o contraseña invalido.');
    });
  return profile.data;
};

export const authService = {
  login
};
