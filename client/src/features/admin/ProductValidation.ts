import * as yup from 'yup';

export const productValidation = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  price: yup.number().required().moreThan(100),
  quantityInStock: yup.number().required().min(0),
  type: yup.string().required(),
  description: yup.string().required(),
  pictureUrl: yup.mixed(),
});
