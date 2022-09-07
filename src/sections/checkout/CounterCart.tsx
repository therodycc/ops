import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import Iconify from '../../components/Iconify';

interface CounterCartPropsI {
  onDecrease: Function;
  onIncrease: Function;
  quantity: number;
  available: number;
}
const IncrementerStyle = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

export const CounterCart: FC<CounterCartPropsI> = ({
  available,
  quantity,
  onIncrease,
  onDecrease
}) => {
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  const onIncreaseHandler = () => {
    setProductQuantity(actual => actual + 1);
    setTimeout(() => onDecrease(productQuantity + 1), 0);
  };

  const onDecreaseHandler = () => {
    setProductQuantity(actual => actual - 1);
    setTimeout(() => onDecrease(productQuantity - 1), 0);
  };

  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton
          size="small"
          color="inherit"
          onClick={onDecreaseHandler}
          disabled={productQuantity <= 1}
        >
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {productQuantity}
        <IconButton
          size="small"
          color="inherit"
          onClick={onIncreaseHandler}
          disabled={productQuantity >= available}
        >
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Disponible: {available}
      </Typography>
    </Box>
  );
};
