import React, { useContext, useState } from 'react';
import { PaymentsTable } from './PaymentsTable';
import { NetzerModal } from '../../../common/modal/index';
import { useCallback } from 'react';
import { PaymentsModal } from '../modals/payments/PaymentsModal';
import { PaymentProvider } from '../../../../contexts/payment';
import { PaymentContext } from '../../../../contexts/payment';
const title = 'Metodos de pago';
export const Payments = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalPaymentsMethods = useCallback(() => {
    setShowModal(_prev => !_prev);
  }, []);

  return (
    <React.Fragment>
      <PaymentsTable onShowModalHandle={showModalPaymentsMethods} />
      <NetzerModal maxWidth="sm" title={title} active={showModal} toggle={showModalPaymentsMethods}>
        <PaymentProvider>
          <PaymentsModal showModalPaymentsMethods={showModalPaymentsMethods} />
        </PaymentProvider>
      </NetzerModal>
    </React.Fragment>
  );
};
