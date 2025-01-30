import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { ApiService } from "../../services/ApiService";
import { useAuth } from "../../services/Auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { LiaArrowsAltSolid } from "react-icons/lia";

const LanguageForm = (props) => {
  const {
    userLanguagesList,
    languagesList,
    levelsList,
    resumeId,
    reloadTheData,
    isSeving,
    resume_sections,
    updateResumeSection,
  } = props;

  const { user } = useAuth();
  const [languagesList2, setLanguagesList2] = useState([]);

  useEffect(() => {
    setLanguagesList2(userLanguagesList);
    console.log(userLanguagesList);
  }, [userLanguagesList]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEducationFormNew = () => {
    setValue("lang_id", null);
    setIsFormOpen(true);
  };

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  const submit = (data) => {
    console.log(data);
    isSeving(true);
    setResumeIsUpdating(true);
    if (data.lang_id) {
      ApiService.resumeLanguageEdit(user?.token, data)
        .then((res) => {
          console.log(res.data);
          isSeving(false);
          reloadTheData();
          setValue("language_id", "");
          setValue("level_id", "");
          setIsFormOpen(false);
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
        })
        .catch((err) => {
          isSeving(false);
          console.log(err);
          setResumeIsUpdating(false);
        });
    } else {
      ApiService.resumeLanguageStore(user?.token, resumeId, data)
        .then((res) => {
          console.log(res);
          reloadTheData();
          isSeving(false);
          setValue("language_id", "");
          setValue("level_id", "");
          setIsFormOpen(false);
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

  const handleEdit = (data) => {
    console.log(data);
    setValue("lang_id", data.pivot.id);
    setValue("language_id", data.id);
    setValue("level_id", data.level.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setIsFormOpen(false);
    ApiService.resumeLanguageDelete(user?.token, id)
      .then((res) => {
        console.log(res.data);
        reloadTheData();
        setIsFormOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    isSeving(true);

    const reorderedItems = Array.from(languagesList2);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setLanguagesList2(reorderedItems);
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
          global.baseurl + "/user_language/update-sort/" + exp.id,
          article,
          {
            headers,
          }
        )
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

  const [isShow, setIsShow] = useState(0);

  useEffect(() => {
    if (resume_sections) {
      setIsShow(resume_sections.show_languages);
    }
  }, [resume_sections]);

  return (
    <>
      {/* List */}
      <ul className="flex flex-col gap-2 py-2">
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

          <div className="font-lexend text-base flex gap-1 justify-end items-center mr-1">
            <span className="m-0">Add</span>
            <button
              className="underline italic !mt-0 !mb-0"
              style={{ margin: "0 !important" }}
              onClick={handleEducationFormNew}
            >
              New
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-2"
              >
                {languagesList2?.map((item, idx) => (
                  <Draggable key={idx} draggableId={String(idx)} index={idx}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex justify-between items-center gap-4 border rounded-lg h-[60px] w-full p-4"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div>
                            <LiaArrowsAltSolid size={18} />
                          </div>
                          <div className="text-muted text-sm sm:text-base">
                            {idx + 1}
                          </div>
                          <div className="font-semibold font-Lexend text-sm sm:text-base ">
                            {item.name}
                            <span className="text-xs sm:text-sm text-muted font-normal">{` (${item.level.name})`}</span>
                          </div>
                        </div>
                        {/* actions */}
                        <div className="flex items-center gap-4">
                          <button
                            className="bg-primary-blue text-white text-xl flex justify-center items-center rounded-md w-[40px] h-[40px]"
                            onClick={() => handleEdit(item)}
                          >
                            <GoPencil />
                          </button>
                          <button
                            className="bg-red-500 text-white text-lg rounded-md flex justify-center items-center w-[40px] h-[40px]"
                            onClick={() => handleDelete(item.pivot.id)}
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
      {isFormOpen && (
        <form onSubmit={handleSubmit(submit)}>
          <div className="h-full flex flex-col gap-8">
            {/* is editing id */}
            <Controller
              name={"lang_id"}
              control={control}
              render={({ field }) => <input {...field} type="hidden" />}
            />
            {/* Language */}
            <Controller
              name="language_id"
              control={control}
              rules={{
                required: "language is required",
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  sx={{ height: "40px" }}
                  id="language_id"
                  disableClearable
                  options={languagesList}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(e, value) => {
                    field.onChange(value?.id || ""); // Save the degree ID
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value} // Compare with ID
                  value={
                    languagesList.find((degree) => degree.id === field.value) ||
                    null
                  } // Set the correct object based on the ID
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Language*"
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
            {/* Levels */}
            <Controller
              name="level_id"
              control={control}
              rules={{
                required: "Level required",
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  sx={{ height: "40px" }}
                  id="level_id"
                  disableClearable
                  options={levelsList}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(e, value) => {
                    field.onChange(value?.id || ""); // Save the degree ID
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value} // Compare with ID
                  value={
                    levelsList.find((degree) => degree.id === field.value) ||
                    null
                  } // Set the correct object based on the ID
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Level"
                      autoComplete="on"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      error={!!errors.Level}
                      helperText={errors.Level?.message}
                    />
                  )}
                />
              )}
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
          </div>
        </form>
      )}
    </>
  );
};

export default LanguageForm;
