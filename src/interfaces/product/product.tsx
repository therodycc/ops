export interface Product {
  id: number;
  name: string;
  photo: string;
  stock: number;
  quantity: number;
  price: any;
  selectedSellType: 'UNIT' | 'BLISTER';
  blisterSize: number;
  activeSubstances: { id: number; name: string }[];
}
