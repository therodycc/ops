import { Checkbox, FormGroup, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormInputsProps } from '../../../interfaces/form/form.interface';

export const ClientFormOptions = ({ form, actions, handleChange }): FormInputsProps[] => {
  const onPhoneChange = e => {
    const { value } = e.target;
    if (value?.length === 10) actions?.getClientData(value);
    handleChange(e);
  };

  let inputs: FormInputsProps[] = [
    {
      type: 'phone',
      label: 'Telefono',
      cols: 12,
      props: {
        name: 'phone',
        onChange: onPhoneChange,
        maxLength: 10
      }
    },
    {
      type: 'text',
      label: 'Primer Nombre',
      cols: 6,
      props: {
        name: 'firstName',
        placeholder: 'Ej. Manuel',
        disabled: actions?.isDisabledInputs
      }
    },
    {
      type: 'text',
      label: 'Primer Apellido',
      cols: 6,
      props: {
        name: 'lastName',
        placeholder: 'Ej. Perez',
        disabled: actions?.isDisabledInputs
      }
    },
    {
      type: 'text',
      label: 'Email',
      cols: 6,
      props: {
        name: 'email',
        placeholder: 'Ej. manuelperez@gmail.com',
        disabled: actions?.isDisabledInputs
      }
    },
    {
      type: 'customSection',
      cols: 6,
      section: (
        <FormControl
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 10px'
          }}
        >
          <RadioGroup onChange={handleChange} value={form?.gender || 'female'} name="gender">
            <Grid item sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Femenino"
                disabled={actions?.isDisabledInputs}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Masculino"
                disabled={actions?.isDisabledInputs}
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      )
    },
    {
      type: 'customSection',
      cols: 12,
      section: (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={e =>
                  handleChange({ target: { value: e.target.checked, name: 'showDirection' } })
                }
                value={!!form?.showDirection}
                checked={!!form?.showDirection}
                name="showDirection"
              />
            }
            label="Agregar nueva direccion"
          />
        </FormGroup>
      )
    }
  ];

  if (form?.showDirection) {
    inputs = inputs.concat([
      {
        type: 'text',
        label: 'Calle',
        cols: 6,
        props: {
          name: 'street',
          placeholder: 'Ej. Bartolome Frechi'
        }
      },
      {
        type: 'number',
        label: 'Numero # ',
        cols: 3,
        props: {
          name: 'number',
          placeholder: 'Ej. # 10'
        }
      },
      {
        type: 'text',
        label: 'Sector',
        cols: 3,
        props: {
          name: 'sector',
          placeholder: 'Ej. El Almirante'
        }
      },
      {
        type: 'text',
        label: 'Referencias',
        cols: 12,
        props: {
          name: 'references',
          placeholder: 'Ej. El Cerca del super mercado Casa edwin'
        }
      },
      {
        type: 'text',
        label: 'Edificio',
        cols: 4,
        props: {
          name: 'building',
          placeholder: 'Ej. El Cerca del super mercado Casa edwin'
        }
      },
      {
        type: 'text',
        label: 'apartamento',
        cols: 4,
        props: {
          name: 'apartment',
          placeholder: 'Ej. '
        }
      },
      {
        type: 'number',
        label: 'Piso',
        cols: 4,
        props: {
          name: 'floor',
          placeholder: 'Ej. # 5 '
        }
      }
    ]);
  }

  return inputs;
};

export const clientFormRules = () => {
  return {
    phone: {
      isRequired: {
        message: 'Tu primer nombre es requerido'
      }
    },
    firstName: {
      isRequired: {
        message: 'Tu primer nombre es requerido'
      }
    },
    lastName: {
      isRequired: {
        message: 'Tu apellido es requerido'
      }
    },
    email: {
      isRequired: {
        message: 'Tu email es requerido'
      },
      isValidEmail: {
        message: 'Tu email es invalido'
      }
    },
    street: {
      isRequired: {
        message: 'La calle es requerido'
      }
    },
    number: {
      isRequired: {
        message: 'El numero es requerido'
      }
    },
    sector: {
      isRequired: {
        message: 'Tu sector es requerido'
      }
    }
  };
};
