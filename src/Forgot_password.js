import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/style2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import $ from "jquery";
import axios from "axios";

const loader1 = "/images/loader1.gif";


function Forgot_password() {
  const navigate = useNavigate();
  const [isProccess, setIsProccess] = useState(false);
  const forgot_submit = () => {
    var email = $("#email").val();

    if (email === "") {
      toast.error("Email Field is Empty");
    } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      toast.error("Please Enter a Valid Email Address");
    } else {
      const headers = {
        Authorization: "Bearer ",
      };
      setIsProccess(true);
      const article = { email: email };
      axios
        .post(global.baseurl + "/email-check-record", article, { headers })
        .then((data) => {
          toast.success("Verification Code Sent Successfully to your Email");

          setIsProccess(false);

          const myStates = {
            email: email,
          };

          // Navigate to a new route and pass state
          navigate("/Reset-password", { state: myStates });
        })
        .catch((err) => {
          console.log(err);
          setIsProccess(false);
          toast.error(err.response.data.message);
          $("#reset_submit").show();
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
      <div className="container_middle animate__animated animate__zoomInUp flex justify-center items-center w-full md:w-[550px] m-auto min-h-[800px]">
        <div className="col_full bg_color_10 padding_0 w-full">
          <div className="col_5 bg_color_10 right">
            <div className="login">
              <h1 className="text-[#0072b1] text-center mb-6 text-3xl font-bold">
                FORGOT PASSWORD
              </h1>
              <br />
              <div className="input_group">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="w-[100%] mt-4 border border-solid border-slate-300 px-2 py-2 rounded-md"
                />
              </div>

              <div>
                {isProccess ? (
                  <button
                    type="button"
                    className="bg-[#0072b1] pointer-events-none  w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all flex items-center justify-center"
                  >
                    <img src={loader1} width="20" alt="loader" /> Loading
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-[#0072b1] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
                    onClick={forgot_submit}
                  >
                    SUBMIT
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center m-4">
                {/*  */}
                <p className="text-sm">
                  Don't you have an account?{" "}
                  <span className="color_4">
                    <Link to="/register" className="color_4 text-[#0072b1]">
                      {" "}
                      SIGN UP
                    </Link>
                  </span>
                </p>
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

export default Forgot_password;
