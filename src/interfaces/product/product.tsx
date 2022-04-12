export interface Product {
  id: number;
  name: string;
  stock: number;
  quantity: number;
  selectedSellType: 'UNIT' | 'BLISTER';
  blisterSize: number;
  activeSubstances: { id: number; name: string }[];
}
