import { useEffect, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks

// components
import Image from './Image';
import Iconify from './Iconify';
import InputStyle from './InputStyle';
import SearchNotFound from './SearchNotFound';
import { productService } from '../services/product.service';
import useIsMountedRef from '../hooks/useIsMountedRef';
import { Product } from '../interfaces/product/product';

// ----------------------------------------------------------------------

const PopperStyle = styled(props => <Popper open={false} placement="bottom-start" {...props} />)({
  width: '280px !important'
});

// ----------------------------------------------------------------------

interface ProductSearchProps {
  placeholder?: string;
  onSelect(product: Product): void;
}
export const ProductSearch: React.FC<ProductSearchProps> = ({
  placeholder = 'Buscar productos...',
  onSelect
}: ProductSearchProps) => {
  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleChangeSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const handleChangeSearch = async value => {
    try {
      if (!value) return;
      const response = await productService.filter(value);

      if (isMountedRef.current) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleKeyUp = event => {
  //   if (event.key === 'Enter') {
  //     onSelect(searchQuery);
  //   }
  // };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      clearOnEscape={true}
      PopperComponent={PopperStyle}
      options={searchResults}
      disableCloseOnSelect={true}
      onInputChange={(event, value) => setSearchQuery(value)}
      getOptionLabel={product => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <InputStyle
          sx={{ width: 300 }}
          {...params}
          placeholder={placeholder}
          // onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            )
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { name, photo } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props} onClick={() => onSelect(product)}>
            <Image
              alt={photo}
              src={photo}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />
            <div>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};
