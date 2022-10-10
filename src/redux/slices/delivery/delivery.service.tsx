import { employeeService } from '../../../services/employee.service';
import { dispatch } from '../../store';
import { notify } from '../notification';
import {
  finishedLoading,
  setAddressStateAction,
  setDeliveriesStateAction,
  startLoading
} from './delivery';
import { Notification } from '../../../interfaces/notification';
import { profileService } from '../../../services/profile.service';
import { orderService } from '../../../services/order.service';
import { getOrderDetail } from '../order';

export const getAllDeliveries = () => {
  return async () => {
    try {
      const result = await employeeService.getAllDeliveries();
      dispatch(
        setDeliveriesStateAction({
          deliveries: result?.data?.data
        })
      );
    } catch (error) {
      notify({ message: error.message, type: 'error' } as Notification);
    }
  };
};

export const getProfileAddresses = (id: string) => {
  return async () => {
    const result = await profileService.getProfileAddress(id);
    dispatch(
      setAddressStateAction({
        addresses: result?.data?.data
      })
    );
  };
};

export const assignOrderToDelivery = (payload: IPayloadToAssign, id: string) => {
  return async () => {
    dispatch(startLoading());
    const result = await orderService.assignOrderToDelivery(payload);
    if (result.error) {
      notify({ message: result?.error?.message, type: 'error' } as Notification);
      return dispatch(finishedLoading());
    }
    dispatch(
      setAddressStateAction({
        addresses: result?.data?.data
      })
    );
    notify({ message: 'Order asignada correctamente' } as Notification);
    dispatch(finishedLoading());
    dispatch(getOrderDetail(id));
  };
};

interface IPayloadToAssign {
  addressId: string;
  employeeId: string;
  orderId: string;
}
