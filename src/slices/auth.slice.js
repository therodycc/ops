import { authReducer } from './reducers/auth.reducer';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authReducer
});

export const authActions = authSlice.actions;
