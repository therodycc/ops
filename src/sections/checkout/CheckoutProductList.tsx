import React from 'react';
import { NetzerTable } from '../../components/common/table';
import { ProductUnit } from '../../enums/product-unit.enum';
import { usePagination } from '../../hooks/common/usePagination';
import { CartProduct } from '../../interfaces/product/product';
import { CheckoutProductsColumns } from './CheckoutProductsColumns';
interface CheckoutProductListProps {
  products: CartProduct[];
  onDelete(cardId: string | number): void;
  onDecrease(cartId: string, productId: string, quantity: number, unit: ProductUnit): void;
  onIncrease(cartId: string, productId: string, quantity: number, unit: ProductUnit): void;
}
export const CheckoutProductList = ({
  products,
  onDelete,
  onDecrease,
  onIncrease
}: CheckoutProductListProps) => {
  const { handleChangePage, handleChangeRowsPerPage, page, size } = usePagination();

  return (
    <React.Fragment>
      <CheckoutProductsColumns onDecrease={onDecrease} onDelete={onDelete} onIncrease={onIncrease}>
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={products}
            pagination={{
              page,
              count: 0, //TODO:RODY GET COUNT
              onPageChange: handleChangePage,
              rowsPerPage: size,
              onRowsPerPageChange: handleChangeRowsPerPage
            }}
          />
        )}
      </CheckoutProductsColumns>
    </React.Fragment>
  );
};
