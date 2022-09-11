import { Stack, Typography, Box } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { ColumnsTableI, ColumnsI } from '../../../../interfaces/table/table.interface';

interface PaymentsColumnsProps extends ColumnsTableI {}

export const PaymentsColumns = ({ children }: PaymentsColumnsProps) => {
  let columns: ColumnsI[] = [
    {
      title: 'ID',
      render: ({ data }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">{data?.id}</Typography>
          </Stack>
        );
      }
    },
    {
      title: 'Monto',
      render: ({ data }) => {
        return <Typography>{data?.amount}</Typography>;
      }
    },
    {
      title: 'Recibido por',
      render: ({ data }) => {
        return <Typography>{data.reference}</Typography>;
      }
    },
    {
      title: 'Metodo de pago',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{data?.method}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Fecha',
      render: ({ data }) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{moment(new Date(data.date)).fromNow()}</Typography>
          </Box>
        );
      }
    }
  ];
  return children({ columns });
};
