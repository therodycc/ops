import { ProductUnit } from '../enums/product-unit.enum';
import { Product } from '../interfaces/product/product';

export const getPriceAndApplyDiscount = (product: Product, unit: ProductUnit): number => {
  let _price = product.hasDiscount ? product.price[unit]?.discount : product.price[unit]?.original;
  return _price;
};

export const getPriceWithoutDiscount = (product: Product, unit: ProductUnit): number => {
  let _price = product.price[unit].original;
  return _price;
};
