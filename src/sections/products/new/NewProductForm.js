import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Tooltip,
  IconButton,
  Autocomplete,
  TextField
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_PRODUCTS } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar
} from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

NewProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

export default function NewProductForm({ isEdit = false, currentProduct }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    photo: Yup.mixed().test('required', 'Avatar is required', value => value !== '')
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      email: currentProduct?.email || '',
      phoneNumber: currentProduct?.phoneNumber || '',
      address: currentProduct?.address || '',
      country: currentProduct?.country || '',
      state: currentProduct?.state || '',
      city: currentProduct?.city || '',
      zipCode: currentProduct?.zipCode || '',
      photo: currentProduct?.photo || '',
      isVerified: currentProduct?.isVerified || true,
      status: currentProduct?.status,
      company: currentProduct?.company || '',
      role: currentProduct?.role || ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_PRODUCTS.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photo',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="photo"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Permitido *.jpeg, *.jpg, *.png
                    <br /> Tamaño maximo de {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={event =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)' }
              }}
            >
              <RHFTextField name="name" size="small" label="Nombre Producto" />
            </Box>

            <Box
              sx={{
                display: 'grid',
                mt: 3.0,
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
              }}
            >
              <Autocomplete
                fullWidth
                options={countries}
                size="small"
                getOptionLabel={countries => countries.label}
                filterSelectedOptions
                renderInput={params => (
                  <TextField {...params} label="Categoria" placeholder="Categoria" />
                )}
              />

              <Autocomplete
                multiple
                fullWidth
                size="small"
                options={TAGS_OPTION}
                getOptionLabel={option => option}
                // defaultValue={[TAGS_OPTION[0]]}
                filterSelectedOptions
                renderInput={params => (
                  <TextField {...params} label="Sustancia Activa" placeholder="Sustancia Activa" />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                mt: 3.0,
                columnGap: 3,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(3, 1fr)'
                }
              }}
            >
              <RHFTextField name="buyPrice" size="small" label="Costo Unidad $" />
              <RHFTextField name="sellType" size="small" label="Precio Venta $" />
              <RHFTextField name="stock" size="small" label="Disponible Para Venta" />
            </Box>

            <RHFTextField
              name="blisterSize"
              sx={{ width: '30%', mt: 3.0 }}
              label="Tamaño del blister"
              size="small"
            />

            <Tooltip
              title={
                'Aplica para algunos medicamentos que se venden tanto por unidad como el blister completo'
              }
              placement="top"
              sx={{ mt: 2.0 }}
            >
              <IconButton>
                <Iconify icon={'mdi-light:information'} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>

            <RHFTextField
              sx={{
                display: 'grid',
                mt: 3.0
              }}
              name="description"
              label="Información adicional (Opcional)"
              fullWidth
              multiline
              rows={3}
            />

            <Box
              sx={{
                display: 'grid',
                mt: 3.0,
                columnGap: 1,
                rowGap: 1,
                gridTemplateColumns: {
                  xs: 'repeat(3, 1fr)'
                }
              }}
            >
              <RHFSwitch
                name="displayInMobile"
                label="Mostrar en la Aplicacion"
                labelPlacement="start"
                sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between', value: true }}
              />
            </Box>
            <Tooltip
              title={'Se mostrara el producto en la aplicacion movil?'}
              placement="top"
              sx={{ mt: -12.0, ml: 27.0 }}
            >
              <IconButton>
                <Iconify icon={'mdi-light:information'} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Producto' : 'Guardar cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
