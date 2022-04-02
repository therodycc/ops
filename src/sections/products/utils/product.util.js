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

  if (sellType === 'UNIT') {
    return {
      price: product.price.price * quantity,
      priceWithDiscount: applyDiscount ? product.price.priceWithDiscount * quantity : undefined
    };
  }

  return {
    price: product.price.blisterPrice * quantity,
    priceWithDiscount: applyDiscount ? product.price.blisterPriceWithDiscount * quantity : undefined
  };
};
