import { Card, CardContent, CardHeader, Skeleton, Stack } from '@mui/material';
import React, { FC } from 'react';

export const VerticalBox: FC = ({ children }) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader title={'Detalles'} />
        <CardContent>
          <Stack spacing={2}>
            {false ? (
              [...Array(2)].map((item, index) => (
                <div
                  key={index}
                  className=""
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Skeleton variant="text" width={'100%'} height={20} />
                </div>
              ))
            ) : (
              <React.Fragment>{children}</React.Fragment>
            )}
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
