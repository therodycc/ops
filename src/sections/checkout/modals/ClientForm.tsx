import { Grid } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NetzerButton } from '../../../components/common/button';
import { NetzerForm } from '../../../components/common/form';
import { LoadingPoints } from '../../../components/common/loading/loading-points';
import { AppState } from '../../../redux/rootReducer';
import { assignClientToOrderAction, CartOrderState } from '../../../redux/slices/cart-order';
import { profileService } from '../../../services/profile.service';
import { formatDataClientToForm } from '../../../settings/checkout/getRowsForBoxClient';
import { ClientFormOptions, clientFormRules } from './ClientFormOptions';

interface ClientFormPropsI {
  toggle: Function;
}

const initialStateForm = () => ({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  gender: 'male'
});

export const ClientForm: FC<ClientFormPropsI> = ({ toggle }) => {
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledPersonalDataInput, setDisabledPersonalDataInput] = useState(true);
  const dispatch = useDispatch();

  const { progressDataToCreateOrder, existClient } = useSelector<AppState, CartOrderState>(
    state => state.cartOrder
  );

  useEffect(() => {
    if (existClient === undefined) return;
    setDisabledPersonalDataInput(existClient);
  }, [existClient]);

  const handleSubmit = useCallback(
    form => {
      const {
        firstName,
        lastName,
        fullName,
        email,
        phone,
        gender,
        addresses,
        showDirection,
        id,
        ...address
      } = form;
      let dataToSend = {
        profile: {
          firstName,
          lastName,
          email,
          phone,
          ...(id && { id })
        },
        ...(Object.keys(address).length && { address })
      };
      toggle?.();
      dispatch(
        assignClientToOrderAction({
          progressDataToCreateOrder: dataToSend,
          existClient: !!id,
          ...(id && { profileId: id })
        })
      );
    },
    [disabledPersonalDataInput, clientData]
  );

  const getClientData = async number => {
    if (progressDataToCreateOrder?.profile?.phone.replace(/\D/g, '') === number) return;
    setIsLoading(true);
    const result = await profileService.getByPhone(number);

    if (!result?.data || !result || result.error) {
      return [
        setDisabledPersonalDataInput(false),
        setIsLoading(false),
        setClientData(initialStateForm())
      ];
    }
    setClientData(result?.data);
    setDisabledPersonalDataInput(true);
    setIsLoading(false);
  };

  const isDisabledInputs = useMemo(() => {
    return disabledPersonalDataInput;
  }, [disabledPersonalDataInput]);

  return (
    <React.Fragment>
      <Grid item position={'relative'} justifyContent="flex-start">
        {isLoading && <LoadingPoints />}
        <NetzerForm
          initialState={clientData || formatDataClientToForm(progressDataToCreateOrder)}
          inputsData={ClientFormOptions}
          handleSubmit={handleSubmit}
          dataRules={clientFormRules}
          actions={{
            getClientData,
            isDisabledInputs
          }}
          footerSection={
            <Grid item display={'flex'} justifyContent="flex-end">
              <NetzerButton
                variant="outlined"
                style={{ margin: '1rem 0.7rem' }}
                isLoading={false}
                onClick={() => toggle()}
              >
                Cancelar selección
              </NetzerButton>
              <NetzerButton style={{ margin: '1rem 0.7rem' }} isLoading={false} type="submit">
                Confirmar selección
              </NetzerButton>
            </Grid>
          }
        />
      </Grid>
    </React.Fragment>
  );
};
