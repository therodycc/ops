import { Box } from '@mui/material';
import Image from '../../../components/Image';

export const ProductImage = ({ product }) => (
    <Box sx={{ p: 2 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <Image key={product.photo} alt="large image" src={product.photo} ratio="1/1" />
        </Box>
    </Box>
);

