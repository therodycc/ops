import React from 'react';
import Layout from '../../../layouts';
import TableFC from '../../common/table/table';
import ColumnsProductsOrder from './ColumnsProductsOrder';

let testData = [
  {
    id: '1',
    price: '$100.00',
    unit: '12',
    photo: 'http://odoo-community.org/web/image/product.template/3936/image_1024?unique=6f59a22'
  },
  {
    id: '1',
    price: '$100.00',
    unit: '12',
    photo: 'http://odoo-community.org/web/image/product.template/3936/image_1024?unique=6f59a22'
  }
];

const ProductOrderTable = () => {
  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <React.Fragment>
      <ColumnsProductsOrder handleDelete={handleDelete}>
        {({ columns }) => <TableFC columns={columns} data={testData} />}
      </ColumnsProductsOrder>
    </React.Fragment>
  );
};

export default ProductOrderTable;

ProductOrderTable.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
