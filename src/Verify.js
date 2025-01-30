import React, { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import "./css/style2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import axios from "axios";

function Verify() {
  useEffect(() => {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");

    const KEYBOARDS = {
      backspace: 8,
      arrowLeft: 37,
      arrowRight: 39,
    };

    function handleInput(e) {
      const input = e.target;
      const nextInput = input.nextElementSibling;
      if (nextInput && input.value) {
        nextInput.focus();
        if (nextInput.value) {
          nextInput.select();
        }
      }
    }

    function handlePaste(e) {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      inputs.forEach((input, i) => {
        input.value = paste[i] || "";
      });
    }

    function handleBackspace(e) {
      const input = e.target;
      if (input.value) {
        input.value = "";
        return;
      }

      input.previousElementSibling.focus();
    }

    function handleArrowLeft(e) {
      const previousInput = e.target.previousElementSibling;
      if (!previousInput) return;
      previousInput.focus();
    }

    function handleArrowRight(e) {
      const nextInput = e.target.nextElementSibling;
      if (!nextInput) return;
      nextInput.focus();
    }

    form.addEventListener("input", handleInput);
    inputs[0].addEventListener("paste", handlePaste);

    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        setTimeout(() => {
          e.target.select();
        }, 0);
      });

      input.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case KEYBOARDS.backspace:
            handleBackspace(e);
            break;
          case KEYBOARDS.arrowLeft:
            handleArrowLeft(e);
            break;
          case KEYBOARDS.arrowRight:
            handleArrowRight(e);
            break;
          default:
        }
      });
    });

    const get_reg_email = global.getCookie("register_email");
    $("#get_reg_email").html(get_reg_email);
    $("#verify_email").html(get_reg_email);
  });

  const verify_form_submit = () => {
    var digit_1 = $("#digit_1").val();
    var digit_2 = $("#digit_2").val();
    var digit_3 = $("#digit_3").val();
    var digit_4 = $("#digit_4").val();
    var digit_5 = $("#digit_5").val();

    $("#sub_button").hide();
    $("#loader3").show();

    if (
      digit_1 === "" ||
      digit_2 === "" ||
      digit_3 === "" ||
      digit_4 === "" ||
      digit_5 === ""
    ) {
      toast.error("Field is Empty");
      $("#sub_button").show();
      $("#loader3").hide();
    } else {
      var verify_code = digit_1 + digit_2 + digit_3 + digit_4 + digit_5;

      const article = { verify_code: verify_code };
      axios
        .post(global.baseurl + "/verify-email", article)
        .then((data) => {
          if (data.data.status === 0) {
            toast.error(data.data.message);
            $("#sub_button").show();
            $("#loader3").hide();
          } else {
            toast.success("Your are successfully verified");
            window.location.href = global.localPath + "login";
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response);
        });
    }
  };

  const resend_Code = () => {
    const email = global.getCookie("register_email");
    const token = global.getCookie("token");
    var verify_email = $("#verify_email").val();
    if (verify_email === "") {
      toast.error("Email Field is Empty");
    } else {
      $("#resend_submit").hide();
      $("#loader2").show();
      const headers = {
        Authorization: "Bearer " + token,
      };
      const article = { email: verify_email };
      axios
        .post(global.baseurl + "/resend-code", article, { headers })
        .then((data) => {
          console.log(data.data);
          if (data.data.success) {
            toast.success("Resend Successfull!");
            $("#resend_submit").show();
            $("#loader2").hide();
          } else {
            toast.error("Something Wrong! Please Retry");
            $("#resend_submit").show();
            $("#loader2").hide();
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            toast.error("Something Wrong! Please Retry");
            $("#resend_submit").show();
            $("#loader2").hide();
          } else if (err.request) {
            toast.error("Something Wrong! Please Retry");
            $("#resend_submit").show();
            $("#loader2").hide();
          } else {
            toast.error("Something Wrong! Please Retry");
            $("#resend_submit").show();
            $("#loader2").hide();
          }
        });
    }
  };

  return (
    <>
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

      <div className="w-full lg:w-[800px] m-auto mt-36 px-4 min-h-[800px] text-center">
        <h1 className="text-black text-center mb-6 text-3xl font-bold">
          CHECK YOUR EMAIL
        </h1>
        <p className="text-black text-center mb-6 text-xl font-bold">
          We have sent a verification code to your email <br />
          <span id="get_reg_email">abc@gmail.com</span>
        </p>

        <form action="#">
          <div className="flex justify-between items-center mt-6 mb-4">
            <input
              type="number"
              id="digit_1"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="font_4 text-6xl border-2 border-black rounded-md text-center px-2 py-10 text-[#00c8aa] transition-all"
            />
            <input
              type="number"
              id="digit_2"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="font_4 text-6xl border-2 border-black rounded-md text-center px-2 py-10 text-[#00c8aa] transition-all"
            />
            <input
              type="number"
              id="digit_3"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="font_4 text-6xl border-2 border-black rounded-md text-center px-2 py-10 text-[#00c8aa] transition-all"
            />
            <input
              type="number"
              id="digit_4"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="font_4 text-6xl border-2 border-black rounded-md text-center px-2 py-10 text-[#00c8aa] transition-all"
            />
            <input
              type="number"
              id="digit_5"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="font_4 text-6xl border-2 border-black rounded-md text-center px-2 py-10 text-[#00c8aa] transition-all"
            />
          </div>
        </form>

        <button
          id="sub_button"
          type="button"
          onClick={verify_form_submit}
          className="bg-[#00c8aa] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
        >
          VERIFY CODE
        </button>
        <button
          id="loader3"
          style={{ display: "none" }}
          className="bg-[#00c8aa] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all flex justify-center"
          type="button"
        >
          <BiLoaderAlt size={28} className="mr-2 animate-spin" /> Processing...
        </button>

        <button
          id="resend_submit"
          type="button"
          onClick={resend_Code}
          className="bg-[#0072b1] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all"
        >
          RESEND CODE
        </button>
        <button
          id="loader2"
          style={{ display: "none" }}
          className="bg-[#0072b1] w-[100%] mt-4 px-2 py-2 rounded-md text-white text-2xl font-bold hover:bg-slate-800 ease-in transition-all flex justify-center"
          type="button"
        >
          <BiLoaderAlt size={28} className="mr-2 animate-spin" /> Processing...
        </button>

        <div className="w-full text-right mt-4 text-slate-500 inline-block">
          <p className="text-slate-500">
            Back to Register?{" "}
            <a
              href={global.localPath + "register"}
              className="text-[#0072b1] font-bold hover:text-slate-800"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Verify;
