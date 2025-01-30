import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropdownWithIdValue from "../../../components/DropdownWithIdValue";
import SelectDropdown from "../../../components/SelectDropdown";
import { useAuth } from "../../../services/Auth";
import citiesJson from "../../../data/cities.json";
import StatesJson from "../../../data/states.json";
import SunEditor from "suneditor-react";
import InputWithTextEditor from "../../../components/InputWithTextEditer";
import "suneditor/dist/css/suneditor.min.css";
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

const CreateExperience = () => {
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const { experience_id } = location.state;
  const [formErr, setFormErr] = useState("");
  //   Value States
  const [job_position, setJob_position] = useState("");
  const [company_name, setCompany_name] = useState("");

  const [country_id, setCountry_id] = useState(null);
  const [state_id, setState_id] = useState(null);
  const [city_id, setCity_id] = useState(null);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [jobPositionList, setjobPositionList] = useState([]);

  const [type, setType] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [company_desc, setCompany_desc] = useState("");
  const [job_desc, setjob_desc] = useState("");
  const [status, setStatus] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getCoverLetterSuggestData(user?.token)
      .then((res) => {
        let { countries } = res.data.data;

        setCountriesList(countries);
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        setjobPositionList(res.data.data);

        const positions = res.data.data.map((item) => item.name);

        setjobPositionList(positions);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   setCountry_id(1);
  // }, [countriesList]);

  // useEffect(() => {
  //   setState_id(1);
  // }, [stateList]);

  // useEffect(() => {
  //   setCity_id(1);
  // }, [citiesList]);

  useEffect(() => {
    ApiService.showExperienceDetails(user?.token, experience_id)
      .then((res) => {
        // Set Values
        const {
          job_position: job_position,
          company_name: company_name,
          country_id: country_id,
          state: state_id,
          city: city_id,
          type: type,
          start_date: start_date,
          end_date: end_date,
          company_description: company_desc,
          job_description: job_desc,
          status: status,
        } = res.data.data;

        setJob_position(job_position);
        setCompany_name(company_name);
        setCountry_id(country_id);
        setState_id(state_id);
        setCity_id(city_id);
        setType(type);
        setStart_date(start_date);
        setEnd_date(end_date);
        setCompany_desc(company_desc);
        setjob_desc(job_desc);
        setStatus(status);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (country_id) {
  //     axios
  //       .get(
  //         `https://resume.cognitiveitsolutions.ca/public/api/states/show-states/${country_id}`
  //       )
  //       .then((res) => setStateList(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [country_id]);

  // useEffect(() => {
  //   if (state_id) {
  //     axios
  //       .get(
  //         `https://resume.cognitiveitsolutions.ca/public/api/cities/show-cities/${state_id}`
  //       )
  //       .then((res) => setCitiesList(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [state_id]);

  const handleUpdateExperience = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      job_position: job_position,
      company_name: company_name,
      country_id: country_id,
      state: state_id,
      city: city_id,
      type: type,
      start_date: start_date,
      end_date: end_date,
      company_description: company_desc,
      job_description: job_desc,
      status: status,
    };

    ApiService.updateExperience(user?.token, experience_id, data)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        setFormErr(err.response.data.errors);
        console.log(err);
      });
  };

  const ErrorsList = ({ errors }) => {
    return (
      <ul className="list-decimal pl-4">
        {Object.values(errors).map((err, idx) => (
          <li className="text-red-500 text-base" key={idx}>
            {err}
          </li>
        ))}
      </ul>
    );
  };

  const [startDateIsSelected, setStartDateIsSelected] = useState(false);

  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);

  // set All Cities
  const cityNameValue = city_id;
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
  const stateNameValue = state_id;
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
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleUpdateExperience}>
          <div className="border h-full p-4">
            <h1 className="text-2xl font-bold py-4">Update Experience</h1>
            <hr />
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
            {/* Compoany Name */}
            <div>
              <AllborderInputGroup
                htmlFor={"company_name"}
                isRequired={true}
                label={"Company Name"}
                onchange={(val) => setCompany_name(val)}
                value={company_name}
                placeholder={"Company Name"}
              />
            </div>
            {/* Counrty Dropdown */}
            <div>
              <DropdownWithIdValue
                htmlFor={"country_id"}
                isRequired={true}
                label={"Country"}
                handleOnChange={(val) => setCountry_id(val)}
                value={country_id}
                options={countriesList}
              />
            </div>
            {/* State Dropdown */}
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
                value={state_id}
                options={allStates
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((state) => state.name)}
                onInputChange={(e, value) => {
                  //setCoverLetterData("state", value);
                  setState_id(value);
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
                value={city_id}
                options={cities
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((cities) => cities.name)}
                onInputChange={(e, value) => {
                  //setCoverLetterData("state", value);
                  setCity_id(value);
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
            {/* Job Type */}
            <div>
              <SelectDropdown
                htmlFor={"Job Type"}
                isRequired={true}
                label={"Job Type"}
                options={["Remote", "OnSite", "Hybrid"]}
                value={type}
                handleOnChange={(val) => setType(val)}
              />
            </div>
            {/* <div>
              <AllborderInputGroup
                htmlFor={"start_date"}
                isRequired={true}
                label={"start date"}
                onchange={(val) => setStart_date(val)}
                value={start_date}
                placeholder={"start date"}
                type={"date"}
              />
            </div>
            <div>
              <AllborderInputGroup
                htmlFor={"end_date"}
                type={"date"}
                label={"End date"}
                onchange={(val) => setEnd_date(val)}
                value={end_date}
                placeholder={"end date"}
              />
            </div> */}

            {/* Start Date */}
            <div className="py-2 w-full flex flex-col gap-2">
              <label
                htmlFor={"end_date"}
                className="border-[#9b9b9b] text-xs sm:text-base"
              >
                Start Date{" "}
              </label>

              <input
                type="date"
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                onChange={(e) => {
                  setStartDateIsSelected(true);
                  setStart_date(e.target.value);
                  setEnd_date("");
                }}
                value={start_date}
              />
            </div>
            {/* End Date */}
            <div className="py-2 w-full flex flex-col gap-2">
              <label
                htmlFor={"end_date"}
                className="border-[#9b9b9b] text-xs sm:text-base"
              >
                End Date{" "}
                <span className="text-xs italic">
                  (Select Start Date First)
                </span>
              </label>

              <input
                type="date"
                disabled={!startDateIsSelected}
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                value={end_date}
                min={start_date}
                onChange={(e) => setEnd_date(e.target.value)}
              />
            </div>

            <div>
              <TextAreaGroup
                cols={4}
                htmlFor={"company_decsription"}
                isRequired={true}
                label={"Company Description"}
                onchange={(val) => setCompany_desc(val)}
                value={company_desc}
                resize={false}
                rows={4}
                maxLength={250}
              />
              <div>
                <SunEditor
                  setContents={job_desc} // Set the initial content of the editor
                  onChange={(val) => setjob_desc(val)}
                  onBlur={() => {
                    job_desc.onBlur();
                  }}
                  setOptions={{
                    height: 200, // Set the height of the editor
                    placeholder: "Enter the job description here...",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["list"],
                    ], // Customize the toolbar buttons as needed
                  }}
                />
                {/* <InputWithTextEditor
                  cols={4}
                  htmlFor={"job_description"}
                  isRequired={true}
                  label={"Job Description"}
                  onchange={(val) => setjob_desc(val)}
                  value={job_desc}
                  resize={false}
                  rows={4}
                /> */}
              </div>
              {/*  */}
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
            </div>
            <ErrorsList errors={formErr} />
            <hr />
            {/* Upadte */}
            <div className="py-6 flex flex-col gap-2">
              <button
                type="submit"
                className="bg-primary w-fit text-lg text-white font-bold rounded-md px-4 py-2"
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

export default CreateExperience;
