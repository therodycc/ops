import { ProductUnit } from '../../enums/product-unit.enum';

export interface CartDto {
  cartId?: number;
  profileId?: number;
  productId: any;
  quantity: number;
  unit: ProductUnit;
}
