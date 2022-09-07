import React from 'react';
import { OrderDetail } from '../../../interfaces/order/order';
import { NetzerTable } from '../../common/table';
import { ColumnsProductsOrder } from './ColumnsProductsOrder';
import { AddProductsToOrder } from './modals/AddProductsToOrder';

interface ProductOrderTableProps {
  products: OrderDetail['products'];
}

export const ProductOrderTable: React.FC<ProductOrderTableProps> = ({ products }) => {
  const handleDelete = () => {
    console.log('delete');
  };
  return (
    <React.Fragment>
      <AddProductsToOrder />
      <ColumnsProductsOrder handleDelete={handleDelete}>
        {({ columns }) => <NetzerTable columns={columns} data={products} />}
      </ColumnsProductsOrder>
    </React.Fragment>
  );
};
