// ----------------------------------------------------------------------

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow:
            '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)'
        },
        listbox: {
          padding: '8px',
          '& .MuiAutocomplete-option': {
            padding: '8px',
            margin: '8px 0px',
            borderRadius: 8
          }
        }
      }
    }
  };
}
