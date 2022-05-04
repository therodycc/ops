import { cartService } from '../../services/cart.service';
const { createSlice } = require('@reduxjs/toolkit');

import { dispatch } from '../store';

const initialState = {
  error: null,
  isLoading: false,
  products: [],
  itbis: 0,
  total: 0,
  discount: 0,
  subTotal: 0
};

const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCart(state, action) {
      state.isLoading = false;
      const cart = action.payload;

      state.products.push(cart.products[0]);

      state.itbis += cart.itbis;
      state.total += cart.total;
      state.discount += cart.discount;
      state.subTotal += cart.subTotal;
    },
    updateCart(state, action) {
      state.isLoading = false;
      state.products = [...action.payload.products];
      state.itbis = action.payload.itbis;
      state.total = action.payload.total;
      state.discount = action.payload.discount;
      state.subTotal = action.payload.subTotal;
    },
    resetCart(state) {
      state.products = [];
      state.total = 0;
      state.itbis = 0;
      state.subTotal = 0;
      state.discount = 0;
    }
  }
});

// ----------------------------------------------------------------------

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

export const addToCart = product => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());
      const { data } = await cartService.add(product);
      dispatch(cartSlice.actions.addCart(data));
    } catch (error) {
      console.error(error);
      dispatch(cartSlice.actions.hasError(error));
    }
  };
};

export const updateCart = cart => {
  return async () => {
    try {
      dispatch(cartSlice.actions.startLoading());
      const { data } = await cartService.update(cart);
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
