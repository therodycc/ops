import { OrderStatus } from '../../enums/order.status';
import { ProductUnit } from '../../enums/product-unit.enum';

export interface OrderState {
  error: any;
  count: number;
  isLoading: boolean;
  created?: OrderDto;
  orders: OrderSummary[];
}

export interface OrderSummary {
  id: string;
  isDraft: boolean;
  status: OrderStatus;
  hasPrescriptions: boolean;
  statusDescription: string;
  source: 'ops' | 'mobile';
  profile: OrderProfileDto;
  payments: OrderPayments;
  date: {
    created: Date;
    lastModified: Date;
  };
}

export interface OrderPayments {
  id: string;
  total: string;
  pending: string;
  isMissingPayment: boolean;
}

export interface OrderDto {
  id: string;
  officeId: number;
  profile: OrderProfileDto;
  products: CreateOrderProductDto[];
  prescriptions?: any[];
  createdDate: Date;
}

export interface OrderProfileDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
}

export interface CreateOrderDto {
  profileId: number;
  officeId: number;
  products: CreateOrderProductDto[];
}

export interface CreateOrderProductDto {
  id: number;
  quantity: number;
  unit: ProductUnit;
}
