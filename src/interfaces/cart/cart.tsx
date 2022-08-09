import { ProductUnit } from '../../enums/product-unit.enum';
import { CartProduct } from '../product/product';

export interface CartState {
  error: any;
  isLoading: boolean;
  products: CartProduct[];
  itbis: number;
  total: number;
  discount: number;
  subTotal: number;
}
export interface CartDto {
  cartId?: number;
  profileId?: number;
  productId: any;
  quantity: number;
  unit: ProductUnit;
}
