import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_PRODUCTS } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { authService } from '../../../services/auth.service';
import { login, loginSuccess } from '../../../redux/slices/auth';
import { useRouter } from 'next/router';
import { setSession } from '../../../utils/jwt';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const { user, error, isLoading } = useSelector(state => state.auth);

  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      replace(PATH_PRODUCTS.root);
    }
  }, [user]);

  useEffect(() => {
    if (!error) return;
    reset();
    if (isMountedRef.current) {
      setError('afterSubmit', { ...error, message: error.message });
    }
  }, [reset, error]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Correo invalido').required('Correo requerido'),
    password: Yup.string().required('Contraseña requireda')
  });

  const defaultValues = {
    email: 'user1@gmail.com',
    password: '12345678'
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async credentials => {
    dispatch(login(credentials));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Olvidaste tu clave?</Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Inicia Sesión
      </LoadingButton>
    </FormProvider>
  );
}
