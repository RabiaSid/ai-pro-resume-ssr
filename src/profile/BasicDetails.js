import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ApiService } from "../services/ApiService";
import { useAuth } from "../services/Auth";
import { TbLoader3 } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import citiesJson from "../data/cities.json";
import StatesJson from "../data/states.json";
import Skeleton from "react-loading-skeleton";

function Summary({ data, allCountries, reload }) {
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({ mode: "onChange" });
  const [edit_mode, set_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);
  const [job_positions, set_job_positions] = useState([]);
  const [countries, setCountries] = useState();
  const [job_search, set_job_search] = useState("");
  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const country =
    allCountries.find((con) => con.id === data?.country_id)?.name || "";

  useEffect(() => {
    setValue("first_name", data?.name ? data?.name.trim().split(" ")[0] : "");
    setValue("last_name", data?.name ? data?.name.trim().split(" ")[1] : "");
    setValue("job_title", data?.job_position ? data?.job_position : "");
    setValue("website", data?.website ? data?.website : "");
    setValue("phone_number", data?.phone_number ? data?.phone_number : "");
    setValue("contact_number", data?.contact ? data?.contact : "");
    setValue("experience", data?.experience ? data?.experience : "");
    setValue("country_id", data?.country_id ? data?.country_id : "");
    setValue("state", data?.state ? data?.state : "");
    setValue("city", data?.city ? data?.city : "");
    setValue("postal_code", data?.postal_code ? data?.postal_code : "");
    setValue("street_address", data?.address ? data?.address : "");
    ApiService.showCountries()
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        console.log(res);
        set_job_positions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [user?.token]);

  // set All Cities
  const cityNameValue = watch("city");
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

  const stateNameValue = watch("state");
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

  const submitBasicDetails = (dataform) => {
    console.log(dataform);
    set_loader_mode(true);
    ApiService.updateUserDetails(user?.token, dataform)
      .then((res) => {
        console.log(res);
        set_edit_mode(false);
        set_loader_mode(false);
        reload();
      })
      .catch((err) => {
        console.log(err);
        set_loader_mode(false);
      });
  };

  const getExperienceLabel = (valuee) => {
    if (valuee) {
      if (Number(valuee) === 0) return "Fresher";
      if (Number(valuee) === 0.5 || Number(valuee) === 1)
        return valuee + " Year";
      if (Number(valuee) > 10) return "10+ Years";
      //if (valuee > 0 && valuee < 10) return `${valuee} Years`;
      return `${valuee} Years`;
    } else {
      return `Fresher`;
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitBasicDetails)}>
        <div className="flex justify-between items-center text-[#0072b1] text-lg font-bold mb-2">
          Basic Details:
          {edit_mode ? (
            <RxCrossCircled
              size={24}
              className="text-[red] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          ) : (
            <FaPencil
              className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          )}
        </div>
        {edit_mode ? (
          <div className="mt-2 grid gap-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  First Name*
                </label>

                <Controller
                  name="first_name"
                  control={control}
                  rules={{
                    required: "First name is required",
                    validate: {
                      minLength: (value) =>
                        value.length >= 3 ||
                        "The First Name must be at least 3 characters",
                      maxLength: (value) =>
                        value.length <= 14 ||
                        "The First Name must be at most 15 characters",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.length <= 15) {
                          field.onChange(e);
                        }
                      }}
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Last Name*</label>

                <Controller
                  name="last_name"
                  control={control}
                  rules={{
                    required: "Last name is required",
                    validate: {
                      minLength: (value) =>
                        value.length >= 3 ||
                        "The Last Name must be at least 3 characters",
                      maxLength: (value) =>
                        value.length <= 14 ||
                        "The Last Name must be at most 15 characters",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.length <= 15) {
                          field.onChange(e);
                        }
                      }}
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Job Title</label>

                <Controller
                  name="job_title"
                  control={control}
                  rules={{
                    validate: {
                      maxLength: (value) => {
                        const strValue = value ?? "";
                        return (
                          strValue.length <= 100 ||
                          "Job Title must be at most 100 characters"
                        );
                      },
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={job_positions
                        ?.sort((a, b) => a.name.localeCompare(b.name))
                        .map((option) => option.name)}
                      filterOptions={filterOptions}
                      onChange={(e, value) => {
                        field.onChange(value);
                        set_job_search(value);
                      }}
                      onInputChange={(e, value) => {
                        field.onChange(value);
                        set_job_search(value);
                      }}
                      value={field.value}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "0px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      defaultValue={null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          defaultValue={""}
                          sx={{
                            "& .MuiInputBase-input": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "8px 8px",
                              borderColor: "#A7A7A7",
                            },
                            "& .MuiOutlinedInput-root": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "0px",
                              borderColor: "#A7A7A7",
                            },
                          }}
                          label=""
                          error={!!errors.job_title}
                          helperText={
                            errors.job_title ? errors.job_title.message : null
                          }
                        />
                      )}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Website / Linkedin URL
                </label>

                <Controller
                  name="website"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^(https?:\/\/)?(localhost|([\da-z.-]+)\.([a-z.]{2,6}))(:\d{1,5})?(\/[\w .-]*)*\/?$/,
                      message: "Invalid URL",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      type="url"
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.website}
                      helperText={errors.website?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Mobile Number*
                </label>

                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: "Mobile Number is required",
                    minLength: {
                      value: 8,
                      message: "Mobile Number must be at least 8 digits",
                    },
                    maxLength: {
                      value: 18,
                      message: "Mobile Number must be at most 18 digits",
                    },
                  }}
                  render={({ field }) => (
                    <div className="w-full profile_number">
                      <PhoneInput
                        {...field}
                        placeholder=""
                        sx={{
                          "& .MuiInputBase-input": {
                            fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                            fontSize: "16px",
                            padding: "8px 8px",
                            borderColor: "#A7A7A7",
                          },
                        }}
                        autoComplete="on"
                        inputProps={{
                          name: "phone_number",
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        className={` ${
                          errors?.phone_number
                            ? "border-red-500 border"
                            : " border-2"
                        }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
                      />
                      {errors?.phone_number && (
                        <span className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                          {errors.phone_number.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Contact Number
                </label>

                <Controller
                  name="contact_number"
                  control={control}
                  rules={{
                    minLength: {
                      value: 8,
                      message: "Mobile Number must be at least 8 digits",
                    },
                    maxLength: {
                      value: 18,
                      message: "Mobile Number must be at most 18 digits",
                    },
                  }}
                  render={({ field }) => (
                    <div className="w-full profile_number">
                      <PhoneInput
                        {...field}
                        placeholder=""
                        autoComplete="on"
                        inputProps={{
                          name: "contact_number",
                          required: true,
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        className={` ${
                          errors?.contact_number
                            ? "border-red-500 border"
                            : " border-2"
                        }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
                      />
                      {errors?.contact_number && (
                        <span className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                          {errors.contact_number.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-4 relative mt-4 mb-12">
              <Controller
                name="experience"
                control={control}
                rules={{
                  required: "Experience is required",
                  min: { value: 0, message: "Experience must be at least 0" },
                  max: { value: 10.5, message: "Experience cannot exceed 10+" },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <label className="flex w-full font-Lexend text-[#343434] font-bold mb-2">
                      Experience ({getExperienceLabel(field.value)})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10.5"
                      step="0.5"
                      value={field.value || 0} // Default to 0 if undefined
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      className="w-full mt-2 appearance-none bg-gradient-to-r from-[#1877f2] to-[#a8cbee] h-2 rounded-lg focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #1877f2 ${
                          ((field.value || 0 - 0) / (10.5 - 0)) * 100
                        }%, #a8cbee 0%)`,
                      }}
                    />
                    {/* Error message */}
                    {errors?.experience && (
                      <span className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                        {errors.experience.message}
                      </span>
                    )}

                    {/* Labels for the Slider */}
                    <span className="absolute -bottom-8 left-[0.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      F
                    </span>
                    <span className="absolute -bottom-8 left-[5.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[10%] text-[#A7A7A7] font-Lexend  text-sm">
                      1
                    </span>
                    <span className="absolute -bottom-8 left-[14.8%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[19.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      2
                    </span>
                    <span className="absolute -bottom-8 left-[24%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[28.5%] text-[#A7A7A7] font-Lexend  text-sm">
                      3
                    </span>
                    <span className="absolute -bottom-8 left-[33.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[37.8%] text-[#A7A7A7] font-Lexend  text-sm">
                      4
                    </span>
                    <span className="absolute -bottom-8 left-[42.8%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[47.2%] text-[#A7A7A7] font-Lexend  text-sm">
                      5
                    </span>
                    <span className="absolute -bottom-8 left-[52%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[56.4%] text-[#A7A7A7] font-Lexend  text-sm">
                      6
                    </span>
                    <span className="absolute -bottom-8 left-[61.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[65.8%] text-[#A7A7A7] font-Lexend  text-sm">
                      7
                    </span>
                    <span className="absolute -bottom-8 left-[70.6%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[75.1%] text-[#A7A7A7] font-Lexend  text-sm">
                      8
                    </span>
                    <span className="absolute -bottom-8 left-[80%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[84.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      9
                    </span>
                    <span className="absolute -bottom-8 left-[89.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      |
                    </span>
                    <span className="absolute -bottom-8 left-[93.3%] text-[#A7A7A7] font-Lexend  text-sm">
                      10
                    </span>
                    <span className="absolute -bottom-8 left-[98%] text-[#A7A7A7] font-Lexend  text-sm">
                      10+
                    </span>
                  </div>
                )}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Country*</label>

                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth error={!!errors.country_id}>
                    <Controller
                      name="country_id"
                      control={control}
                      rules={{
                        required: "Country is required",
                      }}
                      defaultValue={""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          sx={{
                            "& .MuiInputBase-input": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "8px 8px",
                              borderColor: "#A7A7A7",
                            },
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label=""
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <MenuItem value={""} disabled>
                            Select Country
                          </MenuItem>
                          {countries
                            ?.filter((country) => country.name !== "Empty")
                            .map((country, idx) => (
                              <MenuItem key={idx} value={country.id}>
                                {country.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                    {errors.country_id && <p>{errors.country_id.message}</p>}
                  </FormControl>
                </Box>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">State</label>

                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: {
                      maxLength: (value) => {
                        const strValue = value ?? "";
                        return (
                          strValue.length <= 50 ||
                          "State must be at most 50 characters"
                        );
                      },
                      isText: (value) => {
                        return (
                          /^[a-zA-Z\s]*$/.test(value) || "Only text is allowed"
                        );
                      },
                    },
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={allStates.map((option) => option.name)}
                      onChange={(e, value) => {
                        field.onChange(value);
                        setValue("state", value);
                      }}
                      onInputChange={(e, value) => {
                        field.onChange(value);
                        setValue("state", value);
                        handleInputState(value);
                      }}
                      value={field.value}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "0px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      defaultValue={null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          defaultValue={""}
                          label=""
                          sx={{
                            "& .MuiInputBase-input": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "8px 8px",
                              borderColor: "#A7A7A7",
                            },
                            "& .MuiOutlinedInput-root": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "0px",
                              borderColor: "#A7A7A7",
                            },
                          }}
                          error={!!errors.state}
                          helperText={
                            errors.state ? errors.state.message : null
                          }
                        />
                      )}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">City</label>

                <Controller
                  name="city"
                  control={control}
                  rules={{
                    validate: {
                      maxLength: (value) => {
                        const strValue = value ?? "";
                        return (
                          strValue.length <= 50 ||
                          "City must be at most 50 characters"
                        );
                      },
                      isText: (value) => {
                        return (
                          /^[a-zA-Z\s]*$/.test(value) || "Only text is allowed"
                        );
                      },
                    },
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      {...field}
                      defaultValue={""}
                      freeSolo
                      options={cities.map((option) => option.name)}
                      onChange={(e, value) => {
                        field.onChange(value);
                        setValue("city", value);
                      }}
                      onInputChange={(e, value) => {
                        field.onChange(value);
                        setValue("city", value);
                        handleInputChange(value);
                      }}
                      value={field.value}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "0px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          error={!!fieldState.error}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                        />
                      )}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Postal Code
                </label>

                <Controller
                  name="postal_code"
                  control={control}
                  // rules={{
                  //   validate: {
                  //     maxLength: (value) => {
                  //       const strValue = value ?? "";
                  //       return (
                  //         strValue.length <= 20 ||
                  //         "Postal Code must be at most 20 characters"
                  //       );
                  //     },
                  //   },
                  // }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "0px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.postal_code}
                      helperText={errors.postal_code?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Street Address
                </label>

                <Controller
                  name="street_address"
                  rules={{
                    validate: {
                      maxLength: (value) => {
                        const strValue = value ?? "";
                        return (
                          strValue.length <= 70 ||
                          "Street Address must be at most 70 characters"
                        );
                      },
                    },
                  }}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "0px",
                          borderColor: "#A7A7A7",
                        },
                      }}
                      id="filled-multiline-static"
                      rows={3}
                      label=""
                      multiline
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.street_address}
                      helperText={errors.street_address?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center w-full">
              {loader_mode ? (
                <button
                  type="button"
                  className="flex justify-center items-center bg-[#1877F2] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  <TbLoader3 className="mr-2 animate-spin" /> Saving...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1877F2] hover:bg-[#343434] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {!data ? (
              <>
                <Skeleton width={"300px"} height={"20px"} />
                <Skeleton width={"300px"} height={"20px"} />
                <Skeleton width={"300px"} height={"20px"} />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Name:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.name || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Job Position:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.job_position || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">
                      Years of Experience:
                    </p>
                    <p className="text-[#343434] text-sm break-all">
                      {getExperienceLabel(data?.experience) || "Not Found"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Mobile Number:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.phone_number || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Contact Number:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.contact || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">
                      Website / Linkedin URL:
                    </p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.website || "Not Found"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Country:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {country || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">State:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.state || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">City:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.city || "Not Found"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[66%,34%] gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Street Address:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.address || "Not Found"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#A7A7A7] text-md">Postal Code:</p>
                    <p className="text-[#343434] text-sm break-all">
                      {data?.postal_code || "Not Found"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default Summary;
