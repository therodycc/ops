import { DialogContent, Grid, Typography } from '@mui/material';
import React, { FC, memo, ReactNode } from 'react';
import getVariant from '../../../template/sections/overview/extra/animate/getVariant';
import { DialogAnimate } from '../../animate';

interface NetzerModalPropsI {
  title?: string | ReactNode;
  active: boolean;
  toggle: Function;
  footerSection?: ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm';
}

export const NetzerModal: FC<NetzerModalPropsI> = memo(function NetzerModal({
  children,
  footerSection,
  title,
  active,
  toggle,
  maxWidth = 'lg'
}) {
  return (
    <React.Fragment>
      <DialogAnimate
        maxWidth={maxWidth}
        open={active}
        onClose={toggle}
        variants={getVariant('fadeIn')}
        sx={{
          maxWidth: '100%'
        }}
      >
        {title && (
          <Grid item sx={{ padding: '20px 20px 0px 20px' }}>
            {typeof title === 'string' ? (
              <Typography variant="subtitle1">{title}</Typography>
            ) : (
              title
            )}
          </Grid>
        )}
        <DialogContent sx={{}}>{children}</DialogContent>
        {footerSection && <DialogContent> {footerSection}</DialogContent>}
      </DialogAnimate>
    </React.Fragment>
  );
});
