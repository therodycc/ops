import PropTypes from 'prop-types';
// @mui
import { Box, Paper, FormControlLabel, Switch, IconButton } from '@mui/material';
import Iconify from '../../../../../../components/Iconify';
// components

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  isText: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeText: PropTypes.func,
  onChangeMulti: PropTypes.func,
  onRefresh: PropTypes.func
};

export default function Toolbar({
  isText,
  isMulti,
  onChangeText,
  onChangeMulti,
  onRefresh,
  ...other
}) {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      {...other}
    >
      <FormControlLabel
        control={<Switch checked={isText} onChange={onChangeText} />}
        label="Text Object"
      />

      <Box sx={{ flexGrow: 1 }} />

      {!isText && (
        <FormControlLabel
          control={<Switch checked={isMulti} onChange={onChangeMulti} />}
          label="Multi Item"
        />
      )}

      <IconButton onClick={onRefresh}>
        <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
      </IconButton>
    </Paper>
  );
}