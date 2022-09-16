import React from 'react';
import { OrderPayment } from '../../../../../enums/order.payment';

export const PaymentsOptions = () => {
  let options = [
    {
      id: 1,
      title: 'Efectivo',
      methodId: OrderPayment.CASH,
      icons: ['/illustrations/ic_cash.svg'],
      description: 'Efectivo en caja',
      active: false
    },
    {
      id: 5,
      title: 'Tarjeta de credito al Mensajero',
      methodId: OrderPayment.TC,
      icons: ['/illustrations/ic_visa.svg', '/illustrations/ic_mastercard.svg'],
      description: 'Pagar en Tarjeta de Credito al Mensaje cuando se haga la entrega',
      active: false
    },
    {
      id: 4,
      title: 'Efectivo al Mensajero',
      methodId: OrderPayment.CASH_DELIVERY,
      icons: [],
      description: 'Pagar en efectivo cuando al Mensaje cuando se haga la entrega',
      active: false
    }
  ];
  return options;
};
