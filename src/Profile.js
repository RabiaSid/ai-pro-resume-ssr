import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { ApiService } from "./services/ApiService";
import { HiClipboardCheck } from "react-icons/hi";
import axios from "axios";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import swal from "sweetalert";
import { useRef } from "react";
import { PiPencilBold } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "./services/Auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const Account = () => {
  const { user } = useAuth();
  const [copyText, setCopyText] = useState("");
  const divRef = useRef(null);

  const shareTitle = "Check out this link!";
  const shareImageUrl = "https://aiproresume.com/favicon.png";

  const handleCopyClick = () => {
    const textToCopy = divRef.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopyText(textToCopy);

        swal({
          title: "Congratulations!",
          text: "Copied to clipboard",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };
  // Refs
  const passwordNotMatchErr = useRef();
  const changePasswordSubmitButton = useRef();
  const changeEmailSubmitButton = useRef();
  // States
  const [isProvider, setIsProvider] = useState(null);
  const [userProfile, setUserProfile] = useState();
  const [userimageUpdated, setUserimageUpdated] = useState(false);
  const [updatedUserImage, setUpdatedUserImage] = useState();

  const [phoneNumber, setPhoneNumber] = useState();
  const [userDetails, setUserDetails] = useState();
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [success_pass, setSuccesPass] = useState();
  const [customerID, setCustomerID] = useState();
  // Password Change
  const [changePassword, setChangePasword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  //
  const [updateProgress, setUpdateProgress] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isAllowShare, setIsAllowShare] = useState(0);
  const [job_position, setjob_position] = useState();
  const [listOfJobPositions, setListOfJobPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [show_email, set_show_email] = useState(false);

  const [opt_val1, setopt_val1] = useState();
  const [opt_val2, setopt_val2] = useState();
  const [opt_val3, setopt_val3] = useState();
  const [opt_val4, setopt_val4] = useState();
  const [opt_val5, setopt_val5] = useState();
  //
  const [updateProgressPassword, setUpdateProgressPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(true);

  const [updateProgressEmail, setUpdateProgressEmail] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(true);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  }

  const [firstInitil, setfirstInitil] = useState();
  const [UserPackageID, setUserPackageID] = useState();

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const inputElement = document.querySelector(".PhoneInputInput");
    if (inputElement) {
      inputElement.style.background = "#f4f2f3";
      inputElement.style.color = "#777";
    }

    ApiService.getAllJobPositionsNamesExamples("cover_example")
      .then((res) => {
        setListOfJobPositions(res.data.data);
      })
      .catch((err) => console.log(err));

    ApiService.getUserDetails(user?.token)
      .then((res) => {
        setUserPackageID(res.data);
        const nameParts = res.data.name.split(" ");
        const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
        setfirstInitil(firstNameInitial);
        setUserDetails(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setCustomerID(res.data.uuid);
        setPhoneNumber(res.data.contact);
        setAddress(res.data.address);
        setSuccesPass(res.data.successPass);
        setUserProfile(res.data.image);
        setIsProvider(res.data.provider);
        setjob_position(res.data.job_position);
        setIsAllowShare(res.data.allow_shares);

        if (res.data.package_id === 3) {
          document.getElementById("upgradeButton").style.display = "none";
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const updateData = () => {
    setUpdateProgress(true);

    const data = {
      name: name,
      contact: phoneNumber,
      image: userimageUpdated ? updatedUserImage : null,
      address: address,
      email: email,
      job_position: job_position,
      allow_shares: isAllowShare,
    };

    ApiService.updateUserDetails(user?.token, data)
      .then((res) => {
        setIsUpdating(true);
        setUpdateProgress(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(true);
        setUpdateProgress(false);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      passwordNotMatchErr.current.style.display = "block";
      return;
    } else {
      passwordNotMatchErr.current.style.display = "";
    }
    setUpdateProgressPassword(true);

    ApiService.updateUserPassword(
      user?.token,
      oldPassword,
      Password,
      confirmPassword
    )
      .then((res) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const handleAddPassword = (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      passwordNotMatchErr.current.style.display = "block";
      return;
    } else {
      passwordNotMatchErr.current.style.display = "";
    }
    setUpdateProgressPassword(true);

    ApiService.AddUserPassword(user?.token, Password, confirmPassword)
      .then((res) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    setIsUpdating(false);
    setUpdatedUserImage(file);
    setUserimageUpdated(true);
  };

  const [UserSettings, setUserSettings] = useState();

  useEffect(() => {
    ApiService.getSettingForWebsite(user).then((response) => {
      setUserSettings(response.data.data.settings);
    });
  }, []);

  const [show_oldPassword, setShow_oldPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShow_oldPassword((prevShowPassword) => !prevShowPassword);
  };

  const [show_newPassword, setShow_newPassword] = useState(false);
  const handleTogglePasswordVisibility2 = () => {
    setShow_newPassword((prevShowPassword2) => !prevShowPassword2);
  };

  const [show_confirmPassword, setShow_confirmPassword] = useState(false);
  const handleTogglePasswordVisibility3 = () => {
    setShow_confirmPassword((prevShowPassword3) => !prevShowPassword3);
  };

  const [show_addPassword, setShow_addPassword] = useState(false);
  const handleTogglePasswordVisibility4 = () => {
    setShow_addPassword((prevShowPassword4) => !prevShowPassword4);
  };

  const [show_cPassword, setShow_cPassword] = useState(false);
  const handleTogglePasswordVisibility5 = () => {
    setShow_cPassword((prevShowPassword5) => !prevShowPassword5);
  };

  const show_email_modelbox = () => {
    swal("Please Enter a New Email Address", {
      title: "Change Your Email Address",
      buttons: true,
      content: "input",
    }).then((value) => {
      if (value) {
        swal({
          title: "Are You Sure",
          text: "To Change " + email + " to " + value,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };

            const article = {
              email: value,
            };
            axios
              .post(global.baseurl + "/change-email/v1", article, {
                headers,
              })
              .then((data) => {
                if (data) {
                  set_show_email(true);
                  setEmail(value);
                  swal(
                    "Verification Code Send to Your " +
                      value +
                      " Email Address Please Verify!",
                    {
                      icon: "success",
                    }
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                swal("Error!", err.response.data.message, "error");
              });
          } else {
            swal("Your " + email + " was not change!");
          }
        });
      } else {
        swal("Your " + email + " was not change!");
      }
    });
  };

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
  });

  const handleUpdateEmail = (e) => {
    e.preventDefault();

    setUpdateProgressEmail(true);
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    const article = {
      email: email,
      verify_code: opt_val1 + opt_val2 + opt_val3 + opt_val4 + opt_val5,
    };
    axios
      .post(global.baseurl + "/change-email/v2", article, {
        headers,
      })
      .then((data) => {
        if (data) {
          console.log(data);
          swal("Email Changed Successfully", {
            icon: "success",
          });
          setUpdateProgressEmail(false);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error!", err.response.data.message, "error");
        setUpdateProgressEmail(false);
      });
  };

  return (
    <div>
      {/* header */}
      <Header />
      {/* Main Page */}
      <div className="w-full pt-[0px]">
        <div className="container m-auto py-6 sm:py-20 px-4 sm:px-0">
          <div>
            {/* Card */}
            <div className="bg-primary-gray  w-full rounded-sm lg:grid lg:grid-cols-[70%,30%] xl:grid-cols-[60%,40%]">
              {/* Card left Side */}
              <div className="sm:px-10 sm:py-16 px-4 py-8 border-b sm:border-b-0 sm:border-r">
                <div className="details flex flex-col gap-6 sm:gap-12">
                  {/* Title */}
                  <div>
                    <h1 className="text-primary font-bold text-lg sm:text-base">
                      ACCOUNT OVERVIEW
                    </h1>
                  </div>
                  {show_email ? (
                    <form
                      onSubmit={handleUpdateEmail}
                      action="#"
                      className="verification_box"
                    >
                      <div className="text-primary font-bold text-lg sm:text-base">
                        Enter OTP Code
                      </div>
                      <div className="flex justify-between items-center mt-10">
                        <input
                          type="number"
                          id="digit_1"
                          maxLength="1"
                          size="1"
                          min="0"
                          max="9"
                          onChange={(e) => {
                            setopt_val1(e.target.value);
                          }}
                          pattern="[0-9]{1}"
                          className="font_lexend font-bold text-lg lg:text-4xl border-2 border-primary rounded-2xl text-center px-1 py-10 text-[#00c8aa] transition-all shadow-lg"
                        />
                        <input
                          type="number"
                          id="digit_2"
                          maxLength="1"
                          size="1"
                          min="0"
                          max="9"
                          onChange={(e) => {
                            setopt_val2(e.target.value);
                          }}
                          pattern="[0-9]{1}"
                          className="font_lexend font-bold text-lg lg:text-4xl border-2 border-primary rounded-2xl text-center px-1 py-10 text-[#00c8aa] transition-all shadow-lg"
                        />
                        <input
                          type="number"
                          id="digit_3"
                          maxLength="1"
                          size="1"
                          min="0"
                          max="9"
                          onChange={(e) => {
                            setopt_val3(e.target.value);
                          }}
                          pattern="[0-9]{1}"
                          className="font_lexend font-bold text-lg lg:text-4xl border-2 border-primary rounded-2xl text-center px-1 py-10 text-[#00c8aa] transition-all shadow-lg"
                        />
                        <input
                          type="number"
                          id="digit_4"
                          maxLength="1"
                          size="1"
                          min="0"
                          max="9"
                          onChange={(e) => {
                            setopt_val4(e.target.value);
                          }}
                          pattern="[0-9]{1}"
                          className="font_lexend font-bold text-lg lg:text-4xl border-2 border-primary rounded-2xl text-center px-1 py-10 text-[#00c8aa] transition-all shadow-lg"
                        />
                        <input
                          type="number"
                          id="digit_5"
                          maxLength="1"
                          size="1"
                          min="0"
                          max="9"
                          onChange={(e) => {
                            setopt_val5(e.target.value);
                            setIsUpdatingEmail(false);
                          }}
                          pattern="[0-9]{1}"
                          className="font_lexend font-bold text-lg lg:text-4xl border-2 border-primary rounded-2xl text-center px-2 py-10 text-[#00c8aa] transition-all shadow-lg"
                        />
                      </div>
                      <button
                        type="submit"
                        className="hidden"
                        ref={changeEmailSubmitButton}
                      />
                    </form>
                  ) : changePassword ? (
                    <>
                      {success_pass === 0 ? (
                        <form onSubmit={handleAddPassword} action="#">
                          <div className="flex flex-col gap-8">
                            {/* new Password */}
                            <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                              <div>
                                <h1 className="font-bold">NEW PASSWORD</h1>
                              </div>
                              <div className="relative flex justify-between items-center">
                                <input
                                  type={show_addPassword ? "text" : "password"}
                                  placeholder="New Password"
                                  value={Password}
                                  required
                                  className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                                  onChange={(e) => {
                                    setIsUpdatingPassword(false);
                                    setPassword(e.target.value);
                                  }}
                                />
                                {show_addPassword ? (
                                  <FaRegEye
                                    className="text-xl absolute right-3"
                                    onClick={handleTogglePasswordVisibility4}
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    className="text-xl absolute right-3 "
                                    onClick={handleTogglePasswordVisibility4}
                                  />
                                )}
                              </div>
                            </div>
                            {/* Confirm Password */}
                            <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                              <div>
                                <h1 className="font-bold">CONFIRM PASSWORD</h1>
                              </div>
                              <div className="relative flex justify-between items-center">
                                <input
                                  type={show_cPassword ? "text" : "password"}
                                  placeholder="Confirm Password"
                                  value={confirmPassword}
                                  required
                                  className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                                  onChange={(e) => {
                                    setIsUpdatingPassword(false);
                                    setconfirmPassword(e.target.value);
                                  }}
                                />
                                {show_cPassword ? (
                                  <FaRegEye
                                    className="text-xl absolute right-3"
                                    onClick={handleTogglePasswordVisibility5}
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    className="text-xl absolute right-3 "
                                    onClick={handleTogglePasswordVisibility5}
                                  />
                                )}
                              </div>
                              <span
                                className="text-red-500 text-sm hidden"
                                ref={passwordNotMatchErr}
                              >
                                Password Not Match
                              </span>
                            </div>
                          </div>
                          {/* Hidden Button For Submit the Code */}
                          <button
                            type="submit"
                            className="hidden"
                            ref={changePasswordSubmitButton}
                          />
                        </form>
                      ) : (
                        <form onSubmit={handleUpdatePassword} action="#">
                          <div className="flex flex-col gap-8">
                            {/* Old Password */}
                            <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                              <div>
                                <h1 className="font-bold">OLD PASSWORD</h1>
                              </div>
                              <div className="relative flex justify-between items-center">
                                <input
                                  type={show_oldPassword ? "text" : "password"}
                                  placeholder="Enter Old Password"
                                  value={oldPassword}
                                  required
                                  className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                                  onChange={(e) => {
                                    setIsUpdatingPassword(false);
                                    setOldPassword(e.target.value);
                                  }}
                                />
                                {show_oldPassword ? (
                                  <FaRegEye
                                    className="text-xl absolute right-3"
                                    onClick={handleTogglePasswordVisibility}
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    className="text-xl absolute right-3 "
                                    onClick={handleTogglePasswordVisibility}
                                  />
                                )}
                              </div>
                            </div>
                            {/* new Password */}
                            <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                              <div>
                                <h1 className="font-bold">NEW PASSWORD</h1>
                              </div>
                              <div className="relative flex justify-between items-center">
                                <input
                                  type={show_newPassword ? "text" : "password"}
                                  placeholder="New Password"
                                  value={Password}
                                  required
                                  className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                                  onChange={(e) => {
                                    setIsUpdatingPassword(false);
                                    setPassword(e.target.value);
                                  }}
                                />
                                {show_newPassword ? (
                                  <FaRegEye
                                    className="text-xl absolute right-3"
                                    onClick={handleTogglePasswordVisibility2}
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    className="text-xl absolute right-3 "
                                    onClick={handleTogglePasswordVisibility2}
                                  />
                                )}
                              </div>
                            </div>
                            {/* Confirm Password */}
                            <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                              <div>
                                <h1 className="font-bold">CONFIRM PASSWORD</h1>
                              </div>
                              <div className="relative flex justify-between items-center">
                                <input
                                  type={
                                    show_confirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm Password"
                                  value={confirmPassword}
                                  required
                                  className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                                  onChange={(e) => {
                                    setIsUpdatingPassword(false);
                                    setconfirmPassword(e.target.value);
                                  }}
                                />
                                {show_confirmPassword ? (
                                  <FaRegEye
                                    className="text-xl absolute right-3"
                                    onClick={handleTogglePasswordVisibility3}
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    className="text-xl absolute right-3 "
                                    onClick={handleTogglePasswordVisibility3}
                                  />
                                )}
                              </div>
                              <span
                                className="text-red-500 text-sm hidden"
                                ref={passwordNotMatchErr}
                              >
                                Password Not Match
                              </span>
                            </div>
                          </div>
                          {/* Hidden Button For Submit the Code */}
                          <button
                            type="submit"
                            className="hidden"
                            ref={changePasswordSubmitButton}
                          />
                        </form>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {/* 1 */}

                      {!userimageUpdated
                        ? userProfile && (
                            <div
                              className={`relative w-36 h-36 m-auto rounded-full border-2`}
                            >
                              <img
                                src={global.imageUrl + userProfile}
                                alt="Service__img"
                                className={`w-36 h-36 rounded-full m-auto`}
                              />
                              <div
                                className="absolute bottom-0.5 right-1.5 cursor-pointer"
                                onClick={() =>
                                  document
                                    .getElementById("user_profile_image")
                                    .click()
                                }
                              >
                                <PiPencilBold className="bg-white border-2 rounded-full text-3xl p-1" />
                              </div>
                            </div>
                          )
                        : ""}

                      {userimageUpdated && (
                        <div
                          className={`relative w-40 h-40 m-auto rounded-full border-2`}
                        >
                          <img
                            src={URL.createObjectURL(updatedUserImage)}
                            alt="Service__img"
                            className="w-40 h-40 rounded-full m-auto"
                          />
                          <div
                            className="absolute bottom-0.5 right-1.5 cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById("user_profile_image")
                                .click()
                            }
                          >
                            <PiPencilBold className="bg-white border-2 rounded-full text-3xl p-1 text-black" />
                          </div>
                        </div>
                      )}

                      <input
                        type="file"
                        onChange={handleUserImageChange}
                        className="hidden"
                        accept=".png,.jpg,.jpeg"
                        id="user_profile_image"
                      />

                      {!userimageUpdated && (
                        <div
                          className={`${
                            !userProfile ? "block" : "hidden"
                          }  relative w-36 h-36 m-auto rounded-full border-2 flex justify-center items-center bg-black text-white text-4xl font-extrabold`}
                        >
                          {firstInitil}
                          <div
                            className="absolute bottom-0.5 right-1.5 cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById("user_profile_image")
                                .click()
                            }
                          >
                            <PiPencilBold className="bg-white border-2 rounded-full text-3xl p-1 text-black" />
                          </div>
                        </div>
                      )}

                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16  w-full">
                        <div>
                          <h1 className="font-bold">REFERRAL LINK</h1>
                        </div>
                        <div>
                          <span className="text-muted flex flex-wrap justify-between items-center">
                            <div
                              className="color_4 mt_2 mr_heading"
                              ref={divRef}
                              style={{ overflowWrap: "anywhere" }}
                            >
                              {userDetails?.referral_link ? (
                                `${global.localPath}register/${userDetails?.referral_link}`
                              ) : (
                                <Skeleton width={"300px"} height={"20px"} />
                              )}
                            </div>
                            <div className="flex items-center">
                              {userDetails?.referral_link ? (
                                <>
                                  <button
                                    className="mr_heading btn_copy"
                                    onClick={handleCopyClick}
                                  >
                                    <HiClipboardCheck
                                      className="shareiconmy"
                                      size={30}
                                    />
                                  </button>

                                  <FacebookShareButton
                                    url={
                                      global.localPath +
                                      "register/" +
                                      userDetails?.referral_link
                                    }
                                    quote={"Dummy text!"}
                                    title={shareTitle}
                                    hashtag="#AIProResume"
                                    className="shareiconmy"
                                  >
                                    <FacebookIcon size={32} round />
                                  </FacebookShareButton>
                                  <WhatsappShareButton
                                    url={
                                      global.localPath +
                                      "register/" +
                                      userDetails?.referral_link
                                    }
                                    title={shareTitle}
                                    image={shareImageUrl}
                                    quote={"Dummy text!"}
                                    hashtag="#AIProResume"
                                    className="shareiconmy"
                                  >
                                    <WhatsappIcon size={32} round />
                                  </WhatsappShareButton>
                                  <LinkedinShareButton
                                    url={
                                      global.localPath +
                                      "register/" +
                                      userDetails?.referral_link
                                    }
                                    title={shareTitle}
                                    quote={"Dummy text!"}
                                    hashtag="#AIProResume"
                                    className="shareiconmy"
                                  >
                                    <LinkedinIcon size={32} round />
                                  </LinkedinShareButton>
                                </>
                              ) : (
                                <>
                                  <Skeleton width={30} height={30} />{" "}
                                  {/* Skeleton for Clipboard icon */}
                                  <Skeleton
                                    circle
                                    width={32}
                                    height={32}
                                  />{" "}
                                  {/* Skeleton for Facebook, WhatsApp, and LinkedIn icons */}
                                  <Skeleton circle width={32} height={32} />
                                  <Skeleton circle width={32} height={32} />
                                </>
                              )}
                            </div>
                          </span>
                        </div>
                      </div>

                      {/* 2 */}
                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">MEMBER SINCE</h1>
                        </div>
                        <div>
                          <span className="text-muted">
                            {userDetails?.created_at ? (
                              formatDate(userDetails?.created_at)
                            ) : (
                              <Skeleton width={"150px"} height={"20px"} />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">CUSTOMER ID</h1>
                        </div>
                        <div>
                          <span className="text-muted">
                            {customerID ? (
                              <b className="text-primary">{customerID}</b>
                            ) : (
                              <Skeleton width={"150px"} height={"20px"} />
                            )}
                          </span>
                        </div>
                      </div>
                      {/* 3 */}
                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">NAME</h1>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Name Here"
                            value={name}
                            className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                            onChange={(e) => {
                              setIsUpdating(false);
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* 4 */}
                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">EMAIL</h1>
                        </div>
                        <div className="flex justify-between items-center relative">
                          <input
                            readOnly
                            disabled
                            type="email"
                            placeholder="info@cognitiveitsolutions.ca"
                            value={email}
                            className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span
                            className="cursor-pointer text-[#0072B1] hover:text-[#01B2AC] absolute right-3 text-sm"
                            onClick={() => {
                              show_email_modelbox();
                            }}
                          >
                            <FaPencil />
                          </span>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">JOB POSITION</h1>
                        </div>
                        <div className="flex relative w-full">
                          <input
                            type="text"
                            id="search"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setjob_position(e.target.value);
                            }}
                            className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                            placeholder="Search By Job Position"
                            value={searchTerm ? searchTerm : job_position}
                            onFocus={() => setIsSearch(true)}
                          />
                          <div
                            ref={dropdownRef}
                            className={`absolute top-full left-0 right-0 bottom-0 bg-white shadow-md  h-[200px] 
              flex-col overflow-y-scroll  p-4 rounded-b-lg z-50 ${
                isSearch ? "flex" : "hidden"
              }
                `}
                          >
                            {listOfJobPositions
                              .filter((item) => {
                                return item.name
                                  .toLowerCase()
                                  .trim()
                                  .includes(searchTerm.toLowerCase().trim());
                              })
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((cat, idx) => {
                                return (
                                  <span
                                    key={idx}
                                    className="hover:bg-[#00caa5] hover:text-white hover:font-bold py-2 px-2 cursor-pointer select-none"
                                    onClick={() => {
                                      setSearchTerm(cat.name);
                                      setIsSearch(false);
                                      setjob_position(cat.name);
                                      setIsUpdating(false);
                                    }}
                                  >
                                    {cat.name}
                                  </span>
                                );
                              })}
                          </div>
                        </div>
                      </div>

                      {/*  */}
                      <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">ADDRESS</h1>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="123 Main Street"
                            value={address}
                            className="w-full px-2 py-3 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                            onChange={(e) => {
                              setIsUpdating(false);
                              setAddress(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* 5 */}
                      {success_pass === 1 ? (
                        <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16  w-full">
                          <div>
                            <h1 className="font-bold">PASSWORD</h1>
                          </div>
                          <div>
                            <span
                              className="cursor-pointer text-blue-500"
                              onClick={setChangePasword}
                            >
                              Reset Password
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16  w-full">
                          <div>
                            <h1 className="font-bold">PASSWORD</h1>
                          </div>
                          <div>
                            <span
                              className="cursor-pointer text-blue-500"
                              onClick={setChangePasword}
                            >
                              Add Password
                            </span>
                          </div>
                        </div>
                      )}
                      {/* 6 */}
                      <div className="accountphone sm:grid sm:grid-cols-[20%,70%] flex flex-col gap-2 sm:items-center sm:gap-16 w-full">
                        <div>
                          <h1 className="font-bold">MOBILE NUMBER</h1>
                        </div>
                        <div>
                          <PhoneInput
                            onChange={(num) => {
                              setPhoneNumber(num);
                              setIsUpdating(false);
                            }}
                            value={phoneNumber}
                            placeholder="0000-00-00-000"
                            className="w-full p-2 border border-muted rounded-md bg-primary-gray focus-visible:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-left w-full">
                        <input
                          type="checkbox"
                          checked={isAllowShare === 1}
                          className="text-sm mr-2 mt-[6px] border-2 border-solid border-[#0072b1] text-[#0072b1]"
                          onChange={() => {
                            setIsAllowShare(isAllowShare === 0 ? 1 : 0);
                            setIsUpdating(false);
                          }}
                        />
                        <p className="mt-1 ml-2">
                          Do you want to share your resume with companies for
                          global job opportunities?
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Card Right side */}
              <div className="py-4 sm:py-16 sm:border-r">
                <div className="details__right">
                  {/* Card Top */}
                  <div className="px-6 border-b pb-6">
                    {/* Info */}
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-base">
                        NEED HELP OR WANT TO CHANGE YOUR SUBSCRIPTION ?
                      </h1>
                      <span className="font-bold text-sm">
                        {UserSettings?.contact_number}
                      </span>
                      <a
                        href={`mailto:${UserSettings?.website_email}`}
                        className="text-blue-500 text-base"
                      >
                        {UserSettings?.website_email}
                      </a>
                    </div>
                  </div>
                  {/* Card bottom */}
                  <div className="px-6 pt-6 flex flex-col gap-8">
                    <div>
                      <h1 className="text-sm font-bold ">SUBSCRIPTION</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                      {/* 1 */}
                      {/* <div className="sm:grid sm:grid-cols-[30%,70%] items-center gap-16  w-full">
                        <div>
                          <h1 className="font-bold text-sm">Payment Method</h1>
                        </div>
                        <div>
                          <span className="font-bold text-sm">
                            {userDetails?.payment_method || (
                              <Skeleton width={"150px"} height={"20px"} />
                            )}
                          </span>
                        </div>
                      </div> */}
                      <div className="sm:grid sm:grid-cols-[30%,70%] items-center gap-16  w-full">
                        <div>
                          <h1 className="font-bold text-sm">Package</h1>
                        </div>
                        <div>
                          <span className="font-bold text-sm">
                            {userDetails?.package.name || (
                              <Skeleton width={"150px"} height={"20px"} />
                            )}
                          </span>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="sm:grid sm:grid-cols-[30%,70%] items-center gap-16  w-full">
                        <div>
                          <h1 className="font-bold text-sm">Registration</h1>
                        </div>
                        <div>
                          <span className="text-muted">
                            {userDetails?.start_date
                              ? formatDate(userDetails?.start_date)
                              : formatDate(userDetails?.created_at) || (
                                  <Skeleton width={"150px"} height={"20px"} />
                                )}
                          </span>
                        </div>
                      </div>
                      {/* 3 */}

                      {/* Button */}
                      {/* <div className="mt-10 mb-6">
                        <a
                          id="upgradeButton"
                          href={global.localPath + "packages"}
                          className="bg-[#00caa5] hover:text-[#00caa5] border border-transparent hover:border-muted text-[#fff] hover:bg-[#fff] font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease"
                        >
                          UPGRADE PACKAGE
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease">
              {show_email ? (
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    className={`${
                      isUpdatingEmail
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#00caa5] hover:text-[#00caa5] hover:bg-[#fff]"
                    } border border-transparent hover:border-muted text-[#fff]  font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease`}
                    onClick={() => changeEmailSubmitButton.current.click()}
                    disabled={isUpdatingEmail}
                  >
                    {updateProgressEmail ? "VERIFYING...." : "VERIFY EMAIL"}
                  </button>

                  <button
                    type="button"
                    className={`bg-[#00caa5] hover:text-[#00caa5] border border-transparent hover:border-muted text-[#fff] hover:bg-[#fff] font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease`}
                    onClick={() => set_show_email(false)}
                  >
                    BACK
                  </button>
                </div>
              ) : changePassword ? (
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    className={`${
                      isUpdatingPassword
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#00caa5] hover:text-[#00caa5] hover:bg-[#fff]"
                    } border border-transparent hover:border-muted text-[#fff]  font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease`}
                    onClick={() => changePasswordSubmitButton.current.click()}
                    disabled={isUpdatingPassword}
                  >
                    {updateProgressPassword
                      ? "CHANGING...."
                      : "CHANGE PASSWORD"}
                  </button>

                  <button
                    type="button"
                    className={`bg-[#00caa5] hover:text-[#00caa5] border border-transparent hover:border-muted text-[#fff] hover:bg-[#fff] font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease`}
                    onClick={() => setChangePasword(false)}
                  >
                    BACK
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={`${
                    isUpdating
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#00caa5] hover:text-[#00caa5] hover:bg-[#fff]"
                  } border border-transparent hover:border-muted text-[#fff]  font-bold text-base px-4 py-3 rounded-md transition-all duration-300 ease sm:w-fit w-full`}
                  onClick={updateData}
                  disabled={isUpdating}
                >
                  {updateProgress ? "SAVING...." : "SAVE CHANGES"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Account;
