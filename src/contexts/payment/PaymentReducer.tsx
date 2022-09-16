import { IInitialPaymentState, TPaymentAction } from './payment.interface';

export const paymentReducer = (state: IInitialPaymentState, action: TPaymentAction) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return {
        ...state,
        step: action.payload.step
      };
    case 'CHANGE_METHOD':
      return {
        ...state,
        methodId: action.payload.methodId
      };
    case 'LOADING_TOGGLE':
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case 'ERROR_REQUEST':
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
