import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePagination } from '../../../hooks/common/usePagination';
import { OrderState } from '../../../interfaces/order/order';
import { AppState } from '../../../redux/rootReducer';
import { getOrdersSummary } from '../../../redux/slices/order';
import { PATH_ORDER } from '../../../routes/paths';
import { NetzerTable } from '../../common/table';
import { OrdersColumns } from './OrdersColumns';

export const OrdersTable = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { handleChangePage, handleChangeRowsPerPage, page, size } = usePagination();
  const { orders, count, isLoading } = useSelector<AppState, OrderState>(state => state.order);

  const goToDetail = useCallback((id: string) => {
    push(PATH_ORDER.detail(id));
  }, []);

  useEffect(() => {
    dispatch(getOrdersSummary(page + 1, size));
  }, [page, size]);

  return (
    <React.Fragment>
      <OrdersColumns>
        {({ columns }) => (
          <NetzerTable
            columns={columns}
            data={orders}
            rowAction={({ data }) => goToDetail(data?.id)}
            pagination={{
              page,
              count,
              onPageChange: handleChangePage,
              rowsPerPage: size,
              onRowsPerPageChange: handleChangeRowsPerPage
            }}
          />
        )}
      </OrdersColumns>
    </React.Fragment>
  );
};
