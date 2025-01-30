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
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor's CSS

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
  const [job_positions, set_job_positions] = useState([]);
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
  }, [data]);

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
        return "";
      }

      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}`;
    };
    const updatedData = {
      ...dataform,
      date: formatDate(dataform.date),
    };
    if (dataform.award_id) {
      ApiService.resumeAwardsEdit(user?.token, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("award_id", "");
          setValue("title", "");
          setValue("institute", "");
          setValue("date", "");
          setValue("description", "");
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
      ApiService.resumeAwardstore(user?.token, 0, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("award_id", "");
          setValue("title", "");
          setValue("institute", "");
          setValue("date", "");
          setValue("description", "");
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
    setValue("award_id", data.id);
    setValue("title", data.name);
    setValue("institute", data.body);
    const parsedDate = data.date
      ? parse(data.date, "yyyy-MM-dd", new Date())
      : null;
    setValue("date", parsedDate);
    // setValue("date", data.date);
    setValue("description", data.description);
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
        ApiService.resumeAwardsDelete(user?.token, id)
          .then((res) => {
            reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDataFormNew = () => {
    set_add_mode(true);
    set_edit_mode(true);
    setValue("award_id", null);
    setValue("title", "");
    setValue("institute", "");
    setValue("date", "");
    setValue("description", "");
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
        .post(global.baseurl + "/award/update-sort/" + exp.id, article, {
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
    // Remove all elements with the class "se-image-container"
    var imageContainers = document.getElementsByClassName("se-image-container");
    // Convert HTMLCollection to an array and remove each div
    Array.from(imageContainers).forEach((div) => div.remove());

    // Clear styles of all elements with the class "sun-editor-editable" (note: corrected class selector)
    var editableDivs = document.getElementsByTagName("span");
    // Convert HTMLCollection to an array and clear styles for each div
    Array.from(editableDivs).forEach((span) => {
      span.style.cssText = ""; // Clears all inline styles
    });
  };

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center text-[#343434] font-bold mb-2">
          Awards ({String(data.length).padStart(2, "0")})
          {edit_mode ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
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
                                        {dat?.name || ""}
                                      </p>
                                      <p className="text-[#A7A7A7] text-sm">
                                        {dat?.body || ""}
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
                                            Award Title:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.name || "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Authorization Body:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.body || "Not Found"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Award Description:
                                          </p>
                                          <p
                                            className="text-[#343434] text-sm"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                dat?.description || "Not Found",
                                            }}
                                          ></p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Issue Date:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {formattedDate2(dat?.date) ||
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
                  Edit Award
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-2">
                <div className="flex items-center justify-start font-bold text-[#343434] gap-4">
                  <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                    {String(data.length + 1).padStart(2, "0")}
                  </p>
                  Add New Award
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
                name={"award_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Award Title*
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Award Title is required",
                    validate: {
                      minLength: (value) =>
                        value.length >= 3 ||
                        "The Award Title must be at least 3 characters",
                      maxLength: (value) =>
                        value.length <= 100 ||
                        "The Award Title must be at most 100 characters",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
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
                        const { value } = e.target;
                        if (value.length <= 100) {
                          field.onChange(e);
                        }
                      }}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">
                  Authorization Body*
                </label>
                <Controller
                  name="institute"
                  control={control}
                  rules={{
                    required: "Authorization Body is required",
                    validate: {
                      maxLength: (value) =>
                        value.length <= 199 ||
                        "Authorization text must not be greater than 200 characters.",
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
                        field.onChange(e);
                      }}
                      error={!!errors.institute}
                      helperText={errors.institute?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">

                  Award Details

                </label>

                <Controller
                  name="description"
                  control={control}
                  rules={{
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Maximum 1000 characters Limit",
                    },
                  }}
                  render={({ field }) => (
                    <div className="w-full">
                      <SunEditor
                        setContents={field.value} // Set the initial content of the editor
                        onChange={(content) => {
                          field.onChange(content);
                        }}
                        onBlur={() => {
                          field.onBlur();
                          handlePaste();
                        }}
                        setOptions={{
                          height: 200, // Set the height of the editor
                          buttonList: [
                            ["bold", "underline", "italic", "strike"],
                            ["list"],
                          ], // Customize the toolbar buttons as needed
                        }}
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Issue Date</label>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
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
                      )}
                    />
                  </LocalizationProvider>
                  {errors.date && (
                    <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                      {errors.date?.message}
                    </p>
                  )}
                </div>
              </div>
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
