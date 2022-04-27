import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
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
import {
  FormProvider,
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar
} from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// Services
import { productService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product/product';
import { NewProductSchema } from './product-schema.validation';
// ----------------------------------------------------------------------

interface NewProductFormProps {
  currentProduct?: Product;
  isEdit?: boolean;
}

export default function NewProductForm({ isEdit = false, currentProduct }: NewProductFormProps) {
  const [activeSubstances, setActiveSubstances] = useState([]);
  const [drugLabs, setDrugLabs] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);

  const [hasDiscount, setHasDiscount] = useState(false);
  const [hasItbis, setHasItbis] = useState(false);
  const [priceOverCost, setPriceOverCost] = useState(0);

  const [productTypes, setProductTypes] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      barcode: currentProduct?.barcode || '',
      productTypeId: currentProduct?.productTypeId || '',
      sellPrice: currentProduct?.sellPrice || '',
      buyPrice: currentProduct?.buyPrice || '',
      description: currentProduct?.description || '',
      blisterSize: currentProduct?.blisterSize || '',
      stock: currentProduct?.stock || '',
      activeSubstances: currentProduct?.activeSubstances || [],
      photo: currentProduct?.photo || '',
      drugLab: currentProduct?.drugLab || [],
      displayInMobile: currentProduct?.displayInMobile || true
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const handleSelectedCategory = (_, productType) => {
    setHasDiscount(productType?.id === 1);
    setHasItbis(productType?.id > 0 && productType?.id !== 1);

    if (!productType) return;
    setValue('productTypeId', productType.id);
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues
  });

  const {
    reset,
    watch,
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

    productService.getDrugLabs().then(drugLabs => {
      setDrugLabs(drugLabs?.data ?? []);
    });
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      let price = 0;

      if (priceOverCost > 0 && values.buyPrice > 0 && values.productTypeId > 0) {
        price = Number(values.buyPrice) + Number(values.buyPrice) * priceOverCost;
        setValue('sellPrice', price);
      }

      if (hasItbis) {
        price += price * 0.18;
      }

      if (hasDiscount) {
        let priceWithDiscount = price - price * 0.1;
        setPriceWithDiscount(priceWithDiscount);
      } else {
        setPriceWithDiscount(0);
      }

      setTotalPrice(price);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
    // console.log(values.priceOverCost, values.hasDiscount);
  }, [hasDiscount, priceOverCost, values.buyPrice, hasItbis]);

  const onSubmit = async () => {
    try {
      const form = new FormData();
      console.log(values);

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
        <Grid item xs={12} md={3}>
          <Card sx={{ py: 10, px: 3 }}>
            {/* {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )} */}

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

        <Grid item xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
              }}
            >
              <RHFTextField
                name="name"
                placeholder="Complejo B"
                size="small"
                label="Nombre producto"
              />

              <RHFTextField
                name="barcode"
                placeholder="12212212413234"
                size="small"
                label="Codigo de barra (Si aplica)"
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                mt: 3.0,
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }
              }}
            >
              <Autocomplete
                fullWidth
                // name="productType-obj"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="small"
                options={productTypes}
                getOptionLabel={productType => productType.name}
                onChange={handleSelectedCategory}
                renderInput={params => (
                  <TextField {...params} label="Categoria" placeholder="Categoria" />
                )}
              />

              <Autocomplete
                multiple
                fullWidth
                size="small"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={activeSubstances}
                getOptionLabel={option => option.name}
                filterSelectedOptions
                onChange={(_, activeSubstance) => {
                  if (!activeSubstance) return;
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
                    label="Sustancia activa"
                    placeholder="Sustancia activa (Si aplica)"
                  />
                )}
              />

              <Autocomplete
                fullWidth
                size="small"
                options={drugLabs}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                filterSelectedOptions
                onChange={(_, selected: any) => {
                  if (!selected) return;
                  setValue('drugLab', selected.id);
                }}
                renderInput={params => (
                  <TextField {...params} label="Laboratorio (Si aplica)" placeholder="Medifarma" />
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
                  sm: 'repeat(4, 1fr)'
                }
              }}
            >
              <RHFTextField name="stock" size="small" placeholder="100" label="Cantidad Pedida" />

              <div>
                <RHFTextField
                  sx={{ width: '95%' }}
                  name="blisterSize"
                  label="Tamaño del blister"
                  size="small"
                />

                <Tooltip
                  title={
                    'Aplica para algunos medicamentos que se venden tanto por unidad como el blister completo'
                  }
                  placement="top"
                  sx={{ position: 'absolute', mt: '-10px' }}
                >
                  <IconButton>
                    <Iconify icon={'mdi-light:information'} sx={{ width: 20, height: 20 }} />
                  </IconButton>
                </Tooltip>
              </div>

              {/* DO NOT REMOVE */}
              <></>
              <></>
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

              <RHFSwitch
                sx={{ ml: 2 }}
                name="hasDiscount"
                value={values?.productTypeId > 0 && values?.productTypeId === 1}
                label="Descuentos"
              />

              <RHFSwitch
                name="itbis"
                value={values?.productTypeId > 0 && values?.productTypeId !== 1}
                label="Itbis"
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
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(1, 1fr)',
                  lg: 'repeat(1, 1fr)'
                }
              }}
            >
              <Stack direction="row">
                <Typography sx={{ mt: '10px' }} variant="body2">
                  Aplicar al costo
                </Typography>

                <RHFRadioGroup
                  sx={{ ml: '15px' }}
                  name="priceOverCost"
                  options={['0.3', '0.35', '0.4', '0.45', '0.5']}
                  onChange={e => {
                    setPriceOverCost(e.target.value);
                  }}
                  getOptionLabel={['30%', '35%', '40%', '45%', '50%']}
                />
              </Stack>
              <Typography variant="h4" sx={{ float: 'right' }}>
                <Box component="span">Costo de venta para el cliente: &nbsp;</Box>
                {priceWithDiscount > 0 && (
                  <Box
                    component="span"
                    sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
                  >
                    {totalPrice} &nbsp;
                  </Box>
                )}
                &nbsp; {priceWithDiscount > 0 ? priceWithDiscount : totalPrice}
              </Typography>
            </Box>

            <RHFTextField
              sx={{
                display: 'grid',
                mt: '40px'
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
                value={values?.displayInMobile}
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
