import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '../../../../interfaces/order/order';
import { AppState } from '../../../../redux/rootReducer';
import { getNameOfKeys } from '../../../../settings/getKeyNames';
import { BoxDetails } from '../../../common/box/BoxDetails';

const getRows = obj =>
  Object.entries(obj || {})?.map(([title, description]) => ({
    title: getNameOfKeys(title),
    description
  }));

export const SectionAlreadySelected = () => {
  const { detail } = useSelector<AppState, OrderState>(state => state.order);

  const { address, lon, lat, id, ...rest } = detail?.delivery?.address;

  return (
    <React.Fragment>
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={6} md={5} lg={6}>
          <BoxDetails
            isLoading={false}
            header="Delivery"
            rows={getRows(detail?.delivery?.employee)}
          />
        </Grid>
        <Grid item xs={6} md={5} lg={6}>
          <BoxDetails isLoading={false} header="Dirección" rows={getRows(rest)} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
