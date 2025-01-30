import React, { useEffect, useState } from "react";
import AllborderInputGroup from "../../../../components/AllborderInputGroup";
import { ApiService } from "../../../../services/ApiService";
import Cookies from "js-cookie";
import DropdownWithIdValue from "../../../../components/DropdownWithIdValue";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../services/Auth";
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
  name,
  first_name,
  last_name,
  phone_number,
  email_address,
  street_address,
  country_id,
  state,
  city,
  zip_code,
  cover_template_id,
  categories,
  category_id,
}) => {
  const coverID = useParams().id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [coverLetterData, setCoverLetterData] = useState({
    name: name ? name : "",
    first_name: first_name ? first_name : "",
    last_name: last_name ? last_name : "",
    cover_template_id: cover_template_id ? cover_template_id : 1,
    category_id: category_id ? category_id : 1,
    phone_number: phone_number ? phone_number : 0,
    email_address: email_address ? email_address : "",
    street_address: street_address ? street_address : "",
    country_id: country_id ? country_id : 0,
    state: state ? state : "",
    city: city ? city : "",
    zip_code: zip_code ? zip_code : 0,
  });

  useEffect(() => {
    setCoverLetterData((prev) => ({
      ...prev,
      name: name || "",
      first_name: first_name || "",
      last_name: last_name || "",
      cover_template_id: cover_template_id || 1,
      category_id: category_id || 1,
      phone_number: phone_number || 0,
      email_address: email_address || "",
      street_address: street_address || "",
      country_id: country_id || 0,
      state: state || "",
      city: city || "",
      zip_code: zip_code || 0,
    }));
  }, [
    name,
    first_name,
    last_name,
    phone_number,
    email_address,
    street_address,
    country_id,
    state,
    city,
    zip_code,
    cover_template_id,
    category_id,
  ]);

  const handleStepData = (e) => {
    e.preventDefault();

    // Set a cookie with options
    Cookies.set(
      "coverLetterExampleUpdateStep1",
      JSON.stringify(coverLetterData),
      {
        expires: 7,
        path: "/",
      }
    );

    navigate(`/admin/cover-examples/show-cover-examples/${coverID}/opener`);
  };

  // Drop Downs Data
  // const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cover_example_templates, setCover_example_template] = useState([]);
  const [states, setsStates] = useState([]);
  // dropdown Values
  // const [city, setCity] = useState();
  const [country, setCountry] = useState();
  // const [state, setState] = useState();
  const [coverTemplate, setCoverTemplate] = useState();
  const [allTemplates, setAllTemplates] = useState();

  useEffect(() => {
    ApiService.getCoverLetterSuggestData(user?.token)
      .then((res) => {
        let { countries, cover_example_templates } = res.data.data;

        setCountries(countries);
        setCover_example_template(cover_example_templates);
        // setCoverLetterData((prev) => ({
        //   ...prev,
        //   country_id: 1,
        //   state_id: 1,
        //   city_id: 1,
        // }));
      })
      .catch((err) => console.log(err));

    ApiService.getAllCoverTemplates(user?.token)
      .then((response) => {
        let { countries } = response.data.data;
        setCountries(countries);
        setCoverLetterData((prev) => ({
          ...prev,
          country_id: 1,
          // state_id: 1,
          // city_id: 1,
        }));

        let templates = [];

        response.data.data.templates.map((temp, idx) => {
          if (temp.is_example === 0) {
            templates.push(temp);
          }
        });
        setAllTemplates(templates);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (coverLetterData.country_id) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/states/show-states/${coverLetterData.country_id}`
  //       )
  //       .then((res) => setsStates(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [coverLetterData.country_id]);

  // useEffect(() => {
  //   if (coverLetterData.state_id) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/cities/show-cities/${coverLetterData.state_id}`
  //       )
  //       .then((res) => setCities(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [coverLetterData.state_id]);

  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);

  // set All Cities
  const cityNameValue = coverLetterData.city;
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
  const stateNameValue = coverLetterData.state;
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
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 items-center w-full">
          {/* Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"name"}
              isRequired={true}
              label={"Cover Letter Name"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({ ...prev, name: val }))
              }
              value={coverLetterData.name}
              placeholder={"Name"}
            />
          </div>
          {/* First Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"first_name"}
              isRequired={false}
              label={"First Name"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({ ...prev, first_name: val }))
              }
              value={coverLetterData.first_name}
              placeholder={"First Name"}
            />
          </div>
          {/* Last Name */}
          <div>
            <AllborderInputGroup
              htmlFor={"last_name"}
              isRequired={true}
              label={"Last Name"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({ ...prev, last_name: val }))
              }
              value={coverLetterData.last_name}
              placeholder={"Last Name"}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 items-center w-full">
          {/* Phone */}
          <div>
            <AllborderInputGroup
              htmlFor={"phone_number"}
              isRequired={false}
              label={"Phone"}
              type={"number"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({ ...prev, phone_number: val }))
              }
              value={coverLetterData.phone_number}
              placeholder={"Phone Number"}
            />
          </div>
          {/* Email Address */}
          <div>
            <AllborderInputGroup
              htmlFor={"email_address"}
              isRequired={true}
              label={"Email Address"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  email_address: val,
                }))
              }
              value={coverLetterData.email_address}
              placeholder={"Email Address"}
              type="email"
            />
          </div>
          {/* Street Address*/}
          <div>
            <AllborderInputGroup
              htmlFor={"address"}
              isRequired={false}
              label={"Street Address"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  street_address: val,
                }))
              }
              value={coverLetterData.street_address}
              placeholder={"address... "}
            />
          </div>
        </div>
        {/* Row 3 */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 items-center w-full">
          {/* Cover Template id */}
          <div>
            <DropdownWithIdValue
              htmlFor={"Template"}
              isRequired={true}
              label={"Template"}
              handleOnChange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  cover_template_id: val,
                }))
              }
              value={coverLetterData.cover_template_id}
              nameHolder={(val) => setCoverTemplate(val)}
              options={allTemplates}
            />
          </div>

          <div>
            <DropdownWithIdValue
              htmlFor={"Category"}
              isRequired={true}
              label={"Category"}
              handleOnChange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  category_id: val,
                }))
              }
              value={coverLetterData.category_id}
              options={categories}
            />
          </div>
          {/* country id */}
          <div>
            <DropdownWithIdValue
              htmlFor={"country_id"}
              isRequired={true}
              label={"Country"}
              handleOnChange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  country_id: val,
                }))
              }
              value={coverLetterData.country_id}
              nameHolder={(val) => setCountry(val)}
              options={countries}
            />
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
              value={coverLetterData.state}
              options={allStates
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((state) => state.name)}
              onInputChange={(e, value) => {
                //setCoverLetterData("state", value);
                setCoverLetterData((prev) => ({
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
              value={coverLetterData.city}
              options={cities
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cities) => cities.name)}
              onInputChange={(e, value) => {
                //setCoverLetterData("state", value);
                setCoverLetterData((prev) => ({
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
          {/* zip code */}
          <div>
            <AllborderInputGroup
              htmlFor={"zip_code"}
              isRequired={false}
              label={"Zip_Code"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  zip_code: val,
                }))
              }
              value={coverLetterData.zip_code}
              placeholder={"Zip Code"}
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
