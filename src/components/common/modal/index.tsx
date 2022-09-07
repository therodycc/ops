import { DialogContent, DialogTitle } from '@mui/material';
import React, { FC, ReactNode, useState } from 'react';
import getVariant from '../../../template/sections/overview/extra/animate/getVariant';
import { DialogAnimate } from '../../animate';

interface NetzerModalPropsI {
  title: string;
  active: boolean;
  toggle: Function;
  footerSection?: ReactNode;
}

export const NetzerModal: FC<NetzerModalPropsI> = ({
  children,
  footerSection,
  title,
  active,
  toggle
}) => {
  return (
    <React.Fragment>
      <DialogAnimate
        maxWidth="lg"
        open={active}
        onClose={toggle}
        variants={getVariant('slideInUp')}
        sx={{
          maxWidth: '100%'
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        {footerSection && <DialogContent>{footerSection}</DialogContent>}
      </DialogAnimate>
    </React.Fragment>
  );
};
