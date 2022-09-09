import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductUnit } from '../../enums/product-unit.enum';
import { OrderState } from '../../interfaces/order/order';
import { AppState } from '../../redux/rootReducer';
import { getProducts } from '../../redux/slices/product';
import { dispatch } from '../../redux/store';
import { getPriceAndApplyDiscount } from '../../utils/price.utils';

export const useProductCart = () => {
  const [productsToBeAdded, setProductsToBeAdded] = useState([]);
  const { detail } = useSelector<AppState, OrderState>((state: AppState) => state.order);

  const [showError, setShowError] = useState({
    show: false,
    message: ''
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addNewProductTo = useCallback(
    product => {
      setShowError({
        show: false,
        message: ''
      });

      // first validations
      const productAlreadyInTheOrder = detail?.products.find(p => p.id === product.id);

      if (productAlreadyInTheOrder) {
        setShowError({
          show: true,
          message: 'El producto ya se encuentra en la orden'
        });
        return;
      }

      // second validations
      const productAlreadyAdded = productsToBeAdded?.find(p => p.id === product.id);

      if (productAlreadyAdded && Object.keys(product?.price)?.length < 2) {
        setShowError({
          show: true,
          message: 'El producto ya se encuentra en la lista de productos a agregar'
        });
        return;
      }
      // third validations

      const test = productsToBeAdded?.filter(item => item.id === product.id);

      const test2 = test.reduce((acc, item) => {
        if (item.unit === 'blister' || item.unit === 'unit') {
          acc = [...acc, item.unit];
        }
        return acc;
      }, []);

      if (test2.length === 2 || (test2.includes('blister') && test2.includes('unit'))) {
        setShowError({
          show: true,
          message: 'Ya existe el producto en unidad y blister'
        });
        return;
      }

      setProductsToBeAdded(_prev =>
        [
          ..._prev,
          {
            ...product,
            unit: productAlreadyAdded
              ? addDifferentUnitThatAlreadyExists(productAlreadyAdded.unit)
              : getPriorityOfUnit(product),
            quantity: 1,
            disabledSelected: false,
            total: getTotal(
              1,
              getPriceAndApplyDiscount(product, Object.keys(product?.price)?.[0] as ProductUnit)
            )
          }
        ].map(item => {
          productAlreadyAdded && item.id === product.id && (item.disabledSelected = true);
          return item;
        })
      );
    },
    [productsToBeAdded]
  );

  const getPriorityOfUnit = product => {
    if (product.blisterSize > 0) {
      return 'blister';
    } else return 'unit';
  };

  const addDifferentUnitThatAlreadyExists = unit => {
    if (unit === 'blister') {
      return 'unit';
    } else {
      return 'blister';
    }
  };

  const getTotal = useCallback((quantity: number | string, price: number | string) => {
    return Number(quantity) * Number(price);
  }, []);

  const selectedWayOfProduct = useCallback((product, way) => {
    setProductsToBeAdded(_prev => {
      const index = _prev.findIndex(_product => _product.id === product.id);
      _prev[index].unit = way;
      _prev[index].total = getTotal(
        _prev[index].quantity,
        _prev[index].price?.[product.unit]?.discount || _prev[index].price?.[product.unit]?.unit
      );
      return [..._prev];
    });
  }, []);

  const updateQuantity = (
    cartId: string,
    productId: string,
    quantity: number,
    unit: ProductUnit,
    productIndex?: number
  ) => {
    setProductsToBeAdded(_prev => {
      const index = _prev.findIndex((_, index) => index === productIndex);
      _prev[index].quantity = quantity;
      _prev[index].unit = unit;
      _prev[index].total = getTotal(
        _prev[index].quantity,
        _prev[index]?.price?.[unit]?.discount || _prev[index]?.price?.[unit]?.original
      );
      return [..._prev];
    });
  };

  const removeProduct = useCallback((index: number, productId: string) => {
    setProductsToBeAdded(_prev =>
      _prev
        .filter((_product, indexProduct) => index !== indexProduct)
        .map(_product => {
          if (_product.id === productId) _product.disabledSelected = false;
          return _product;
        })
    );
  }, []);

  return {
    productsToBeAdded: productsToBeAdded.sort((a, b) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? 1 : -1;
    }),
    selectedWayOfProduct,
    removeProduct,
    updateQuantity,
    addNewProductTo,
    showError
  };
};
