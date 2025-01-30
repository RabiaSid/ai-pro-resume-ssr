import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../services/Auth";
import Cookies from "js-cookie";

const StripeForm = ({ amount, currency }) => {
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log here the card number

    if (elements === null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const formData = new FormData();
    formData.append("amount", Number(amount * 100));
    formData.append("currency", currency);
    const res = await fetch(
      "https://backend.aiproresume.com/public/api/create-payment-intent",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    const data = await res.json();
    const { client_secret: clientSecret } = data.data;

    const { error, paymentMethod } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // return_url: "http://localhost:3000/my-transaction",
        runme: () => {
          console.log(paymentMethod);
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        type="submit"
        className="bg-primary text-center text-white py-3 px-4 font-bold text-lg sm:text-xl rounded-full my-4 w-full sm:w-auto   hover:bg-[#0056b1d2]"
        disabled={!stripe || !elements}
      >
        Pay with card
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51OEUmkGaxxNRTGagQIYF34iTl3r85j1GMZDKbq7jnesM3AzvN5MyudpkqwjLr9m1PLNjjKLz0G7MQCPOPpiL5jar00XuVUMSb8"
);

const options = {
  mode: "payment",
  amount: 1000,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const CheckoutForm = ({ amount, currency }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm amount={amount} currency={currency} />
    </Elements>
  );
};

export default CheckoutForm;
