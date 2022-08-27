// @mui
import { TableRow, TableCell, Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={9}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Skeleton variant="text" width={240} height={40} />
          <Skeleton variant="text" width={160} height={40} />
          <Skeleton variant="text" width={160} height={40} />
          <Skeleton variant="text" width={160} height={40} />
          <Skeleton variant="text" width={160} height={40} />
          <Skeleton variant="text" width={160} height={40} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
