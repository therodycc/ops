import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se encontraron resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Revisa si hay palabras mal escritas o usando
        palabras completas.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Por favor ingresa las palabras</Typography>
  );
}