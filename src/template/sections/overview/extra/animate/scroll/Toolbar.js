import PropTypes from 'prop-types';
// @mui
import { Paper, IconButton } from '@mui/material';
import Iconify from '../../../../../../components/Iconify';
// components

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  onRefresh: PropTypes.func
};

export default function Toolbar({ onRefresh, ...other }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      {...other}
    >
      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}
