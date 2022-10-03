import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressI, ProfileI } from '../../interfaces/client/client.interface';

export interface CartOrderState {
  progressDataToCreateOrder?: ProgressDataToCreateOrder | null;
  showDirection?: boolean;
  existClient?: boolean;
  profileId?: string;
}

export interface ProgressDataToCreateOrder {
  profile?: ProfileI | null;
  address?: AddressI | null;
}

const initialState: CartOrderState = {
  progressDataToCreateOrder: null
};

const cartOrderSlice = createSlice({
  name: 'cartOrder',
  initialState,
  reducers: {
    assignClientToOrderAction(state: CartOrderState, action: PayloadAction<CartOrderState>) {
      return (state = {
        ...state,
        ...action.payload
      });
    }
  }
});

export default cartOrderSlice.reducer;
export const { assignClientToOrderAction } = cartOrderSlice.actions;
