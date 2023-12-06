import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: '',
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  function handleRemoveItem(
    productId: number,
    quantity: number = 1,
    name: string
  ) {
    setStatus({ loading: true, name });
    agent.Basket.deleteItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  if (!basket)
    return <Typography variant='h3'>Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ marginRight: 10 }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align='center'>
                  <LoadingButton
                    color='error'
                    loading={
                      status.loading && status.name === 'rem' + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        'rem' + item.productId
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color='secondary'
                    loading={
                      status.loading && status.name === 'add' + item.productId
                    }
                    onClick={() =>
                      handleAddItem(item.productId, 'add' + item.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align='right'>
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align='right'>
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'del' + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        'del' + item.productId
                      )
                    }
                    color='error'
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
