import { AuthState } from '../../interfaces/user';
import { authService } from '../../services/auth.service';
import { getUserFromToken, setSession } from '../../utils/jwt';
import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: undefined,
  error: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;

      return state;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      return state;
    },
    initialize(state, action) {
      const { isAuthenticated, user } = action.payload;

      state.user = user;
      state.error = null;
      state.isInitialized = true;
      state.isLoading = false;
      state.isAuthenticated = isAuthenticated;

      return state;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;

      return state;
    },
    logoutSuccess(state) {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = false;

      return state;
    }
  }
});

// ----------------------------------------------------------------------

// // Reducer
export const { logoutSuccess, loginSuccess, hasError } = authSlice.actions;

export default authSlice.reducer;

export const initialize = ({ isAuthenticated, user }) => {
  dispatch(authSlice.actions.initialize({ isAuthenticated, user }));
};

export const logout = () => {
  return async () => {
    setSession(null);
    dispatch(authSlice.actions.logoutSuccess());
  };
};

export const login = credentials => {
  return async () => {
    dispatch(authSlice.actions.startLoading());

    try {
      const data = await authService.login(credentials);

      if (!data?.accessToken) {
        dispatch(authSlice.actions.hasError('No tiene acceso a la plataforma'));
        return;
      }

      setSession(data.accessToken);
      const user = getUserFromToken(data.accessToken);
      dispatch(authSlice.actions.loginSuccess(user));
    } catch (error) {
      dispatch(authSlice.actions.hasError(error?.message));
    }
  };
};
