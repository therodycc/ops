import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { CreateOrderDto, OrderState } from '../../interfaces/order/order';
import { orderService } from '../../services/order.service';
import { notify } from './notification';
import { clearCart } from './cart';
import { Notification } from '../../interfaces/notification';

const initialState: OrderState = {
  error: null,
  isLoading: false,
  count: 0,
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
      const payload = action.payload;

      state.error = null;
      state.isLoading = false;

      state.count = payload.count;
      state.orders = payload.data;
      return state;
    }
  }
});

// ----------------------------------------------------------------------

// // Reducer
export const { hasError } = orderSlice.actions;

export default orderSlice.reducer;

export const getOrdersSummary = (page: number, size: number) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());
      const { data } = await orderService.summary(page, size);

      if (!data) dispatch(orderSlice.actions.hasError('Unable to load orders'));
      else dispatch(orderSlice.actions.loadOrderComplete(data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
      notify({ message: error.message, type: 'error' } as Notification);
    }
  };
};

export const createOrder = (cartDto: CreateOrderDto) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());
      const { data } = await orderService.add(cartDto);

      dispatch(orderSlice.actions.createOrder(data));
      dispatch(clearCart());

      notify({ message: 'La order se creo', type: 'success' } as Notification);
    } catch (error) {
      console.error(error);
      notify({ message: error.message, type: 'error' } as Notification);
      dispatch(orderSlice.actions.hasError(error));
    }
  };
};
