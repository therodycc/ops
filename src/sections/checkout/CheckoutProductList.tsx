import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  Divider,
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
import { Product } from '../../interfaces/product/product';

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
  products: Product[];
}
// CheckoutProductList.propTypes = {
//   products: PropTypes.array.isRequired,
//   onDelete: PropTypes.func,
//   onDecreaseQuantity: PropTypes.func,
//   onIncreaseQuantity: PropTypes.func
// };

export const CheckoutProductList = ({
  products
}: // onDelete,
// onIncreaseQuantity,
// onDecreaseQuantity
CheckoutProductListProps) => {
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
            const { id, name, price, photo, quantity, selectedSellType } = product;
            const available = true;
            const stock = 10;
            return (
              <TableRow key={`${id}-${selectedSellType}`}>
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
                          {selectedSellType}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price)}</TableCell>

                {/* TODO: handle product stock */}
                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={stock}
                    onDecrease={() => {}}
                    onIncrease={() => {}}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

                <TableCell align="right">
                  {/* <IconButton onClick={() => onDelete(id)}> */}
                  <IconButton onClick={() => null}>
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
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={quantity >= available}
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
