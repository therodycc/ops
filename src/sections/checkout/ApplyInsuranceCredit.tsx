import React, { useEffect, useState } from 'react';

// @mui
import {
  Card,
  Stack,
  CardHeader,
  CardContent,
  TextField,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import { useForm } from 'react-hook-form';
// utils
import { Insurance } from '../../interfaces/insurance';
import { FormProvider, RHFTextField } from '../../components/hook-form';

import Iconify from '../../components/Iconify';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export interface InsuranceCredit {
  amount: number;
  reference: string;
  insurance: Insurance;
}

interface InsuranceCreditProps {
  total: number;
  onApply(credit: InsuranceCredit): void;
}

const ApplyInsuranceCreditComponent = ({ total, onApply }: InsuranceCreditProps) => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  const methods = useForm();

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;
  const values = watch();

  useEffect(() => {
    setInsurances([
      { id: 1, name: 'Humano', logo: 'some' },
      { id: 2, name: 'Universal', logo: 'some' }
    ]);
  }, []);

  const applyCredit = () => {
    onApply(values as InsuranceCredit);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(applyCredit)}>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Seguro medico"
          // action={
          //   enableEdit && (
          //     <Button size="small" onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
          //       Edit
          //     </Button>
          //   )
          // }
        />

        <CardContent>
          <Stack spacing={2}>
            <Autocomplete
              name="insurance"
              fullWidth
              isOptionEqualToValue={(option, value) => option.id === value.id}
              size="small"
              options={insurances}
              getOptionLabel={(insurance: Insurance) => insurance.name}
              onChange={(_, insurance: Insurance) => {
                if (!insurance) return;
                setValue('insurance', insurance.id);
              }}
              renderInput={params => (
                <TextField {...params} label="Proveedor" placeholder="Proveedor" />
              )}
            />
            <Stack direction="row" justifyContent="space-around">
              <RHFTextField
                name="amount"
                InputLabelProps={{ shrink: true }}
                placeholder="925.50"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  type: 'number'
                }}
                sx={{ mr: 2.0 }}
                size="small"
                label="Monto Aprobado"
              />

              <RHFTextField
                name="reference"
                placeholder="AFC312442"
                InputProps={{
                  startAdornment: <InputAdornment position="start">#</InputAdornment>,
                  type: 'text'
                }}
                size="small"
                label="No. Autorizacion"
              />
            </Stack>

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Aplicar Cobertura
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export const ApplyInsuranceCredit = React.memo(ApplyInsuranceCreditComponent);
