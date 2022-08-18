// @mui
import { Grid, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonOrderList() {
  return (
    <Grid item xs={10} md={10} lg={10} spacing={0}>
      <Skeleton variant="text" height={60} />
      <h3>Pending Skeleton</h3>
    </Grid>
  );
}
