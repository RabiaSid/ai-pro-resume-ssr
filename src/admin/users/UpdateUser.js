import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import ToggleSwitch from "../../components/ToggleSwitch";
import PasswordInputGroup from "../../components/PasswordInputGroup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import LetteredAvatar from "lettered-avatar";
import { useAuth } from "../../services/Auth";
import SelectDropdown from "../../components/SelectDropdown";
const CreateUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const { user_id } = useLocation().state;
  const [job_position, setJob_position] = useState("");
  const [jobPositionList, setjobPositionList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [contact, setContact] = useState("");
  const [countryId, setCountryId] = useState("");
  const [status, setStatus] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const [userVerify, setUserVerify] = useState(0);
  // Country
  const [countries, setcountries] = useState([]);
  // Password Show
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [C_isPasswordShow, setC_IsPasswordShow] = useState(false);
  //
  const [userImageUpdated, setUserImageUpdated] = useState(false);
  const [firstIni, setFirstIni] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const [isValid, setIsValid] = useState(true);

  //
  useEffect(() => {
    // Get User Details
    ApiService.getSingleUsers(user?.token, user_id)
      .then((res) => {
        console.log(res.data.data);
        const {
          name,
          email,
          job_position,
          contact,
          country_id,
          status,
          image,
        } = res.data.data.user;

        const verified = res.data.data.verified;

        setName(name);
        setEmail(email);
        setJob_position(job_position);
        setContact(contact);
        setCountryId(country_id);
        setStatus(status);
        setUserVerify(verified);

        image !== null && setUserImage(res.data.data.image_url + "/" + image);

        const nameParts = name.split(" ");
        const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
        setFirstIni(firstNameInitial);

        console.log(res.data.data.image_url + "/" + image);
      })
      .catch((err) => console.log(err));
    //
    axios
      .get(global.baseurl + "/show-countries")
      .then((data) => {
        if (data) {
          setcountries(data.data?.data);
          console.log(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        setjobPositionList(res.data.data);

        const positions = res.data.data.map((item) => item.name);

        setjobPositionList(positions);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!isValid) return;

    if (password !== c_password) {
      swal({
        icon: "error",
        title: "Error",
        text: "Password and Confirm Password must match.",
        dangerMode: true,
      });
      return;
    }

    const data = {
      name: name,
      email: email,
      job_position: job_position,
      image: image,
      password: password,
      contact: contact,
      country_id: countryId,
      status: status,
      verify: userVerify,
    };

    setIsloading(true);
    ApiService.updateUser(user?.token, data, user_id)
      .then((res) => {
        setIsloading(false);

        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  const handleUploadUserImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUserImageUpdated(true);
  };

  const handlePhoneNumberChange = (val) => {
    // Ensure the value is a string and set the state
    if (typeof val === "string" && val.length <= 20) {
      setContact(val);
      setIsValid(isValidPhoneNumber(val) && val.length >= 10);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form onSubmit={handleUpdateUser}>
          <div className="border h-full p-4">
            {/* User Create */}
            <h1 className="text-2xl font-bold">Update User</h1>
            {/* User Image */}
            <div className="relative w-32 h-32 m-auto rounded-full mb-4">
              {userImage !== null ? (
                <img
                  src={userImage}
                  alt="Service__img001"
                  className={`${
                    userImageUpdated ? "hidden" : "bock"
                  } w-32 h-32 rounded-full m-auto`}
                />
              ) : (
                <div className={`${userImageUpdated ? "hidden" : "bock"} `}>
                  <LetteredAvatar
                    name={name}
                    options={{
                      size: 128,
                    }}
                  />
                </div>
              )}

              {userImageUpdated ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Service__img"
                  className={` w-32 h-32 rounded-full m-auto`}
                />
              ) : (
                ""
              )}

              <input
                type="file"
                onChange={handleUploadUserImage}
                className="hidden"
                accept=".png"
                id="user_profile"
              />
              <div
                className="absolute bottom-1 right-1 cursor-pointer"
                onClick={() => document.getElementById("user_profile").click()}
              >
                <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
              </div>
            </div>
            {/* User Name */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/* User Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setName(val)}
                  value={name}
                  placeholder={"John Doe..."}
                />
              </div>
              {/* Email */}
              <div>
                <AllborderInputGroup
                  htmlFor={"email"}
                  isRequired={true}
                  label={"Email"}
                  onchange={(val) => setEmail(val)}
                  value={email}
                  placeholder={"john.doe@gmail.com"}
                  type={"email"}
                />
              </div>
            </div>
            {/* Job Position */}
            <div>
              <SelectDropdown
                htmlFor={"job_position"}
                isRequired={true}
                label={"Job Position"}
                options={jobPositionList}
                value={job_position}
                handleOnChange={(val) => setJob_position(val)}
              />
            </div>
            {/*  */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/* Conract */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Contact
                </label>
                <PhoneInput
                  onChange={handlePhoneNumberChange}
                  value={contact}
                  className={`w-full font_3 transition-all duration-300 ease-linear text-lg p-2 border ${
                    isValid ? "border-[#9b9b9b]" : "border-red-500"
                  } focus:border-[#00caa5] outline-none rounded-md`}
                />
                {!isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid phone number with at least 10 digits.
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Country
                </label>
                <select
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  id="country_id"
                  required
                  onChange={(e) => setCountryId(e.target.value)}
                  value={countryId}
                >
                  <option value={""}>Select</option>
                  {countries.map((country, index_country) => {
                    if (country.id === 0) return;
                    return (
                      <>
                        <option value={country?.id} key={index_country}>
                          {country?.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Password C Password */}
            <div className="grid md:grid-cols-2 md:gap-4">
              {/* Password */}
              <div>
                <PasswordInputGroup
                  htmlFor={"password"}
                  isRequired={false}
                  label={"Password"}
                  handleOnChange={(val) => setPassword(val)}
                  value={password}
                  placeholder={"********"}
                  isPasswordVisible={isPasswordShow}
                  togglePasswordVisibility={() =>
                    setIsPasswordShow(!isPasswordShow)
                  }
                />
              </div>
              {/* C Password */}
              <div>
                <PasswordInputGroup
                  htmlFor={"c_password"}
                  isRequired={false}
                  label={"Confim Password"}
                  handleOnChange={(val) => setC_password(val)}
                  value={c_password}
                  placeholder={"********"}
                  isPasswordVisible={C_isPasswordShow}
                  togglePasswordVisibility={() =>
                    setC_IsPasswordShow(!C_isPasswordShow)
                  }
                />
              </div>
            </div>
            {/* User Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setStatus(1);
                  } else {
                    setStatus(0);
                  }
                }}
                status={status}
              />
            </div>
            {/* User verify */}
            <div className="flex flex-col gap-2">
              <span>User Verified</span>
              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setUserVerify(1);
                  } else {
                    setUserVerify(0);
                  }
                }}
                status={userVerify}
              />
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>
            <hr />
            {/* create */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
