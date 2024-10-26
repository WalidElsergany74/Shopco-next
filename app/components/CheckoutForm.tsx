"use client";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { ICartItem } from '../interfaces';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';


const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);
  const [existingCart, setExistingCart] = useState<any>(null);

  const shippingInfo = localStorage.getItem('shippingInfo');
  const savedData = shippingInfo ? JSON.parse(shippingInfo) : null;

  // Fetch cart data in useEffect using axios
  useEffect(() => {
    const fetchCartData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_STRAPI_URL}/carts?populate=cart_items&filters[userId][$eq]=${userId}`
          );
          const cartData = response.data.data[0]; // Assuming the user has only one cart
          setExistingCart(cartData);
          setCartProducts(cartData?.cart_items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCartData();
  }, [userId]); // Fetch cart only when userId is available

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const handleError = (error: any) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    try {
      await createOrder();
      await sendEmail();

      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const res = await fetch('/api/create-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount,
        }),
      });
      const clientSecret = await res.json();

      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/payment-confirm',
        },
      });

      if (result.error) {
        handleError(result.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred during the payment process.');
    } finally {
      setLoading(false);
    }
  };

  // Create Order function
  const createOrder = async () => {
    try {
      const formData = new FormData();
      const shippingInfo = localStorage.getItem('shippingInfo');
      const savedData = shippingInfo ? JSON.parse(shippingInfo) : null;

      if (savedData) {
        formData.append('data[firstName]', savedData?.firstName || '');
        formData.append('data[lastname]', savedData?.lastName || '');
        formData.append('data[email]', savedData?.email || '');
        formData.append('data[country]', savedData?.country || '');
        formData.append('data[state]', savedData?.state || '');
        formData.append('data[city]', savedData?.city || '');
        formData.append('data[address]', savedData?.address || '');
        formData.append('data[phonenumber]', savedData?.phone || '');
      }

      const shippingResponse = await axios.post(
        `${process.env.NEXT_STRAPI_URL}/shippings`,
        formData
      );

      if (shippingResponse.status === 200 || shippingResponse.status === 201) {
        const shippingId = shippingResponse.data.data.id;
        localStorage.removeItem('shippingInfo');

        const orderData = {
          amount,
          userId,
          shipping: shippingId,
          cart_items: cartProducts.map((item) => ({
            id: item.id,
          })),
        };

        const orderResponse = await axios.post(
          `${process.env.NEXT_STRAPI_URL}/orders?populate=*`,
          { data: orderData }
        );

        if (orderResponse.status === 200 || orderResponse.status === 201) {
          const cartId = existingCart?.documentId;
          await axios.delete(`${process.env.NEXT_STRAPI_URL}/carts/${cartId}`);
        }
      }
    } catch (error) {
      console.error('Error creating order in Strapi:', error);
    }
  };

 
  // Send email
const sendEmail = async () => {
  const productDetails = cartProducts
    .map(
      (product) =>
        `Product: ${product.name}, Price: ${product.price} $, Quantity: ${product.quantity}`
    )
    .join('\n');

  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
      email: savedData?.email,
      fullName: savedData?.firstName + ' ' + savedData?.lastName,
      productDetails: productDetails,
    }),
  });
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-12 py-10 mb-16 p-6 mx-2 sm:mx-4 md:mx-[100px] lg:mx-[400px]">
        <PaymentElement />
        <button
          disabled={loading}
          className="w-full disabled:bg-slate-700 disabled:cursor-none p-3 mt-4 text-white rounded-md bg-black"
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
      </div>
    </form>
  );
};

export default CheckoutForm;
