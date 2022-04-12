import { authService } from '../../services/auth.service';
import { setSession } from '../../utils/jwt';
const { createSlice } = require('@reduxjs/toolkit');

import { dispatch } from '../store';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isLoading: false,
  hasError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    initialize: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    },
    logoutSuccess: state => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      user: null
    }),
  }
});

// ----------------------------------------------------------------------

// // Reducer 
export const {
  //   initialize,
  loginSuccess,
  hasError
  //   logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;

export const initialize = ({ isAuthenticated, user }) => {
  dispatch(authSlice.actions.initialize({ isAuthenticated, user }));
}


export const login = (credentials) => {
  return async () => {
    dispatch(authSlice.actions.startLoading());
    try {
      const { data } = await authService.login(credentials);
      if (!data?.data?.role) {
        dispatch(authSlice.actions.hasError('No tiene acceso a la plataforma'));
        return;
      }

      setSession(data.data.accessToken);
      delete data.data.accessToken;
      dispatch(authSlice.actions.loginSuccess(data.data));
    } catch (error) {
      console.error(error);
      dispatch(authSlice.actions.hasError(error));
    }
  };

}



