import { Button, Card, Stack, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Iconify from '../../../Iconify';
import { AddressInfo, AddressInfoProps } from './AddressInfo';

interface DeliveryBoxProps {
  title: ReactNode;
  addressInfo: AddressInfoProps | null;
  emptyBody: ReactNode;
  rightSection: ReactNode;
}

export const DeliveryBox: FC<DeliveryBoxProps> = ({
  title,
  addressInfo,
  emptyBody,
  rightSection
}) => {
  return (
    <React.Fragment>
      <Card sx={{ width: '100%', padding: 3 }}>
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled' }}>
              {title}
            </Typography>
            {rightSection}
          </Stack>
          {addressInfo ? <AddressInfo {...addressInfo} /> : emptyBody}
        </Stack>
      </Card>
    </React.Fragment>
  );
};
