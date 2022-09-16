import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

moment.locale('en-ES');

import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { OrderStatus } from '../../../../enums/order.status';
import { Role } from '../../../../enums/roles';
import { OrderDetail, OrderState } from '../../../../interfaces/order/order';
import { AuthState } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/rootReducer';
import { removeDetail, sendOrderToCashRegisterAction } from '../../../../redux/slices/order';
import { PATH_ORDER } from '../../../../routes/paths';
import { BoxDetails } from '../../../common/box/BoxDetails';
import { OrderPrescriptions } from '../OrderPrescriptions';
import OrderDetailsOptions from './OrderDetailsOptions';
import orderResumeOptions from './orderResumeOptions';

interface OrderDetailSummaryProp {
  orderDetail: OrderDetail;
}

export const OrderDetailSummary: React.FC<OrderDetailSummaryProp> = ({
  orderDetail
}: OrderDetailSummaryProp) => {
  const { isLoading: isOrderLoading } = useSelector<AppState, OrderState>(
    (state: AppState) => state.order
  );

  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    user: { role }
  } = useSelector<AppState, AuthState>((state: AppState) => state.auth);

  const sendOrderToCashRegister = useCallback(() => {
    dispatch(sendOrderToCashRegisterAction(orderDetail?.id));
  }, [dispatch, orderDetail?.id]);

  useEffect(() => {
    if (orderDetail?.status === OrderStatus.PENDING_PAYMENT && role === Role.OPERATOR)
      [dispatch(removeDetail()), push(PATH_ORDER.root)];
  }, [orderDetail?.status, role]);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} md={9} lg={8} spacing={1}>
        <Grid item xs={12} md={7} lg={7}>
          <BoxDetails
            isLoading={!orderDetail}
            header="Detalle"
            rows={OrderDetailsOptions({ orderDetail })}
            footerSection={
              <React.Fragment>
                {orderDetail?.products?.length > 0 &&
                  role !== Role.CASHIER &&
                  role !== Role.DELIVERY &&
                  orderDetail.status === OrderStatus.DRAFT && (
                    <LoadingButton
                      fullWidth
                      className=""
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={sendOrderToCashRegister}
                      loading={isOrderLoading}
                      style={{ marginTop: '1rem' }}
                    >
                      Enviar orden a caja
                    </LoadingButton>
                  )}
              </React.Fragment>
            }
          />
        </Grid>

        <Grid item xs={12} md={5} lg={5}>
          <BoxDetails
            isLoading={!orderDetail}
            header="Resumen de la orden"
            rows={orderResumeOptions({ orderDetail })}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={3} lg={4}>
        <OrderPrescriptions prescriptions={orderDetail?.prescriptions} />
      </Grid>
    </Grid>
  );
};
