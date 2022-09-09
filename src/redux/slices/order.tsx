import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus } from '../../enums/order.status';
import { ProductUnit } from '../../enums/product-unit.enum';

import { Notification } from '../../interfaces/notification';
import { CreateOrderDto, OrderProduct, OrderState } from '../../interfaces/order/order';
import { orderService } from '../../services/order.service';
import { dispatch } from '../store';
import { clearCart } from './cart';
import { notify } from './notification';

const initialState: OrderState = {
  error: null,
  isLoading: false,
  count: 0,
  orders: [],
  summary: null,
  detail: null
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
    loadOrderDetailCompleted(state: OrderState, action) {
      const payload = action.payload;

      state.error = null;
      state.isLoading = false;
      state.detail = payload;
      // state.summary = payload;
      return state;
    },
    loadOrdersComplete(state: OrderState, action) {
      const payload = action.payload;

      state.error = null;
      state.isLoading = false;

      state.count = payload.count;
      state.orders = payload.data;
      return state;
    },
    sendOrderToCashRegister(state: OrderState, action) {
      state.detail = {
        ...state.detail,
        status: action.payload.status,
        statusDescription: action.payload.statusDescription
      };
      state.isLoading = false;
      return state;
    },
    removeDetail(state: OrderState) {
      state.detail = null;
      return state;
    },
    addMoreProductsToOrderAction(state: OrderState, action) {
      state.detail = action.payload;
      state.isLoading = false;
    }
  }
});

// ----------------------------------------------------------------------

// // Reducer
export const { hasError, removeDetail } = orderSlice.actions;

export default orderSlice.reducer;

export const getOrderDetail = (id: string) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());
      const { data } = await orderService.detail(id);

      if (!data) dispatch(orderSlice.actions.hasError('Unable to load order detail'));
      else dispatch(orderSlice.actions.loadOrderDetailCompleted(data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
      notify({ message: error.message, type: 'error' } as Notification);
    }
  };
};

export const getOrdersSummary = (page: number, size: number) => {
  return async () => {
    try {
      dispatch(orderSlice.actions.startLoading());
      const { data } = await orderService.summary(page, size);

      if (!data) dispatch(orderSlice.actions.hasError('Unable to load orders'));
      else dispatch(orderSlice.actions.loadOrdersComplete(data));
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

export const sendOrderToCashRegisterAction = (id: string) => {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    const result = await orderService.sendToCashier({ orderId: id });

    if (result.error) {
      notify({ message: result.error.message, type: 'error' } as Notification);
      dispatch(orderSlice.actions.hasError(result.error));
      return;
    }

    dispatch(
      orderSlice.actions.sendOrderToCashRegister({
        id,
        status: OrderStatus.PENDING_PAYMENT,
        statusDescription: 'Pago pendiente'
      })
    );

    notify({ message: 'Orden enviada a caja' } as Notification);
  };
};

export const addMoreProductsToOrder = (
  id: string,
  products: { id: string; quantity: number; unit: ProductUnit }[]
) => {
  return async () => {
    dispatch(orderSlice.actions.startLoading());
    const result = await orderService.addProductsToOrder({ orderId: id, products });
    if (result.error) {
      notify({ message: result.error.message, type: 'error' } as Notification);
      dispatch(orderSlice.actions.hasError(result.error));
      return;
    }
    notify({ message: 'Productos agregados a la orden', type: 'success' } as Notification);
    dispatch(orderSlice.actions.addMoreProductsToOrderAction(result.data));
  };
};
