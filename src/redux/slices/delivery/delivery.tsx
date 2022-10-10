import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressI } from '../../../interfaces/client/client.interface';
import { EmployeeI } from '../../../interfaces/employee/employee.interface';

export interface DeliveriesSliceI {
  deliveries?: null | Array<Object>;
  deliverySelected?: null | EmployeeI;
  addresses?: null | Array<AddressI>;
  addressSelected?: null | AddressI;
  isLoading?: boolean;
}

const initialState: DeliveriesSliceI = {
  isLoading: false,
  deliveries: null,
  deliverySelected: null,
  addresses: null,
  addressSelected: null
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    startLoading(state: DeliveriesSliceI) {
      return { ...state, isLoading: true };
    },
    finishedLoading(state: DeliveriesSliceI) {
      return { ...state, isLoading: false };
    },
    setDeliveriesStateAction(state: DeliveriesSliceI, action: PayloadAction<DeliveriesSliceI>) {
      return {
        ...state,
        ...action.payload
      };
    },
    setAddressStateAction(state: DeliveriesSliceI, action: PayloadAction<DeliveriesSliceI>) {
      return {
        ...state,
        ...action.payload
      };
    },
    resetSelectedState(state: DeliveriesSliceI) {
      return {
        ...state,
        addressSelected: null,
        deliverySelected: null
      };
    }
  }
});

export default deliverySlice.reducer;
export const {
  setDeliveriesStateAction,
  setAddressStateAction,
  resetSelectedState,
  startLoading,
  finishedLoading
} = deliverySlice.actions;
