import { LoadingButton } from '@mui/lab';
import { Button, Card, Divider, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderState } from '../../../../interfaces/order/order';
import { AppState } from '../../../../redux/rootReducer';
import { DeliveriesSliceI } from '../../../../redux/slices/delivery/delivery';
import {
  assignOrderToDelivery,
  getAllDeliveries,
  getProfileAddresses
} from '../../../../redux/slices/delivery/delivery.service';
import { NetzerModal } from '../../../common/modal';
import EmptyContent from '../../../EmptyContent';
import Iconify from '../../../Iconify';
import { AddressModal } from '../modals/delivery/AddressModal';
import { DeliveryModal } from '../modals/delivery/DeliveryModal';
import { DeliveryBox } from './DeliveryBox';

export const SectionAssignOrder = () => {
  const dispatch = useDispatch();
  const { detail } = useSelector<AppState, OrderState>(state => state.order);
  const { query } = useRouter();
  const id: string = query.id as string;

  const {
    deliverySelected,
    addressSelected,
    isLoading: isAssigningOrder
  } = useSelector<AppState, DeliveriesSliceI>(state => state.delivery);

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    dispatch(getAllDeliveries());
  }, []);

  useEffect(() => {
    if (!detail?.profile?.id) return;
    dispatch(getProfileAddresses(detail?.profile?.id));
  }, [detail?.profile?.id]);

  const toggleModalDelivery = () => {
    setShowDeliveryModal(_prev => !_prev);
  };

  const toggleModalAddress = () => {
    setShowAddressModal(_prev => !_prev);
  };

  const assignOrderToDeliveryFC = async () => {
    dispatch(
      assignOrderToDelivery(
        {
          addressId: addressSelected?.id,
          employeeId: deliverySelected.id,
          orderId: detail.id
        },
        id
      )
    );
  };

  return (
    <React.Fragment>
      <Stack
        spacing={{ xs: 2, md: 5 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            flexItem
            // orientation={upMd ? 'vertical' : 'horizontal'}
            orientation={'vertical'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        <DeliveryBox
          title={'Delivery'}
          rightSection={
            <Button
              size="small"
              startIcon={<Iconify icon="eva:edit-fill" />}
              onClick={toggleModalDelivery}
            >
              {deliverySelected ? 'Cambiar' : 'Selecciona un delivery'}
            </Button>
          }
          addressInfo={
            deliverySelected
              ? {
                  title: `${deliverySelected?.name} -  ${deliverySelected?.identification}`,
                  description: deliverySelected?.phone,
                  subTitle: deliverySelected?.email
                }
              : null
          }
          emptyBody={
            <EmptyContent
              title={'No hay data para mostrar'}
              description={'Por favor, selecciona un delivery'}
              img={'/assets/svg/delivery/delivery.svg'}
            />
          }
        />
        <DeliveryBox
          title={'Dirección'}
          rightSection={
            <Button
              size="small"
              startIcon={<Iconify icon="eva:edit-fill" />}
              onClick={toggleModalAddress}
            >
              {addressSelected ? 'Cambiar' : 'Selecciona una dirección'}
            </Button>
          }
          addressInfo={
            addressSelected
              ? {
                  title: addressSelected?.sector,
                  subTitle: addressSelected?.address,
                  description: addressSelected?.street
                }
              : null
          }
          emptyBody={
            <EmptyContent
              title={'No hay una dirección seleccionada'}
              description={'Todavia no se ha seleccionado ninguna direccion'}
              img={'/assets/svg/address/address.svg'}
            />
          }
        />
      </Stack>
      <Grid container display="flex" justifyContent="flex-end" spacing={2}>
        {deliverySelected && addressSelected && (
          <Grid item xs={4} sx={{ marginTop: 2 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isAssigningOrder}
              onClick={assignOrderToDeliveryFC}
              loading={isAssigningOrder}
            >
              Asignar
            </LoadingButton>
          </Grid>
        )}
      </Grid>
      <NetzerModal title="" active={showAddressModal} toggle={toggleModalAddress} maxWidth="sm">
        <AddressModal toggleModalAddress={toggleModalAddress} />
        {/* <AddressForm toggle={() => { }} /> */}
      </NetzerModal>
      <NetzerModal title="" active={showDeliveryModal} toggle={toggleModalDelivery} maxWidth="sm">
        <DeliveryModal toggleModalDelivery={toggleModalDelivery} />
      </NetzerModal>
    </React.Fragment>
  );
};
