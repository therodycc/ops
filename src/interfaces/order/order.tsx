import { OrderStatus } from '../../enums/order.status';
import { ProductUnit } from '../../enums/product-unit.enum';

export interface OrderState {
  error: any;
  count: number;
  isLoading: boolean;
  created?: OrderDto;
  orders: OrderSummary[];
  selected?: OrderDetail;
}

export interface OrderSummary {
  id: string;
  isDraft: boolean;
  status: OrderStatus;
  hasPrescriptions: boolean;
  statusDescription: string;
  source: 'ops' | 'mobile';
  profile: OrderProfile;
  payments: OrderPayments;
  date: {
    created: Date;
    lastModified: Date;
  };
}

export interface OrderDetail {
  id: string;
  officeId: string;
  profile: OrderProfile;
  prescriptions: string[];
  products: OrderProduct[];
  payments: OrderPayment[];
  summary: OrderSummaryDto;
  status: OrderStatus;
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
  officeId: string;
  profile: OrderProfile;
  products: CreateOrderProductDto[];
  prescriptions?: any[];
  createdDate: Date;
}

export interface OrderProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
}

export interface CreateOrderDto {
  profileId: string;
  officeId: string;
  products: CreateOrderProductDto[];
}

export interface CreateOrderProductDto {
  id: string;
  quantity: number;
  unit: ProductUnit;
}

export interface OrderProduct {
  id: string;
  name: string;
  photo: string;
  price: string;
  quantity: number;
  unit: ProductUnit;
}

export interface OrderPayment {
  id: string;
  method: string;
  amount: string;
  reference: string;
  status: string;
  date: string;
}

export interface OrderSummaryDto {
  itbis: string;
  discount: string;
  total: string;
}
