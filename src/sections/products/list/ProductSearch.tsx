import { useEffect, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks

// routes
import { PATH_PRODUCTS } from '../../../routes/paths';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import SearchNotFound from '../../../components/SearchNotFound';
import { productService } from '../../../services/product.service';

// ----------------------------------------------------------------------

const PopperStyle = styled(props => <Popper open={false} placement="bottom-start" {...props} />)({
  width: '280px !important'
});

// ----------------------------------------------------------------------

export default function ProductSearch() {
  const { push } = useRouter();
  // const isMountedRef = useIsMountedRef();

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

      setSearchResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = id => {
    push(PATH_PRODUCTS.detail(id));
  };

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => setSearchQuery(value)}
      getOptionLabel={product => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <InputStyle
          sx={{ width: 300 }}
          {...params}
          placeholder="Buscar productos..."
          onKeyUp={handleKeyUp}
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
          <li {...props}>
            <Image
              alt={photo}
              src={photo}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
              ratio={{}}
            />
            <Link underline="none" onClick={() => handleClick(product.id)}>
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
            </Link>
          </li>
        );
      }}
    />
  );
}
