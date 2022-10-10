import React from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '../../../../interfaces/order/order';
import { AppState } from '../../../../redux/rootReducer';
import { SectionAlreadySelected } from './SectionAlreadySelected';
import { SectionAssignOrder } from './SectionAssignOrder';

export const DeliveryTab = () => {
  const { detail } = useSelector<AppState, OrderState>(state => state.order);

  return (
    <React.Fragment>
      {detail?.delivery ? <SectionAlreadySelected /> : <SectionAssignOrder />}
    </React.Fragment>
  );
};
