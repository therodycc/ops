import { ProductUnit } from '../../enums/product-unit.enum';

export interface Product {
  id: string;
  productTypeId: string;
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
  activeSubstances: string | { id: string; name: string }[];
  drugLab: number;
}

export interface CartProduct {
  cartId: string;
  id: string;
  name: string;
  photo: string;
  price: string;
  total: string;
  quantity: number;
  discount: string;
  stock: number;
  unit: ProductUnit;
}
