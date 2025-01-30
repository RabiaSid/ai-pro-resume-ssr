// CheckoutForm.js
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ApiService } from "../services/ApiService";

const CheckoutForm = ({ handleFunction }) => {
  const stripePromise = loadStripe(
    "pk_live_51OlwcNJ8G3cNghLiKPXukz2bU172kwHRRx0tOwPoZ2XfmaluQDMOazSIY9hXmBiAsB2CrjWEpgexy0ayZVXHQdVv00JiyqEupq"
  );
  return <Form stripePromise={stripePromise} handleFunction={handleFunction} />;
};

const Form = ({ stripePromise, handleFunction }) => {
  const [client_secret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret = async () => {
    try {
      const response = await ApiService.getStripeKey();
      setClientSecret(response.data.data);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Customer Name",
        },
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else {
      handleFunction();
      console.log("Payment successful:", result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
