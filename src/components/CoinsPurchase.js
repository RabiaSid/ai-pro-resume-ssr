import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../services/ApiService";
import { RiCoinsFill } from "react-icons/ri";
import $ from "jquery";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import { Elements } from "@stripe/react-stripe-js";
import StripeSeprateComponent from "./shared-components/StripeSeprateComponent2";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../services/Auth";
import LoadingSpiner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { CiDiscount1 } from "react-icons/ci";

const CoinsPurchase = () => {
  const navigate = useNavigate();
  const totalAmountPara = useRef(null);
  const [coinPlans, setCoinPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTaxAmount, setTotalTexAmount] = useState(0);
  const { user } = useAuth();
  //
  const [isProceeding, setIsProceeding] = useState(false);
  const [tax, setTax] = useState({
    amount: 0,
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [insert_id, set_insert_id] = useState(0);

  useEffect(() => {
    ApiService.getCoinsPlan()
      .then((res) => {
        console.log(res.data.data);
        setCoinPlans(res.data.data);
      })
      .catch((err) => console.log(err));
    ApiService.getSettingForWebsite()
      .then((res) => {
        // console.log(res);
        setTax({
          amount: res.data.data.settings.tax,
          type: res.data.data.settings.tax_type,
        });

        localStorage.setItem("coins_tax_type", res.data.data.settings.tax_type);
        localStorage.setItem("coins_tax_amount", res.data.data.settings.tax);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const calcParcentage = (percentage, amount) => {
      const discountAmount = (percentage * amount) / 100;

      return discountAmount;
    };
    const calculate = () => {
      const price = selectedPlan.price;
      const taxAmount = tax.amount;
      const taxCalulated = calcParcentage(taxAmount, price);
      const total = Number(price) + Number(taxCalulated);
      const roundedTotal = Number(total.toFixed(1));
      setTotalAmount(roundedTotal);
      setTotalTexAmount(taxCalulated);
    };
    if (selectedPlan) {
      calculate();
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (isProceeding) {
      $("#paymentProccedSection").slideDown(30000);
    } else {
      $("#paymentProccedSection").slideUp(30000);
    }
  }, [isProceeding]);

  const stripePromise = loadStripe(
    "pk_live_51OlwcNJ8G3cNghLiKPXukz2bU172kwHRRx0tOwPoZ2XfmaluQDMOazSIY9hXmBiAsB2CrjWEpgexy0ayZVXHQdVv00JiyqEupq"
  );
  // const stripePromise = loadStripe(
  //   "pk_test_51OEUmkGaxxNRTGagQIYF34iTl3r85j1GMZDKbq7jnesM3AzvN5MyudpkqwjLr9m1PLNjjKLz0G7MQCPOPpiL5jar00XuVUMSb8"
  // );

  const Paypal__Before__Payment = () => {
    setIsLoading(true);
    const data = {
      payment_type: "paypal",
      card_number: "4242",
      card_name: user?.name,
      tax: totalTaxAmount.toFixed(1),
      tax_type: tax.type,
      total_amount: totalAmount,
      planId: selectedPlan.id,
    };

    console.log(data);

    ApiService.purchaseCoins(user?.token, data)
      .then((res) => {
        set_insert_id(res.data.data.id);
        setIsLoading(false);
        swal({
          closeOnClickOutside: true,
          title: "Congratulations",
          text: res.data.message,
          icon: "success",
        })
          .then(() => {})
          .catch(() => {});
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const Paypal__Successful__Payment = (order) => {
    setIsLoading(true);
    const data = {
      payment_type: "paypal",
      card_number: "",
      card_name: order.payer.name.given_name + " " + order.payer.name.surname,
      tax: totalTaxAmount.toFixed(1),
      tax_type: tax.type,
      total_amount: order.purchase_units[0].amount.value,
      planId: selectedPlan.id,
      id: insert_id,
    };

    console.log(data);

    ApiService.purchaseCoinsUpdate(user?.token, data)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        swal({
          closeOnClickOutside: true,
          title: "Congratulations",
          text: res.data.message,
          icon: "success",
        })
          .then(() => navigate("/dashboard?tab=mytransactions"))
          .catch(() => navigate("/dashboard?tab=mytransactions"));
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // handle__stripe__payment

  const handle__stripe__payment = (payment) => {
    setIsLoading(true);
    const data = {
      payment_type: "stripe",
      card_number: payment.card.last4,
      card_name: payment.billing_details.name,
      tax: totalTaxAmount.toFixed(1),
      tax_type: tax.type,
      total: totalAmount,
      planId: selectedPlan.id,
    };

    console.log(data);

    ApiService.purchaseCoins(user?.token, data)
      .then((res) => {
        setIsLoading(false);
        swal({
          closeOnClickOutside: true,
          title: "Congratulations",
          text: res.data.message,
          icon: "success",
        })
          .then(() => navigate("/dashboard?tab=mytransactions"))
          .catch(() => navigate("/dashboard?tab=mytransactions"));
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="w-full flex flex-col gap-[10px] justify-center items-center p-5 px-6 py-8 mb-[30px] bg-[#ececec]/60">
        {/* Title */}
        <div className="mb-4 text-center">
          <p className="text-3xl font-bold font-Lexend mb-2">Buy Coins</p>
          <div className="container">
            <p className="font-Lexend text-base text-left">
              Our flexible coin packages allow you to purchase resume parser
              tokens and more. With these coins, you can select the package that
              suits your needs and use them to buy any service available on the
              platform. When using the resume parser, remember that each
              document (up to 3 pages) costs two coins to parse. On
              registration, you will receive two coins and 5 parser tries as
              part of the default-free package.
            </p>
          </div>
        </div>

        {/* Section */}
        <div className="flex flex-col items-center gap-4 container">
          <div className=" flex items-center justify-center flex-wrap gap-4 ">
            {coinPlans?.map((plan, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg hover:bg-slate-200 border-2 shadow-[0px_0px_30px_rgb(220,220,230)] text-lg font-Lexend w-[120px] h-[100px] flex items-center justify-center relative flex-col ${
                  selectedPlan?.id === plan.id
                    ? "bg-[#0072b1] text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.discount > 0 && (
                  <div
                    id="discount-badge"
                    className="text-white animate-pulse text-sm flex justify-center items-center absolute -top-[5px] -right-[5px]"
                  >
                    <span className="z-10 text-[12px] relative font-Lexend ">
                      {plan.discount}%
                    </span>
                  </div>
                )}
                <div className="">${plan.price}</div>
                <div className="flex items-center justify-center text-xl gap-1">
                  <RiCoinsFill className="text-yellow-400" />
                  {plan.coins}
                </div>
              </div>
            ))}
          </div>
          {!isProceeding ? (
            <div className={`flex items-center justify-center w-full`}>
              <button
                disabled={!selectedPlan}
                onClick={() => {
                  if (user?.token) {
                    setIsProceeding(true);
                  } else {
                    swal({
                      buttons: true,
                      icon: "warning",
                      title: "Need to Login First",
                    }).then((yes) => {
                      if (yes) {
                        navigate(`/login`);
                      }
                    });
                  }
                }}
                className={`w-[200px] font-Lexend rounded-xl p-2 ${
                  selectedPlan ? "bg-primary-blue" : "bg-gray-200"
                }   text-white`}
              >
                Proceed To Checkout
              </button>
            </div>
          ) : (
            <div
              id="paymentProccedSection"
              className={`  rounded-md transition-[0.5s] overflow-hidden w-full xl:max-w-[70%] m-auto`}
            >
              {/* Payment Section */}
              <div className="flex flex-col-reverse lg:flex-row h-full">
                {/* Purchase Section */}
                <div className="flex-1 p-4">
                  <PayPalScriptProvider
                    className="w-full"
                    options={{
                      // "client-id":
                      //   "ARsWe5o8_UCPdvf9VaobuOl3078EeB_BT1gjcfyLy0E8cmndgDKT2jwdJo4raEF47nKGJUyeSi9apTY9",
                      // "merchant-id": "HYHD2ZSQNJTG2",
                      "client-id":
                        "ASKmsVMYxaukXBVYZ9Ec0pG7zfo-vPl4qHeHIBgrbWO-KPz8_G-ZjVDm9CHs5_TaznFaGo0brU2KMJ0q",

                      "disable-funding": ["paylater", "card"],
                    }}
                  >
                    <PayPalButtons
                      style={{
                        label: "checkout",
                      }}
                      createOrder={(data, actions) => {
                        Paypal__Before__Payment();
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value:
                                  totalAmountPara.current.textContent.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((order) => {
                          Paypal__Successful__Payment(order);
                        });
                      }}
                      onError={(error) => {
                        swal(
                          "Error!",
                          "Deposit Balance Transaction Not Successfull!",
                          "error"
                        );
                      }}
                      onCancel={() => {
                        swal(
                          "Error!",
                          "Deposit Balance Transaction has been cancelled",
                          "error"
                        );
                      }}
                    />
                  </PayPalScriptProvider>
                  <div class="px-10 py-2 flex items-center">
                    <span class="w-full border-t  border-primary-blue"></span>
                    <span class="mx-4 font-Lexend">OR</span>
                    <span class="w-full border-t  border-primary-blue"></span>
                  </div>
                  <div className="pt-4">
                    {/*  */}
                    <div className="py-2 flex flex-col gap-2">
                      <h1 className="text-2xl font-bold text-primary">
                        Pay With Card
                      </h1>
                      <span className="text-muted text-sm">
                        All transactions are secure and encrypted
                      </span>
                    </div>
                  </div>
                  <Elements stripe={stripePromise} options={null}>
                    <StripeSeprateComponent
                      isLoading={(val) => setIsLoading(val)}
                      //submitData={handle__stripe__payment}
                      total_amount={totalAmount}
                      selectedPlan={selectedPlan.id}
                      tax_type={tax.type}
                      tax_amount={totalTaxAmount.toFixed(1)}
                      // amount={totalAmountPara.current.textContent.toString()}
                      currency={"usd"}
                    />
                  </Elements>
                </div>
                {/* Details Section */}
                <div className="flex flex-col gap-4 w-full lg:w-[300px] xl:w-[400px] 2xl:w-[500px] font-Lexend p-4 border h-full rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-base">Coins</span>
                    <div className="flex items-center gap-1">
                      <RiCoinsFill className="text-yellow-400" />
                      <span>{selectedPlan?.coins}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted">Valid Until</span>
                    <span>{selectedPlan?.duration} Days</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted">Price</span>

                    <span>${selectedPlan?.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted">Tax ({tax.type})</span>
                    <span>+ {tax?.amount}%</span>
                  </div>

                  <hr />

                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="flex items-center">
                      $<p ref={totalAmountPara}>{totalAmount}</p>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mb-4">
            <p className="text-3xl font-bold font-Lexend mb-2">
              How to purchase coins?
            </p>
            <div className="container">
              <p className="font-Lexend text-base">
                <ul className="list-inside list-disc">
                  <li>Select your preferred coin package and click on it.</li>
                  <li>Now press the process to checkout button.</li>
                  <li>
                    A dropdown appears; select your desired payment method.
                  </li>
                  <li>You can pay through a card or use a PayPal account.</li>
                  <li>Enter all the details and click on Pay Now.</li>
                  <li>
                    Once you are done with the payment, you will get the coins.
                  </li>
                  <li>
                    In the header, you can see the coin icon along with the
                    number of coins you purchased.
                  </li>
                </ul>
              </p>
            </div>

            <p className="text-3xl font-bold font-Lexend my-2">Referrals:</p>
            <div className="container">
              <p className="font-Lexend text-base">
                If you do not want to purchase the coins, you can earn coins
                through referrals. Invite your friends to join AI Pro Resume,
                and you will earn coins when they sign up using your referral
                link. You can use them to unlock parser tokens and premium
                services. You will receive 3 coins for 10 referrals, 4 coins for
                20 referrals, and 6 coins for 30 referrals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsPurchase;
