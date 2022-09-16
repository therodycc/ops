export type TPaymentAction =
  | { type: 'CHANGE_STEP'; payload: { step: number } }
  | { type: 'CHANGE_METHOD'; payload: { methodId: number | null } }
  | { type: 'LOADING_TOGGLE' }
  | { type: 'ERROR_REQUEST'; payload: { error: string } };

export interface PaymentContextI extends IInitialPaymentState, PaymentsActions {}

export interface IInitialPaymentState {
  step: number;
  methodId: number;
  isLoading: boolean;
  error: string | null;
}

export interface PaymentsActions {
  changeStep: (step: number) => void;
  handleMethodChange: (methodId: number) => void;
  toggleLoading: () => void;
  handleError: (error: string) => void;
}
