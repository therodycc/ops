import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/rootReducer';
import {
  DeliveriesSliceI,
  setAddressStateAction
} from '../../../../../redux/slices/delivery/delivery';
import { AddressItem } from '../../../../common/list-items/AddressItem';
import EmptyContent from '../../../../EmptyContent';
import { Scrollbar } from '../../../../Scrollbar';

interface AddressModalProps {
  toggleModalAddress: Function;
}

export const AddressModal: FC<AddressModalProps> = ({ toggleModalAddress }) => {
  const dispatch = useDispatch();
  const { addresses, addressSelected } = useSelector<AppState, DeliveriesSliceI>(
    state => state.delivery
  );

  const handleSelected = (selected: Object) => {
    dispatch(setAddressStateAction({ addressSelected: selected }));
    toggleModalAddress?.();
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Selecciona una dirección </Typography>
        {/* <Button
          size="small"
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Agregar nueva
        </Button> */}
      </Stack>
      <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 60 * 8 }}>
        {addresses?.map((item, index) => (
          <AddressItem
            key={item.id}
            title={item.city}
            subtitle={item.address}
            description={item.apartment}
            selected={addressSelected?.id === item?.id}
            action={() => handleSelected(item)}
          />
        ))}
        {!addresses.length && (
          <EmptyContent
            title={''}
            description={'No hay direcciones disponibles'}
            img={'/assets/svg/address/address.svg'}
          />
        )}
      </Scrollbar>
    </React.Fragment>
  );
};
