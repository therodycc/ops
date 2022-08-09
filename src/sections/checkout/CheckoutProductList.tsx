// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer
} from '@mui/material';
// utils
// import getColorName from '../../utils/getColorName';
import { fCurrency } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { CartProduct } from '../../interfaces/product/product';
import { ProductUnit } from '../../enums/product-unit.enum';
import { useState } from 'react';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

interface CheckoutProductListProps {
  products: CartProduct[];
  onDelete(cardId: string | number): void;
  onDecrease(cartId: number, productId: number, quantity: number, unit: ProductUnit): void;
  onIncrease(cartId: number, productId: number, quantity: number, unit: ProductUnit): void;
}
export const CheckoutProductList = ({
  products,
  onDelete,
  onDecrease,
  onIncrease
}: CheckoutProductListProps) => {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(product => {
            const { id, cartId, name, price, total, photo, quantity, unit, stock } = product;
            return (
              <TableRow key={`${id}-${unit}`}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      alt="product image"
                      src={photo}
                      sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                    />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 180 }}>
                        {name}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant="body2">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          ></Typography>
                          {unit}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(total)}</TableCell>

                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={stock}
                    onIncrease={(updatedQuantity: number) =>
                      onIncrease(cartId, id, updatedQuantity, unit)
                    }
                    onDecrease={(updatedQuantity: number) =>
                      onDecrease(cartId, id, updatedQuantity, unit)
                    }
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(parseInt(price) * quantity)}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onDelete(product.cartId)}>
                    <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  const onIncreaseHandler = () => {
    setProductQuantity(actual => actual + 1);
    setTimeout(() => onDecrease(productQuantity + 1), 0);
  };

  const onDecreaseHandler = () => {
    setProductQuantity(actual => actual - 1);
    setTimeout(() => onDecrease(productQuantity - 1), 0);
  };

  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton
          size="small"
          color="inherit"
          onClick={onDecreaseHandler}
          disabled={productQuantity <= 1}
        >
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {productQuantity}
        <IconButton
          size="small"
          color="inherit"
          onClick={onIncreaseHandler}
          disabled={productQuantity >= available}
        >
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Disponible: {available}
      </Typography>
    </Box>
  );
}
