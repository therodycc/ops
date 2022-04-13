import * as React from 'react';

import { Box } from '@mui/material';
import Image from '../../../components/Image';
import { Product } from '../../../interfaces/product/product';

interface ProductImageProps {
  product: Product;
}

export const ProductImage = ({ product: { photo } }: ProductImageProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <Image key={photo} alt="large image" src={photo} ratio="1/1" sx={{}} />
      </Box>
    </Box>
  );
};
