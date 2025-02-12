
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import "./css/style2.css";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import $, { error } from "jquery";
import axios from "axios";
import { ApiService } from "./services/ApiService";
// You can use provided image shipped by this package or using your own
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
// New Code is Here
import { IoInformationCircle } from "react-icons/io5";
import { useAuth } from "./services/Auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const fb_logo = "/images/fb_logo.webp";
const google_logo = "/images/google_logo.webp";
const linked = "/images/link.webp";
function Login() {
  const { setSession } = useAuth();
  const [verified, setVerified] = useState(false);
  const location = useLocation();

  //
  const [captchaError, setCaptchaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (location.pathname === "/login") {
    $(".widget-visible").removeClass("widget-visible");
  }
  // FaceBook Auth
  const responseFacebook = (response) => {
    console.log(response);
    if (response.name !== undefined) {
      setIsSubmitting(true);
      const article = {
        name: response.name,
        email: response.email,
        provider: "facebook",
        provider_id: response.id,
      };
      axios
        .post(global.baseurl + "/login/social-response", article)
        .then((res) => {
          clearSessionAndStorages();
          setSession(res.data.data);
          console.log(res.data.data);
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
          setShowAlert(true);
          setShowErrorMessage(err.response.data.message);
          setIsSubmitting(false);
        });
    }
  };
  // Google Auth
  const onSuccess = (res) => {
    setIsSubmitting(true);
    const article = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: "google",
      provider_id: res.profileObj.googleId,
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
        console.log(err);
        // setShowErrorMessage(err);
        setIsSubmitting(false);
      });
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
    setShowErrorMessage(res);
  };

  useEffect(() => {
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
    const params = new URLSearchParams(locations.search);
    const code = params.get("code");

    if (code) {
      ApiService.getAccessToken(code, "https://aiproresume.com/login")
        .then((res) => {
          console.log(res.data);
          setIsSubmitting(true);
          const article = {
            name: res.data.data.name,
            email: res.data.data.email,
            provider: "linkedin",
            provider_id: res.data.data.sub,
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
              setShowAlert(true);
              setShowErrorMessage(err.response.data.message);
              setIsSubmitting(false);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [locations.search]);

  const [isNotVerified, setisNotVerified] = useState(false);

  const handleLoginSubmit = (data) => {
    if (verified) {
      setIsSubmitting(true);
      setCaptchaError("");
      ApiService.login(data)
        .then((res) => {
          // clearSessionAndStorages();
          setSession(res.data.data);
          // Errors
          setisNotVerified(false);
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

          if (err.response.data.data === 403) {
            setisNotVerified(true);
          } else {
            setisNotVerified(false);
          }
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

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCheckCaptcha = () => {
    setVerified(true);
    setCaptchaError("");
  };

  // Reset the reCAPTCHA value after a certain time
  const resetRecaptchaValue = () => {
    setVerified(null);
  };

  // Set a timeout to reset the reCAPTCHA value after 5 minutes (adjust as needed)
  const TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
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

      <div className="w-full md:w-[550px] m-auto mt-20 px-4 min-h-[800px] text-center font-Lexend">
        {/* Error Message */}
        {showAlert && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-yellow-700 p-4 rounded relative"
            role="alert"
          >
            <strong className="block font-bold sm:inline">
              {showErrorMessage}
            </strong>
            {isNotVerified && (
              <>
                <br />
                <Link
                  to={"/verify"}
                  className="underline text-blue-400 cursor-pointer italic"
                >
                  Click Here
                </Link>
              </>
            )}
            <button
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4"
              onClick={() => setShowAlert(false)}
            >
              <span className="text-yellow-700">&times;</span>
            </button>
          </div>
        )}

        {/* Errro Message  end */}
        <h1 className="text-[#0072b1] text-center my-2 text-2xl font-bold font-large">
          SIGN IN
        </h1>
        <p className="text-black text-left my-4 text-lg flex items-start justify-center">
          <IoInformationCircle size={24} className="mt-[2px] text-[red]" />
          <div className="w-[97%] text-center">
            Sign in to AI Pro Resume to securely save and update your resume or
            cover letter information for future use, free of charge. Enjoy free
            downloads at <span className="text-[red]">no hidden costs</span>.
          </div>
        </p>
        <div className="flex flex-col gap-4">
          {/* Google Auth */}
          <div id="signInButton">
            <GoogleLogin
              clientId={global.google_client_id}
              buttonText="Sign-In With Google"
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
                  Sign-in with Google
                </button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
            />
          </div>
          {/* FaceBook Auth */}
          <FacebookLogin
            appId={global.fb_app_id}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email"
            // onClick={responseFacebook}
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
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
                Sign-in with Facebook
              </button>
            )}
          />
          {/* Linkedin Auth */}
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
            Sign-in with LinkedIn
          </button>
        </div>
        {/* Or Line */}
        <div class="px-10 py-2 flex items-center">
          <span class="w-full border-t  border-primary-blue"></span>
          <span class="mx-4 font-Lexend text-primary-blue">OR</span>
          <span class="w-full border-t  border-primary-blue"></span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0, width: "100%" },
            }}
            noValidate
            autoComplete="on"
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <TextField
                id="email"
                label="Email or Customer ID*"
                variant="outlined"
                type="email"
                autoComplete="on"
                autoFocus
                {...register("email", {
                  required: "Please Enter Your Email or Customer ID",
                })}
                aria-label={errors?.email ? "Email error" : ""}
                error={!!errors.email}
              />
              <span className="text-left text-red-500 text-xs">
                {errors?.email?.message}
              </span>
            </div>
            {/* Password */}
            <div>
              <div className="flex flex-col">
                <div className="relative w-full">
                  <TextField
                    id="password"
                    label="Password*"
                    variant="outlined"
                    autoComplete="on"
                    type={showPassword ? "text" : "password"}
                    className="w-full"
                    {...register("password", {
                      required: "Please Enter Your Password",
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
                <div className="flex justify-between">
                  <div className="text-slate-500">
                    <input type="checkbox" className="autofill:bg-yellow-200" />{" "}
                    Remember me
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="text-[#0072b1] font-bold hover:text-slate-800"
                  >
                    {" "}
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </Box>

          <button type="submit" className="hidden" id="submitForm"></button>
        </form>
        {/* Captcha */}
        <div className="flex flex-col items-start mt-4">
          <span className="text-red-500 text-sm">{captchaError}</span>
          <ReCAPTCHA
            sitekey={global.captcha_sitekey}
            onChange={(val) => {
              handleCheckCaptcha(val);
              handleRecaptchaTimeout();
            }}
          />
        </div>
        {/* Buttons */}
        <button
          id="sub_button"
          type="button"
          onClick={() => document.getElementById("submitForm").click()}
          className="bg-[#0072b1] w-full mt-4 px-8 py-2 rounded-md text-white text-xl font-bold hover:bg-slate-800 ease-in transition-all flex items-center justify-center"
        >
          {!isSubmitting ? (
            " SIGN-IN"
          ) : (
            <>
              <BiLoaderAlt size={28} className="mr-2 animate-spin" />{" "}
              Processing...
            </>
          )}
        </button>
        {/* Create Account */}
        <button
          id="sub_button"
          type="button"
          className="bg-[#0072b1] w-full mt-4 px-8 py-2 rounded-md text-white text-xl font-bold hover:bg-slate-800 ease-in transition-all mb-4 sm:mb-0"
        >
          <Link to={"/register"} className="text-white  hover:white">
            CREATE ACCOUNT
          </Link>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Login;
