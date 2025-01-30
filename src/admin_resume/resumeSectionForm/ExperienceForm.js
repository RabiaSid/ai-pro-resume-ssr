import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor's CSS
import { LiaFileSignatureSolid, LiaTimesSolid } from "react-icons/lia";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAuth } from "../../services/Auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import citiesJson from "../../data/cities.json";
import StatesJson from "../../data/states.json";
import { LiaArrowsAltSolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi";

const ExperienceForm = (props) => {
  const {
    userExperiencesList,
    resumeId,
    jobPositionsListData,
    countries,
    reloadTheData,
    isSeving,
    resume_sections,
    updateResumeSection,
  } = props;

  const { user } = useAuth();
  const [experienceList, setExperienceList] = useState([]);

  useEffect(() => {
    setExperienceList(userExperiencesList);
  }, [userExperiencesList]);

  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    trigger,
  } = useForm({ mode: "onChange" });

  //   states
  const [currentlyWorking, setCurrentlyWorking] = useState();
  const [isExpFormIsOpen, setIsExpFormOpen] = useState(false);
  const [experienceStates, setExperienceStates] = useState();
  const [experienceCities, setExperienceCities] = useState();

  const counrtyId = watch("country_id");
  const stateId = watch("state");
  const c_working = watch("currently_working");

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  const [openerSuggestion, setOpenerSuggestion] = useState([]);
  const [openerSuggestion2, setOpenerSuggestion2] = useState([]);

  const getSuggestions = (val) => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/experience-suggestions-related?search=" + val, {
        headers,
      })
      .then((data) => {
        if (data) {
          setOpenerSuggestion(data.data.data.experiences);
          setOpenerSuggestion2(data.data.data.top_ten_experiences);
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSuggestions();

    // ApiService.getOpenerRecommends()
    //   .then((res) => {
    //     setOpenerSuggestion(res.data.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentlyWorking(c_working);
    if (c_working) {
      setValue("end_date", "");
    }
  }, [c_working]);

  useEffect(() => {
    if (counrtyId) {
      ApiService.showStatesById(counrtyId)
        .then((res) => setExperienceStates(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [counrtyId]);
  useEffect(() => {
    if (stateId) {
      ApiService.showCitiesById(stateId)
        .then((res) => setExperienceCities(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [stateId]);

  const handleExperienceFormNew = () => {
    setValue("exp_id", null);
    setIsExpFormOpen(true);
  };

  const submitExpirance = (data) => {
    isSeving(true);
    setResumeIsUpdating(true);
    if (data.exp_id) {
      ApiService.resumeExperienceEdit(user?.token, data)
        .then((res) => {
          console.log(res.data);
          isSeving(false);
          reloadTheData();
          setValue("exp_id", "");
          setValue("job_position", "");
          setValue("company_name", "");
          setValue("job_description", "");
          setValue("country_id", "");
          setValue("state", "");
          setValue("city", "");
          setValue("type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_working", "");
          setIsExpFormOpen(false);
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
        })
        .catch((err) => {
          isSeving(false);
          console.log(err);
          setResumeIsUpdating(false);
        });
    } else {
      ApiService.resumeExperienceStore(user?.token, resumeId, data)
        .then((res) => {
          console.log(res);
          reloadTheData();
          isSeving(false);
          setValue("exp_id", "");
          setValue("job_position", "");
          setValue("company_name", "");
          setValue("job_description", "");
          setValue("country_id", "");
          setValue("state", "");
          setValue("city", "");
          setValue("type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_working", "");
          setIsExpFormOpen(false);
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
        })
        .catch((err) => {
          console.log(err);
          isSeving(false);
          setResumeIsUpdating(false);
        });
    }
  };

  const editExperience = (exp) => {
    setValue("exp_id", exp.id);
    setValue("job_position", exp.job_position);
    setValue("company_name", exp.company_name);
    setValue("job_description", exp.job_description);
    setValue("country_id", exp.country_id);
    setValue("state", exp.state);
    setValue("city", exp.city);
    setValue("type", exp.type);
    setValue("start_date", exp.start_date);
    setValue("end_date", exp.end_date);
    setValue("currently_working", exp.currently_working);
    setIsExpFormOpen(true);
  };

  const handleDelete = (exp_id) => {
    ApiService.resumeExperienceDelete(user?.token, exp_id)
      .then((res) => {
        console.log(res.data);
        reloadTheData();
      })
      .catch((err) => console.log(err));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    isSeving(true);

    const reorderedItems = Array.from(experienceList);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setExperienceList(reorderedItems);
    console.log(reorderedItems);

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    reorderedItems?.map((exp, index) => {
      //console.log(exp.id);

      const article = {
        sort: parseInt(index + 1),
        //_method: 'PUT'
      };
      axios
        .post(global.baseurl + "/experience/update-sort/" + exp.id, article, {
          headers,
        })
        .then((data) => {
          reloadTheData();
          isSeving(false);
        })
        .catch((err) => {
          console.log(err);
          isSeving(false);
        });
      //console.log(exp.id+' -- '+parseInt(index+1))
    });
  };

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

  // Section Hide/show
  const [isShow, setIsShow] = useState(0);

  useEffect(() => {
    if (resume_sections) {
      setIsShow(resume_sections.show_experience);
    }
  }, [resume_sections]);

  const [suggestionsOpen, setSuggestionOpen] = useState(false);

  return (
    <>
      {!suggestionsOpen && (
        <div className="relative">
          {/* Top */}
          <div className="flex items-center justify-between">
            {/* check */}
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                id="section"
                type="checkbox"
                onChange={(e) => {
                  const showValue = e.target.checked ? 0 : 1;
                  setIsShow(showValue);
                  updateResumeSection(showValue);
                }}
                checked={isShow === 0}
              />
              <label htmlFor="section" className="select-none">
                Hide this Section
              </label>
            </div>
            <div className=" font-lexend text-base flex gap-1 justify-end items-center mr-1">
              <span className="m-0">Add</span>
              <button
                className="underline italic !mt-0 !mb-0"
                style={{ margin: "0 !important" }}
                onClick={handleExperienceFormNew}
              >
                New
              </button>
            </div>
          </div>
          {/* List */}

          <ul className="flex flex-col gap-2">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-2"
                  >
                    {experienceList?.map((exp, idx) => (
                      <Draggable
                        key={idx}
                        draggableId={String(idx)}
                        index={idx}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center gap-4 border rounded-lg h-[60px] w-full p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div>
                                <LiaArrowsAltSolid size={18} />
                              </div>
                              <div className="text-muted text-sm">
                                {idx + 1}
                              </div>
                              <div className="font-semibold font-Lexend text-base truncate ... w-[110px] sm:w-[360px] lg:[360px]">
                                {exp.job_position}
                              </div>
                            </div>
                            {/* actions */}
                            <div className="flex items-center gap-4">
                              <button
                                className="bg-primary-blue text-white text-xl flex justify-center items-center rounded-md w-[40px] h-[40px]"
                                onClick={() => editExperience(exp)}
                              >
                                <GoPencil />
                              </button>
                              <button
                                className="bg-red-500 text-white text-lg rounded-md flex justify-center items-center w-[40px] h-[40px]"
                                onClick={() => handleDelete(exp.id)}
                              >
                                <IoTrashOutline />
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ul>

          {isExpFormIsOpen && (
            <form onSubmit={handleSubmit(submitExpirance)}>
              <div className="flex flex-col gap-4 mt-4 border-t">
                <span className="text-lg font-semibold font-Lexend">
                  Add New Experience
                </span>
                {/* is editing id */}
                <Controller
                  name={"exp_id"}
                  control={control}
                  render={({ field }) => <input {...field} type="hidden" />}
                />
                {/* job Position */}
                <Controller
                  name="job_position"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: "Job position is required",
                  }}
                  sx={{ height: "40px" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      id="job_position"
                      disableClearable
                      options={jobPositionsListData
                        ?.sort((a, b) => a.name.localeCompare(b.name))
                        .map((job_position) => job_position.name)}
                      onChange={(e, value) => {
                        field.onChange(value);
                        setValue("job_position", value);
                        getSuggestions(value);
                      }} // handle change
                      onInputChange={(e, value) => {
                        field.onChange(value);
                        getSuggestions(value);
                        setValue("job_position", value);
                      }}
                      sx={{ height: "60px" }}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Job Position*"
                          autoComplete="on"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                          sx={{ height: "40px" }}
                          error={!!errors.job_position}
                          helperText={errors.job_position?.message}
                        />
                      )}
                    />
                  )}
                />
                {/* company name */}
                <Controller
                  name="company_name"
                  control={control}
                  rules={{
                    required: "Company Name is required",
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Company Name*"
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      error={!!errors.company_name}
                      helperText={errors.company_name?.message}
                    />
                  )}
                />
                {/* job description */}
                <div className="relative">
                  <div
                    className="bg-white w-fit h-fit p-1 rounded-full cursor-pointer absolute bottom-2 right-4 z-10"
                    title="Need Suggestions?"
                    onClick={() => {
                      setSuggestionOpen(true);
                    }}
                  >
                    <HiOutlineLightBulb
                      size={30}
                      className="text-[#0072B1] relative bottom-4"
                      title="Need Suggestions?"
                    />
                  </div>

                  <Controller
                    name="job_description"
                    control={control}
                    rules={{
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    }}
                    render={({ field }) => (
                      <div className="w-full">
                        <label
                          htmlFor="job_description"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Job Description
                        </label>
                        <SunEditor
                          setContents={field.value} // Set the initial content of the editor
                          onChange={(content) => {
                            field.onChange(content);
                          }}
                          onBlur={() => {
                            field.onBlur();
                          }}
                          setOptions={{
                            height: 300, // Set the height of the editor
                            placeholder: "Enter the job description here...",
                            buttonList: [
                              ["bold", "underline", "italic", "strike"],
                              ["list"],
                            ], // Customize the toolbar buttons as needed
                          }}
                        />
                        {errors.job_description && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.job_description.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                {/* county state city */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 w-full">
                  {/* Country exp */}
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
                            label="Country*"
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                          >
                            <MenuItem value={""} disabled>
                              Select Country
                            </MenuItem>
                            {countries.map((country, idx) => {
                              if (country.id === 0) return;
                              return (
                                <MenuItem key={idx} value={country.id}>
                                  {country.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      />
                      {errors.country_id && (
                        <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                          {errors.country_id.message}
                        </p>
                      )}
                    </FormControl>
                  </Box>
                  {/* States */}
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
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
                            helperText={
                              errors.state ? errors.state.message : null
                            }
                          />
                        )}
                      />
                    )}
                  />
                  {/* City New */}
                  <Controller
                    name="city"
                    control={control}
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
                {/* Employment Type */}
                <Box>
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel
                      id="demo-simple-select-label"
                      shrink={!!watch("type")}
                    >
                      Employment Type*
                    </InputLabel>
                    <Controller
                      name="type"
                      control={control}
                      rules={{
                        required: "Employment Type is required",
                      }}
                      defaultValue={""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Employment Type"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <MenuItem value={"Onsite"}>Onsite</MenuItem>
                          <MenuItem value={"Remote"}>Remote</MenuItem>
                          <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                        {errors.type.message}
                      </p>
                    )}
                  </FormControl>
                </Box>
                {/* start date end date */}
                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full">
                  {/* start date */}
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{
                      required: "Start Date is required",
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        id="outlined-basic"
                        label="Start Date*"
                        variant="outlined"
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("end_date"); // trigger end_date validation when start_date changes
                        }}
                        sx={{ width: "100%" }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.start_date}
                        helperText={errors.start_date?.message}
                      />
                    )}
                  />
                  {/* end date */}
                  <Controller
                    name="end_date"
                    control={control}
                    rules={{
                      validate: (value) => {
                        if (!currentlyWorking && !value) {
                          return "End Date is required";
                        }
                        if (
                          value &&
                          getValues("start_date") &&
                          new Date(value) <= new Date(getValues("start_date"))
                        ) {
                          return "End Date cannot be same and before Start Date";
                        }
                        return true;
                      },
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={currentlyWorking}
                        type="date"
                        id="outlined-basic"
                        label="End Date*"
                        variant="outlined"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        sx={{ width: "100%" }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.end_date}
                        helperText={errors.end_date?.message}
                      />
                    )}
                  />
                </div>
                {/* c working */}
                <FormGroup>
                  <Controller
                    name="currently_working"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                            }}
                          />
                        }
                        label="Currently Working"
                      />
                    )}
                  />
                </FormGroup>
              </div>

              {/* Submit */}
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
          )}
        </div>
      )}

      <div className="relative bg-white">
        {suggestionsOpen && (
          <>
            <div className="flex items-center justify-center relative">
              <span className="text-lg font-semibold text-center">
                Suggestions
              </span>
              <div
                onClick={() => {
                  setSuggestionOpen(false);
                }}
                className="absolute flex justify-center items-center cursor-pointer top-0 right-0 w-[40px] h-[40px]"
              >
                <LiaTimesSolid size={20} />
              </div>
            </div>
            {/* newnew */}
            <ul className="flex flex-col gap-4 mt-8 px-4">
              {openerSuggestion?.map((sug, idx) => (
                <li
                  key={idx}
                  className="border p-2 rounded-2 cursor-pointer"
                  onClick={() => {
                    const currentOpenerDetail = getValues("job_description"); // Get the current value
                    const newOpenerDetail = `${
                      currentOpenerDetail ? currentOpenerDetail : ""
                    } ${sug.experience}`.trim(); // Append the new value with a space
                    setValue("job_description", newOpenerDetail); // Set the combined value
                    setSuggestionOpen(false);
                  }}
                >
                  {sug.experience}
                </li>
              ))}

              {openerSuggestion2?.map((sug2, idx2) => (
                <li
                  key={idx2}
                  className="border p-2 rounded-2 cursor-pointer"
                  onClick={() => {
                    const currentOpenerDetail2 = getValues("job_description"); // Get the current value
                    const newOpenerDetail2 = `${
                      currentOpenerDetail2 ? currentOpenerDetail2 : ""
                    } ${sug2.experience}`.trim(); // Append the new value with a space
                    setValue("job_description", newOpenerDetail2); // Set the combined value
                    setSuggestionOpen(false);
                  }}
                >
                  {sug2.experience}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default ExperienceForm;
