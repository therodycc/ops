import { FormControlLabel, Radio, Box, Typography, Stack, styled } from '@mui/material';
import { useCallback } from 'react';
import useResponsive from '../../../../../hooks/useResponsive';
import Iconify from '../../../../Iconify';
import Image from '../../../../Image';

export const PaymentOptionItem = ({ id, icons, title, active, disabled, description, onClick }) => {
  const isDesktop = useResponsive('up', 'sm');

  const clickHandle = useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <div onClick={clickHandle}>
      <OptionStyle
        key={title}
        sx={{
          ...(active && {
            boxShadow: 'rgb(145 158 171 / 16%) 0px 20px 40px -4px'
          })
        }}
      >
        <FormControlLabel
          disabled={disabled && !active}
          checked={active}
          value={id}
          control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
          label={
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </Box>
          }
          sx={{ flexGrow: 1, py: 3 }}
        />

        {isDesktop && (
          <Stack direction="row" spacing={1} flexShrink={0}>
            {icons?.map(icon => (
              <Image key={icon} sx={{ width: '30px' }} alt={title} src={icon} />
            ))}
          </Stack>
        )}
      </OptionStyle>
    </div>
  );
};

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}));

// ----------------------------------------------------------------------
