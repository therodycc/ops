import { Card, Typography } from '@mui/material';
import { Carousel } from '../../components/Carousel';
import EmptyContent from '../../components/EmptyContent';

// ----------------------------------------------------------------------

export const OrderPrescriptions = ({ prescriptions }) => {
  return (
    <Card>
      <Typography
        variant="h5"
        sx={{ display: 'flex', mt: '10px', justifyContent: 'center', color: 'text.secondary' }}
      >
        Recetas
      </Typography>

      {prescriptions.length > 0 && <Carousel photos={prescriptions} />}
      {prescriptions.length === 0 && (
        <EmptyContent
          title={''}
          description={'La orden no tiene indicacion'}
          img={'/illustrations/illustration_empty_cart.svg'}
        />
      )}
    </Card>
  );
};
