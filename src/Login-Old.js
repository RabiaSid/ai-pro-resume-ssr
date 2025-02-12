
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import "./css/style2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import $ from "jquery";
import axios from "axios";
import { ApiService } from "./services/ApiService";
import { LinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
const fb_logo = "/images/fb_logo.webp";
const google_logo = "/images/google_logo.webp";
const linked = "/images/link.webp";
const cookie_data = () => {
  var email = $("#login_email").val();
  var password = $("#login_password").val();

  document.cookie = "my_email=" + email + ";" + global.localPath;
  document.cookie = "my_password=" + password + ";" + global.localPath;
};
const clear_cookie_data = () => {
  document.cookie = "my_email=;" + global.localPath;
  document.cookie = "my_password=;" + global.localPath;
};

const get_cookie_data = () => {
  var email = global.getCookie("my_email");
  var password = global.getCookie("my_password");

  $("#login_email").val(email);
  $("#login_password").val(password);
  if (email !== "") {
    $(".rememberMe").prop("checked", true);
  }
};

function Login() {
  const [verified, setVerified] = useState(false);
  const [our_settings, set_our_settings] = useState([]);
  const location = useLocation();

  if (location.pathname === "/login") {
    $(".widget-visible").removeClass("widget-visible");
  }
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.name);
    if (response.name !== undefined) {
      const headers = {
        Authorization: "Bearer " + token,
      };
      const article = {
        name: response.name,
        email: response.email,
        provider: "facebook",
        provider_id: response.id,
      };
      axios
        .post(global.baseurl + "/login/social-response", article, { headers })
        .then((data) => {
          console.log(data);
          console.log(data.data.data.token);

          document.cookie =
            "token=" + data.data.data.token + ";" + global.localPath;
          document.cookie =
            "uuid=" + data.data.data.uuid + ";" + global.localPath;
          document.cookie =
            "user_id=" + data.data.data.id + ";" + global.localPath;
          document.cookie =
            "name=" + data.data.data.name + ";" + global.localPath;
          document.cookie =
            "user_image=" + data.data.data.image + ";" + global.localPath;
          document.cookie =
            "user_name=" + data.data.data.name + ";" + global.localPath;
          document.cookie =
            "login_email=" + data.data.data.email + ";" + global.localPath;
          document.cookie =
            "is_super_admin=" +
            data.data.data.is_super_admin +
            ";" +
            global.localPath;

          const role = data.data.data.roles;
          const roles = [role.id, role.name];
          document.cookie = "roles=" + roles + ";" + global.localPath;
          document.cookie =
            "permissions=" +
            data.data.data.permissions +
            ";" +
            global.localPath;

          toast.success("Login Successfully...");
          setTimeout(() => {
            window.location.href = global.localPath + "dashboard";
          }, 600);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          $("#login_submit").show();
          $("#loader1").hide();
        });
    }
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj.name);
    const token = global.getCookie("token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const article = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: "google",
      provider_id: res.profileObj.googleId,
    };
    axios
      .post(global.baseurl + "/login/social-response", article, { headers })
      .then((data) => {
        document.cookie =
          "token=" + data.data.data.token + ";" + global.localPath;
        document.cookie =
          "uuid=" + data.data.data.uuid + ";" + global.localPath;
        document.cookie =
          "user_id=" + data.data.data.id + ";" + global.localPath;
        document.cookie =
          "name=" + data.data.data.name + ";" + global.localPath;
        document.cookie =
          "user_image=" + data.data.data.image + ";" + global.localPath;
        document.cookie =
          "user_name=" + data.data.data.name + ";" + global.localPath;
        document.cookie =
          "login_email=" + data.data.data.email + ";" + global.localPath;
        document.cookie =
          "is_super_admin=" +
          data.data.data.is_super_admin +
          ";" +
          global.localPath;

        const role = data.data.data.roles;
        const roles = [role.id, role.name];
        document.cookie = "roles=" + roles + ";" + global.localPath;
        document.cookie =
          "permissions=" + data.data.data.permissions + ";" + global.localPath;

        toast.success("Login Successfully...");
        setTimeout(() => {
          window.location.href = global.localPath + "dashboard";
        }, 600);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        $("#login_submit").show();
        $("#loader1").hide();
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

  const pass_view = () => {
    var passwordInput = $("#login_password");
    var pass_view = $("#pass_view");
    var pass_hide = $("#pass_hide");
    pass_view.hide();
    pass_hide.show();
    passwordInput.attr("type", "text");
  };

  const pass_hide = () => {
    var passwordInput = $("#login_password");
    var pass_view = $("#pass_view");
    var pass_hide = $("#pass_hide");
    pass_view.show();
    pass_hide.hide();

    passwordInput.attr("type", "password");
  };

  const login_form_submit = () => {
    var email = $("#email").val();
    var password = $("#password").val();

    $("#sub_button").hide();
    $("#loader").show();

    if (verified === false) {
      toast.error("Please Select Captcha!");
    }
    if (email === "") {
      toast.error("Email Field is Empty!");
    }
    if (password === "") {
      toast.error("Password Field is Empty!");
    }
    if (email === "" || password === "" || verified === false) {
      $("#sub_button").show();
      $("#loader").hide();
    } else {
      const token = global.getCookie("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const article = { email: email, password: password };
      axios
        .post(global.baseurl + "/login", article, { headers })
        .then((data) => {
          console.log(data);
          if (
            data.data.message ===
            "Please enter OTP sent to your email to login."
          ) {
            toast.success("Please enter OTP sent to your email to login.");
            document.cookie = "verify_email=" + email + ";" + global.localPath;
            //window.location.href = global.localPath + "verify_admin";
          } else {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "user_image=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "user_image=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "login_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "login_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "permissions=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "permissions=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "my_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "my_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "is_super_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "is_super_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "my_password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
            document.cookie =
              "my_password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";

            document.cookie =
              "token=" + data.data.data.token + ";" + global.localPath;
            document.cookie =
              "uuid=" + data.data.data.uuid + ";" + global.localPath;
            document.cookie =
              "user_id=" + data.data.data.id + ";" + global.localPath;
            document.cookie =
              "name=" + data.data.data.name + ";" + global.localPath;
            document.cookie =
              "user_name=" + data.data.data.name + ";" + global.localPath;
            document.cookie =
              "user_image=" + data.data.data.image + ";" + global.localPath;
            document.cookie =
              "login_email=" + data.data.data.email + ";" + global.localPath;

            const role = data.data.data.roles;
            const roles = [role.id, role.name];
            document.cookie = "roles=" + roles + ";" + global.localPath;
            document.cookie =
              "permissions=" +
              data.data.data.permissions +
              ";" +
              global.localPath;

            if ($(".rememberMe").prop("checked")) {
              cookie_data();
            } else {
              clear_cookie_data();
            }
            toast.success("Login Successfully...");
            setTimeout(() => {
              if (Number(data.data.data.is_admin) === 1) {
                document.cookie =
                  "is_super_admin=" +
                  data.data.data.is_admin +
                  ";" +
                  global.localPath;
                window.location.href = global.localPath + "admin/dashboard";
              } else {
                document.cookie =
                  "is_super_admin=" + 0 + ";" + global.localPath;
                window.location.href = global.localPath + "dashboard";
                //window.location.href = "resume/header";
              }
              $("#sub_button").show();
              $("#loader").hide();
            }, 800);
          }
        })
        .catch((err) => {
          $("#sub_button").show();
          $("#loader").hide();
          console.log(err);
          //toast.error(err.response.data.message);
          toast.error("Problem Something Wrong");
          if (
            err.response.data.message ===
            "Your email is not verified, Please check your email to verify."
          ) {
            window.location.href = global.localPath + "verify";
          }
        });
    }
  };

  const handleLinkedInLogin = () => {
    const response_type = "code";
    const clientId = "7769gw1uz1ow19";
    const redirectUri = "https://aiproresume.com/demo/login";
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
      ApiService.getAccessToken(code, "https://aiproresume.com/demo/login")
        .then((res) => {
          console.log(res.data);

          const article = {
            name: res.data.data.name,
            email: res.data.data.email,
            provider: "linkedin",
            provider_id: res.data.data.sub,
          };
          axios
            .post(global.baseurl + "/login/social-response", article)
            .then((data) => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo;";
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/demo/admin;";
              document.cookie =
                "token=" + data.data.data.token + ";" + global.localPath;
              document.cookie =
                "uuid=" + data.data.data.uuid + ";" + global.localPath;
              document.cookie =
                "user_id=" + data.data.data.id + ";" + global.localPath;
              document.cookie =
                "name=" + data.data.data.name + ";" + global.localPath;
              document.cookie =
                "user_image=" + data.data.data.image + ";" + global.localPath;
              document.cookie =
                "user_name=" + data.data.data.name + ";" + global.localPath;
              document.cookie =
                "login_email=" + data.data.data.email + ";" + global.localPath;
              document.cookie =
                "is_super_admin=" +
                data.data.data.is_super_admin +
                ";" +
                global.localPath;

              const role = data.data.data.roles;
              const roles = [role.id, role.name];
              document.cookie = "roles=" + roles + ";" + global.localPath;
              document.cookie =
                "permissions=" +
                data.data.data.permissions +
                ";" +
                global.localPath;

              toast.success("Login Successfully...");
              setTimeout(() => {
                window.location.href = global.localPath + "dashboard";
              }, 600);
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

  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="w-full md:w-[550px] m-auto mt-20 px-4 min-h-[800px] text-center">
        <div className="flex items-center justify-center">
          {/* <a href={global.localPath} className="flex">
                <img
                  src={global.imageUrl + our_settings.header_logo}
                  alt="My Image"
                  width={150}
                  height={40}
                  className="py-2"
                />
              </a> */}
        </div>
        <h1 className="text-[#0072b1] text-center mb-6 text-3xl font-bold">
          SIGN IN
        </h1>

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
              Sign-in with Facebook
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
          Sign-in with LinkedIn
        </button>

        {/* <div>
          <a href={linkedinOAuthURL}>Linkedin</a>
        </div> */}

        <div className="mt-4 text-[#0072b1] font-bold">
          <span className="relative bottom-[7px]">______________</span> Or{" "}
          <span className="relative bottom-[7px]">______________</span>
        </div>

        <input
          type="text"
          id="email"
          placeholder="Email"
          className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
        />

        <ReCAPTCHA
          sitekey={global.captcha_sitekey}
          onChange={onChange}
          className="mt-4"
        />
        <button
          id="sub_button"
          type="button"
          onClick={login_form_submit}
          className="bg-[#0072b1] w-full mt-4 px-8 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
        >
          SIGN-IN
        </button>
        <button
          id="loader"
          style={{ display: "none" }}
          className="bg-[#0072b1] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all flex justify-center"
          type="button"
        >
          <BiLoaderAlt size={28} className="mr-2 animate-spin" /> Processing...
        </button>
        <div className="w-[40%] text-left mt-4 text-slate-500 inline-block align-top">
          <input type="checkbox" className="autofill:bg-yellow-200" /> Remember
          me
        </div>

        <div className="w-[60%] text-right mt-4 text-slate-500 inline-block">
          <Link
            to={"/forgot-password"}
            className="text-[#0072b1] font-bold hover:text-slate-800"
          >
            {" "}
            Forgot Password?
          </Link>
          {/* <a href="#" className="text-[#0072b1] font-bold hover:text-slate-800">
            Forgot Password?
          </a> */}
        </div>
        <button
          id="sub_button"
          type="button"
          className="bg-[#0072b1] w-full mt-4 px-8 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
        >
          <a
            href={global.localPath + "register"}
            className="text-white font-bold hover:white"
          >
            CREATE ACCOUNT
          </a>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Login;
