import { createContext } from 'react';
import { PaymentContextI } from './payment.interface';

export const PaymentContext = createContext({} as PaymentContextI);
