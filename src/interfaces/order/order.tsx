import { ProductUnit } from '../../enums/product-unit.enum';
import { CartProduct } from '../product/product';

export interface OrderState {
  error: any;
  isLoading: boolean;
  created?: OrderDto;
  orders: OrderDto[];
}

export interface OrderDto {
  id: number;
  officeId: number;
  profile: OrderProfileDto;
  products: CreateOrderProductDto[];
  prescriptions?: any[];
  createdDate: Date;
}

export interface OrderProfileDto {
  id: number;
  name: string;
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
