import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/Auth";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
//
import PhoneInput from "react-phone-number-input";
import swal from "sweetalert";
import "react-phone-number-input/style.css";
import $ from "jquery";
import { ApiService } from "../../services/ApiService";
import { LuPenLine } from "react-icons/lu";
import resumePlaceholderImage from "../../assets/images/reusme_placeholder_image.webp";
import citiesJson from "../../data/cities.json";
import StatesJson from "../../data/states.json";
import { RxCross2 } from "react-icons/rx";

export const HeaderForm = (props) => {
  const {
    formHasError,
    isSeving,
    resumeData,
    ResumeProfileImage,
    TemplateId,
    // update each input
    setFirstName,
    setLastName,
    setEmailAddress,
    setJobTitle,
    setPhoneNumber,
    setContactNumber,
    setStreetAddress,
    setPostalCode,
    setGender,
    setWebsite,
    storePreviewImage,
    //
    changeProfileImage,
    countries,
    setStateName,
    setCityName,
    setCountryName,
    //
    jobPositionsListData,
    reloadTheData,
    closeOpenForms,
  } = props;
  const { user } = useAuth();

  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
  } = useForm({ mode: "onChange" });

  // Watch all fields
  const FirstName = watch("first_name");
  const LastName = watch("last_name");
  const emailAddress = watch("email_address");
  const JobTitle = watch("job_title");
  const PhoneNumber = watch("phone_number");
  const ContactNumber = watch("contact_number");
  const StreetAddress = watch("street_address");
  const PostalCode = watch("postal_code");
  // const Gender = watch("gender");
  const Website = watch("website");
  const state = watch("state");
  const city = watch("city");
  const country = watch("country_id");

  const [job_positions, set_job_positions] = useState([]);

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        console.log(res);
        set_job_positions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [user?.token]);

  useEffect(() => {
    setFirstName(FirstName);
  }, [FirstName]);
  //
  useEffect(() => {
    setLastName(LastName);
  }, [LastName]);
  //
  useEffect(() => {
    setEmailAddress(emailAddress);
  }, [emailAddress]);
  //
  useEffect(() => {
    setJobTitle(JobTitle);
  }, [JobTitle]);
  //
  useEffect(() => {
    setPhoneNumber(PhoneNumber);
  }, [PhoneNumber]);
  //
  useEffect(() => {
    setContactNumber(ContactNumber);
  }, [ContactNumber]);
  //
  useEffect(() => {
    setStreetAddress(StreetAddress);
  }, [StreetAddress]);
  //
  useEffect(() => {
    setPostalCode(PostalCode);
  }, [PostalCode]);
  //
  // useEffect(() => {
  //   setGender("Male");
  // }, [Gender]);

  useEffect(() => {
    setWebsite(Website);
  }, [Website]);

  useEffect(() => {
    if (state) {
      setStateName(state);
    }
  }, [state]);

  useEffect(() => {
    if (city) {
      setCityName(city);
    }
  }, [city]);

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  useEffect(() => {
    setValue("first_name", resumeData.first_name);
    setValue("last_name", resumeData.last_name);
    setValue("email_address", resumeData.email_address);
    setValue("job_title", resumeData.job_title);
    setValue("phone_number", resumeData.phone_number);
    setValue("contact_number", resumeData.contact_number);
    setValue("country_id", resumeData.country_id);
    setValue("state", resumeData.state);
    setValue("city", resumeData.city);
    setValue("street_address", resumeData.street_address);
    setValue("postal_code", resumeData.postal_code);
    // setValue("gender", resumeData.gender);
    setValue("website", resumeData.website);
    setValue("template_id", TemplateId);
    setValue("state", resumeData.state);
    setValue("city", resumeData.city);
  }, []);

  useEffect(() => {
    if (country) {
      setCountryName(country);
    }
  }, [country]);

  const submitHeader = (data) => {
    if (formHasError) return;
    isSeving(true);
    setResumeIsUpdating(true);
    ApiService.resuemHeaderEditSubmit(
      user?.token,
      resumeData.uuid,
      profileImage,
      data
    )
      .then((res) => {
        isSeving(false);
        storePreviewImage();
        reloadTheData();
        closeOpenForms();
        setResumeIsUpdating(false);
        setResumeHasSaved(false);
      })
      .catch((err) => {
        console.log(err);
        isSeving(false);
        setResumeIsUpdating(false);
      });
  };

  const [profileImage, setProfileImage] = useState();
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png"];

    // Validate file type
    if (file && acceptedFileTypes.includes(file.type)) {
      setProfileImage(file);
      changeProfileImage(file); // Your function to handle image change
    } else {
      swal(
        "Invalid file type!",
        "Only .jpg, .jpeg, or .png files are allowed.",
        "error"
      );
    }
  };

  const handleProfileImageChange2 = (e) => {
    swal({
      title: "Delete File",
      text: "Are you sure you want to delete the profile image?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setProfileImage(null);
        changeProfileImage(null);
        setResumeIsUpdating(true);

        ApiService.resumeHeaderImageRemove(user?.token, resumeData.uuid)
          .then((res) => {
            storePreviewImage();
            reloadTheData();
            setResumeIsUpdating(false);
            setResumeHasSaved(false);
          })
          .catch((err) => {
            console.error(err);
            setResumeIsUpdating(false);
          });
      } else {
        swal("Your file was not deleted!");
      }
    });
  };

  const countryId = watch("country_id");

  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);

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

  // All States
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

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHeader)}
        className="flex items-center flex-col gap-4"
      >
        {/* Profile Image */}
        <div
          className="w-[80px] cursor-pointer relative border-2 !h-[80px] flex justify-center items-center overflow-hidden rounded-full group"
          onClick={() =>
            window.innerWidth >= 768
              ? document.getElementsByClassName("resumeProfileImage")[0].click()
              : document.getElementsByClassName("resumeProfileImage")[1].click()
          }
        >
          <div className="absolute hidden group-hover:block">
            <LuPenLine size={24} className="text-white" />
          </div>

          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : ResumeProfileImage
                  ? global.imageUrl + ResumeProfileImage
                  : resumePlaceholderImage
            }
            alt={"profile__image"}
          />
          <input
            type="file"
            id="resumeProfileImage"
            className="hidden resumeProfileImage"
            alt="profile image"
            accept=".jpg,.png,.jpeg"
            onChange={handleProfileImageChange}
          />
        </div>
        {profileImage || ResumeProfileImage ? (
          <div
            className="absolute ml-16 bg-black text-white rounded-full p-1 hover:bg-rose-500 hover:text-black"
            onClick={(e) => {
              handleProfileImageChange2(e);
            }}
          >
            <RxCross2 size={18} />
          </div>
        ) : (
          ""
        )}

        <p className="font-lexend font-bold text-sm mb-4">
          Recommend Size same proportional{" "}
          <span className="text-red-500">(150px by 150px)</span>
        </p>
        <div className="flex items-center gap-2 w-full">
          {/* first_name */}
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
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="First Name*"
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
          {/* last_name */}
          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            rules={{
              validate: {
                maxLength: (value) => {
                  // Check if the value is null or undefined
                  if (value === null || value === undefined) {
                    return true; // If it's null/undefined, consider it valid (optional field)
                  }
                  // Allow empty string and check length
                  return (
                    value === "" ||
                    value.length <= 15 ||
                    "The Last Name must be at most 15 characters"
                  );
                },
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={(e) => {
                  const { value } = e.target;
                  field.onChange(value); // Always update the field value
                }}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            )}
          />
        </div>
        {/* email_address */}
        <Controller
          name="email_address"
          control={control}
          rules={{
            required: "Email Address required",
            validate: {
              maxLength: (value) =>
                value.length <= 150 ||
                "Email Address must be atmost 150 characters",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Email Address*"
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.email_address}
              helperText={errors.email_address?.message}
            />
          )}
        />
        {/* job_title */}

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
              }}
              onInputChange={(e, value) => {
                field.onChange(value);
              }}
              value={field.value}
              sx={{ width: "100%" }}
              defaultValue={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  defaultValue={""}
                  label="Position/Job Title"
                  error={!!errors.job_title}
                  helperText={
                    errors.job_title ? errors.job_title.message : null
                  }
                />
              )}
            />
          )}
        />
        {/* phone_number */}
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
            <div className="w-full">
              <PhoneInput
                {...field}
                placeholder="Mobile Number*"
                autoComplete="on"
                inputProps={{
                  name: "phone_number",
                }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                className={` ${errors?.phone_number ? "border-red-500 border" : " border-2"
                  }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
              />
              {errors?.phone_number && (
                <span className="text-[#d32f2f] text-[0.75rem] Roboto font-normal ml-[14px] ">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
          )}
        />
        {/* contact_number */}
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
            <div className="w-full">
              <PhoneInput
                {...field}
                placeholder="Contact Number"
                autoComplete="on"
                inputProps={{
                  name: "contact_number",
                  required: true,
                }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                className={` ${errors?.contact_number ? "border-red-500 border" : " border-2"
                  }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
              />
              {errors?.contact_number && (
                <span className="text-[#d32f2f] text-[0.75rem] Roboto font-normal ml-[14px] ">
                  {errors.contact_number.message}
                </span>
              )}
            </div>
          )}
        />
        {/* website */}
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
              sx={{ width: "100%" }}
              type="url"
              id="outlined-basic"
              label="Website/Linkedin (URL)"
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.website}
              helperText={errors.website?.message}
            />
          )}
        />
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          {/* countries */}
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth error={!!errors.country_id}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!watch("country_id")}
              >
                Country
              </InputLabel>
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
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
          {/* States */}
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
                sx={{ width: "100%" }}
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    defaultValue={""}
                    label="State"
                    error={!!errors.state}
                    helperText={errors.state ? errors.state.message : null}
                  />
                )}
              />
            )}
          />
          {/* City New */}
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
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
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
        {/* street_address */}
        <Controller
          name="street_address"
          rules={{
            validate: {
              maxLength: (value) => {
                const strValue = value ?? "";
                return (
                  strValue.length <= 50 ||
                  "Street Address must be at most 50 characters"
                );
              },
            },
          }}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Street Address"
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.street_address}
              helperText={errors.street_address?.message}
            />
          )}
        />
        {/* postal_code */}
        <Controller
          name="postal_code"
          control={control}
          rules={{
            validate: {
              maxLength: (value) => {
                const strValue = value ?? "";
                return (
                  strValue.length <= 20 ||
                  "Postal Code must be at most 20 characters"
                );
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!errors.postal_code}
              helperText={errors.postal_code?.message}
            />
          )}
        />

        <Controller
          name="template_id"
          control={control}
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <div className="w-full">
          {resumeIsUpdating ? (
            <button
              type="button"
              disabled
              className="bg-primary-green w-full py-2 rounded-md text-white font-semibold font-Lexend"
            >
              {!resumeHasSaved ? (
                <>
                  <div className="flex justify-center items-center">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              ) : (
                "Saved"
              )}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary-blue hover:bg-primary-green w-full py-2 rounded-md text-white font-semibold font-Lexend"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </>
  );
};
