// @mui
import { Grid, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonProductDetail() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Skeleton variant="rectangular" width="90%" sx={{ paddingTop: '85%', borderRadius: 2 }} />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" height={240} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
    </Grid>
  );
}
