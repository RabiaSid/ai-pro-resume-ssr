
import React, { useState } from "react";
import "./css/style2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const loader1 = "/images/loader1.gif";
function Reset_password() {
  const location = useLocation();
  const navigate = useNavigate();
  let { email } = location.state;

  const [isProccess, setIsProccess] = useState(false);
  const reset_submit = () => {
    var verify_code = $("#verify_code").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();

    if (verify_code === "") {
      toast.error("Verify Code Field is Empty");
    } else if (password === "") {
      toast.error("Password Field is Empty");
    } else if (cpassword === "") {
      toast.error("Confirm Password Field is Empty");
    } else if (password.length < 6) {
      toast.error("Password Length atleast 6 characters");
    } else if (password !== cpassword) {
      toast.error("Password Not Match");
    } else {
      const article = {
        verify_code: verify_code,
        password: password,
        c_password: cpassword,
      };

      axios
        .post(global.baseurl + "/forgot-password", article)
        .then((data) => {
          toast.success("Password Reset Successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  const handleResendCode = () => {
    let Email = email;

    if (Email === "") {
      toast.error("Email Field is Empty");
    } else {
      const article = { email: Email };
      axios
        .post(global.baseurl + "/email-check-record", article)
        .then((data) => {
          toast.success("Verification Code Sent Successfully to your Email");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

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
      <div className="container_middle animate__animated animate__zoomInUp flex justify-center items-center h-screen w-full md:w-[550px] m-auto min-h-[800px]">
        <div className="col_full bg_color_10 padding_0 w-full">
          <div className="col_5 bg_color_10 right">
            <div className="login">
              <h1 className="text-black text-center mb-6 text-3xl font-bold">
                Reset Password
              </h1>
              <br />
              <div className="input_group">
                <input
                  type="text"
                  id="verify_code"
                  placeholder="Verify Code"
                  className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
                />
              </div>

              <div className="input_group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
                />
              </div>

              <div className="input_group">
                <input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm Password"
                  className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
                />
              </div>

              <div>
                {isProccess ? (
                  <button
                    type="button"
                    id="loader1"
                    className="bg-[#00c8aa] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all flex items-center justify-center"
                  >
                    <img src={loader1} width="20" alt="loader" /> Loading
                  </button>
                ) : (
                  <button
                    type="button"
                    id="forgot_submit"
                    className="bg-[#00c8aa] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
                    onClick={reset_submit}
                  >
                    Submit
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                {/*  */}
                <div className="text-sm text-muted">
                  Didn't get the code{" "}
                  <button
                    className="text-primary"
                    onClick={() => handleResendCode()}
                  >
                    Resend
                  </button>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reset_password;
