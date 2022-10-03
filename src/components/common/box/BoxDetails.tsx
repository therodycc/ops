import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import React, { ReactNode } from 'react';
import Iconify from '../../Iconify';

interface BoxDetailsPropsI {
  header: ReactNode | string;
  rows: { title?: string | ReactNode; description?: string | ReactNode; divider?: boolean }[];
  footerSection?: ReactNode;
  isLoading?: boolean;
}

export const BoxDetails = ({
  rows,
  header,
  footerSection,
  isLoading = false
}: BoxDetailsPropsI) => {
  return (
    <React.Fragment>
      <Card>
        <Grid padding="0 20px" marginTop={'20px'}>
          {typeof header === 'string' ? <Typography variant="h6">{header}</Typography> : header}
        </Grid>
        <CardContent>
          <Stack spacing={2}>
            {isLoading
              ? [...Array(rows.length || 5)].map((item, index) => (
                  <div
                    key={index}
                    className=""
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Skeleton variant="text" width={'40%'} height={30} />
                    <Skeleton variant="text" width={'50%'} height={30} />
                  </div>
                ))
              : rows?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item?.divider ? (
                      <Divider />
                    ) : (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.title}
                        </Typography>
                        {typeof item.description === ('object' || 'function') ? (
                          item.description
                        ) : (
                          <Typography variant="subtitle2">{item.description}</Typography>
                        )}
                      </Stack>
                    )}
                  </React.Fragment>
                ))}
          </Stack>
          {footerSection}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
