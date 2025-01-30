import React, { useEffect, useState } from "react";
import AllborderInputGroup from "../../../../components/AllborderInputGroup";
import { ApiService } from "../../../../services/ApiService";
import Cookies from "js-cookie";
import DropdownWithIdValue from "../../../../components/DropdownWithIdValue";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../../../../components/SelectDropdown";
import citiesJson from "../../../../data/cities.json";
import StatesJson from "../../../../data/states.json";
// import {
//   Autocomplete,
//   Box,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Header = ({
  //
  example_id,
  //
  first_name,
  middle_name,
  last_name,
  email_address,
  phone_number,
  contact_number,
  country_id,
  state,
  city,
  street_address,
  postal_code,
  date_of_birth,
  gander,
  martitial_status,
  id_no,
  countries_dropdow_data,
}) => {
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    phone_number: 0,
    contact_number: 0,
    country_id: 1,
    state: 1,
    city: 1,
    street_address: 1,
    postal_code: "",
    date_of_birth: "",
    gander: "",
    martitial_status: "",
    id_no: 0,
  });

  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      first_name: first_name || "",
      middle_name: middle_name || "",
      last_name: last_name || "",
      email_address: email_address || "",
      phone_number: phone_number || 0,
      contact_number: contact_number || 0,
      country_id: country_id || 1,
      state: state || "",
      city: city || "",
      street_address: street_address || "",
      postal_code: postal_code || 0,
      date_of_birth:
        new Date(date_of_birth).toISOString().split("T")[0] || new Date(),
      gander: gander || "",
      martitial_status: martitial_status || "",
      id_no: id_no || 0,
    }));
  }, [
    first_name,
    middle_name,
    last_name,
    email_address,
    phone_number,
    contact_number,
    country_id,
    state,
    city,
    street_address,
    postal_code,
    date_of_birth,
    gander,
    martitial_status,
    id_no,
  ]);

  const handleStepData = (e) => {
    e.preventDefault();

    // Set a cookie with options
    Cookies.set("resumeExampleStep1", JSON.stringify(resumeData), {
      expires: 7,
      path: "/",
    });

    navigate(
      `/admin/resume-examples/show-resume-examples/${example_id}/summary`
    );
  };

  // Drop Downs Data
  // const [cities, setCities] = useState([]);
  // const [states, setStates] = useState([]);

  // useEffect(() => {
  //   if (resumeData.country_id) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/states/show-states/${resumeData.country_id}`
  //       )
  //       .then((res) => setStates(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [resumeData.country_id]);

  // useEffect(() => {
  //   if (resumeData.state_id) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/cities/show-cities/${resumeData.state_id}`
  //       )
  //       .then((res) => setCities(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [resumeData.state_id]);

  // const formatDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);

  // set All Cities
  const cityNameValue = resumeData.city;
  useEffect(() => {
    if (cityNameValue) {
      handleInputChange(cityNameValue);
    }
  }, [cityNameValue]);
  const handleInputChange = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueCityNames = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = citiesJson.filter((city) => {
        const cityName = city.name.toLowerCase();
        if (
          cityName.includes(value.toLowerCase()) &&
          !uniqueCityNames.has(cityName)
        ) {
          uniqueCityNames.add(cityName);
          return true;
        }
        return false;
      });

      setCities(filteredOptions);
    } else {
      setCities([]);
    }
  };

  // All States
  const stateNameValue = resumeData.state;
  useEffect(() => {
    if (stateNameValue) {
      handleInputState(stateNameValue);
    }
  }, [stateNameValue]);

  const handleInputState = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueStateName = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = StatesJson.filter((state) => {
        const stateName = state.name.toLowerCase();
        if (
          stateName.includes(value.toLowerCase()) &&
          !uniqueStateName.has(stateName)
        ) {
          uniqueStateName.add(stateName);
          return true;
        }
        return false;
      });

      setAllStates(filteredOptions);
    } else {
      setAllStates([]);
    }
  };

  return (
    <div>
      <form action="#" onSubmit={handleStepData}>
        {/* Row 1 */}

        {/* Row 2 */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 items-center w-full">
          {/* First Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"first_name"}
              isRequired={true}
              label={"First Name"}
              onchange={(val) =>
                setResumeData((prev) => ({ ...prev, first_name: val }))
              }
              value={resumeData.first_name}
              placeholder={"First Name"}
            />
          </div>
          {/* Middle Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"middle_name"}
              isRequired={false}
              label={"Middle Name"}
              onchange={(val) =>
                setResumeData((prev) => ({ ...prev, middle_name: val }))
              }
              value={resumeData.middle_name}
              placeholder={"Middle Name"}
            />
          </div>
          {/* Last Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"last_name"}
              isRequired={true}
              label={"Last Name"}
              onchange={(val) =>
                setResumeData((prev) => ({ ...prev, last_name: val }))
              }
              value={resumeData.last_name}
              placeholder={"Last Name"}
            />
          </div>
        </div>
        {/* Row 3  */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 items-center w-full">
          {/* Email Address */}
          <div>
            <AllborderInputGroup
              htmlFor={"email_address"}
              isRequired={true}
              label={"Email Address"}
              onchange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  email_address: val,
                }))
              }
              value={resumeData.email_address}
              placeholder={"Email Address"}
              type="email"
            />
          </div>
          {/* Phone */}
          <div>
            <AllborderInputGroup
              htmlFor={"phone_number"}
              isRequired={false}
              label={"Phone Number"}
              type={"number"}
              onchange={(val) =>
                setResumeData((prev) => ({ ...prev, phone_number: val }))
              }
              value={resumeData.phone_number}
              placeholder={"Phone Number"}
            />
          </div>
          {/* Contact Number */}
          <div>
            <AllborderInputGroup
              htmlFor={"contact_number"}
              isRequired={false}
              label={"Contact Number"}
              type={"number"}
              onchange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  contact_number: val,
                }))
              }
              value={resumeData.contact_number}
              placeholder={"Contact Number"}
            />
          </div>
        </div>
        {/* Row  */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 items-center w-full">
          {/* Id No */}
          <div>
            <AllborderInputGroup
              htmlFor={"id_no"}
              isRequired={true}
              label={"ID No"}
              onchange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  id_no: val,
                }))
              }
              value={resumeData.id_no}
              placeholder={"ID Number"}
              type="number"
            />
          </div>
          {/* maritial_status */}
          <div>
            <SelectDropdown
              htmlFor={"maritial_status"}
              label={"Marital Status"}
              handleOnChange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  martitial_status: val,
                }))
              }
              value={resumeData.martitial_status}
              isRequired={false}
              options={["Single", "Married", "Widowed", "Divorced"]}
            />
          </div>
          {/* Gander */}
          <div>
            <SelectDropdown
              htmlFor={"gander"}
              label={"Gender"}
              handleOnChange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  gander: val,
                }))
              }
              value={resumeData.gander}
              isRequired={false}
              options={["Male", "Female", "Prefer not to say"]}
            />
          </div>
          {/* date of birth */}
          <div className="py-2 w-full flex flex-col gap-2">
            <label
              htmlFor={"date_of_birth"}
              className="border-[#9b9b9b] text-xs sm:text-base"
            >
              Date of Birth
            </label>
            <input
              id="date_of_birth"
              type="date"
              className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-1 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  date_of_birth: e.target.value,
                }))
              }
              value={resumeData.date_of_birth}
            />
          </div>
          {/* Cover Template id */}

          {/* country id */}
          <div className="py-2 w-full flex flex-col gap-2">
            <label
              htmlFor={"Country"}
              className="border-[#9b9b9b] text-xs sm:text-base"
            >
              Country
            </label>
            <select
              id={"Country"}
              className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
              required={true}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  country_id: e.target.value,
                }))
              }
              value={resumeData.country_id}
            >
              <option value={""} disabled>
                Select
              </option>
              {countries_dropdow_data &&
                countries_dropdow_data?.map((opt, idx) => {
                  if (opt.id === 0) return;
                  return (
                    <option key={idx} value={opt.id}>
                      {opt.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* state id */}
          <div className="py-2 w-full flex flex-col gap-2 cus_field">
            <label className="border-[#9b9b9b] text-xs sm:text-base">
              States
            </label>
            <Autocomplete
              freeSolo
              id="states"
              className="mt-2"
              required={"required"}
              disableClearable
              value={resumeData.state}
              options={allStates
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((state) => state.name)}
              onInputChange={(e, value) => {
                //setresumeData("state", value);
                setResumeData((prev) => ({
                  ...prev,
                  state: value,
                }));
                handleInputState(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  autoComplete="on"
                  placeholder="State"
                  sx={{ height: 10 }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
          <div className="py-2 w-full flex flex-col gap-2 cus_field">
            <label className="border-[#9b9b9b] text-xs sm:text-base">
              City
            </label>
            <Autocomplete
              freeSolo
              id="city"
              className="mt-2"
              required={"required"}
              disableClearable
              value={resumeData.city}
              options={cities
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cities) => cities.name)}
              onInputChange={(e, value) => {
                //setresumeData("state", value);
                setResumeData((prev) => ({
                  ...prev,
                  city: value,
                }));
                handleInputChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  autoComplete="on"
                  placeholder="City"
                  sx={{ height: 10 }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
          {/* Street Address */}
          <div>
            <AllborderInputGroup
              htmlFor={"street"}
              isRequired={true}
              label={"Street Address"}
              onchange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  street_address: val,
                }))
              }
              value={resumeData.street_address}
              placeholder={"Street Address"}
              type="text"
            />
          </div>
          {/* postal code */}
          <div>
            <AllborderInputGroup
              htmlFor={"postal_code"}
              isRequired={false}
              label={"Postal Code"}
              onchange={(val) =>
                setResumeData((prev) => ({
                  ...prev,
                  postal_code: val,
                }))
              }
              value={resumeData.postal_code}
              placeholder={"Postal"}
              type={"number"}
            />
          </div>
        </div>
        {/* Screen 1 End */}
        <hr />
        {/* Create */}
        <div className="py-6 px-6 flex justify-end">
          <button
            type="submit"
            className="bg-primary text-lg text-white font-bold rounded-md px-8 py-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
