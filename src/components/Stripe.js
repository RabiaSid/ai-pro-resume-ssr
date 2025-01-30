import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth } from "../services/Auth";

const ScriptForm = ({ submitData, amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    // Use elements.getElement to get a reference to the mounted PaymentElement
    const cardElement = elements.getElement(CardElement);

    // Create a PaymentMethod object
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      console.error(error);
    } else {
      const formData = new FormData();
      formData.append("amount", Number(amount * 100));
      formData.append("currency", currency);
      // Make an API request to create a PaymentIntent on your server
      const response = await fetch(
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

      const data = await response.json();

      // Handle response from server
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        // Get client secret from the response
        const clientSecret = data.data.client_secret;

        // Confirm the payment with the client secret
        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        // Handle the result of the payment confirmation
        if (confirmPayment.error) {
          setError(confirmPayment.error.message);
        } else {
          // Payment successful, submit the paymentMethod to parent component
          submitData(paymentMethod);
        }
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "20px",
        color: "#495057",
        fontFamily: "Arial, sans-serif",
        "::placeholder": {
          color: "#6c757d",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={cardElementOptions}
        className="border-2 py-2 px-2 border-primary"
      />

      <div className="px-2 mt-4">
        <span className="text-sm text-muted py-4">
          cardholders please enter your details with confidence, unlocking a
          seamless path to elevate your resume-building experience.
        </span>
      </div>

      <div className="flex justify-center items-center py-8">
        <button
          disabled={!stripe}
          className="bg-primary text-base font-bold text-white px-20 py-4 rounded-full hover:bg-[#0073b1cc]"
        >
          PAY NOW
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default ScriptForm;
