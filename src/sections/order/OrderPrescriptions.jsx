import { Typography } from '@mui/material';
import { Carousel } from '../../components/Carousel';

// ----------------------------------------------------------------------

export const OrderPrescriptions = ({ prescriptions }) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'center', color: 'text.secondary' }}
      >
        Recetas
      </Typography>

      <Carousel photos={prescriptions} />
    </>
  );
};
