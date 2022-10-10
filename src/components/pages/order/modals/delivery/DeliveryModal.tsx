import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/rootReducer';
import {
  DeliveriesSliceI,
  setDeliveriesStateAction
} from '../../../../../redux/slices/delivery/delivery';
import { AddressItem } from '../../../../common/list-items/AddressItem';
import EmptyContent from '../../../../EmptyContent';
import { Scrollbar } from '../../../../Scrollbar';
interface DeliveryModalProps {
  toggleModalDelivery: Function;
}
export const DeliveryModal: FC<DeliveryModalProps> = ({ toggleModalDelivery }) => {
  const dispatch = useDispatch();
  const { deliveries, deliverySelected } = useSelector<AppState, DeliveriesSliceI>(
    state => state.delivery
  );

  const handleSelected = (selected: Object) => {
    dispatch(setDeliveriesStateAction({ deliverySelected: selected }));
    toggleModalDelivery?.();
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Selecciona un delivery </Typography>
      </Stack>
      <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 60 * 8 }}>
        {deliveries?.map((item: any, index: number) => (
          <AddressItem
            key={item.id}
            title={item?.name}
            subtitle={item?.email}
            description={item?.phone}
            selected={deliverySelected?.id === item?.id}
            action={() => handleSelected(item)}
          />
        ))}
        {!deliveries?.length && (
          <EmptyContent
            title={''}
            description={'No hay deliveries disponibles'}
            img={'/assets/svg/delivery/delivery.svg'}
          />
        )}
      </Scrollbar>
    </React.Fragment>
  );
};
