/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockOpenOutlined } from '@mui/icons-material';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error });
        } else if (error.includes('Email')) {
          setError('email', { message: error });
        } else if (error.includes('Username')) {
          setError('username', { message: error });
        }
      });
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOpenOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Register
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful');
              navigate('/login');
            })
            .catch((error) => handleApiErrors(error)),
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='Username'
          autoFocus
          {...register('username', {
            required: 'Username is required',
          })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message:
                'Password must be between 6 and 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/login'>
              {'Already have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
