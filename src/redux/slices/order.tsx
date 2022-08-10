import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { CreateOrderDto, OrderState } from '../../interfaces/order/order';
import { orderService } from '../../services/order.service';

const initialState: OrderState = {
  error: null,
  isLoading: false,
  orders: []
};

const orderSlice = createSlice({
  name: 'order',
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
    createOrder(state: OrderState, action) {
      const order = action.payload;

      state.error = null;
      state.isLoading = false;

      state.created = order;
      state.orders.push(order);

      return state;
    },
    loadOrderComplete(state: OrderState, action) {
      const orders = action.payload;

      state.error = null;
      state.isLoading = false;

      state.orders = orders;
      return state;
    }
  }
});

// ----------------------------------------------------------------------

// // Reducer
export const { hasError } = orderSlice.actions;

export default orderSlice.reducer;

export const getOrders = () => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());
      const { data } = await orderService.get();

      if (!data) dispatch(orderSlice.actions.hasError('Unable to load orders'));
      else dispatch(orderSlice.actions.loadOrderComplete(data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
};

export const createOrder = (cartDto: CreateOrderDto) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());

      const { data } = await orderService.add(cartDto);

      dispatch(orderSlice.actions.createOrder(data));
    } catch (error) {
      console.error(error);
      dispatch(orderSlice.actions.hasError(error));
    }
  };
};
