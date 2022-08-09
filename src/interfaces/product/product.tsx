import { ProductUnit } from '../../enums/product-unit.enum';

export interface Product {
  id: number | string;
  productTypeId: number;
  name: string;
  barcode: string;
  photo: string;
  stock: number;
  quantity: number;
  price?: any;
  sellPrice?: number;
  hasDiscount?: boolean;
  buyPrice?: number;
  description?: string;
  unit: ProductUnit;
  displayInMobile: boolean;
  blisterSize: number;
  activeSubstances: string | { id: number; name: string }[];
  drugLab: number;
}

export interface CartProduct {
  cartId: number;
  id: number;
  name: string;
  photo: string;
  price: string;
  total: string;
  quantity: number;
  stock: number;
  unit: ProductUnit;
}
