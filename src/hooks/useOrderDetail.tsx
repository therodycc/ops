import { useEffect } from 'react';
import { getOrderDetail } from '../redux/slices/order';
import { dispatch, useSelector } from '../redux/store';
import { AppState } from '../redux/rootReducer';
import { OrderState } from '../interfaces/order/order';

export const useOrderDetail = (id: string) => {
  const { selected } = useSelector<AppState, OrderState>(state => state.order);

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [id]);

  return selected;
};
