export const formatAmount = (amount: number): string => {
  return `RD$ ${((amount * 100) / 100).toFixed(2)}`;
};
