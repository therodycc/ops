import { ProductUnit } from '../../../enums/product-unit.enum';

export const hasDiscount = price => {
  const applyDiscount = price.blisterPriceWithDiscount > 0 || price.priceWithDiscount > 0;
  return (
    applyDiscount &&
    (price.priceWithDiscount !== price.price ||
      (price.blisterPrice && price.blisterPriceWithDiscount !== price.blisterPrice))
  );
};

export const getPricesBySellTypeAndQuantity = (product, sellType, quantity) => {
  const applyDiscount = hasDiscount(product.price);

  if (sellType === ProductUnit.UNIT) {
    return {
      price: product.price.price * quantity,
      priceWithDiscount: applyDiscount ? product.price.priceWithDiscount * quantity : undefined
    };
  }

  const { blisterPrice, blisterPriceWithDiscount, price } = product.price;
  return {
    price: (blisterPrice ?? price) * quantity,
    priceWithDiscount: applyDiscount ? blisterPriceWithDiscount * quantity : undefined
  };
};
