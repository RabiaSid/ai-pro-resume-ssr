
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
//import LinkedInLogin from 'react-linkedin-login-oauth2';
import "./css/style2.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import $ from "jquery";
import axios from "axios";
import { ApiService } from "./services/ApiService";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { useAuth } from "./services/Auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Cookies from "js-cookie";

const fb_logo = "/images/fb_logo.webp";
const google_logo = "/images/google_logo.webp";
const linked = "/images/link.webp";
function Login() {
  const { setSession } = useAuth();
  const { reffered } = useParams();

  const [countries, setcountries] = useState([]);
  const [verified, setVerified] = useState(false);
  const [our_settings, set_our_settings] = useState([]);
  const location = useLocation();

  const clearSessionAndStorages = () => {
    // Clear all data in localStorage
    localStorage.clear();

    // Clear all data in sessionStorage
    sessionStorage.clear();

    const allCookies = Cookies.get();

    // Iterate over each cookie and remove it
    for (let cookieName in allCookies) {
      Cookies.remove(cookieName);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("reffered", reffered);
  }, []);

  //

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  if (location.pathname === "/login") {
    $(".widget-visible").removeClass("widget-visible");
  }

  const responseFacebook = (response) => {
    if (response.name !== undefined) {
      const token = global.getCookie("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const article = {
        name: response.name,
        email: response.email,
        provider: "facebook",
        provider_id: response.id,
        referred_by: reffered,
      };

      axios
        .post(global.baseurl + "/login/social-response", article, { headers })
        .then((res) => {
          clearSessionAndStorages();
          setSession(res.data.data);
          // Errors
          setShowAlert(false);
          setShowErrorMessage("");
          setIsSubmitting(false);
          // Navigate
          if (res.data.data.is_admin === 0) {
            navigate("/dashboard");
          } else {
            navigate("/admin/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          $("#login_submit").show();
          $("#loader1").hide();

          setShowAlert(false);
          setShowErrorMessage(err.response.data.message);
          setIsSubmitting(false);
        });
    }
  };

  const onSuccess = (res) => {
    setIsSubmitting(true);
    const article = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: "google",
      provider_id: res.profileObj.googleId,
      referred_by: reffered,
    };
    console.log(article);
    axios
      .post(global.baseurl + "/login/social-response", article)
      .then((res) => {
        clearSessionAndStorages();
        setSession(res.data.data);
        // Errors
        setShowAlert(false);
        setShowErrorMessage("");
        setIsSubmitting(false);
        // Navigate
        if (res.data.data.is_admin === 0) {
          navigate("/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        setShowAlert(true);
        setShowErrorMessage(err.response.data.message);
        setIsSubmitting(false);
      });
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });

    function start() {
      gapi.client.init({
        clientId: global.google_client_id,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);

    $(".fb_login_btn").html("Sign-In With Facebook");
  }, []);

  const handleLinkedInLogin = () => {
    const response_type = "code";
    const clientId = "7769gw1uz1ow19";
    const redirectUri = "https://aiproresume.com/login";
    const state = "foobar";
    const scope = "openid profile email";

    // Redirect the user to LinkedIn's authorization endpoint
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}`;
  };

  const locations = useLocation();
  useEffect(() => {
    axios
      .get(global.baseurl + "/show-countries")
      .then((data) => {
        if (data) {
          setcountries(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const params = new URLSearchParams(locations.search);
    const code = params.get("code");

    if (code) {
      ApiService.getAccessToken(code, "https://aiproresume.com/login")
        .then((res) => {
          console.log(res.data);

          const article = {
            name: res.data.data.name,
            email: res.data.data.email,
            provider: "linkedin",
            provider_id: res.data.data.sub,
            referred_by: reffered,
          };
          axios
            .post(global.baseurl + "/login/social-response", article)
            .then((res) => {
              clearSessionAndStorages();
              setSession(res.data.data);
              // Errors
              setShowAlert(false);
              setShowErrorMessage("");
              setIsSubmitting(false);
              // Navigate
              if (res.data.data.is_admin === 0) {
                navigate("/dashboard");
              } else {
                navigate("/admin/dashboard");
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              $("#login_submit").show();
              $("#loader1").hide();
            });
        })
        .catch((err) => console.log(err));
    }
  }, [locations.search]);

  // All Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const handleRegister = (data) => {
    // console.log(data);

    if (verified) {
      setIsSubmitting(true);
      ApiService.register(data)
        .then((res) => {
          toast.success(res.data.message);
          setShowAlert(false);
          setShowErrorMessage("");
          setIsSubmitting(false);
          navigate("/verify");
        })
        .catch((err) => {
          console.log(err);
          setShowAlert(true);
          setShowErrorMessage(err.response.data.message);
          setIsSubmitting(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
    } else {
      setCaptchaError("Please check the captcha");
    }
  };
  //Password
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showC_Password, setC_ShowPassword] = useState(false);
  const handleTogglePasswordVisibilityC = () => {
    setC_ShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCheckCaptcha = () => {
    setVerified(true);
    setCaptchaError("");
  };

  const resetRecaptchaValue = () => {
    setVerified(null);
  };

  const TIMEOUT_DURATION = 1 * 60 * 1000;
  let timeoutId;

  const handleRecaptchaTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetRecaptchaValue, TIMEOUT_DURATION);
  };

  const [ads, setAds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />

      {ads
        .filter((ad) => ad.slug === "page-header-top")
        .map((ad) => (
          <div key={ad.id} className="flex justify-center my-4">
            {ad.is_script === 0 ? (
              <a href={`${ad.ad_url}`} target="blank">
                <img
                  className="w-full"
                  src={`${global.imageUrl + ad.image}`}
                  alt={`Ad ${ad.id}`}
                />
              </a>
            ) : (
              <div className="p-4">
                <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
              </div>
            )}
          </div>
        ))}

      <div className="w-full md:w-[550px] m-auto mt-4 mb-4 px-4 min-h-[800px] text-center font-Lexend">
        {showAlert && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-yellow-700 p-4 rounded relative"
            role="alert"
          >
            <strong className="block font-bold sm:inline">
              {showErrorMessage}
            </strong>
            <button
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4"
              onClick={() => setShowAlert(false)}
            >
              <span className="text-yellow-700">&times;</span>
            </button>
          </div>
        )}
        <h1 className="text-[#0072b1] text-center mt-4 mb-6 text-2xl font-bold font-large">
          CREATE ACCOUNT
        </h1>

        <div id="signInButton">
          <GoogleLogin
            clientId={global.google_client_id}
            buttonText="Sign-in with Google"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="w-[100%] border border-solid text-slate-500 border-slate-300 px-2 py-2 rounded-md hover:bg-slate-800 hover:text-white ease-in transition-all flex justify-center items-center"
              >
                <img
                  src={google_logo}
                  alt="My Image"
                  width={25}
                  height={25}
                  className="mr-2"
                />{" "}
                Sign-up with Google
              </button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
          />
        </div>
        <br />
        <FacebookLogin
          appId={global.fb_app_id}
          autoLoad={false}
          fields="name,email,picture"
          onClick={responseFacebook}
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="w-[100%] border border-solid text-slate-500 border-slate-300 px-2 py-2 rounded-md hover:bg-slate-800 hover:text-white ease-in transition-all flex justify-center items-center"
            >
              <img
                src={fb_logo}
                alt="My Image"
                width={25}
                height={25}
                className="mr-2"
              />{" "}
              Sign-up with Facebook
            </button>
          )}
        />
        <br />

        <button
          onClick={handleLinkedInLogin}
          className="w-[100%] border border-solid text-slate-500 border-slate-300 px-2 py-2 rounded-md hover:bg-slate-800 hover:text-white ease-in transition-all flex justify-center items-center"
        >
          <img
            src={linked}
            alt="My Image"
            width={25}
            height={25}
            className="mr-2"
          />{" "}
          Sign-up with LinkedIn
        </button>

        {/* Or Line */}
        <div class="px-10 py-2 flex items-center">
          <span class="w-full border-t  border-primary-blue"></span>
          <span class="mx-4 font-Lexend text-primary-blue">OR</span>
          <span class="w-full border-t  border-primary-blue"></span>
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0, width: "100%" },
            }}
            noValidate
            autoComplete="on"
            className="flex flex-col gap-4 mt-4"
          >
            {/* Name */}
            <div className="flex flex-col">
              <TextField
                id="name"
                label="Name*"
                variant="outlined"
                type="text"
                autoComplete="on"
                autoFocus
                {...register("name", {
                  required: "Please Enter your Name",
                })}
                aria-label={errors?.name ? "Email error" : ""}
                error={!!errors.name}
              />
              <span className="text-left text-red-500 text-xs">
                {errors?.name?.message}
              </span>
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <TextField
                id="email"
                label="Email*"
                variant="outlined"
                autoComplete="on"
                type="email"
                {...register("email", {
                  required: "Please Enter Your Email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                aria-label={errors?.email ? "Email error" : ""}
                error={!!errors.email}
              />
              <span className="text-left text-red-500 text-xs">
                {errors?.email?.message}
              </span>
            </div>
            {/* Password */}
            <div className="flex flex-col">
              <div className="relative">
                <TextField
                  id="password"
                  label="Password*"
                  variant="outlined"
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  {...register("password", {
                    required: "Please Enter Your Password",
                    minLength: {
                      value: 6,
                      message: "Password Must be 6 characters",
                    },
                  })}
                  aria-label={errors?.password ? "Password error" : ""}
                  error={!!errors.password}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <FaRegEye className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl " />
                  )}
                </button>
              </div>
              <span className="text-left text-red-500 text-xs">
                {errors?.password?.message}
              </span>
            </div>
            {/* Confirms Password */}
            <div className="flex flex-col">
              <div className="relative">
                <TextField
                  id="password"
                  label="Confirm Password*"
                  autoComplete="on"
                  variant="outlined"
                  type={showC_Password ? "text" : "password"}
                  className="w-full"
                  {...register("confirm_password", {
                    minLength: {
                      value: 6,
                      message: "Password Must be 6 characters",
                    },
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  aria-label={errors?.confirm_password ? "Password error" : ""}
                  error={!!errors.confirm_password}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibilityC}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showC_Password ? (
                    <FaRegEye className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl " />
                  )}
                </button>
              </div>
              <span className="text-left text-red-500 text-xs">
                {errors?.confirm_password?.message}
              </span>
            </div>
            {/* Refferd */}
            <div className="flex flex-col">
              <TextField
                id="reffered"
                label="Referred By"
                variant="outlined"
                autoComplete="on"
                type="text"
                readOnly
                value={reffered ? reffered : "Referred By"}
                {...register("reffered")}
                aria-label={errors?.reffered ? "reffered error" : ""}
                error={!!errors.reffered}
              />
            </div>
            {/* SelectC */}
            <div className="w-full flex flex-col">
              <FormControl variant="outlined" className="w-full">
                <InputLabel id="referred-label">Select Country</InputLabel>
                <Select
                  labelId="referred-label"
                  id="referred"
                  label="Select country"
                  {...register("country", {
                    required: "Please Select Your Country",
                  })}
                  aria-label={errors?.country ? "referred error" : ""}
                  error={!!errors.country}
                  className="text-left"
                >
                  {countries.map((country, index_country) => (
                    <MenuItem value={country?.id} key={index_country}>
                      {country?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.country && (
                <span className="text-left text-red-500  text-xs">
                  {errors?.country?.message}
                </span>
              )}
            </div>
            {/* Phone */}
            <div className="flex flex-col">
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone Number is Required" }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    placeholder="Enter phone number*"
                    autoComplete="on"
                    inputProps={{
                      name: "phone",
                      required: true, // Ensure the phone input is required
                    }}
                    className={` ${errors?.phone ? "border-red-500 border" : " border-2"
                      }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-red-500 text-left text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </Box>
          <button
            className="hidden"
            type="submit"
            id="register_submit"
          ></button>
        </form>
        <div className="mt-4 flex flex-col items-start">
          <span className="text-red-500 text-sm text-left">{captchaError}</span>
          <ReCAPTCHA
            sitekey={global.captcha_sitekey}
            onChange={(val) => {
              handleCheckCaptcha(val);
              handleRecaptchaTimeout();
            }}
            className={`${captchaError ? "border-red-500 border" : ""}`}
          />
        </div>
        <button
          onClick={() => document.getElementById("register_submit").click()}
          className="bg-[#0072b1] flex justify-center w-[100%] mt-4 px-2 py-2 rounded-md text-white text-xl font-bold hover:bg-slate-800 ease-in transition-all"
        >
          {!isSubmitting ? (
            "CREATE ACCOUNT"
          ) : (
            <>
              <BiLoaderAlt size={28} className="mr-2 animate-spin" />{" "}
              Processing...
            </>
          )}
        </button>
        <div className="w-[60%] text-center mt-4 text-slate-500 inline-block">
          <p className="text-slate-500">
            Already an account?{" "}
            <a
              href={global.localPath + "login"}
              className="text-[#0072b1] font-bold hover:text-slate-800"
            >
              LOGIN
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
