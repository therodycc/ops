export interface CartDto {
  productId: number;
  quantity: number;
  selectedSellType: 'UNIT' | 'BLISTER';
}
