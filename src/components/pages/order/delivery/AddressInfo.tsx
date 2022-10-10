import { Grid, Typography, styled } from '@mui/material';
import React, { FC } from 'react';

export interface AddressInfoProps {
  title: string;
  subTitle: string;
  description: string;
}

export const AddressInfo: FC<AddressInfoProps> = ({ title, subTitle, description }) => {
  return (
    <React.Fragment>
      <OptionStyle key={title} sx={{}}>
        <Grid item padding={2}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
            {subTitle}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Grid>
      </OptionStyle>
    </React.Fragment>
  );
};

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 2.5),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}));
