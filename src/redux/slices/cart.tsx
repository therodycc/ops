import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { notify } from './notification';
import { Notification } from '../../interfaces/notification';
import { CartDto, CartState } from '../../interfaces/cart/cart';
import { cartService } from '../../services/cart.service';

const initialState: CartState = {
  error: null,
  isLoading: false,
  products: [],
  itbis: '',
  total: '',
  discount: '',
  subTotal: ''
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;

      return state;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      return state;
    },
    addCart(state, action) {
      const cart = action.payload;

      state.isLoading = false;
      state.products = cart.products;

      state.itbis = cart.itbis;
      state.total = cart.total;
      state.discount = cart.discount;
      state.subTotal = cart.subTotal;

      return state;
    },
    updateCart(state, action) {
      state.isLoading = false;
      state.products = [...action.payload.products];
      state.itbis = action.payload.itbis;
      state.total = action.payload.total;
      state.discount = action.payload.discount;
      state.subTotal = action.payload.subTotal;

      return state;
    },
    resetCart(state) {
      state.products = [];

      state.total = '';
      state.itbis = '';
      state.subTotal = '';
      state.discount = '';

      return state;
    }
  }
});

// ----------------------------------------------------------------------

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = () => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());
      const { data } = await cartService.get();

      if (!data) dispatch(cartSlice.actions.resetCart());
      else dispatch(cartSlice.actions.updateCart(data));
    } catch (error) {
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};

export const addToCart = (cartDto: CartDto) => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());

      const { data } = await cartService.add(cartDto);

      dispatch(cartSlice.actions.addCart(data));
    } catch (error) {
      console.error(error);
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};

export const updateCart = (cartDto: CartDto) => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());
      const { data } = await cartService.update(cartDto);

      if (data) dispatch(cartSlice.actions.updateCart(data));
      else dispatch(cartSlice.actions.resetCart());
    } catch (error) {
      console.error(error);
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};

export const clearCart = () => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());

      await cartService.clear();

      dispatch(cartSlice.actions.resetCart());
    } catch (error) {
      console.error(error);
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};

export const removeCart = (cartId: number) => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());

      const { data } = await cartService.remove(cartId);

      if (data) {
        dispatch(cartSlice.actions.updateCart(data));
      } else dispatch(cartSlice.actions.resetCart());

      notify({ message: 'Operacion realizada correctamente' } as Notification);
    } catch (error) {
      notify({ message: error.message, type: 'error' } as Notification);
      console.error(error);
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};
