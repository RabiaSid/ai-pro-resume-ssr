import React, { useEffect, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Checkbox,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ApiService } from "../services/ApiService";
import { useAuth } from "../services/Auth";
import { TbLoader3 } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import { FaRegTrashAlt } from "react-icons/fa";
import "react-phone-number-input/style.css";
import citiesJson from "../data/cities.json";
import StatesJson from "../data/states.json";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import swal from "sweetalert";
import AiModal from "../components/shared-components/ai_modal/AiModal";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function Summary({ data, allCountries, reload }) {
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const [edit_mode, set_edit_mode] = useState(false);
  const [add_mode, set_add_mode] = useState(false);
  const [sep_edit_mode, set_sep_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);
  const [job_positions, set_job_positions] = useState([]);
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [endDateDisable, setEndDateDisable] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [openerSuggestion, setOpenerSuggestion] = useState([]);
  const [openerSuggestion2, setOpenerSuggestion2] = useState([]);
  const [suggestionForAi, setSuggestionForAi] = useState([]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  const country =
    allCountries.find((con) => con.id === data?.country_id)?.name || "";

  const expEditorRef = useRef();

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

          data.data.data.experiences?.map((sug) => {
            setSuggestionForAi((prev) => [
              ...prev,
              { id: sug.id, suggestion: sug.experience },
            ]);
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
    getSuggestions();
  }, []);

  useEffect(() => {
    //setValue("summary", data ? data.description : "");
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

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(data);
  }, [data]);

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

  const submitData = (dataform) => {
    set_loader_mode(true);
    const formatDate = (date) => {
      if (!date) {
        return "";
      }

      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return ""; // Return an empty string if the date is invalid
      }

      // Format the date as 'YYYY-MM'
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based

      return `${year}-${month}`;
    };
    const updatedData = {
      ...dataform,
      start_date: formatDate(dataform.start_date),
      end_date: dataform.currently_working
        ? null
        : formatDate(dataform.end_date),
    };
    if (dataform.exp_id) {
      ApiService.resumeExperienceEdit(user?.token, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("exp_id", "");
          setValue("job_position", "");
          setValue("company_name", "");
          setValue("job_description", "");
          setValue("country_id", "");
          setValue("state", "");
          setValue("city", "");
          setValue("type", "");
          setValue("start_date", null);
          setValue("end_date", null);
          setValue("currently_working", "");
          reload();
          set_edit_mode(true);
          set_add_mode(false);
          set_sep_edit_mode(false);
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    } else {
      ApiService.resumeExperienceStore(user?.token, 0, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("exp_id", "");
          setValue("job_position", "");
          setValue("company_name", "");
          setValue("job_description", "");
          setValue("country_id", "");
          setValue("state", "");
          setValue("city", "");
          setValue("type", "");
          setValue("start_date", null);
          setValue("end_date", null);
          setValue("currently_working", "");
          reload();
          set_edit_mode(true);
          set_add_mode(false);
          set_sep_edit_mode(false);
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    }
  };

  const editExperience = (exp) => {
    set_sep_edit_mode(true);
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
    //setIsExpFormOpen(true);
  };

  const handleDelete = (exp_id) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        ApiService.resumeExperienceDelete(user?.token, exp_id)
          .then((res) => {
            reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDataFormNew = () => {
    setValue("exp_id", null);
    setValue("job_position", "");
    setValue("company_name", "");
    setValue("job_description", "");
    setValue("country_id", "");
    setValue("state", "");
    setValue("city", "");
    setValue("type", "");
    setValue("start_date", null);
    setValue("end_date", null);
    setValue("currently_working", "");
  };

  const formattedDate2 = (inputDate) => {
    // Split the inputDate (assuming it's in YYYY-MM-DD format)
    const [year, month] = inputDate.split("-");

    // Create a new Date object with the provided year and month (no timezone issues)
    const date = new Date(year, month - 1); // desctract 1 from month since Date object uses 0-based months

    // Get the month as a string (short version, like "Dec")
    const monthName = date.toLocaleString("default", { month: "short" });

    // Return the formatted date as "Dec, 2024"
    return `${monthName}, ${year}`;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(dataList);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setDataList(reorderedItems);
    // console.log(reorderedItems);
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
          reload();
        })
        .catch((err) => {
          reload();
        });
      //console.log(exp.id+' -- '+parseInt(index+1))
    });
  };

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Close accordion
          : [...prev, index] // Open accordion
    );
  };

  const handlePaste = (event) => {
    var imageContainers = document.getElementsByClassName("se-image-container");
    Array.from(imageContainers).forEach((div) => div.remove());
    var editableDivs = document.getElementsByTagName("span");

    Array.from(editableDivs).forEach((span) => {
      span.style.cssText = "";
    });
  };

  return (
    <div className="mt-4 font-Lexend">
      {aiModal ? (
        <AiModal
          open={aiModal}
          handleClose={() => setAiModal(false)}
          suggestionsList={suggestionForAi}
          handleSave={(data) => setValue("job_description", data)}
          modalType={["Spell", "Suggestions"]}
          initialContent={getValues("job_description") || ""}
          maxLength={1000}
          searcher="exp"
        />
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center text-[#343434] font-bold mb-2">
          Experience ({String(data.length).padStart(2, "0")})
          {edit_mode ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  set_add_mode(true);
                  set_edit_mode(true);
                  handleDataFormNew();
                }}
                className="font-Lexend text-[#A7A7A7] hover:text-[#1877F2] text-sm cursor-pointer font-normal"
              >
                Add New
              </div>
              <MdOutlineKeyboardArrowUp
                size={24}
                className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                onClick={() => set_edit_mode(!edit_mode)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  set_add_mode(!add_mode);
                  set_edit_mode(true);
                }}
                className="font-Lexend text-[#A7A7A7] hover:text-[#1877F2] text-sm cursor-pointer font-normal"
              >
                Add New
              </div>
              <MdOutlineKeyboardArrowDown
                size={24}
                className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                onClick={() => set_edit_mode(!edit_mode)}
              />
            </div>
          )}
        </div>
        {edit_mode && !sep_edit_mode ? (
          <div className="w-full">
            <ul className="flex flex-wrap ">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-wrap w-full"
                    >
                      {" "}
                      {dataList?.map((dat, idx) => (
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
                              className="flex justify-between items-center w-full"
                            >
                              <div className="border-b-2 border-[#343434] w-full hover:bg-[#e9f5ff]">
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-4 w-full">
                                  <div className="flex items-center justify-start gap-2 font-bold text-[#343434]">
                                    <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                                      {String(idx + 1).padStart(2, "0")}
                                    </p>
                                    <div className="flex flex-col ">
                                      <p className="text-primary-blue text-sm">
                                        {dat?.job_position || ""}
                                      </p>
                                      <p className="text-[#A7A7A7] text-sm">
                                        {dat?.company_name || ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-end gap-4">
                                    <FaPencil
                                      size={15}
                                      onClick={() => {
                                        editExperience(dat);
                                        set_add_mode(true);
                                      }}
                                      className="text-[#343434] hover:text-[#1877f2] cursor-pointer"
                                    />
                                    <FaRegTrashAlt
                                      size={17}
                                      onClick={() => handleDelete(dat.id)}
                                      className="text-[#343434] hover:text-red-600 cursor-pointer"
                                    />
                                    <IoMdMove
                                      size={19}
                                      className="text-[#343434] hover:text-[#1877f2]"
                                    />
                                    {openIndexes.includes(idx) ? (
                                      <MdOutlineKeyboardArrowUp
                                        onClick={() => toggleAccordion(idx)}
                                        size={22}
                                        className="text-[#343434] hover:text-[#1877f2] cursor-pointer"
                                      />
                                    ) : (
                                      <MdOutlineKeyboardArrowDown
                                        onClick={() => toggleAccordion(idx)}
                                        size={22}
                                        className="text-[#343434] hover:text-[#1877f2] cursor-pointer"
                                      />
                                    )}
                                  </div>
                                </div>

                                <div className="w-full">
                                  {openIndexes.includes(idx) && (
                                    <>
                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Job Position:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.job_position || "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Company Name:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.company_name || "Not Found"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Job Description:
                                          </p>
                                          <p
                                            className="text-[#343434] text-sm"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                dat?.job_description ||
                                                "Not Found",
                                            }}
                                          ></p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Country:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {allCountries.find(
                                              (con) =>
                                                con.id === dat?.country_id
                                            )?.name ||
                                              "" ||
                                              "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            State:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.state || "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            City:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.city || "Not Found"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Start Date:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {formattedDate2(dat?.start_date) ||
                                              "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            End Date:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {Number(dat?.currently_working) ===
                                            1
                                              ? "Currently Working"
                                              : formattedDate2(dat?.end_date) ||
                                                "Not Found"}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
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
          </div>
        ) : (
          ""
        )}

        {edit_mode && add_mode ? (
          <div className="mt-2 grid gap-4">
            {sep_edit_mode ? (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-2">
                <div className="flex items-center justify-start font-bold text-[#343434] gap-4">
                  <p className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full border border-[#343434] hover:border-[#1877f2] hover:text-[#1877f2] text-lg">
                    <IoArrowBackOutline
                      onClick={() => {
                        set_sep_edit_mode(false);

                        handleDataFormNew();
                      }}
                      size={20}
                    />
                  </p>
                  Edit Experience
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-2">
                <div className="flex items-center justify-start font-bold text-[#343434] gap-4">
                  <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                    {String(data.length + 1).padStart(2, "0")}
                  </p>
                  Add New Experience
                </div>
                <div className="w-full flex justify-end items-center">
                  <RxCross2
                    size={25}
                    className="text-red-500 hover:text-black cursor-pointer"
                    onClick={() => set_add_mode(false)}
                  />
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-4">
              {/* is editing id */}
              <Controller
                name={"exp_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Job Position*
                </label>

                <Controller
                  name="job_position"
                  control={control}
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
                            "& .MuiFormHelperText-root": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "14px",
                              padding: "0px",
                              margin: "0px",
                            },
                          }}
                          label=""
                          error={!!errors.job_position}
                          helperText={
                            errors.job_position
                              ? errors.job_position.message
                              : null
                          }
                        />
                      )}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Company Name*
                </label>

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
                      sx={{
                        "& .MuiInputBase-input": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "16px",
                          padding: "8px 8px",
                          borderColor: "#A7A7A7",
                        },
                        "& .MuiFormHelperText-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "14px",
                          padding: "0px",
                          margin: "0px",
                        },
                      }}
                      id="outlined-basic"
                      label=""
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
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Job Description
                </label>

                <div className="relative w-full">
                  <Controller
                    name="job_description"
                    control={control}
                    render={({ field }) => (
                      <div className="w-full">
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
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                {/* <Controller
                  name="job_description"
                  control={control}
                  defaultValue={data}
                  rules={{
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Minimum 1000 characters required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="filled-multiline-static"
                      label=""
                      rows={5}
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
                        "& .MuiFormHelperText-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "14px",
                          padding: "0px",
                          margin: "0px",
                        },
                      }}
                      multiline
                      className="w-full"
                      InputLabelProps={{ shrink: Boolean(field.value) }}
                      error={!!errors?.job_description}
                      helperText={errors.job_description?.message}
                    />
                  )}
                /> */}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
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
                            "& .MuiFormHelperText-root": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "14px",
                              padding: "0px",
                              margin: "0px",
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
                    {errors.country_id && (
                      <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                        {errors.country_id.message}
                      </p>
                    )}
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
                    },
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={allStates.map((option) => option.name)}
                      filterOptions={filterOptions}
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
                    },
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      {...field}
                      defaultValue={""}
                      freeSolo
                      options={cities.map((option) => option.name)}
                      filterOptions={filterOptions}
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
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Start Date*
                </label>

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
                            label=""
                            sx={{
                              "& .MuiInputBase-input": {
                                fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                                fontSize: "16px",
                                padding: "0px",
                                borderColor: "#A7A7A7",
                              },
                              "& .MuiOutlinedInput-root": {
                                fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                                fontSize: "16px",
                                padding: "8px 8px",
                                borderColor: "#A7A7A7",
                                width: "100%",
                              },
                              "&.MuiTextField-root": {
                                width: "100% !important",
                              },
                            }}
                            views={["year", "month"]}
                            value={field.value}
                            maxDate={new Date()}
                          />
                        </div>
                      )}
                    />
                  </LocalizationProvider>
                  {errors.start_date && (
                    <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                      {errors.start_date?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">End Date*</label>

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
                          label=""
                          sx={{
                            "& .MuiInputBase-input": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "0px",
                              borderColor: "#A7A7A7",
                            },
                            "& .MuiOutlinedInput-root": {
                              fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                              fontSize: "16px",
                              padding: "8px 8px",
                              borderColor: "#A7A7A7",
                              width: "100%",
                            },
                            "&.MuiTextField-root": {
                              width: "100% !important",
                            },
                          }}
                          views={["year", "month"]}
                          value={field.value}
                          maxDate={new Date()}
                          minDate={
                            watch("start_date")
                              ? new Date(
                                  new Date(watch("start_date")).setMonth(
                                    new Date(watch("start_date")).getMonth() + 1
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
                        <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                          {errors.end_date?.message}
                        </p>
                      )
                    : ""}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
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
                          sx={{
                            "&.MuiCheckbox-root": {
                              color: "#A7A7A7", // Unchecked state color
                            },
                            "&.Mui-checked": {
                              color: "#1877F2", // Checked state color
                            },
                            "&.Mui-disabled": {
                              color: "gray", // Disabled state color
                            },
                            "& .MuiTypography-root": {
                              fontFamily:
                                "'Lexend', Arial, sans-serif !important",
                            },
                          }}
                          onChange={(e) => {
                            console.log(e.target);
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
                      sx={{
                        "& .MuiTypography-root": {
                          fontFamily: "'Lexend', Arial, sans-serif",
                          fontSize: "16px", // Adjust font size if needed
                          color: "#A7A7A7", // Adjust color if needed
                        },
                      }}
                    />
                  )}
                />
              </FormGroup>
            </div>
            <div className="flex justify-center w-full">
              {loader_mode ? (
                <button
                  type="button"
                  className="flex justify-center items-center bg-[#1877F2] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  <TbLoader3 className="mr-2 animate-spin" />{" "}
                  {sep_edit_mode ? "Updating..." : "Saving..."}
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1877F2] hover:bg-[#343434] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  {sep_edit_mode ? "Update" : "Save"}
                </button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Summary;
