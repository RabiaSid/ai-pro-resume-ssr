import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useCart } from "./data/CartStore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "./services/ApiService";
import PackageImg from "./assets/images/free_basic_img.webp";
// Paypal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LoadingSpiner from "./components/LoadingSpinner";
// import axios from "axios";
import coin from "./assets/images/dollar.webp";
import "./css/style2.css";
import { LiaTimesCircleSolid, LiaTimesSolid } from "react-icons/lia";
import MainBanner from "./components/MainBanner";
import { useAuth } from "./services/Auth";
import StripeForm from "./components/Stripe";
import ServicePageBanner from "./components/ServicePageBanner";
import Cookies from "js-cookie";
import StripeSeprateComponent from "./components/shared-components/StripeSeprateComponent";
import axios from "axios";
import { use } from "react";
const Checkout = () => {
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState();
  const { user } = useAuth();
  const totalRef = useRef(null);
  const { cart, clearCart } = useCart();

  // Cookies.set("payotp", 1, { expires: 1 });
  const payotp = Cookies.get("payotp");
  const [showPayOTP, setShowPayOTP] = useState(payotp ? payotp : 0);
  const [opt_val, setopt_val] = useState();
  const [otpEmailMsg, setOtpEmailMsg] = useState("");

  const [opt_loader, setopt_loader] = useState(false);

  useEffect(() => {
    handle_email_otp();
  }, []);

  const handleOTP = (e) => {
    e.preventDefault();

    setopt_loader(true);
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    const article = {
      //email: user?.email,
      otp: opt_val,
    };
    axios
      .post(global.baseurl + "/user/verify-otp-for-transaction", article, {
        headers,
      })
      .then((data) => {
        if (data) {
          Cookies.set("payotp", 1, { expires: 1 });
          setopt_loader(false);
          setShowPayOTP(1);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error!", err.response.data.message, "error");
        setopt_loader(false);
      });
  };

  const handle_email_otp = () => {
    setOtpEmailMsg("");

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    const article = {
      email: user?.email,
      //otp: opt_val,
    };
    axios
      .post(global.baseurl + "/user/send-otp-for-transaction", article, {
        headers,
      })
      .then((data) => {
        if (data) {
          setOtpEmailMsg("OTP Sent to your Email");
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error!", err.response.data.message, "error");
        setOtpEmailMsg("OTP Sending Failed");
      });
  };

  useEffect(() => {
    ApiService.getCoins(user?.token)
      .then((res) => {
        if (res.data.id) {
          setUserCoins(res.data);
        } else {
          const UserCoins = {
            coin_end_date: null,
            coin_start_date: null,
            coins: 0,
            id: 0,
          };
          setUserCoins(UserCoins);
        }
      })
      .catch((err) => console.log(err));

    ApiService.getUserDetails(user?.token)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (
      cart.package.length === 0 &&
      cart.services.length === 0 &&
      cart.template.length === 0
    ) {
      navigate("/");
    }
  }, []);

  // Calculation eara
  const {
    totalAmount,
    subtotal,
    remainingAmount,
    noteValue,
    selectedFree,
    selectedFreeServices,
  } = location.state;

  // Store in this status Coupon Details
  const [couponDetails, setCouponDetails] = useState(null);
  const [usedCouponDetails, setUsedCouponDetails] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);
  // Tax
  const [tax, setTax] = useState(10);
  const [taxAmount, setTaxAmount] = useState(0);
  const [taxType, setTexType] = useState("");
  const [amount_tax, setamount_tax] = useState(0);
  // sec-f Total

  const [total, setTotal] = useState(0);

  useEffect(() => {
    ApiService.getSettingForWebsite()
      .then((res) => {
        setTax(res.data.data.settings.tax);
        setTexType(res.data.data.settings.tax_type);

        localStorage.setItem("tax_type", res.data.data.settings.tax_type);
      })
      .catch((err) => console.log(err));
  }, []);

  // Coupon Funtions
  const [couponErrMessage, setCouponErrMessage] = useState("");
  const couponStatus = (value) => {
    setCouponCode(value);
    if (value.length > 3) {
      setVerifyingCoupon(true);
      ApiService.verifyCoupon(user?.token, value)
        .then((res) => {
          if (res.data.success === true) {
            setIsCoupon(true);
            setCouponDetails(res.data.data);
            setVerifyingCoupon(false);
          }
        })
        .catch((err) => {
          setIsCoupon(false);
          setCouponDetails(null);
          setCouponErrMessage(err.response.data.message);
          setVerifyingCoupon(false);
        });
    } else {
      setIsCoupon(false);
      setCouponDetails(null);
    }
  };

  const ApplyCoupon = () => {
    if (!isCoupon) {
      swal({
        dangerMode: true,
        title: couponErrMessage,
        icon: "warning",
      });
    }
    setUsedCouponDetails(couponDetails);
    setCouponCode("");
  };

  // Calculate Parcentage
  const calcParcentage = (percentage, amount) => {
    const discountAmount = (percentage * amount) / 100;

    return discountAmount;
  };

  const [userCoins, setUserCoins] = useState({
    coin_end_date: null,
    coin_start_date: null,
    coins: 0,
    id: 0,
  });
  const [useCoins, setUseCoins] = useState(false);
  const [couponDicsountRate, setCouponDicsountRate] = useState(0);

  const [remaningCoins, setRemainingCoins] = useState(0);
  const [usedCoins, setUsedCoins] = useState(0);

  useEffect(() => {
    setRemainingCoins(userCoins?.coins);
  }, [userCoins]);

  const Calculation = (used) => {
    // If there is no coins and coupons
    if (!used) {
      const CalculatedTaxAmount = calcParcentage(tax, subtotal);

      setamount_tax(CalculatedTaxAmount);
      // Set Tax Amount
      setTaxAmount(Math.round(CalculatedTaxAmount));
      localStorage.setItem("tax_amount", CalculatedTaxAmount);
      // Set Total amount like subtotal plus tax amount
      //setTotal(Math.round(subtotal) + Math.round(CalculatedTaxAmount));
      setTotal(
        Number((Number(subtotal) + Number(CalculatedTaxAmount)).toFixed(2))
      );
    }

    if (used === "coupon") {
      // usedCouponDetails.discount_rate
      const calculatedtaxFirst = calcParcentage(tax, Math.round(subtotal));
      const subtotalAftertax = subtotal + calculatedtaxFirst;

      const calculateCoupn = calcParcentage(
        usedCouponDetails.discount_rate,
        Math.round(subtotalAftertax)
      );

      setCouponDicsountRate(calculateCoupn);

      setTaxAmount(Math.round(calculatedtaxFirst));

      localStorage.setItem("tax_amount", calculatedtaxFirst);

      setTotal(
        Number((Number(subtotalAftertax) - Number(calculateCoupn)).toFixed(2))
      );
    }

    const calculatedtaxFirst = calcParcentage(tax, Math.round(subtotal));

    if (used === "coins") {
      if (
        userCoins.coins >=
        (Number(subtotal) + Number(calculatedtaxFirst)) * 10
      ) {
        const calculateTaxRate = calcParcentage(tax, Math.round(subtotal));

        const subTotalAfterTax =
          (Number(subtotal) + Number(calculateTaxRate)) * 10;

        const CalcRemaingCoins = userCoins.coins - Math.round(subTotalAfterTax);
        console.log("subTotalAfterTax" + subTotalAfterTax);
        console.log("CalcRemaingCoins" + CalcRemaingCoins);
        setTotal(0);
        setRemainingCoins(CalcRemaingCoins);
        setUsedCoins(Math.round(subTotalAfterTax));
        setTaxAmount(0);
        localStorage.setItem("tax_amount", calculateTaxRate);
        localStorage.setItem(
          "checkoutRemaningCoins",
          Math.round(CalcRemaingCoins)
        );
        localStorage.setItem("usedCoins", Math.round(subTotalAfterTax));
      } else if (
        (Number(subtotal) + Number(calculatedtaxFirst)) * 10 >=
        userCoins.coins
      ) {
        const calculateTaxAmount = calcParcentage(tax, Math.round(subtotal));
        const subTotalAfterTax = Number(subtotal) + calculateTaxAmount;
        const remaningSubtotal =
          Number(subTotalAfterTax) - userCoins.coins / 10;
        setTaxAmount(calculateTaxAmount);
        localStorage.setItem("tax_amount", calculateTaxAmount);
        setTotal(Number(remaningSubtotal).toFixed(2));
        setRemainingCoins(0);
        localStorage.setItem("checkoutRemaningCoins", 0);
        setUsedCoins(userCoins.coins);
        localStorage.setItem("usedCoins", userCoins.coins);
      } else {
        localStorage.setItem("checkoutRemaningCoins", 0);

        setRemainingCoins(0);
        setUsedCoins(0);
      }

      localStorage.setItem("checkoutUsingCoins", "true");
    } else {
      localStorage.removeItem("checkoutUsingCoins");
      localStorage.removeItem("checkoutRemaningCoins");
      localStorage.setItem("usedCoins", 0);
      setRemainingCoins(userCoins?.coins);
    }
  };

  useEffect(() => {
    if (usedCouponDetails) {
      Calculation("coupon");
    } else if (useCoins) {
      Calculation("coins");
    } else {
      Calculation(null);
    }
  }, [usedCouponDetails, useCoins, tax]);

  const removeCoins = () => {
    setRemainingCoins(userCoins?.coins);
    setUsedCoins(0);
    setUseCoins(false);
    localStorage.setItem("usedCoins", 0);
  };

  const removeCoupon = () => {
    setIsCoupon(false);
    setCouponDetails(null);
    setUsedCouponDetails(null);
    setVerifyingCoupon(false);
  };

  // stripe live
  // const stripePromise = loadStripe(
  //   "pk_live_51OlwcNJ8G3cNghLiKPXukz2bU172kwHRRx0tOwPoZ2XfmaluQDMOazSIY9hXmBiAsB2CrjWEpgexy0ayZVXHQdVv00JiyqEupq"
  // );
  // const stripePromise = loadStripe(
  //   "pk_test_51OEUmkGaxxNRTGagQIYF34iTl3r85j1GMZDKbq7jnesM3AzvN5MyudpkqwjLr9m1PLNjjKLz0G7MQCPOPpiL5jar00XuVUMSb8"
  // );
  const stripePromise = loadStripe(
    "pk_live_51OlwcNJ8G3cNghLiKPXukz2bU172kwHRRx0tOwPoZ2XfmaluQDMOazSIY9hXmBiAsB2CrjWEpgexy0ayZVXHQdVv00JiyqEupq"
  );

  const handleZeroPayment = () => {
    setIsLoading(true);

    const used_coins = localStorage.getItem("usedCoins");
    if (cart?.template[0]?.id) {
      var dataTemp = {
        packageId: cart.package.length > 0 ? cart.package[0].id : 0,
        packageDuration: cart.package.length > 0 ? cart.package[0].duration : 0,
        packagePrice: cart.package.length > 0 ? cart.package[0].price : 0,
        services: cart.services,
        order_id: "123",
        currency: "USD",
        discounted_amount: remainingAmount,
        sub_total: totalAmount,
        tax_amount: localStorage.getItem("tax_amount"),
        total_amount: total,
        description:
          noteValue.length > 0
            ? `${noteValue}, ${cart.package.length > 0
              ? cart.package[0].name +
              (cart.services.length > 0 ? " , " : "")
              : ""
            }${cart.services.length > 0
              ? cart.services.map((ser) => ser.name).join(", ")
              : ""
            }`
            : `${cart.package.length > 0
              ? cart.package[0].name +
              (cart.services.length > 0 ? " , " : "")
              : ""
            }${cart.services.length > 0
              ? cart.services.map((ser) => ser.name).join(", ")
              : ""
            }`,
        payment_type: "coins",
        card_number: "",
        card_name: user?.user_name,
        coupon_code: usedCouponDetails?.code ? usedCouponDetails.code : " ",
        coupon_discount_percent: usedCouponDetails?.discount_rate
          ? usedCouponDetails.discount_rate
          : " ",
        used_coins: used_coins,
        tax_type: localStorage.getItem("tax_type"),
        status: 0,
      };
    } else {
      var data = {
        packageId: cart.package.length > 0 ? cart.package[0].id : 0,
        packageDuration: cart.package.length > 0 ? cart.package[0].duration : 0,
        packagePrice: cart.package.length > 0 ? cart.package[0].price : 0,
        services: cart.services,
        order_id: "123",
        currency: "USD",
        discounted_amount: remainingAmount,
        sub_total: totalAmount,
        tax_amount: localStorage.getItem("tax_amount"),
        total_amount: total,
        description:
          noteValue.length > 0
            ? `${noteValue}, ${cart.package.length > 0
              ? cart.package[0].name +
              (cart.services.length > 0 ? " , " : "")
              : ""
            }${cart.services.length > 0
              ? cart.services.map((ser) => ser.name).join(", ")
              : ""
            }`
            : `${cart.package.length > 0
              ? cart.package[0].name +
              (cart.services.length > 0 ? " , " : "")
              : ""
            }${cart.services.length > 0
              ? cart.services.map((ser) => ser.name).join(", ")
              : ""
            }`,
        payment_type: "coins",
        card_number: "",
        card_name: user?.user_name,
        coupon_code: usedCouponDetails?.code ? usedCouponDetails.code : " ",
        coupon_discount_percent: usedCouponDetails?.discount_rate
          ? usedCouponDetails.discount_rate
          : " ",
        used_coins: used_coins,
        tax_type: localStorage.getItem("tax_type"),
        status: 1,
      };
    }

    if (cart?.template[0]?.id) {
      if (cart?.template[0].doc === "resume") {
        ApiService.resumeTemplateOrder(user?.token, dataTemp, cart.template)
          .then((response) => {
            const { id } = response.data.data;
            let data2 = {
              id: id,
              packageId: cart.package.length > 0 ? cart.package[0].id : 0,
              packageDuration:
                cart.package.length > 0 ? cart.package[0].duration : 0,
              packagePrice: cart.package.length > 0 ? cart.package[0].price : 0,
              services: cart.services,
              order_id: "123456",
              currency: "USD",
              discounted_amount: remainingAmount,
              sub_total: totalAmount,
              tax_amount: localStorage.getItem("tax_amount"),
              total_amount: total,
              description:
                noteValue.length > 0
                  ? `${noteValue}, ${cart.package.length > 0
                    ? cart.package[0].name +
                    (cart.services.length > 0 ? " , " : "")
                    : ""
                  }${cart.services.length > 0
                    ? cart.services.map((ser) => ser.name).join(", ")
                    : ""
                  }`
                  : `${cart.package.length > 0
                    ? cart.package[0].name +
                    (cart.services.length > 0 ? " , " : "")
                    : ""
                  }${cart.services.length > 0
                    ? cart.services.map((ser) => ser.name).join(", ")
                    : ""
                  }`,
              payment_type: "coins",
              card_number: "",
              card_name: user?.user_name,
              coupon_code: usedCouponDetails?.code
                ? usedCouponDetails.code
                : " ",
              coupon_discount_percent: usedCouponDetails?.discount_rate
                ? usedCouponDetails.discount_rate
                : " ",
              used_coins: used_coins,
              tax_type: localStorage.getItem("tax_type"),
              status: 1,
            };
            ApiService.paymentStatusResumeTemplate(
              user?.token,
              data2,
              cart.template
            )
              .then((response) => {
                const coinsAreUSing =
                  localStorage.getItem("checkoutUsingCoins");
                const remaningUserCoins = localStorage.getItem(
                  "checkoutRemaningCoins"
                );
                if (coinsAreUSing) {
                  ApiService.updateUserCoins(user?.token, remaningUserCoins)
                    .then((res) => {
                      clearCart();
                      setIsLoading(false);

                      swal({
                        closeOnClickOutside: true,
                        title: "Congratulations",
                        text: "Order Completed Successfully",
                        icon: "success",
                      })
                        .then(() => navigate("/dashboard?tab=mytransactions"))
                        .catch(() => navigate("/dashboard?tab=mytransactions"));
                    })
                    .catch((err) => console.log(err));
                } else {
                  clearCart();
                  setIsLoading(false);
                  swal({
                    closeOnClickOutside: true,
                    title: "Congratulations",
                    text: "Order Completed Successfully",
                    icon: "success",
                  })
                    .then(() => navigate("/dashboard?tab=mytransactions"))
                    .catch(() => navigate("/dashboard?tab=mytransactions"));
                }

                localStorage.removeItem("usedCoins");
                localStorage.removeItem("tax_amount");
                localStorage.removeItem("checkoutUsingCoins");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        ApiService.coverTemplateOrder(user?.token, dataTemp, cart.template)
          .then((response) => {
            const { id } = response.data.data;
            let data2 = {
              id: id,
              packageId: cart.package.length > 0 ? cart.package[0].id : 0,
              packageDuration:
                cart.package.length > 0 ? cart.package[0].duration : 0,
              packagePrice: cart.package.length > 0 ? cart.package[0].price : 0,
              services: cart.services,
              order_id: "123456",
              currency: "USD",
              discounted_amount: remainingAmount,
              sub_total: totalAmount,
              tax_amount: localStorage.getItem("tax_amount"),
              total_amount: total,
              description:
                noteValue.length > 0
                  ? `${noteValue}, ${cart.package.length > 0
                    ? cart.package[0].name +
                    (cart.services.length > 0 ? " , " : "")
                    : ""
                  }${cart.services.length > 0
                    ? cart.services.map((ser) => ser.name).join(", ")
                    : ""
                  }`
                  : `${cart.package.length > 0
                    ? cart.package[0].name +
                    (cart.services.length > 0 ? " , " : "")
                    : ""
                  }${cart.services.length > 0
                    ? cart.services.map((ser) => ser.name).join(", ")
                    : ""
                  }`,
              payment_type: "coins",
              card_number: "",
              card_name: user?.user_name,
              coupon_code: usedCouponDetails?.code
                ? usedCouponDetails.code
                : " ",
              coupon_discount_percent: usedCouponDetails?.discount_rate
                ? usedCouponDetails.discount_rate
                : " ",
              used_coins: used_coins,
              tax_type: localStorage.getItem("tax_type"),
              status: 1,
            };
            ApiService.paymentStatusCoverTemplate(
              user?.token,
              data2,
              cart.template
            )
              .then((response) => {
                const coinsAreUSing =
                  localStorage.getItem("checkoutUsingCoins");
                const remaningUserCoins = localStorage.getItem(
                  "checkoutRemaningCoins"
                );
                if (coinsAreUSing) {
                  ApiService.updateUserCoins(user?.token, remaningUserCoins)
                    .then((res) => {
                      clearCart();
                      setIsLoading(false);

                      swal({
                        closeOnClickOutside: true,
                        title: "Congratulations",
                        text: "Order Completed Successfully",
                        icon: "success",
                      })
                        .then(() => navigate("/dashboard?tab=mytransactions"))
                        .catch(() => navigate("/dashboard?tab=mytransactions"));
                    })
                    .catch((err) => console.log(err));
                } else {
                  clearCart();
                  setIsLoading(false);
                  swal({
                    closeOnClickOutside: true,
                    title: "Congratulations",
                    text: "Order Completed Successfully",
                    icon: "success",
                  })
                    .then(() => navigate("/dashboard?tab=mytransactions"))
                    .catch(() => navigate("/dashboard?tab=mytransactions"));
                }

                localStorage.removeItem("usedCoins");
                localStorage.removeItem("tax_amount");
                localStorage.removeItem("checkoutUsingCoins");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    } else {
      ApiService.Payment(user?.token, data)
        .then((response) => {
          const coinsAreUSing = localStorage.getItem("checkoutUsingCoins");
          const remaningUserCoins = localStorage.getItem(
            "checkoutRemaningCoins"
          );
          if (coinsAreUSing) {
            ApiService.updateUserCoins(user?.token, remaningUserCoins)
              .then((res) => {
                clearCart();
                setIsLoading(false);

                swal({
                  closeOnClickOutside: true,
                  title: "Congratulations",
                  text: "Order Completed Successfully",
                  icon: "success",
                })
                  .then(() => navigate("/dashboard?tab=mytransactions"))
                  .catch(() => navigate("/dashboard?tab=mytransactions"));
              })
              .catch((err) => console.log(err));
          } else {
            clearCart();
            setIsLoading(false);
            swal({
              closeOnClickOutside: true,
              title: "Congratulations",
              text: "Order Completed Successfully",
              icon: "success",
            })
              .then(() => navigate("/dashboard?tab=mytransactions"))
              .catch(() => navigate("/dashboard?tab=mytransactions"));
          }

          localStorage.removeItem("usedCoins");
          localStorage.removeItem("tax_amount");
          localStorage.removeItem("checkoutUsingCoins");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleZeroPaymentWithPremium = () => {
    setIsLoading(true);

    let data = {
      packageId: cart.package.length > 0 ? cart.package[0].id : 0,
      packageDuration: cart.package.length > 0 ? cart.package[0].duration : 0,
      packagePrice: cart.package.length > 0 ? cart.package[0].price : 0,
      services: cart.services,
      order_id: "123",
      currency: "USD",
      discounted_amount: remainingAmount,
      sub_total: totalAmount,
      tax_amount: localStorage.getItem("tax_amount"),
      total_amount: total,
      description:
        noteValue.length > 0
          ? `${noteValue}, ${cart.package.length > 0
            ? cart.package[0].name + (cart.services.length > 0 ? " , " : "")
            : ""
          }${cart.services.length > 0
            ? cart.services.map((ser) => ser.name).join(", ")
            : ""
          }`
          : `${cart.package.length > 0
            ? cart.package[0].name + (cart.services.length > 0 ? " , " : "")
            : ""
          }${cart.services.length > 0
            ? cart.services.map((ser) => ser.name).join(", ")
            : ""
          }`,
      payment_type: "free_premium",
      card_number: "",
      card_name: user?.user_name,
      coupon_code: usedCouponDetails?.code ? usedCouponDetails.code : " ",
      coupon_discount_percent: usedCouponDetails?.discount_rate
        ? usedCouponDetails.discount_rate
        : " ",
      used_coins: 0,
      tax_type: localStorage.getItem("tax_type"),
      status: 1,
    };

    ApiService.Payment(user?.token, data)
      .then((response) => {
        clearCart();
        setIsLoading(false);
        swal({
          closeOnClickOutside: true,
          title: "Congratulations",
          text: "Order Completed Successfully",
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

  //
  const formatDate = (inputDateStr) => {
    // Parse the input date string
    const parsedDate = new Date(inputDateStr);

    // Get the day, month, and year from the parsed date
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const year = parsedDate.getFullYear();

    // Format the date in the desired format
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Header />
      {isLoading && <LoadingSpiner isLoading={isLoading} />}

      {showPayOTP == 0 ? (
        <div className="w-full lg:w-[80%] m-auto">
          <div className="container flex flex-col justify-center items-center m-auto py-6 sm:py-40 px-4 sm:px-0 font-Lexend">
            <div className="text-sm text-primary-black">
              {otpEmailMsg ? otpEmailMsg : ""}
            </div>
            <h1 className="text-xl">OTP Verification For Payment</h1>
            <div className="w-full relative md:w-[400px] px-2 flex flex-wrap justify-between items-center mt-4">
              <label className="text-slate-500 w-full text-center">
                Enter 5 Digit OTP Code
              </label>
              <input
                type="text"
                maxLength="5" // Limits the input to 5 characters
                onChange={(e) => {
                  const value = e.target.value;

                  // Ensure the value contains only digits and is 5 or fewer characters
                  if (/^\d{0,5}$/.test(value)) {
                    setopt_val(value); // Update the state only if valid
                  }
                }}
                pattern="[0-9]*" // Matches only digits
                className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
              />
              {opt_loader ? (
                <button className="absolute right-2 top-[25px] px-6 py-2 font-Lexend border border-gray-600 bg-gray-600 hover:border-primary-green text-white rounded-full">
                  Sending
                </button>
              ) : (
                <button
                  onClick={handleOTP}
                  className="absolute right-2 top-[24px] px-6 py-2 font-Lexend border border-primary-blue bg-primary-blue hover:bg-primary-green hover:border-primary-green text-white rounded-full"
                >
                  Send
                </button>
              )}

              <div
                onClick={handle_email_otp}
                className="w-full text-center cursor-pointer my-2 text-sm text-primary-blue hover:text-primary-black"
              >
                Resend Code
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-[80%] m-auto">
          <div className="container m-auto py-6 sm:py-20 px-4 sm:px-0 font-Lexend">
            {/* Content */}
            <div className="flex flex-col gap-20">
              <div className="flex flex-col-reverse lg:grid   lg:grid-cols-[50%,50%] gap-10 ">
                {/* Left Section */}
                <div className="select-none relative min-h-[300px] sm:min-h-[200px] ">
                  {total === 0 ? (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white border-2 z-40 p-8">
                      <div className="flex items-center justify-center flex-col">
                        {isCoupon || useCoins ? (
                          <>
                            <p className="text-center mb-4">
                              Congratulations! You have successfully applied a
                              coupon or used coins, and your payment amount is
                              now zero. You can proceed with the checkout
                              process without making any payment.
                            </p>
                            <button
                              onClick={handleZeroPayment}
                              className="bg-primary text-base font-bold text-white px-10 py-4 rounded-full hover:bg-[#0073b1cc]"
                            >
                              Proceed to Checkout
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-center mb-4">
                              you have successfully applied a premium package
                            </p>
                            <button
                              onClick={handleZeroPaymentWithPremium}
                              className="bg-primary text-base font-bold text-white px-10 py-4 rounded-full hover:bg-[#0073b1cc]"
                            >
                              Proceed to Checkout
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Express checkout */}
                      <div className="flex flex-col justify-center items-center gap-4 z-30">
                        <span className="text-muted">Express checkout</span>
                      </div>

                      <div className="mt-4">
                        {/* PayPal */}
                        <PayPalScriptProvider
                          className="w-full"
                          options={{
                            "client-id":
                              "ARsWe5o8_UCPdvf9VaobuOl3078EeB_BT1gjcfyLy0E8cmndgDKT2jwdJo4raEF47nKGJUyeSi9apTY9",
                            "merchant-id": "HYHD2ZSQNJTG2",
                            // "client-id":
                            // "ASKmsVMYxaukXBVYZ9Ec0pG7zfo-vPl4qHeHIBgrbWO-KPz8_G-ZjVDm9CHs5_TaznFaGo0brU2KMJ0q",
                            "disable-funding": ["paylater", "card"],
                          }}
                        >
                          <PayPalButtons
                            style={{
                              label: "checkout",
                            }}
                            createOrder={(data, actions) => {
                              const used_coins =
                                localStorage.getItem("usedCoins");
                              let storeDataPaypal = {
                                packageId:
                                  cart.package.length > 0
                                    ? cart.package[0].id
                                    : 0,
                                packageDuration:
                                  cart.package.length > 0
                                    ? cart.package[0].duration
                                    : 0,
                                packagePrice:
                                  cart.package.length > 0
                                    ? cart.package[0].price
                                    : 0,
                                services: cart.services,
                                order_id: "Before Order",
                                currency: "USD",
                                discounted_amount: remainingAmount,
                                sub_total: totalAmount,
                                tax_amount: localStorage.getItem("tax_amount"),
                                total_amount:
                                  totalRef.current.textContent.toString(),
                                description:
                                  noteValue.length > 0
                                    ? `${noteValue}, ${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`
                                    : `${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`,
                                payment_type: "paypal",
                                card_number: null,
                                card_name: "",
                                coupon_code: usedCouponDetails?.code
                                  ? usedCouponDetails.code
                                  : " ",
                                coupon_discount_percent:
                                  usedCouponDetails?.discount_rate
                                    ? usedCouponDetails.discount_rate
                                    : " ",
                                used_coins: used_coins,
                                tax_type: localStorage.getItem("tax_type"),
                                status: 0,
                              };

                              if (cart?.template[0]?.id) {
                                if (cart.template[0].doc === "resume") {
                                  ApiService.resumeTemplateOrder(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((response) => {
                                      console.log(response);
                                      const { id } = response.data.data;
                                      localStorage.setItem("order_id", id);
                                    })
                                    .catch((err) => console.log(err));
                                } else {
                                  ApiService.coverTemplateOrder(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((response) => {
                                      console.log(response);
                                      const { id } = response.data.data;
                                      localStorage.setItem("order_id", id);
                                    })
                                    .catch((err) => console.log(err));
                                }
                              } else {
                                ApiService.Payment(user?.token, storeDataPaypal)
                                  .then((response) => {
                                    const { id } = response.data.data;
                                    localStorage.setItem("order_id", id);
                                  })
                                  .catch((err) => console.log(err));
                              }

                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value:
                                        totalRef.current.textContent.toString(),
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then((order) => {
                                setIsLoading(true);
                                const { payer, purchase_units } = order;

                                const { email_address, name } = payer;

                                const userName =
                                  name?.given_name + " " + name?.surname;

                                const addData = purchase_units[0].shipping;
                                const address = `
                              ${addData?.address?.address_line_1
                                    ? addData.address.address_line_1
                                    : ""
                                  } 
                              ${addData?.address?.admin_area_1
                                    ? addData?.address?.admin_area_1
                                    : ""
                                  }
                               ${addData?.address?.admin_area_2
                                    ? addData?.address?.admin_area_2
                                    : ""
                                  }`;
                                const country = addData?.address?.country_code
                                  ? addData?.address?.country_code
                                  : "";
                                const PostalCode = addData?.address?.postal_code
                                  ? addData.address.postal_code
                                  : "";

                                const orderID = purchase_units[0]?.payments
                                  ?.captures[0]?.id
                                  ? purchase_units[0]?.payments?.captures[0]?.id
                                  : "";

                                const used_coins =
                                  localStorage.getItem("usedCoins");
                                const id = localStorage.getItem("order_id");
                                let storeDataPaypal = {
                                  id: id,
                                  packageId:
                                    cart.package.length > 0
                                      ? cart.package[0].id
                                      : 0,
                                  packageDuration:
                                    cart.package.length > 0
                                      ? cart.package[0].duration
                                      : 0,
                                  packagePrice:
                                    cart.package.length > 0
                                      ? cart.package[0].price
                                      : 0,
                                  services: cart.services,
                                  order_id: orderID,
                                  currency: "USD",
                                  discounted_amount: remainingAmount,
                                  sub_total: totalAmount,
                                  tax_amount:
                                    localStorage.getItem("tax_amount"),
                                  total_amount:
                                    totalRef.current.textContent.toString(),
                                  description:
                                    noteValue.length > 0
                                      ? `${noteValue}, ${cart.package.length > 0
                                        ? cart.package[0].name +
                                        (cart.services.length > 0
                                          ? " , "
                                          : "")
                                        : ""
                                      }${cart.services.length > 0
                                        ? cart.services
                                          .map((ser) => ser.name)
                                          .join(", ")
                                        : ""
                                      }`
                                      : `${cart.package.length > 0
                                        ? cart.package[0].name +
                                        (cart.services.length > 0
                                          ? " , "
                                          : "")
                                        : ""
                                      }${cart.services.length > 0
                                        ? cart.services
                                          .map((ser) => ser.name)
                                          .join(", ")
                                        : ""
                                      }`,
                                  payment_type: "paypal",
                                  card_number: null,
                                  card_name: userName,
                                  coupon_code: usedCouponDetails?.code
                                    ? usedCouponDetails.code
                                    : " ",
                                  coupon_discount_percent:
                                    usedCouponDetails?.discount_rate
                                      ? usedCouponDetails.discount_rate
                                      : " ",
                                  used_coins: used_coins,
                                  tax_type: localStorage.getItem("tax_type"),
                                  status: 1,
                                  decline_issue: "",
                                  card_holder_email: email_address,
                                  address: address,
                                  postal_code: PostalCode,
                                  city: "",
                                  state: "",
                                  country: country,
                                };

                                if (cart?.template[0]?.id) {
                                  if (cart.template[0].doc === "resume") {
                                    ApiService.paymentStatusResumeTemplate(
                                      user?.token,
                                      storeDataPaypal,
                                      cart.template
                                    )
                                      .then((response) => {
                                        console.log("response" + response);
                                        const coinsAreUSing =
                                          localStorage.getItem(
                                            "checkoutUsingCoins"
                                          );
                                        const remaningUserCoins =
                                          localStorage.getItem(
                                            "checkoutRemaningCoins"
                                          );

                                        if (coinsAreUSing) {
                                          ApiService.updateUserCoins(
                                            user?.token,
                                            remaningUserCoins
                                          )
                                            .then((res) => {
                                              clearCart();
                                              setIsLoading(false);
                                              swal({
                                                closeOnClickOutside: true,
                                                title: "Congratulations",
                                                text: "Order Completed Successfully",
                                                icon: "success",
                                              })
                                                .then(() =>
                                                  navigate(
                                                    "/dashboard?tab=mytransactions"
                                                  )
                                                )
                                                .catch(() =>
                                                  navigate(
                                                    "/dashboard?tab=mytransactions"
                                                  )
                                                );
                                            })
                                            .catch((err) => console.log(err));
                                        } else {
                                          clearCart();
                                          setIsLoading(false);
                                          swal({
                                            closeOnClickOutside: true,
                                            title: "Congratulations",
                                            text: "Order Completed Successfully",
                                            icon: "success",
                                          })
                                            .then(() =>
                                              navigate(
                                                "/dashboard?tab=mytransactions"
                                              )
                                            )
                                            .catch(() =>
                                              navigate(
                                                "/dashboard?tab=mytransactions"
                                              )
                                            );
                                        }

                                        localStorage.removeItem("usedCoins");
                                        localStorage.removeItem("tax_amount");
                                        localStorage.removeItem(
                                          "checkoutUsingCoins"
                                        );
                                      })
                                      .catch((err) => console.log(err));
                                  } else {
                                    ApiService.paymentStatusCoverTemplate(
                                      user?.token,
                                      storeDataPaypal,
                                      cart.template
                                    )
                                      .then((response) => {
                                        console.log("response" + response);
                                        const coinsAreUSing =
                                          localStorage.getItem(
                                            "checkoutUsingCoins"
                                          );
                                        const remaningUserCoins =
                                          localStorage.getItem(
                                            "checkoutRemaningCoins"
                                          );

                                        if (coinsAreUSing) {
                                          ApiService.updateUserCoins(
                                            user?.token,
                                            remaningUserCoins
                                          )
                                            .then((res) => {
                                              clearCart();
                                              setIsLoading(false);
                                              swal({
                                                closeOnClickOutside: true,
                                                title: "Congratulations",
                                                text: "Order Completed Successfully",
                                                icon: "success",
                                              })
                                                .then(() =>
                                                  navigate(
                                                    "/dashboard?tab=mytransactions"
                                                  )
                                                )
                                                .catch(() =>
                                                  navigate(
                                                    "/dashboard?tab=mytransactions"
                                                  )
                                                );
                                            })
                                            .catch((err) => console.log(err));
                                        } else {
                                          clearCart();
                                          setIsLoading(false);
                                          swal({
                                            closeOnClickOutside: true,
                                            title: "Congratulations",
                                            text: "Order Completed Successfully",
                                            icon: "success",
                                          })
                                            .then(() =>
                                              navigate(
                                                "/dashboard?tab=mytransactions"
                                              )
                                            )
                                            .catch(() =>
                                              navigate(
                                                "/dashboard?tab=mytransactions"
                                              )
                                            );
                                        }

                                        localStorage.removeItem("usedCoins");
                                        localStorage.removeItem("tax_amount");
                                        localStorage.removeItem(
                                          "checkoutUsingCoins"
                                        );
                                      })
                                      .catch((err) => console.log(err));
                                  }
                                } else {
                                  ApiService.paymentStatus(
                                    user?.token,
                                    storeDataPaypal
                                  )
                                    .then((response) => {
                                      const coinsAreUSing =
                                        localStorage.getItem(
                                          "checkoutUsingCoins"
                                        );
                                      const remaningUserCoins =
                                        localStorage.getItem(
                                          "checkoutRemaningCoins"
                                        );

                                      if (coinsAreUSing) {
                                        ApiService.updateUserCoins(
                                          user?.token,
                                          remaningUserCoins
                                        )
                                          .then((res) => {
                                            clearCart();
                                            setIsLoading(false);
                                            swal({
                                              closeOnClickOutside: true,
                                              title: "Congratulations",
                                              text: "Order Completed Successfully",
                                              icon: "success",
                                            })
                                              .then(() =>
                                                navigate(
                                                  "/dashboard?tab=mytransactions"
                                                )
                                              )
                                              .catch(() =>
                                                navigate(
                                                  "/dashboard?tab=mytransactions"
                                                )
                                              );
                                          })
                                          .catch((err) => console.log(err));
                                      } else {
                                        clearCart();
                                        setIsLoading(false);
                                        swal({
                                          closeOnClickOutside: true,
                                          title: "Congratulations",
                                          text: "Order Completed Successfully",
                                          icon: "success",
                                        })
                                          .then(() =>
                                            navigate(
                                              "/dashboard?tab=mytransactions"
                                            )
                                          )
                                          .catch(() =>
                                            navigate(
                                              "/dashboard?tab=mytransactions"
                                            )
                                          );
                                      }

                                      localStorage.removeItem("usedCoins");
                                      localStorage.removeItem("tax_amount");
                                      localStorage.removeItem(
                                        "checkoutUsingCoins"
                                      );
                                    })
                                    .catch((err) => console.log(err));
                                }
                              });
                            }}
                            onError={(error) => {
                              console.log(error);
                              swal(
                                "Error!",
                                "Deposit Balance Transaction Not Successfull!",
                                "error"
                              );

                              const used_coins =
                                localStorage.getItem("usedCoins");
                              const id = localStorage.getItem("order_id");
                              let storeDataPaypal = {
                                id: id,
                                packageId:
                                  cart.package.length > 0
                                    ? cart.package[0].id
                                    : 0,
                                packageDuration:
                                  cart.package.length > 0
                                    ? cart.package[0].duration
                                    : 0,
                                packagePrice:
                                  cart.package.length > 0
                                    ? cart.package[0].price
                                    : 0,
                                services: cart.services,
                                order_id: error.orderID,
                                currency: "USD",
                                discounted_amount: remainingAmount,
                                sub_total: totalAmount,
                                tax_amount: localStorage.getItem("tax_amount"),
                                total_amount:
                                  totalRef.current.textContent.toString(),
                                description:
                                  noteValue.length > 0
                                    ? `${noteValue}, ${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`
                                    : `${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`,
                                payment_type: "paypal",
                                card_number: null,
                                card_name: "",
                                coupon_code: usedCouponDetails?.code
                                  ? usedCouponDetails.code
                                  : " ",
                                coupon_discount_percent:
                                  usedCouponDetails?.discount_rate
                                    ? usedCouponDetails.discount_rate
                                    : " ",
                                used_coins: used_coins,
                                tax_type: localStorage.getItem("tax_type"),
                                status: 0,
                                decline_issue:
                                  "Error During Payment From Paypal",
                                card_holder_email: "",
                                address: "",
                                postal_code: "",
                                city: "",
                                state: "",
                                country: "",
                              };
                              if (cart?.template[0]?.id) {
                                if (cart.template[0].doc === "resume") {
                                  ApiService.paymentStatusResumeTemplate(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((res) => console.log(res))
                                    .catch((err) => console.log(err));
                                } else {
                                  ApiService.paymentStatusCoverTemplate(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((res) => console.log(res))
                                    .catch((err) => console.log(err));
                                }
                              } else {
                                ApiService.paymentStatus(
                                  user?.token,
                                  storeDataPaypal
                                )
                                  .then((res) => console.log(res))
                                  .catch((err) => console.log(err));
                              }
                            }}
                            onCancel={(error) => {
                              swal(
                                "Error!",
                                "Deposit Balance Transaction has been cancelled",
                                "error"
                              );
                              const used_coins =
                                localStorage.getItem("usedCoins");
                              const id = localStorage.getItem("order_id");
                              let storeDataPaypal = {
                                id: id,
                                packageId:
                                  cart.package.length > 0
                                    ? cart.package[0].id
                                    : 0,
                                packageDuration:
                                  cart.package.length > 0
                                    ? cart.package[0].duration
                                    : 0,
                                packagePrice:
                                  cart.package.length > 0
                                    ? cart.package[0].price
                                    : 0,
                                services: cart.services,
                                order_id: error.orderID,
                                currency: "USD",
                                discounted_amount: remainingAmount,
                                sub_total: totalAmount,
                                tax_amount: localStorage.getItem("tax_amount"),
                                total_amount:
                                  totalRef.current.textContent.toString(),
                                description:
                                  noteValue.length > 0
                                    ? `${noteValue}, ${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`
                                    : `${cart.package.length > 0
                                      ? cart.package[0].name +
                                      (cart.services.length > 0
                                        ? " , "
                                        : "")
                                      : ""
                                    }${cart.services.length > 0
                                      ? cart.services
                                        .map((ser) => ser.name)
                                        .join(", ")
                                      : ""
                                    }`,
                                payment_type: "paypal",
                                card_number: null,
                                card_name: "",
                                coupon_code: usedCouponDetails?.code
                                  ? usedCouponDetails.code
                                  : " ",
                                coupon_discount_percent:
                                  usedCouponDetails?.discount_rate
                                    ? usedCouponDetails.discount_rate
                                    : " ",
                                used_coins: used_coins,
                                tax_type: localStorage.getItem("tax_type"),
                                status: 0,
                                decline_issue: "user Cancel the Payment",
                                card_holder_email: "",
                                address: "",
                                postal_code: "",
                                city: "",
                                state: "",
                                country: "",
                              };
                              if (cart?.template[0]?.id) {
                                if (cart.template[0].doc === "resume") {
                                  ApiService.paymentStatusResumeTemplate(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((res) => console.log(res))
                                    .catch((err) => console.log(err));
                                } else {
                                  ApiService.paymentStatusCoverTemplate(
                                    user?.token,
                                    storeDataPaypal,
                                    cart.template
                                  )
                                    .then((res) => console.log(res))
                                    .catch((err) => console.log(err));
                                }
                              } else {
                                ApiService.paymentStatus(
                                  user?.token,
                                  storeDataPaypal
                                )
                                  .then((res) => console.log(res))
                                  .catch((err) => console.log(err));
                              }
                            }}
                          />
                        </PayPalScriptProvider>
                        {/* Paypal end */}
                      </div>

                      {/* Payment Card Info Section */}
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
                        {/* Card */}
                        <div className="pt-4 flex flex-col gap-4">
                          <Elements stripe={stripePromise} options={null}>
                            <StripeSeprateComponent
                              isLoading={(val) => setIsLoading(val)}
                              coinsAreUSing={localStorage.getItem(
                                "checkoutUsingCoins"
                              )}
                              remaningUserCoins={localStorage.getItem(
                                "checkoutRemaningCoins"
                              )}
                              // data
                              packageId={
                                cart.package.length > 0 ? cart.package[0].id : 0
                              }
                              packageDuration={
                                cart.package.length > 0
                                  ? cart.package[0].duration
                                  : 0
                              }
                              packagePrice={
                                cart.package.length > 0
                                  ? cart.package[0].price
                                  : 0
                              }
                              services={cart.services}
                              discounted_amount={remainingAmount}
                              sub_total={totalAmount}
                              tax_amount={localStorage.getItem("tax_amount")}
                              total_amount={total}
                              description={
                                noteValue.length > 0
                                  ? `${noteValue}, ${cart.package.length > 0
                                    ? cart.package[0].name +
                                    (cart.services.length > 0
                                      ? " , "
                                      : "")
                                    : ""
                                  }${cart.services.length > 0
                                    ? cart.services
                                      .map((ser) => ser.name)
                                      .join(", ")
                                    : ""
                                  }`
                                  : `${cart.package.length > 0
                                    ? cart.package[0].name +
                                    (cart.services.length > 0
                                      ? " , "
                                      : "")
                                    : ""
                                  }${cart.services.length > 0
                                    ? cart.services
                                      .map((ser) => ser.name)
                                      .join(", ")
                                    : ""
                                  }`
                              }
                              coupon_code={
                                usedCouponDetails?.code
                                  ? usedCouponDetails.code
                                  : " "
                              }
                              coupon_discount_percent={
                                usedCouponDetails?.discount_rate
                                  ? usedCouponDetails.discount_rate
                                  : " "
                              }
                              used_coins={localStorage.getItem("usedCoins")}
                              tax_type={localStorage.getItem("tax_type")}
                            />
                          </Elements>
                        </div>
                      </div>
                      {/* Test Strip  */}
                      <div id="test_strip"></div>
                    </>
                  )}
                </div>
                {/* Right Section */}
                <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-20 lg:sticky flex flex-col gap-8 top-[120px] h-fit bg-light-yellow border-2 mt-10 w-full items-center">
                  <div className="sm:w-[100%]">
                    <div className="border-2 p-4 text-base flex flex-col gap-2">
                      <div className="flex justify-between gap-4">
                        {/* Text */}
                        <div>
                          <p className="text-xs sm:text-sm text-left ">
                            Kindly ensure the redemption of your coins before
                            the expire date, to maximize you savings
                          </p>
                        </div>
                        {/* Coins */}
                        <div className="flex items-start justify-end sm:items-center gap-2 w-[150px] sm:w-[100px] md:w-[120px]">
                          <img
                            src={coin}
                            className="coin-icon w-5 lg:w-8"
                            alt="Coin Icon"
                          />

                          <p className="font-bold lg:text-lg text-sm">
                            {remaningCoins}
                          </p>
                        </div>
                      </div>
                      {userCoins?.coins > 0 && (
                        <div>
                          <p className="text-sm sm:text-base font-semibold">
                            Use Until{" "}
                            <span className="font-bold text-xs text-muted">
                              {formatDate(userCoins?.coin_end_date)}
                            </span>
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {subtotal === 0 ? (
                          <div className="flex items-center mb-4">
                            <input
                              disabled
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"
                              className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                            >
                              Can't use Coins on Zero Amount{" "}
                            </label>
                          </div>
                        ) : userCoins?.coins > 0 ? (
                          !usedCouponDetails ? (
                            <div className="flex items-center">
                              <input
                                id="link-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={useCoins}
                                onChange={() => setUseCoins(!useCoins)}
                              />
                              <label
                                htmlFor="link-checkbox"
                                className="ms-2 text-sm font-medium"
                              >
                                Use Coins
                              </label>
                            </div>
                          ) : (
                            <div className="flex items-center mb-4">
                              <input
                                disabled
                                id="disabled-checkbox"
                                type="checkbox"
                                defaultValue
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="disabled-checkbox"
                                className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                              >
                                Can't use Coins until using Coupon
                              </label>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center mb-4">
                            <input
                              disabled
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"
                              className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                            >
                              Can't use 0 Coins
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/*  */}
                    <div className="mb-4 sm:mb-0">
                      {cart.package.map((cart, idx) => (
                        <div
                          key={idx}
                          className="flex sm:gap-4 gap-2 items-center p-2 sm:py-6 sm:px-4 "
                        >
                          {/* Img */}
                          <div className="sm:w-[50px] w-[60px]">
                            <img src={PackageImg} className="w-full" alt="" />
                          </div>
                          {/* Details */}
                          <div className="flex-1 flex flex-row sm:items-center justify-between pr-2">
                            <div className="pt-4 sm:pt-0">
                              <h1 className="text-base sm:text-sm font-bold ">
                                {cart.name}
                              </h1>
                            </div>
                            <div className="text-sm flex items-center sm:block justify-end w-full sm:w-auto py-2 sm:py-0 text-muted">
                              <h1>
                                {cart.price} * {cart.quantity}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Cart Service List */}
                    <div className="mb-4 sm:mb-0">
                      {cart.services.map((carts, idx) => (
                        <div
                          key={idx}
                          className="flex sm:gap-4 gap-2 items-center p-2 sm:py-6 sm:px-4 "
                        >
                          {/* Img */}
                          <div className="sm:w-[50px] w-[60px]">
                            <img
                              src={`${global.imageUrl + carts.image}`}
                              className="w-full"
                              alt=""
                            />
                          </div>
                          {/* Details */}
                          <div className="flex-1 flex flex-row sm:items-center justify-between pr-2">
                            <div className="pt-4 sm:pt-0">
                              <h1 className="text-base sm:text-sm font-bold ">
                                {carts.name}
                              </h1>
                            </div>
                            <div className="text-sm flex items-center sm:block justify-end w-full sm:w-auto py-2 sm:py-0 text-muted">
                              <h1>
                                {cart?.package.length > 0 &&
                                  cart?.package[0].id === 2 &&
                                  idx === selectedFree ? (
                                  <div>
                                    <span>FREE</span>
                                    {" / "}
                                    <span className="line-through">
                                      $
                                      {carts.discounted_price > 0
                                        ? carts.discounted_price
                                        : carts.price}
                                    </span>
                                  </div>
                                ) : cart?.package.length > 0 &&
                                  cart?.package[0].id === 3 &&
                                  selectedFreeServices.includes(idx) ? (
                                  <div>
                                    <span>FREE</span>
                                    {" / "}
                                    <span className="line-through">
                                      {carts.discounted_price > 0
                                        ? carts.discounted_price
                                        : carts.price}
                                    </span>
                                  </div>
                                ) : carts.discounted_price > 0 ? (
                                  <>
                                    ${carts.discounted_price}
                                    {" / "}
                                    <span className="line-through">
                                      ${carts.price}
                                    </span>
                                  </>
                                ) : (
                                  carts.price
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}

                      {cart?.template.map((carts, idx) => (
                        <div
                          key={idx}
                          className="flex sm:gap-4 gap-2 items-center p-2 sm:py-6 sm:px-4 "
                        >
                          {/* Img */}
                          <div className="sm:w-[50px] w-[60px]">
                            <img
                              src={`${global.imageUrl + carts.image}`}
                              className="w-full"
                              alt=""
                            />
                          </div>
                          {/* Details */}
                          <div className="flex-1 flex flex-row sm:items-center justify-between pr-2">
                            <div className="pt-4 sm:pt-0">
                              <h1 className="text-base sm:text-sm font-bold ">
                                {carts.name}
                              </h1>
                            </div>
                            <div className="text-sm flex items-center sm:block justify-end w-full sm:w-auto py-2 sm:py-0 text-muted">
                              <h1>
                                {cart?.package.length > 0 &&
                                  cart?.package[0].id === 2 &&
                                  idx === selectedFree ? (
                                  <div>
                                    <span>FREE</span>
                                    {" / "}
                                    <span className="line-through">
                                      $
                                      {carts.discounted_price > 0
                                        ? carts.discounted_price
                                        : carts.price}
                                    </span>
                                  </div>
                                ) : (cart?.package.length > 0 &&
                                  cart?.package[0].id === 3) ||
                                  userData?.package_id === 3 ? (
                                  <div>
                                    <span>FREE</span>
                                    {" / "}
                                    <span className="line-through">
                                      $
                                      {carts.discounted_price > 0
                                        ? carts.discounted_price
                                        : carts.price}
                                    </span>
                                  </div>
                                ) : carts.discounted_price > 0 ? (
                                  <>
                                    {carts.discounted_price}
                                    {" / "}
                                    <span className="line-through">
                                      ${carts.price}
                                    </span>
                                  </>
                                ) : (
                                  carts.price
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Apply Coupun */}
                    <div className="flex gap-4">
                      <input
                        placeholder={
                          useCoins
                            ? "Can't use Coupon until using Coins"
                            : subtotal === 0
                              ? "Can't use Coupon on Zero Amount"
                              : "Apply coupon"
                        }
                        onChange={(e) => couponStatus(e.target.value)}
                        value={couponCode}
                        className="border-2 px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none"
                        required={false}
                        readOnly={
                          (usedCouponDetails && useCoins) || subtotal === 0
                        }
                        type="text"
                        disabled={useCoins}
                      />
                      {usedCouponDetails ? (
                        <button
                          disabled={true}
                          className={`bg-gray-500  text-base font-bold text-white px-2 py-1  rounded-md `}
                        >
                          Applied
                        </button>
                      ) : (
                        <>
                          {verifyingCoupon ? (
                            <button
                              disabled
                              type="button"
                              className="text-white bg-primary text-base font-bold px-2 py-1 rounded-md flex items-center"
                            >
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="inline mr-3 w-4 h-4 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Verifying...
                            </button>
                          ) : (
                            <button
                              disabled={useCoins || subtotal === 0}
                              onClick={ApplyCoupon}
                              className={`${useCoins
                                ? "bg-gray-500"
                                : subtotal === 0
                                  ? "bg-gray-500"
                                  : "hover:bg-[#0073b1cc] bg-primary"
                                }  text-base font-bold text-white px-2 py-1  rounded-md `}
                            >
                              APPLY
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {/* Total Calcutation */}
                    <div className="py-4 flex flex-col gap-2">
                      {/* SubTotal */}
                      <div className="flex justify-between items-center">
                        <span className="text-muted text-sm">SubTotal</span>
                        <span className="text-md font-semibold">
                          ${Number(subtotal).toFixed(2)}
                        </span>
                      </div>
                      {/* tax */}
                      {/* <div className="flex justify-between items-center">
                      <span className="text-muted text-sm">
                        Tax{" "}
                        <span className=" uppercase">
                          {taxType} ({tax}%)
                        </span>
                      </span>
                      <span className="text-md font-semibold text-muted">
                        ${amount_tax}
                      </span>
                    </div> */}
                      {/* WEEK OF 30% OF */}
                      {usedCouponDetails ? (
                        <div className={` flex justify-between items-center`}>
                          <span className="text-muted text-sm max-w-[120px] truncate">
                            Discount ({usedCouponDetails.discount_rate}%)
                          </span>
                          <span className="text-md font-semibold text-muted flex items-center gap-2">
                            <LiaTimesCircleSolid
                              onClick={() => removeCoupon()}
                              className="hover:bg-primary cursor-pointer text-lg"
                            />
                            (${couponDicsountRate})
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {useCoins ? (
                        <div className={` flex justify-between items-center`}>
                          <span className="text-muted text-sm max-w-[120px] truncate">
                            Coins Discount
                          </span>
                          <span className="text-md font-semibold text-black flex items-center gap-2">
                            <LiaTimesCircleSolid
                              onClick={() => removeCoins()}
                              size={20}
                              className="cursor-pointer text-red-500"
                            />
                            (Tax Inclusive) {usedCoins} Coins
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold flex items-center">
                          <span className="mr-2 text-sm">(Tax Inclusive)</span>{" "}
                          $<p ref={totalRef}>{total}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Checkout;
