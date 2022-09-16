import { useReducer, useRef } from 'react';
import { IInitialPaymentState } from './payment.interface';
import { PaymentContext } from './PaymentContext';
import { paymentReducer } from './PaymentReducer';

const INITIAL_STATE: IInitialPaymentState = {
  step: 0,
  methodId: null,
  isLoading: false,
  error: null
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, INITIAL_STATE);

  const changeStep = (step: number) => {
    dispatch({ type: 'CHANGE_STEP', payload: { step } });
  };

  const handleMethodChange = (methodId: number) => {
    dispatch({
      type: 'CHANGE_METHOD',
      payload: { methodId }
    });
  };

  const toggleLoading = () => {
    dispatch({ type: 'LOADING_TOGGLE' });
  };

  const handleError = (error: string) => {
    dispatch({ type: 'ERROR_REQUEST', payload: { error } });

    setTimeout(() => {
      dispatch({ type: 'ERROR_REQUEST', payload: { error: null } });
    }, 3000);
  };

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        changeStep,
        handleMethodChange,
        toggleLoading,
        handleError
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
