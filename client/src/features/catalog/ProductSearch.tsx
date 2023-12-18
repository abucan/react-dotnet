import { TextField, debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';
import { useState } from 'react';

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerms] = useState(productParams.searchTerms);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerms: event.target.value }));
  }, 1500);

  return (
    <TextField
      label='Search products'
      variant='outlined'
      fullWidth
      value={searchTerm || ''}
      onChange={(event: any) => {
        setSearchTerms(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
