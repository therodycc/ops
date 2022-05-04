import { ProductUnit } from '../../enums/product-unit.enum';

export interface CartDto {
  productId: number;
  quantity: number;
  selectedSellType: ProductUnit;
}
