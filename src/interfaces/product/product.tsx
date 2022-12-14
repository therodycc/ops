import { ProductUnit } from '../../enums/product-unit.enum';

export interface Product {
  id: number;
  productTypeId: number;
  name: string;
  barcode: string;
  photo: string;
  stock: number;
  quantity: number;
  price?: any;
  sellPrice?: number;
  buyPrice?: number;
  description?: string;
  selectedSellType: ProductUnit;
  displayInMobile: boolean;
  blisterSize: number;
  activeSubstances: string | { id: number; name: string }[];
  drugLab: number;
}
