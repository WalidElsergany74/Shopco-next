"use client"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useSearchParams } from 'next/navigation';
import Footer from '../components/Footer';
import Header from '../components/Header';



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string);

export default function App() {
    const searchParams = useSearchParams();
  const options : StripeElementsOptions = {
 mode : "payment",
 currency : "usd",
 amount : Number(searchParams.get("amount")) * 100
  };

  return (

      <>
      <Header />
      <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get('amount'))} />
    </Elements>
    <Footer />
    </>
   
  
  );
};