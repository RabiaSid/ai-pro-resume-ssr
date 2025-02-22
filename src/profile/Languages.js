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
  // languages
  const [languagesList, setLanguagesList] = useState([]);
  // levels
  const [levelsList, setLevels] = useState([]);
  const [filteredLanguagesList, setFilteredLanguagesList] = useState([]);
  const [job_positions, set_job_positions] = useState([]);
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [endDateDisable, setEndDateDisable] = useState(false);
  const country =
    allCountries.find((con) => con.id === data?.country_id)?.name || "";

  useEffect(() => {
    // show Languages
    ApiService.showLanguages(user?.token)
      .then((res) => setLanguagesList(res.data.data))
      .catch((err) => console.log(err));
    // show Languages
    ApiService.showLavels(user?.token)
      .then((res) => setLevels(res.data.data))
      .catch((err) => console.log(err));
    ApiService.showCountries()
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  useEffect(() => {
    const filteredLangs = languagesList?.filter(
      (lang) => !dataList.some((userLang) => userLang.id === lang.id)
    );

    setFilteredLanguagesList(filteredLangs);
  }, [dataList]);

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
    if (dataform.lang_id) {
      ApiService.resumeLanguageEdit(user?.token, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("lang_id", "");
          setValue("language_id", "");
          setValue("level_id", "");
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
      ApiService.resumeLanguageStore(user?.token, 0, updatedData)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          setValue("lang_id", "");
          setValue("language_id", "");
          setValue("level_id", "");
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
    setValue("lang_id", data.pivot.id);
    setValue("language_id", data.id);
    setValue("level_id", data.level[0].id);
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
        ApiService.resumeLanguageDelete(user?.token, id)
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
    setValue("lang_id", null);
    setValue("language_id", "");
    setValue("level_id", "");
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
        .post(
          global.baseurl + "/user_language/update-sort/" + exp.pivot.id,
          article,
          {
            headers,
          }
        )
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

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="flex justify-between items-center text-[#343434] font-bold mb-2">
          Languages ({String(data.length).padStart(2, "0")})
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
                                        {dat?.level[0]?.name || ""}
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
                                      onClick={() => handleDelete(dat.pivot.id)}
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
                                            Language:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.name || "Not Found"}
                                          </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                          <p className="text-[#A7A7A7] text-md">
                                            Level:
                                          </p>
                                          <p className="text-[#343434] text-sm">
                                            {dat?.level[0]?.name || "Not Found"}
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
                  Edit Language
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-2">
                <div className="flex items-center justify-start font-bold text-[#343434] gap-4">
                  <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                    {String(data.length + 1).padStart(2, "0")}
                  </p>
                  Add New Language
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
                name={"lang_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Language*</label>
                <Controller
                  name="language_id"
                  control={control}
                  rules={{
                    required: "language is required",
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      key={field.value || "empty"}
                      {...field}
                      freeSolo
                      sx={{ height: "40px" }}
                      id="language_id"
                      disableClearable
                      options={
                        field.value ? languagesList : filteredLanguagesList
                      }
                      getOptionLabel={(option) => option.name || ""}
                      onChange={(e, value) => {
                        field.onChange(value?.id || "");
                      }}
                      onInputChange={(e, value) => {
                        if (!value) {
                          field.onChange("");
                          setValue("language_id", "");
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value
                      }
                      value={
                        languagesList.find((lang) => lang.id === field.value) ||
                        null
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
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
                          autoComplete="on"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                          error={!!errors.language_id}
                          helperText={errors.language_id?.message}
                        />
                      )}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-Lexend text-[#A7A7A7]">Level*</label>
                <Controller
                  name="level_id"
                  control={control}
                  rules={{
                    required: "Level is required",
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.level_id}>
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
                        {levelsList?.map((level, idx) => (
                          <MenuItem key={idx} value={level?.id}>
                            {level?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.level_id && (
                        <p className="text-[#d32f2f] text-[14px] font-Lexend m-0">
                          {errors.level_id.message}
                        </p>
                      )}
                    </FormControl>
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
