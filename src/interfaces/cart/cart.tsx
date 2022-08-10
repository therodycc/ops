import { ProductUnit } from '../../enums/product-unit.enum';
import { CartProduct } from '../product/product';

export interface CartState {
  error: any;
  isLoading: boolean;
  products: CartProduct[];
  itbis: string;
  total: string;
  discount: string;
  subTotal: string;
}

export interface CartDto {
  cartId?: number;
  profileId?: number;
  productId: number;
  quantity: number;
  unit: ProductUnit;
}
