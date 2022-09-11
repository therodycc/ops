import React, { useState } from 'react';
import { PaymentsTable } from './PaymentsTable';
import { NetzerModal } from '../../../common/modal/index';
import { useCallback } from 'react';

export const Payments = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalPaymentsMethods = useCallback(() => {
    setShowModal(_prev => !_prev);
  }, []);

  return (
    <React.Fragment>
      <PaymentsTable onShowModalHandle={showModalPaymentsMethods} />
      <NetzerModal
        maxWidth="sm"
        title={'Metodo de pago'}
        active={showModal}
        toggle={showModalPaymentsMethods}
      ></NetzerModal>
    </React.Fragment>
  );
};
