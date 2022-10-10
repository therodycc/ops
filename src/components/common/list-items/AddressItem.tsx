import { ListItemButton, Typography } from '@mui/material';
import React, { FC } from 'react';

interface AddressItemProps {
  title: string;
  subtitle: string;
  description: string;
  selected: boolean;
  action: Function;
}

export const AddressItem: FC<AddressItemProps> = React.memo(
  ({ title, subtitle, description, selected, action }) => {
    return (
      <React.Fragment>
        <ListItemButton
          selected={selected}
          onClick={() => action?.()}
          sx={{
            p: 1.5,
            borderRadius: 1,
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <Typography variant="subtitle2">{title}</Typography>
          <Typography
            variant="caption"
            sx={{ color: 'primary.main', my: 0.5, fontWeight: 'fontWeightMedium' }}
          >
            {subtitle}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </ListItemButton>
      </React.Fragment>
    );
  }
);

AddressItem.displayName = 'AddressItem';
