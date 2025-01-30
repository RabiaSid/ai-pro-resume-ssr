import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
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
import { LiaArrowsAltSolid } from "react-icons/lia";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";

const EducationForm = (props) => {
  const { userEducationsList, resumeId, degreesList, reloadTheData, isSeving } =
    props;

  const { user } = useAuth();
  const [educationList, setEducationList] = useState([]);
  useEffect(() => {
    setEducationList(userEducationsList);
  }, [userEducationsList]);
  const [endDateDisable, setEndDateDisable] = useState(false);
  const [startMinDate, setStartMinDate] = useState(null);

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
  const [currentlyStudying, setCurrentlyStudying] = useState();
  const [isEduFormIsOpen, setIsEduFormOpen] = useState(false);
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

  useEffect(() => {
    setCurrentlyStudying(c_styding);
    if (c_styding) {
      setValue("end_date", "");
    }
  }, [c_styding]);

  const handleEducationFormNew = () => {
    setValue("edu_id", null);
    setValue("institution", "");
    setValue("degree", "");
    setValue("field", "");
    setValue("grade_type", "");
    setValue("start_date", "");
    setValue("end_date", "");
    setValue("currently_studying", "");
    setIsEduFormOpen(true);
  };

  const [formErro, setFormError] = useState("");
  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);
  const submit = (data) => {
    isSeving(true);
    setFormError("");
    setResumeIsUpdating(true);

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
      ...data,
      start_date: formatDate(data.start_date),
      end_date: data.currently_working ? null : formatDate(data.end_date),
    };
    if (data.edu_id) {
      ApiService.resumeEducationEdit(user?.token, updatedData)
        .then((res) => {
          isSeving(false);
          reloadTheData();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          setValue("edu_id", "");
          setValue("institution", "");
          setValue("degree", "");
          setValue("field", "");
          setValue("grade_type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_studying", "");
          setIsEduFormOpen(false);
        })
        .catch((err) => {
          isSeving(false);
          setResumeIsUpdating(false);
          console.log(err);
          setFormError(err.response.data.message);
        });
    } else {
      ApiService.resumeEducationStore(user?.token, resumeId, updatedData)
        .then((res) => {
          reloadTheData();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          isSeving(false);
          setValue("edu_id", "");
          setValue("institution", "");
          setValue("degree", "");
          setValue("field", "");
          setValue("grade_type", "");
          setValue("start_date", "");
          setValue("end_date", "");
          setValue("currently_studying", "");
          setIsEduFormOpen(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setFormError(err.response.data.message);
          isSeving(false);
          setResumeIsUpdating(false);
        });
    }
  };

  const handleEdit = (data) => {
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
    setIsEduFormOpen(true);
  };

  const handleDelete = (id) => {
    ApiService.resumeEducationDelete(user?.token, id)
      .then((res) => {
        reloadTheData();
        setIsEduFormOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    isSeving(true);

    const reorderedItems = Array.from(educationList);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setEducationList(reorderedItems);

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    reorderedItems?.map((exp, index) => {
      const article = {
        sort: parseInt(index + 1),
      };
      axios
        .post(global.baseurl + "/education/update-sort/" + exp.id, article, {
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
    });
  };
  useEffect(() => {
    if (watch("start_date")) setValue("end_date");
  }, [watch("start_date")]);

  console.log("erros:", errors);
  return (
    <>
      <div className="relative">
        <div className=" font-lexend text-base flex gap-1 justify-end items-center mr-1">
          <span className="m-0">Add</span>
          <button
            className="underline italic !mt-0 !mb-0"
            style={{ margin: "0 !important" }}
            onClick={handleEducationFormNew}
          >
            New
          </button>
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
                  {educationList?.map((edu, idx) => (
                    <Draggable key={idx} draggableId={String(idx)} index={idx}>
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
                            <div className="text-muted text-sm">{idx + 1}</div>
                            <div className="font-semibold leading-none font-Lexend text-base truncate ... w-[110px] sm:w-[360px] lg:[360px]">
                              <h3 className="m-0 truncate ...">{edu.field}</h3>
                              <span className="text-xs text-muted truncate ...">
                                {edu?.institution}
                              </span>
                            </div>
                          </div>
                          {/* actions */}
                          <div className="flex items-center gap-4">
                            <button
                              className="bg-primary-blue text-white text-xl flex justify-center items-center rounded-md w-[40px] h-[40px]"
                              onClick={() => handleEdit(edu)}
                            >
                              <GoPencil />
                            </button>
                            <button
                              className="bg-red-500 text-white text-lg rounded-md flex justify-center items-center w-[40px] h-[40px]"
                              onClick={() => handleDelete(edu.uuid)}
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
        {/* form */}
        {isEduFormIsOpen && (
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-8 mt-4 border-t">
              <span className="text-lg font-semibold font-Lexend">
                Add New Education
              </span>
              {/* is editing id */}
              <Controller
                name={"edu_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              {/* institution */}
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
                    label="Institution*"
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

              <div className="h-full">
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
                      sx={{ height: "40px" }}
                      id="degree"
                      disableClearable
                      options={degreesList}
                      getOptionLabel={(option) => option.title || ""}
                      onChange={(e, value) => {
                        field.onChange(value ? value.title : ""); // Save the degree title
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.title === value
                      } // Compare with title
                      value={
                        degreesList.find(
                          (degree) => degree.title === field.value
                        ) || null
                      } // Set the correct object based on the title
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Degree*"
                          id="outlined-basic"
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

              {/* field of study */}
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
                    label="Field Of Study*"
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
              {/* grade_type */}
              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth error={!!errors.grade_type}>
                  <InputLabel
                    id="demo-simple-select-label"
                    shrink={!!watch("grade_type")}
                  >
                    GRADE, CGPA OR PERCENTAGE (%)
                  </InputLabel>
                  <Controller
                    name="grade_type"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="GRADE, CGPA OR PERCENTAGE (%)"
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
                    <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                      {errors.grade_type.message}
                    </p>
                  )}
                </FormControl>
              </Box>
              {theGradeType === "grade" && (
                <>
                  <Box sx={{ width: "100%" }}>
                    <FormControl fullWidth error={!!errors.grade}>
                      <InputLabel
                        id="demo-simple-select-label"
                        shrink={!!watch("grade")}
                      >
                        Grade*
                      </InputLabel>
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
                            label="Select Grade*"
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
                        <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                          {errors.grade.message}
                        </p>
                      )}
                    </FormControl>
                  </Box>
                </>
              )}
              {theGradeType === "percentage" && (
                <>
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
                        label="Percentage* (0% | 100%)"
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0, max: 100, step: 0.01 },
                        }}
                        error={!!errors.percentage}
                        helperText={errors.percentage?.message}
                        sx={{ width: "100%" }}
                      />
                    )}
                  />
                </>
              )}
              {theGradeType === "cgpa" && (
                <>
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
                        label="CGPA* (0.1 | 10.0)"
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: { min: 0.1, max: 10.0, step: 0.01 },
                          shrink: !!field.value,
                        }}
                        error={!!errors.cgpa}
                        helperText={errors.cgpa?.message}
                        sx={{ width: "100%" }}
                      />
                    )}
                  />
                </>
              )}

              {/* start date end date */}

              <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center w-full">
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
                            label="Start Date*"
                            views={["year", "month"]}
                            value={field.value || null}
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
                          label="End Date*"
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
                        <p className="text-[#d32f2f] text-[0.75rem] Roboto mt-[3px] ml-[12px]">
                          {errors.end_date?.message}
                        </p>
                      )
                    : ""}
                </div>
              </div>

              {/* currently_studying */}
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
                    />
                  )}
                />
              </FormGroup>
            </div>
            <span className="text-red-500">{formErro}</span>
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
    </>
  );
};

export default EducationForm;
