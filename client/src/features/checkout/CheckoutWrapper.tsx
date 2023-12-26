import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51MXt69KlCGHoRojPc1KR25dQY7S9FHViXhqpVdwtYiOuyemFOLqJdJ0YV1Vr99scCxLGOMzdKBx7PpcOxOxB9EPm00BPaHFhCs',
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
