import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { Notification } from '../../interfaces/notification';

const initialState: Notification = {
  type: null,
  message: null,
  new: false
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show(state, action) {
      const notification = action.payload;

      state.new = true;
      state.message = notification.message;
      state.type = notification.type;

      return state;
    },
    reset(state) {
      state.message = null;
      state.type = null;

      state.new = false;
      return state;
    }
  }
});

// ----------------------------------------------------------------------

export default notificationSlice.reducer;

export const notify = ({
  message = 'No fue posible realizar la operacion',
  type = 'success'
}: Notification) => {
  dispatch(notificationSlice.actions.show({ message, type }));
  setTimeout(() => dispatch(notificationSlice.actions.reset()), 0);
};
