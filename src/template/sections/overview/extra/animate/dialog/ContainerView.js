import PropTypes from 'prop-types';
// @mui
import {
  Paper,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';

//
import getVariant from '../getVariant';
import { DialogAnimate } from '../../../../../../components/animate';

// ----------------------------------------------------------------------

ContainerView.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  selectVariant: PropTypes.string
};

export default function ContainerView({ isOpen, onOpen, onClose, selectVariant, ...other }) {
  return (
    <Paper
      sx={{
        height: 480,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.neutral'
      }}
      {...other}
    >
      <Button variant="contained" onClick={onOpen}>
        Click Me!
      </Button>
      <DialogAnimate open={isOpen} onClose={onClose} variants={getVariant('slideInUp')}>
        <DialogTitle id="alert-dialog-title">{`Use Google's location service?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button variant="contained" onClick={onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </DialogAnimate>
    </Paper>
  );
}
