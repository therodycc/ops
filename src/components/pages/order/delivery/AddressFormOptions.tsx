import { FormInputsProps } from '../../../../interfaces/form/form.interface';

export const addressFormOptions = (): FormInputsProps[] => {
  return [
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
  ];
};

export const addressFormRules = () => {
  return {
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
