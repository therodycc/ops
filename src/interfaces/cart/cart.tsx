import { ProductUnit } from '../../enums/product-unit.enum';

export interface CartDto {
  profileId?: number;
  productId: any;
  quantity: number;
  unit: ProductUnit;
}
