import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { NetzerButton } from '../../../common/button';
import { NetzerForm } from '../../../common/form';
import { LoadingPoints } from '../../../common/loading/loading-points';
import { addressFormOptions, addressFormRules } from './AddressFormOptions';

interface AddressFormProps {
  toggle: Function;
}

export const AddressForm: FC<AddressFormProps> = ({ toggle }) => {
  const handleSubmit = form => {};

  return (
    <React.Fragment>
      <Grid item position={'relative'} justifyContent="flex-start">
        {false && <LoadingPoints />}
        <NetzerForm
          inputsData={addressFormOptions}
          handleSubmit={handleSubmit}
          dataRules={addressFormRules}
          footerSection={
            <Grid item display={'flex'} justifyContent="flex-end">
              <NetzerButton
                variant="outlined"
                style={{ margin: '1rem 0.7rem' }}
                isLoading={false}
                onClick={() => toggle()}
              >
                Cancelar
              </NetzerButton>
              <NetzerButton style={{ margin: '1rem 0.7rem' }} isLoading={false} type="submit">
                Agregar dirección
              </NetzerButton>
            </Grid>
          }
        />
      </Grid>
    </React.Fragment>
  );
};
