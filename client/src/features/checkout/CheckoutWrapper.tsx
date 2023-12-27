import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch } from '../../app/store/configureStore';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { setBasket } from '../basket/basketSlice';
import Loading from '../../app/layout/Loading';

const stripePromise = loadStripe(
  'pk_test_51MXt69KlCGHoRojPc1KR25dQY7S9FHViXhqpVdwtYiOuyemFOLqJdJ0YV1Vr99scCxLGOMzdKBx7PpcOxOxB9EPm00BPaHFhCs'
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message='Loading...' />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
