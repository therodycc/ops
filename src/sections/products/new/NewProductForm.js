import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
  Autocomplete,
  TextField
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_PRODUCTS } from '../../../routes/paths';
// _mock
// components
import Label from '../../../components/Label';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar
} from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// Services
import { productService } from '../../../services/product.service';
// ----------------------------------------------------------------------

NewProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function NewProductForm({ isEdit = false, currentProduct }) {
  const { push } = useRouter();

  const [activeSubstances, setActiveSubstances] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    productTypeId: Yup.number().required('La categoria es requerida'),
    sellPrice: Yup.number('Ingresar un numero').required('El precio de compra es requerido'),
    buyPrice: Yup.number('Ingresar un numero').required('El precio de venta es requerido'),
    description: Yup.string().nullable(),
    blisterSize: Yup.number('Ingresar un numero').nullable(),
    stock: Yup.number('Ingresar un numero').required('La cantidad es inventario es requerida'),
    activeSubstances: Yup.array(),
    photo: Yup.mixed().test('required', 'La foto es requerida', value => value !== ''),
    displayInMobile: Yup.boolean().nullable()
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      productType: currentProduct?.productType || 0,
      sellPrice: currentProduct?.sellPrice || undefined,
      buyPrice: currentProduct?.buyPrice || undefined,
      description: currentProduct?.description || undefined,
      blisterSize: currentProduct?.blisterSize || 0,
      stock: currentProduct?.stock || undefined,
      activeSubstances: currentProduct?.activeSubstances || [],
      photo: currentProduct?.photo || '',
      displayInMobile: currentProduct?.displayInMobile || true
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

  useEffect(() => {
    productService.getActiveSubstances().then(activeSubstances => {
      setActiveSubstances(activeSubstances?.data ?? []);
    });

    productService.getProductTypes().then(productTypes => {
      setProductTypes(productTypes?.data ?? []);
    });
  }, []);

  const onSubmit = async () => {
    try {
      const form = new FormData();

      for (var key in values) {
        form.append(key, values[key]);
      }

      await productService.save(form);

      enqueueSnackbar(
        !isEdit ? 'Producto creado satisfactoriamente!' : 'Producto actualizado satisfactoriamente!'
      );
      reset();
      // push(PATH_PRODUCTS.root);
    } catch (error) {
      // enqueueSnackbar(
      //   !isEdit ? 'Producto creado satisfactoriamente!' : 'Producto actualizado satisfactoriamente!'
      // );
      console.error(error);
    }
  };

  const onFileSelected = useCallback(
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
                onDrop={onFileSelected}
                name="photo"
                accept="image/*"
                maxSize={3145728}
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

            {/* {isEdit && (
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
            )} */}
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
              <RHFTextField
                name="name"
                placeholder="Complejo B"
                size="small"
                label="Nombre Producto"
              />
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
                name="productType-obj"
                size="small"
                autoCapitalize={true}
                options={productTypes}
                getOptionLabel={productType => productType.name}
                onChange={(_, productType) => {
                  setValue('productTypeId', productType.id);
                }}
                renderInput={params => (
                  <TextField {...params} label="Categoria" placeholder="Categoria" />
                )}
              />

              <Autocomplete
                multiple
                fullWidth
                name="activeSubstances"
                size="small"
                options={activeSubstances}
                getOptionLabel={option => option.name}
                filterSelectedOptions
                onChange={(_, activeSubstance) => {
                  const value = JSON.stringify(
                    activeSubstance.map(element => {
                      return { id: element.id };
                    })
                  );

                  setValue('activeSubstances', value);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Sustancia Activa (Si aplica)"
                    placeholder="Sustancia Activa (Si aplica)"
                  />
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
              <RHFTextField
                name="buyPrice"
                InputLabelProps={{ shrink: true }}
                placeholder="0.00"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  type: 'number'
                }}
                size="small"
                label="Costo Compra"
              />

              <RHFTextField
                name="sellPrice"
                placeholder="0.00"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  type: 'number'
                }}
                size="small"
                label="Precio Venta"
              />

              <RHFTextField
                name="stock"
                size="small"
                placeholder="100"
                label="Cantidad en Inventario"
              />
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
                  xs: 'repeat(1, 1fr)'
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
