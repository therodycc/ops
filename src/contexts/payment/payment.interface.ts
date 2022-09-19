export type TPaymentAction =
  | { type: 'CHANGE_STEP'; payload: { step: number } }
  | { type: 'CHANGE_METHOD'; payload: { methodId: number | null } }
  | { type: 'LOADING_TOGGLE' }
  | { type: 'ERROR_REQUEST'; payload: { error: string } }
  | { type: 'CHANGE_AMOUNT'; payload: { amount: number } };

export interface PaymentContextI extends IInitialPaymentState, PaymentsActions {}

export interface IInitialPaymentState {
  step: number;
  methodId: number;
  isLoading: boolean;
  error: string | null;
  amount: number;
}

export interface PaymentsActions {
  changeStep: (step: number) => void;
  handleMethodChange: (methodId: number) => void;
  toggleLoading: () => void;
  handleError: (error: string) => void;
  handleChangeAmount: (amount: number) => void;
}
