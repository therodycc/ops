import * as Yup from 'yup';

export const NewProductSchema = Yup.object().shape({
  photo: Yup.mixed().test('required', 'La foto es requerida', value => value !== ''),
  name: Yup.string().required('El nombre es requerido'),
  barcode: Yup.string().nullable(),
  productTypeId: Yup.number().positive().required('La categoria es requerida'),
  activeSubstances: Yup.string(),
  drugLab: Yup.number(),
  stock: Yup.number().positive().required('La cantidad es inventario es requerida'),
  blisterSize: Yup.number().positive('La cantidad debe ser mayor a 1 ').nullable(),
  buyPrice: Yup.number().required('El costo es requerido').positive('El costo debe ser mayor a 1 '),

  priceOverCost: Yup.number()
    .positive('El precio de venta debe ser mayor a 1 ')
    .required('El precio de venta es requerido'),

  description: Yup.string().nullable(),
  displayInMobile: Yup.boolean().nullable()
});
