import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { LiaTimesSolid } from "react-icons/lia";
import {
  Autocomplete,
  Box,
  Checkbox,
  createFilterOptions,
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parse } from "date-fns";
import AiModal from "../../components/shared-components/ai_modal/AiModal";

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
    userCurrentJobPosition,
  } = props;

  const { user } = useAuth();
  const [experienceList, setExperienceList] = useState([]);
  const [endDateDisable, setEndDateDisable] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const expEditorRef = useRef();

  useEffect(() => {
    console.log("userCurrentJobPosition", userCurrentJobPosition);
  }, [userCurrentJobPosition]);

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
    clearErrors,
  } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

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
  const [suggestionForAi, setSuggestionForAi] = useState([]);

  const getSuggestions = (val) => {
    ApiService.exprinceSuggestionRelatedJobPosition(user?.token, val)
      .then((data) => {
        if (data) {
          console.log(data.data.data.experience_suggestions);
          setOpenerSuggestion(data.data.data.experience_suggestions);
          setSuggestionForAi([]);
          data.data.data.experience_suggestions?.forEach((sug) => {
            setSuggestionForAi((prev) => {
              const alreadyExists = prev.some((item) => item.id === sug.id);
              if (!alreadyExists) {
                return [...prev, { id: sug.id, suggestion: sug.detail }];
              }
              return prev;
            });
          });

          setOpenerSuggestion2(data.data.data.top_ten_experiences);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSunEditorInstance = (sunEditor) => {
    expEditorRef.current = sunEditor;
    sunEditor.core.context.element.wysiwyg.setAttribute("spellcheck", "false");
  };

  useEffect(() => {
    if (userCurrentJobPosition) {
      getSuggestions(userCurrentJobPosition);
    }
  }, [userCurrentJobPosition]);

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

    const formatDate = (date) => {
      if (!date) {
        return "";
      }

      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return "";
      }

      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}`;
    };

    const updatedData = {
      ...data,
      start_date: formatDate(data.start_date),
      end_date: data.currently_working ? null : formatDate(data.end_date),
    };
    if (data.exp_id) {
      ApiService.resumeExperienceEdit(user?.token, updatedData)
        .then((res) => {
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
      ApiService.resumeExperienceStore(user?.token, resumeId, updatedData)
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
    const parsedStartDate = exp.start_date
      ? parse(exp.start_date, "yyyy-MM-dd", new Date())
      : null;
    const parsedEndDate = exp.end_date
      ? parse(exp.end_date, "yyyy-MM-dd", new Date())
      : null;
    setValue("start_date", parsedStartDate);
    setValue("end_date", parsedEndDate);
    setValue("currently_working", exp.currently_working);
    setIsExpFormOpen(true);
  };

  const handleDelete = (exp_id) => {
    ApiService.resumeExperienceDelete(user?.token, exp_id)
      .then((res) => {
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

  const handlePaste = (event) => {
    var imageContainers = document.getElementsByClassName("se-image-container");
    Array.from(imageContainers).forEach((div) => div.remove());
    var editableDivs = document.getElementsByTagName("span");

    Array.from(editableDivs).forEach((span) => {
      span.style.cssText = "";
    });
  };

  useEffect(() => {
    if (watch("start_date")) setValue("end_date");
  }, [watch("start_date")]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  return (
    <>
      {aiModal ? (
        <AiModal
          open={aiModal}
          handleClose={() => setAiModal(false)}
          suggestionsList={suggestionForAi}
          handleSave={(data) => setValue("job_description", data)}
          modalType={["Spell", "Suggestions"]}
          initialContent={getValues("job_description") || ""}
          searcher="exp"
          maxLength={1000}
        />
      ) : (
        <></>
      )}

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
                              <div className="font-semibold leading-none font-Lexend text-base  w-[110px] sm:w-[360px] lg:[360px]">
                                <h3 className="m-0 truncate ...">
                                  {exp.job_position}
                                </h3>
                                <span className="text-xs text-muted truncate ...">
                                  {exp?.company_name}
                                </span>
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
                    validate: {
                      minLength: (value) =>
                        value.length > 3 ||
                        "Job position must be more than 3 characters",
                      maxLength: (value) => {
                        const strValue = value ?? "";
                        return (
                          strValue.length <= 150 ||
                          "Job position must not be greater than 150 characters"
                        );
                      },
                    },
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
                      filterOptions={filterOptions}
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
                    validate: {
                      minLength: (value) =>
                        value.length > 3 ||
                        "The Company Name must be more than 3 characters",
                      maxLength: (value) =>
                        value.length <= 99 ||
                        "The company name must not be greater than 200 characters.",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Company Name*"
                      variant="outlined"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.length <= 100) {
                          field.onChange(e);
                        }
                      }}
                      error={!!errors.company_name}
                      helperText={errors.company_name?.message}
                    />
                  )}
                />
                {/* job description */}
                <div className="relative">
                  <Controller
                    name="job_description"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
                        <label
                          htmlFor="job_description"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Job Description
                        </label>
                        <div className="relative">
                          <SunEditor
                            getSunEditorInstance={getSunEditorInstance}
                            setContents={field.value}
                            onChange={(content) => {
                              field.onChange(content);
                              handlePaste();
                            }}
                            onBlur={() => {
                              field.onBlur();
                            }}
                            setOptions={{
                              height: 300,
                              placeholder: "Enter the job description here...",
                              buttonList: [
                                ["bold", "underline", "italic", "strike"],
                                ["list"],
                              ],
                              maxCharCount: 1000,
                              resizeEnable: false,
                            }}
                          />
                          {errors.job_description && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.job_description.message}
                            </p>
                          )}
                          <div
                            className="absolute top-2 right-2 z-20 flex items-center gap-2 bg-primary-green px-2 py-1.5 rounded-md !m-0 cursor-pointer"
                            onClick={() => setAiModal(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <path
                                d="M27.95 5.9C27.6715 5.9 27.4044 5.78938 27.2075 5.59246C27.0106 5.39555 26.9 5.12848 26.9 4.85C26.9 4.57152 27.0106 4.30445 27.2075 4.10754C27.4044 3.91062 27.6715 3.8 27.95 3.8C28.2285 3.8 28.4955 3.91062 28.6925 4.10754C28.8894 4.30445 29 4.57152 29 4.85C29 5.12848 28.8894 5.39555 28.6925 5.59246C28.4955 5.78938 28.2285 5.9 27.95 5.9ZM27.95 5.9V11.15C27.95 12.1272 27.95 12.6158 27.8296 13.012C27.6961 13.4528 27.456 13.8538 27.1304 14.1796C26.8049 14.5053 26.4041 14.7458 25.9634 14.8796C25.5658 15 25.0772 15 24.1 15M2.05 24.1C2.32848 24.1 2.59555 24.2106 2.79246 24.4075C2.98938 24.6044 3.1 24.8715 3.1 25.15C3.1 25.4285 2.98938 25.6955 2.79246 25.8925C2.59555 26.0894 2.32848 26.2 2.05 26.2C1.77152 26.2 1.50445 26.0894 1.30754 25.8925C1.11062 25.6955 1 25.4285 1 25.15C1 24.8715 1.11062 24.6044 1.30754 24.4075C1.50445 24.2106 1.77152 24.1 2.05 24.1ZM2.05 24.1V18.85C2.05 17.8728 2.05 17.3842 2.1704 16.988C2.30389 16.5472 2.54403 16.1462 2.86956 15.8204C3.19508 15.4947 3.59594 15.2542 4.0366 15.1204C4.4342 15 4.9228 15 5.9 15M5.9 2.05C5.9 2.32848 5.78938 2.59555 5.59246 2.79246C5.39555 2.98938 5.12848 3.1 4.85 3.1C4.57152 3.1 4.30445 2.98938 4.10754 2.79246C3.91062 2.59555 3.8 2.32848 3.8 2.05C3.8 1.77152 3.91062 1.50445 4.10754 1.30754C4.30445 1.11062 4.57152 1 4.85 1C5.12848 1 5.39555 1.11062 5.59246 1.30754C5.78938 1.50445 5.9 1.77152 5.9 2.05ZM5.9 2.05H11.15C12.1272 2.05 12.6158 2.05 13.012 2.1704C13.4528 2.30389 13.8538 2.54403 14.1796 2.86956C14.5053 3.19508 14.7458 3.59594 14.8796 4.0366C15 4.4342 15 4.9228 15 5.9M24.1 27.95C24.1 27.6715 24.2106 27.4044 24.4075 27.2075C24.6044 27.0106 24.8715 26.9 25.15 26.9C25.4285 26.9 25.6955 27.0106 25.8925 27.2075C26.0894 27.4044 26.2 27.6715 26.2 27.95C26.2 28.2285 26.0894 28.4955 25.8925 28.6925C25.6955 28.8894 25.4285 29 25.15 29C24.8715 29 24.6044 28.8894 24.4075 28.6925C24.2106 28.4955 24.1 28.2285 24.1 27.95ZM24.1 27.95H18.85C17.8728 27.95 17.3842 27.95 16.988 27.8296C16.5472 27.6961 16.1462 27.456 15.8204 27.1304C15.4947 26.8049 15.2542 26.4041 15.1204 25.9634C15 25.5658 15 25.0772 15 24.1"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.96777 14.9316C5.96777 10.642 5.96777 8.4972 7.30057 7.1644C8.63337 5.8316 10.7782 5.8316 15.0678 5.8316C19.3574 5.8316 21.5022 5.8316 22.835 7.1644C24.1678 8.4972 24.1678 10.642 24.1678 14.9316C24.1678 19.2212 24.1678 21.366 22.835 22.6988C21.5022 24.0316 19.3574 24.0316 15.0678 24.0316C10.7782 24.0316 8.63337 24.0316 7.30057 22.6988C5.96777 21.366 5.96777 19.2212 5.96777 14.9316Z"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.6978 18.5002L13.6538 12.1708C13.5829 11.9711 13.4508 11.7988 13.2764 11.6784C13.102 11.558 12.8941 11.4957 12.6822 11.5002C12.4705 11.496 12.2629 11.5585 12.0888 11.6788C11.9146 11.7992 11.7828 11.9713 11.712 12.1708L9.66797 18.5002M19.1978 11.5002V18.5002M10.4198 16.4002H14.9446"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-white hidden lg:block">
                              Suggestions
                            </span>
                          </div>
                        </div>
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
                        Country*
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
                {/* Employment Type */}
                {/* <Box>
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
                </Box> */}
                {/* start date end date */}
                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="start_date"
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: "Start Date is required",
                          validate: (value) => {
                            const today = new Date();
                            if (new Date(value) > today) {
                              return "Start Date cannot be a future date";
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <div
                            className={
                              errors.start_date
                                ? "myDatePicker_exp_start_date"
                                : ""
                            }
                          >
                            <DatePicker
                              {...field}
                              label="Start Date*"
                              views={["year", "month"]}
                              value={field.value}
                              maxDate={new Date()}
                            />
                          </div>
                        )}
                      />
                    </LocalizationProvider>
                    {errors.start_date && (
                      <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                        {errors.start_date?.message}
                      </p>
                    )}
                  </div>

                  <div
                    className={
                      errors.end_date
                        ? "myDatePicker_exp_end_date"
                        : "myDatePicker_exp_end_date_no_error"
                    }
                  >
                    <Controller
                      name="end_date"
                      disabled={endDateDisable}
                      control={control}
                      rules={{
                        required: watch("currently_working")
                          ? false
                          : "End Date is required unless currently working",
                      }}
                      defaultValue={null}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            {...field}
                            label="End Date*"
                            views={["year", "month"]}
                            value={field.value}
                            maxDate={new Date()}
                            minDate={
                              watch("start_date")
                                ? new Date(
                                    new Date(watch("start_date")).setMonth(
                                      new Date(watch("start_date")).getMonth() +
                                        1
                                    )
                                  )
                                : null
                            }
                            disabled={watch("currently_working")}
                          />
                        </LocalizationProvider>
                      )}
                    />
                    {!watch("currently_working")
                      ? errors.end_date && (
                          <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                            {errors.end_date?.message}
                          </p>
                        )
                      : ""}
                  </div>
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
                              if (e.target.checked) {
                                setValue("end_date", null);
                                clearErrors("end_date");
                                setEndDateDisable(true);
                              } else {
                                clearErrors("end_date");
                                setValue("end_date", null);
                                setEndDateDisable(false);
                              }
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
