import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { Product } from '../../app/models/product';
import { useEffect } from 'react';
import useProducts from '../../app/hooks/useProducts';
import AppSelectList from '../../app/components/AppSelectList';
import AppDropzone from '../../app/components/AppDropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidation } from './ProductValidation';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import { setProducts } from '../catalog/catalogSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver<any>(productValidation),
  });
  const { brands, types } = useProducts();
  const watchFile = watch('pictureUrl', null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [reset, product, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.createProduct(data);
      }

      dispatch(setProducts(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name='name' label='Product name' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              name='brand'
              label='Brand'
              items={brands}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              name='type'
              label='Type'
              items={types}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name='price'
              label='Price'
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name='quantityInStock'
              label='Quantity in Stock'
              type='number'
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              multiline={true}
              rows={4}
              name='description'
              label='Description'
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <AppDropzone control={control} name='pictureUrl' />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt='preview'
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
          <Button variant='contained' color='inherit' onClick={cancelEdit}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant='contained'
            color='success'
            type='submit'
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
