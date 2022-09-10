import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

export const SkeletonBody = ({ columns }) => {
  return (
    <React.Fragment>
      <TableBody>
        {[...Array(10)]?.map((row, iRow) => (
          <TableRow key={iRow}>
            {columns?.map((head, index) => (
              <TableCell key={index}>
                <Skeleton animation="wave" variant="text" width={'100%'} height={15} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </React.Fragment>
  );
};
