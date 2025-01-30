import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../services/Auth";
import { ApiService } from "../../services/ApiService";
import { useCart } from "../../data/CartStore";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "2px solid #0073b1", // Custom border color
    borderRadius: "5px",
    padding: "2px",
    fontSize: "20px",
    backgroundColor: "#f8f9fa", // Light background for the input
    boxShadow: "none", // Removes the default box shadow
    "&:hover": {
      borderColor: "#005b9e", // Border color on hover
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "20px",
    color: "#6c757d", // Custom placeholder color
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // Menu background
    borderRadius: "5px",
    padding: "5px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for dropdown
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "18px",
    padding: "10px 20px",
    backgroundColor: state.isSelected ? "#0073b1" : "#ffffff", // Highlight selected option
    color: state.isSelected ? "#ffffff" : "#333333",
    "&:hover": {
      backgroundColor: "#e0f0ff", // Background on hover
      color: "#005b9e", // Text color on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "20px",
    color: "#333333",
  }),
};

const customStylesError = {
  control: (provided) => ({
    ...provided,
    border: "2px solid red", // Custom border color
    borderRadius: "5px",
    padding: "5px",
    fontSize: "20px",
    backgroundColor: "#f8f9fa", // Light background for the input
    boxShadow: "none", // Removes the default box shadow
    "&:hover": {
      borderColor: "#005b9e", // Border color on hover
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "20px",
    color: "#6c757d", // Custom placeholder color
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // Menu background
    borderRadius: "5px",
    padding: "5px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for dropdown
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "18px",
    padding: "10px 20px",
    backgroundColor: state.isSelected ? "#0073b1" : "#ffffff", // Highlight selected option
    color: state.isSelected ? "#ffffff" : "#333333",
    "&:hover": {
      backgroundColor: "#e0f0ff", // Background on hover
      color: "#005b9e", // Text color on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "20px",
    color: "#333333",
  }),
};

const StripeSeprateComponent = (props) => {
  const {
    packageId,
    packageDuration,
    packagePrice,
    services,
    discounted_amount,
    sub_total,
    tax_amount,
    total_amount,
    description,
    coupon_code,
    coupon_discount_percent,
    used_coins,
    tax_type,
    isLoading,
    selectedPlan,
    //coins
    coinsAreUSing,
    remaningUserCoins,
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [stripeSupportedCountries, _set] = useState([
    { label: "Argentina", value: "AR" },
    { label: "Australia", value: "AU" },
    { label: "Austria", value: "AT" },
    { label: "Belgium", value: "BE" },
    { label: "Bolivia", value: "BO" },
    { label: "Brazil", value: "BR" },
    { label: "Bulgaria", value: "BG" },
    { label: "Canada", value: "CA" },
    { label: "Chile", value: "CL" },
    { label: "Columbia", value: "CO" },
    { label: "Costa Rica", value: "CR" },
    { label: "Croatia", value: "HR" },
    { label: "Cyprus", value: "CY" },
    { label: "Czech Republic", value: "CZ" },
    { label: "Denmark", value: "DK" },
    { label: "Dominican Republic", value: "DO" },
    { label: "Egypt", value: "EG" },
    { label: "Estonia", value: "EE" },
    { label: "Finland", value: "FI" },
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { label: "Greece", value: "GR" },
    { label: "Hong Kong SAR China", value: "HK" },
    { label: "Hungary", value: "HU" },
    { label: "Iceland", value: "IS" },
    { label: "India", value: "IN" },
    { label: "Indonesia", value: "ID" },
    { label: "Ireland", value: "IE" },
    { label: "Israel", value: "IL" },
    { label: "Italy", value: "IT" },
    { label: "Japan", value: "JP" },
    { label: "Latvia", value: "LV" },
    { label: "Liechtenstein", value: "LI" },
    { label: "Lithuania", value: "LT" },
    { label: "Luxembourg", value: "LU" },
    { label: "Malta", value: "MT" },
    { label: "Mexico ", value: "MX" },
    { label: "Netherlands", value: "NL" },
    { label: "New Zealand", value: "NZ" },
    { label: "Norway", value: "NO" },
    { label: "Paraguay", value: "PY" },
    { label: "Peru", value: "PE" },
    { label: "Poland", value: "PL" },
    { label: "Portugal", value: "PT" },
    { label: "Romania", value: "RO" },
    { label: "Singapore", value: "SG" },
    { label: "Slovakia", value: "SK" },
    { label: "Slovenia", value: "SI" },
    { label: "Spain", value: "ES" },
    { label: "Sweden", value: "SE" },
    { label: "Switzerland", value: "CH" },
    { label: "Thailand", value: "TH" },
    { label: "Trinidad & Tobago", value: "TT" },
    { label: "United Arab Emirates", value: "AE" },
    { label: "United Kingdom", value: "GB" },
    { label: "United States", value: "US" },
    { label: "Uraguay", value: "UY" },
  ]);

  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setValue("name", user?.name);
    setValue("email", user?.email);
  }, []);

  const handleStripe = async (SubData) => {
    isLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: SubData.name,
        email: SubData.email,
        address: {
          line1: SubData.address,
          city: SubData.city,
          postal_code: SubData.postal_code,
          country: SubData.country?.value,
        },
      },
    });

    const cardLast4 = paymentMethod?.card?.last4;

    if (error) {
      setError(error.message);
      isLoading(false);
      console.error(error);
    } else {
      const formData = new FormData();
      formData.append("amount", Math.round(total_amount * 100));
      console.log(total_amount);
      console.log(Math.round(total_amount));
      console.log(Math.round(total_amount * 100));
      formData.append("currency", "usd");

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
      if (data.error) {
        setError(data.error);

        const submitData = {
          planId: selectedPlan,
          packageId,
          packageDuration,
          packagePrice,
          services,
          order_id: "",
          currency: "USD",
          discounted_amount,
          sub_total,
          tax_amount,
          total_amount,
          description,
          payment_type: "stripe",
          coupon_code,
          coupon_discount_percent,
          used_coins,
          tax_type,
          status: 0,
          decline_issue: "Pay_intent_api_issue",
          card_name: SubData.name,
          card_number: cardLast4,
        };

        ApiService.purchaseCoins(user?.token, submitData)
          .then((res) => console.log(res.data.data))
          .catch((err) => console.log(err));
      } else {
        const clientSecret = data.data.client_secret;

        const submitData = {
          planId: selectedPlan,
          packageId,
          packageDuration,
          packagePrice,
          services,
          order_id: clientSecret,
          currency: "USD",
          discounted_amount,
          sub_total,
          tax_amount,
          total_amount,
          description,
          payment_type: "stripe",
          coupon_code,
          coupon_discount_percent,
          used_coins,
          tax_type,
          status: 0,
          decline_issue: "",
          card_name: SubData.name,
          card_number: cardLast4,
        };

        //for services and pacakages
        ApiService.purchaseCoins(user?.token, submitData)
          .then((res) => {
            console.log("ressssssss");
            console.log(res);
            const order_unique_id = res.data.data.id;

            const handleStripePaymentConfirm = async () => {
              const confirmPayment = await stripe.confirmCardPayment(
                clientSecret,
                {
                  payment_method: paymentMethod.id,
                }
              );

              if (confirmPayment.error) {
                setError(confirmPayment.error.message);

                // const statusUpdateData = {
                //   id: order_unique_id,
                //   packageId,
                //   packageDuration,
                //   packagePrice,
                //   services,
                //   order_id: clientSecret,
                //   currency: "USD",
                //   discounted_amount,
                //   sub_total,
                //   tax_amount,
                //   total_amount,
                //   description,
                //   payment_type: "stripe",
                //   coupon_code,
                //   coupon_discount_percent,
                //   used_coins,
                //   tax_type,
                //   status: 0,
                //   card_number: cardLast4,
                //   card_name: SubData.name,
                //   decline_issue: confirmPayment.error.code,
                //   card_holder_email: SubData.email,
                //   address: SubData.address ? SubData.address : "",
                //   postal_code: SubData.postal_code ? SubData.postal_code : "",
                //   city: SubData.city ? SubData.city : "",
                //   state: SubData.state ? SubData.state : "",
                //   country: SubData.country?.value ? SubData.country.value : "",
                // };

                // ApiService.purchaseCoins(user?.token, statusUpdateData)
                //   .then((res) => {
                //     isLoading(false);
                //     swal({
                //       closeOnClickOutside: true,
                //       dangerMode: true,
                //       title: "Payment Failed",
                //       text: confirmPayment.error.message,
                //       icon: "warning",
                //     });
                //   })
                //   .catch((err) => console.log(err));
              } else {
                const statusUpdateData = {
                  id: order_unique_id,
                  planId: selectedPlan,
                  packageId,
                  packageDuration,
                  packagePrice,
                  services,
                  order_id: clientSecret,
                  currency: "USD",
                  discounted_amount,
                  sub_total,
                  tax_amount,
                  total_amount,
                  description,
                  payment_type: "stripe",
                  coupon_code,
                  coupon_discount_percent,
                  used_coins,
                  tax_type,
                  status: 1,
                  card_number: cardLast4,
                  card_name: SubData.name,
                  decline_issue: "",
                  card_holder_email: SubData.email,
                  address: SubData.address ? SubData.address : "",
                  postal_code: SubData.postal_code ? SubData.postal_code : "",
                  city: SubData.city ? SubData.city : "",
                  state: SubData.state ? SubData.state : "",
                  country: SubData.country?.value ? SubData.country.value : "",
                };

                ApiService.purchaseCoinsUpdate(user?.token, statusUpdateData)
                  .then((res) => {
                    clearCart();
                    isLoading(false);
                    swal({
                      closeOnClickOutside: true,
                      title: "Congratulations",
                      text: "Order Completed Successfully",
                      icon: "success",
                    })
                      .then(() => navigate("/dashboard?tab=mytransactions"))
                      .catch(() => navigate("/dashboard?tab=mytransactions"));

                    localStorage.removeItem("usedCoins");
                    localStorage.removeItem("tax_amount");
                    localStorage.removeItem("checkoutUsingCoins");
                  })
                  .catch((err) => console.log(err));
              }
            };
            handleStripePaymentConfirm();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const elementOptions = {
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
    <form onSubmit={handleSubmit(handleStripe)} className="flex flex-col gap-6">
      <div className="font-Lexend">
        <label
          htmlFor="name"
          className={`${errors.name ? "text-red-500" : "text-gray-700"} block `}
        >
          Name*
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Cardholder Name is Required" }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type="text"
                id="name"
                name="name"
                className={`${
                  errors.name ? "border-red-500" : "border-primary"
                } border-2 py-2 px-2  w-full placeholder:text-[20px] placeholder:text-[#6c757d] text-[20px] focus-visible:outline-none`}
                placeholder="Cardholder Name"
              />
              {errors.name && (
                <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="">
        <label
          htmlFor="email"
          className={`${
            errors.email ? "text-red-500" : "text-gray-700"
          } block `}
        >
          Email*
        </label>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Cardholder Email is Required" }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type="email"
                id="email"
                name="email"
                className={`${
                  errors.email ? "border-red-500" : "border-primary"
                } border-2 py-2 px-2  w-full placeholder:text-[20px] placeholder:text-[#6c757d] text-[20px] focus-visible:outline-none`}
                placeholder="Cardholder Email"
              />
              {errors.email && (
                <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                  {errors.email.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className=" w-full">
        <label
          htmlFor="address"
          className={`${
            errors.address ? "text-red-500" : "text-gray-700"
          } block `}
        >
          Address
        </label>

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type="text"
                id="address"
                className={`${
                  errors.address ? "border-red-500" : "border-primary"
                } border-2 py-2 px-2  w-full placeholder:text-[20px] placeholder:text-[#6c757d] text-[20px] focus-visible:outline-none`}
                placeholder="Complete Address"
              />
              {errors.address && (
                <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                  {errors.address.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className=" w-full">
        <label
          htmlFor="postal_code"
          className={`${
            errors.address ? "text-red-500" : "text-gray-700"
          } block `}
        >
          Postal Code
        </label>

        <Controller
          name="postal_code"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type="text"
                id="postal_code"
                className={`${
                  errors.postal_code ? "border-red-500" : "border-primary"
                } border-2 py-2 px-2  w-full placeholder:text-[20px] placeholder:text-[#6c757d] text-[20px] focus-visible:outline-none`}
                placeholder="123456"
              />
              {errors.postal_code && (
                <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="">
        <label
          htmlFor="cardNumber"
          className={`${
            errors.cardNumber ? "text-red-500" : "text-gray-700"
          } block`}
        >
          Card Number*
        </label>
        <Controller
          name="cardNumber"
          control={control}
          rules={{
            required: "Card Number Required",
          }}
          render={({ field }) => (
            <div className="relative">
              <CardNumberElement
                {...field}
                id="cardNumber"
                options={elementOptions}
                className={`${
                  errors.cardNumber ? "border-red-500" : "border-primary"
                }  border-2 py-2 px-2 `}
              />
              {errors.cardNumber && (
                <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                  {errors.cardNumber.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className=" w-full">
          <label
            htmlFor="cardExpiry"
            className={`${
              errors.cardExpiry ? "text-red-500" : "text-gray-700"
            } block`}
          >
            Expiry Date*
          </label>

          <Controller
            name="cardExpiry"
            control={control}
            rules={{
              required: "Card Expiry Required",
            }}
            render={({ field }) => (
              <div className="relative">
                <CardExpiryElement
                  {...field}
                  id="cardExpiry"
                  options={elementOptions}
                  className={`${
                    errors.cardExpiry ? "border-red-500" : "border-primary"
                  }  border-2 py-2 px-2 `}
                />
                {errors.cardExpiry && (
                  <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                    {errors.cardExpiry.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div className=" w-full">
          <label
            htmlFor="cardCvc"
            className={`${
              errors.cardCvc ? "text-red-500" : "text-gray-700"
            } block`}
          >
            CVC
          </label>

          <Controller
            name="cardCvc"
            control={control}
            rules={{
              required: "Card CVC Required",
            }}
            render={({ field }) => (
              <div className="relative">
                <CardCvcElement
                  {...field}
                  id="cardCvc"
                  options={elementOptions}
                  className={`${
                    errors.cardCvc ? "border-red-500" : "border-primary"
                  }  border-2 py-2 px-2 `}
                />
                {errors.cardCvc && (
                  <span className="text-red-500 w-full left-0 -bottom-5 text-sm absolute">
                    {errors.cardCvc.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="">
        <span className="text-sm text-muted py-4">
          Cardholders please enter your details with confidence, unlocking a
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

export default StripeSeprateComponent;
