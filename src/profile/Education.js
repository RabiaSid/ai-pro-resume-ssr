import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Checkbox,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import swal from "sweetalert";
import { RxCross2 } from "react-icons/rx";

function Summary({ data, allCountries, reload }) {
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const [edit_mode, set_edit_mode] = useState(false);
  const [add_mode, set_add_mode] = useState(false);
  const [sep_edit_mode, set_sep_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);
  const [degrees, setDegrees] = useState();
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [endDateDisable, setEndDateDisable] = useState(false);
  const country =
    allCountries.find((con) => con.id === data?.country_id)?.name || "";

  useEffect(() => {
    //setValue("summary", data ? data.description : "");
    ApiService.showCountries()
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.log(err));
    ApiService.getDegreeValues(user?.token)
      .then((res) => setDegrees(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const [theGradeType, setTheGradeType] = useState("");

  const c_styding = watch("currently_studying");
  const gradeType = watch("grade_type");

  useEffect(() => {
    if (gradeType === "cgpa") {
      setValue("grade", "");
      setValue("percentage", "");
    } else if (gradeType === "grade") {
      setValue("cgpa", "");
      setValue("percentage", "");
    } else if (gradeType === "percentage") {
      setValue("cgpa", "");
      setValue("grade", "");
    }
    setTheGradeType(gradeType);
  }, [gradeType]);

  const [currentlyStudying, setCurrentlyStudying] = useState();

  useEffect(() => {
    setCurrentlyStudying(c_styding);
    if (c_styding) {
      setValue("end_date", "");
    }
  }, [c_styding]);

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

      // Format the date as 'YYYY-MM-DD' with the day set to the first of the month
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
      const day = "01"; // Always set the day to '01'

      return `${year}-${month}-${day}`;
    };
    const updatedData = {
      ...dataform,
      start_date: formatDate(dataform.start_date),
      end_date: dataform.currently_studying
        ? null
        : formatDate(dataform.end_date),
    };
    console.log("edu_id" + dataform.edu_id);
    if (dataform.edu_id) {
      ApiService.resumeEducationEdit(user?.token, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("edu_id", "");
          setValue("institution", "");
          setValue("degree", "");
          setValue("field", "");
          setValue("grade_type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_studying", "");
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
      ApiService.resumeEducationStore(user?.token, 0, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("edu_id", "");
          setValue("institution", "");
          setValue("degree", "");
          setValue("field", "");
          setValue("grade_type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_studying", "");
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

  const editExperience = (data) => {
    set_sep_edit_mode(true);
    setValue("edu_id", data.uuid);
    setValue("institution", data.institution);
    setValue("degree", data.degree);
    setValue("field", data.field);
    setValue("grade_type", data.grade_type);

    if (data.grade_type === "cgpa") {
      setTimeout(() => {
        setValue("cgpa", data.grade);
      }, [100]);
      setValue("grade", "");
      setValue("percentage", "");
    } else if (gradeType === "grade") {
      setTimeout(() => {
        setValue("grade", data.grade);
      }, [100]);
      setValue("cgpa", "");
      setValue("percentage", "");
    } else if (gradeType === "percentage") {
      setTimeout(() => {
        setValue("percentage", data.grade);
      }, [100]);
      setValue("cgpa", "");
      setValue("grade", "");
    }

    const parsedStartDate = data.start_date
      ? parse(data.start_date, "yyyy-MM-dd", new Date())
      : null;
    const parsedEndDate = data.end_date
      ? parse(data.end_date, "yyyy-MM-dd", new Date())
      : null;
    setValue("start_date", parsedStartDate);
    setValue("end_date", parsedEndDate);
    setValue("currently_studying", Boolean(data.currently_studying));
    //setIsExpFormOpen(true);
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        ApiService.resumeEducationDelete(user?.token, id)
          .then((res) => {
            reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDataFormNew = () => {
    setValue("edu_id", null);
    setValue("institution", "");
    setValue("degree", "");
    setValue("field", "");
    setValue("grade_type", "");
    setValue("start_date", "");
    setValue("end_date", "");
    setValue("currently_studying", "");
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
        .post(global.baseurl + "/education/update-sort/" + exp.id, article, {
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

  useEffect(() => {
    if (watch("start_date")) setValue("end_date");
  }, [watch("start_date")]);

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Close accordion
          : [...prev, index] // Open accordion
    );
  };

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center text-[#343434] font-bold mb-2">
          Education ({String(data.length).padStart(2, "0")})
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
                                        {dat?.institution || ""}
                                      </p>
                                      <p className="text-[#A7A7A7] text-sm">
                                        {dat?.field || ""}
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
                                      onClick={() => handleDelete(dat.uuid)}
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
                                            Institution:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.institution || "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Degree:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.degree || "Not Found"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Field of Study:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.field || "Not Found"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Grade:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.grade || "Not Found"}
                                          </p>
                                        </div>
                                        {dat?.grade_type === "grade" ? (
                                          <div className="flex flex-col gap-2">
                                            <p className="text-[#A7A7A7] text-md">
                                              Grade Type:
                                            </p>
                                            <p className="text-[#343434] text-sm">
                                              {dat?.grade_type || "Not Found"}
                                            </p>
                                          </div>
                                        ) : dat?.grade_type === "cgpa" ? (
                                          <div className="flex flex-col gap-2">
                                            <p className="text-[#A7A7A7] text-md">
                                              CGPA:
                                            </p>
                                            <p className="text-[#343434] text-sm">
                                              {dat?.grade_type || "Not Found"}
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="flex flex-col gap-2">
                                            <p className="text-[#A7A7A7] text-md">
                                              Percentage:
                                            </p>
                                            <p className="text-[#343434] text-sm">
                                              {dat?.grade_type || "Not Found"}
                                            </p>
                                          </div>
                                        )}
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
                                            {dat?.currently_studying == 1
                                              ? "Currently Studying"
                                              : dat?.end_date
                                              ? formattedDate2(dat?.end_date)
                                              : "Not Found"}
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
                  Edit Education
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-2">
                <div className="flex items-center justify-start font-bold text-[#343434] gap-4">
                  <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                    {String(data.length + 1).padStart(2, "0")}
                  </p>
                  Add New Education
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
                name={"edu_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Institution*
                </label>

                <Controller
                  name="institution"
                  control={control}
                  rules={{
                    required: "institution is required",
                    validate: {
                      minLength: (value) =>
                        value.length > 3 ||
                        "The Institution name must be more than 3 characters",
                      maxLength: (value) =>
                        value.length <= 199 ||
                        "The Institution name must not be greater than 200 characters.",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
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
                      variant="outlined"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      InputLabelProps={{
                        shrink: !!field.value,
                      }}
                      error={!!errors.institution}
                      helperText={errors.institution?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Degree*</label>

                <Controller
                  name="degree"
                  control={control}
                  rules={{
                    required: "Degree is required",
                    validate: {
                      // minLength: (value) =>
                      //   value.length > 3 ||
                      //   "Degree name must be more than 3 characters",
                      maxLength: (value) =>
                        value.length <= 199 ||
                        "Degree name must not be greater than 200 characters.",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      key={field.value || "empty"}
                      freeSolo
                      id="degree"
                      disableClearable
                      options={degrees}
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
                      getOptionLabel={(option) => option.title || ""}
                      onChange={(e, value) => {
                        field.onChange(value ? value.title : ""); // Save the degree title
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.title === value
                      } // Compare with title
                      value={
                        degrees.find(
                          (degree) => degree.title === field.value
                        ) || null
                      } // Set the correct object based on the title
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          id="outlined-basic"
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
                          variant="outlined"
                          autoComplete="on"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                            shrink: !!field.value,
                          }}
                          error={!!errors.degree}
                          helperText={errors.degree?.message}
                        />
                      )}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Field of Study*
                </label>

                <Controller
                  name="field"
                  control={control}
                  rules={{
                    required: "Field Of Study is required",
                    validate: {
                      minLength: (value) =>
                        value.length > 3 ||
                        "The Field Of Study must be more than 3 characters",
                      maxLength: (value) =>
                        value.length <= 98 ||
                        "The Field Of Study must not be greater than 100 characters",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
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
                        "& .MuiFormHelperText-root": {
                          fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                          fontSize: "14px",
                          padding: "0px",
                          margin: "0px",
                        },
                      }}
                      variant="outlined"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.length <= 99) {
                          field.onChange(e);
                        }
                      }}
                      InputLabelProps={{
                        shrink: !!field.value,
                      }}
                      error={!!errors.field}
                      helperText={errors.field?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Grade, CGPA or Percentage{" "}
                </label>

                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth error={!!errors.grade_type}>
                    <Controller
                      name="grade_type"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label=""
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
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <MenuItem value={""} defaultChecked>
                            None
                          </MenuItem>
                          <MenuItem value={"grade"} defaultChecked>
                            Grade
                          </MenuItem>
                          <MenuItem value={"cgpa"} defaultChecked>
                            Cgpa
                          </MenuItem>
                          <MenuItem value={"percentage"} defaultChecked>
                            Percentage
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {errors.grade_type && (
                      <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                        {errors.grade_type.message}
                      </p>
                    )}
                  </FormControl>
                </Box>
              </div>

              {theGradeType === "grade" && (
                <div className="flex flex-col gap-2">
                  <label className="font-Lexend text-[#A7A7A7]">Grade*</label>
                  <Box sx={{ width: "100%" }}>
                    <FormControl fullWidth error={!!errors.grade}>
                      <Controller
                        name="grade"
                        control={control}
                        rules={{
                          required: "Grade is required",
                        }}
                        defaultValue={""}
                        render={({ field }) => (
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                              "& .MuiFormHelperText-root": {
                                fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                                fontSize: "14px",
                                padding: "0px",
                                margin: "0px",
                              },
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                          >
                            <MenuItem value={""} defaultChecked>
                              Select Grade
                            </MenuItem>
                            {/* A */}
                            <MenuItem value={"A+"} defaultChecked>
                              A+
                            </MenuItem>
                            <MenuItem value={"A"} defaultChecked>
                              A
                            </MenuItem>
                            <MenuItem value={"A-"} defaultChecked>
                              A-
                            </MenuItem>
                            {/* B */}
                            <MenuItem value={"B+"} defaultChecked>
                              B+
                            </MenuItem>
                            <MenuItem value={"B"} defaultChecked>
                              B
                            </MenuItem>
                            <MenuItem value={"B-"} defaultChecked>
                              B-
                            </MenuItem>
                            {/* C */}
                            <MenuItem value={"C+"} defaultChecked>
                              C+
                            </MenuItem>
                            <MenuItem value={"C"} defaultChecked>
                              C
                            </MenuItem>
                            <MenuItem value={"C-"} defaultChecked>
                              C-
                            </MenuItem>
                            {/* D */}
                            <MenuItem value={"D+"} defaultChecked>
                              D+
                            </MenuItem>
                            <MenuItem value={"D"} defaultChecked>
                              D
                            </MenuItem>
                            <MenuItem value={"D-"} defaultChecked>
                              D-
                            </MenuItem>
                            {/* F */}
                            <MenuItem value={"F"} defaultChecked>
                              F
                            </MenuItem>
                          </Select>
                        )}
                      />
                      {errors.grade && (
                        <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                          {errors.grade.message}
                        </p>
                      )}
                    </FormControl>
                  </Box>
                </div>
              )}
              {theGradeType === "percentage" && (
                <div className="flex flex-col gap-2">
                  <label className="font-Lexend text-[#A7A7A7]">
                    Percentage* (0% | 100%)
                  </label>
                  <Controller
                    name="percentage"
                    control={control}
                    rules={{
                      required: "Percentage is required",
                      validate: (value) => {
                        const number = parseFloat(value);
                        if (isNaN(number) || number < 0 || number > 100) {
                          return "Percentage must be between 0 and 100";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        InputLabelProps={{
                          shrink: !!field.value,
                        }}
                        {...field}
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
                          "& .MuiFormHelperText-root": {
                            fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                            fontSize: "14px",
                            padding: "0px",
                            margin: "0px",
                          },
                        }}
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0, max: 100, step: 0.01 },
                        }}
                        error={!!errors.percentage}
                        helperText={errors.percentage?.message}
                      />
                    )}
                  />
                </div>
              )}
              {theGradeType === "cgpa" && (
                <div className="flex flex-col gap-2">
                  <label className="font-Lexend text-[#A7A7A7]">
                    CGPA* (0.1 | 10.0)
                  </label>
                  <Controller
                    name="cgpa"
                    control={control}
                    rules={{
                      required: "CGPA is required",
                      validate: (value) => {
                        const number = parseFloat(value);
                        if (isNaN(number) || number < 0.1 || number > 10.0) {
                          return "CGPA must be between 0.1 and 10.0";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
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
                          "& .MuiFormHelperText-root": {
                            fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                            fontSize: "14px",
                            padding: "0px",
                            margin: "0px",
                          },
                        }}
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0.1, max: 10.0, step: 0.01 },
                          shrink: !!field.value,
                        }}
                        error={!!errors.cgpa}
                        helperText={errors.cgpa?.message}
                      />
                    )}
                  />
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Start Date*
                </label>

                <div
                  className={
                    errors.end_date
                      ? "myDatePicker_edu_start_date"
                      : "myDatePicker_edu_start_date_no_error"
                  }
                >
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
                              ? "myDatePicker_edu_start_date"
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
                            value={field.value || null}
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
                      ? "myDatePicker_edu_end_date"
                      : "myDatePicker_edu_end_date_no_error"
                  }
                >
                  <Controller
                    name="end_date"
                    disabled={endDateDisable}
                    control={control}
                    rules={{
                      required: watch("currently_studying")
                        ? false
                        : "End Date is required unless Currently Studying",
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
                          value={field.value || null}
                          // maxDate={new Date()}
                          minDate={
                            watch("start_date")
                              ? new Date(
                                  new Date(watch("start_date")).setMonth(
                                    new Date(watch("start_date")).getMonth() + 1
                                  )
                                )
                              : null
                          }
                          disabled={watch("currently_studying")}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {!watch("currently_studying")
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
                  name="currently_studying"
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
                      label="Currently Studying"
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
