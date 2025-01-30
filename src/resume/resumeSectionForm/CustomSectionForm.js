import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useAuth } from "../../services/Auth";
import ToggleSwitch from "../../components/ToggleSwitch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaRegEye, FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { LiaArrowsAltSolid } from "react-icons/lia";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor's CSS

const CertificatesForm = (props) => {
  const {
    customSectionList,
    resumeId,
    reloadTheData,
    isSeving,
    resume_sections,
    updateResumeSection,
  } = props;
  const { user } = useAuth();
  const [customSectionList2, setCustomSectionList2] = useState([]);

  useEffect(() => {
    setCustomSectionList2(customSectionList);
  }, [customSectionList]);

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
  } = useForm({ mode: "onChange" });
  //   states
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEducationFormNew = () => {
    setValue("id", null);
    setIsFormOpen(true);
  };

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);
  const [isShow, setIsShow] = useState(1);

  const submit = (data) => {
    console.log(data);
    isSeving(true);
    setResumeIsUpdating(true);
    if (data.id) {
      ApiService.resumeCustomSectionEdit(user?.token, data, "edit", isShow)
        .then((res) => {
          isSeving(false);
          reloadTheData();
          setValue("id", "");
          setValue("title", "");
          setValue("detail", "");
          setIsFormOpen(false);
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          setIsShow(1);
        })
        .catch((err) => {
          isSeving(false);
          console.log(err);
          setResumeIsUpdating(false);
        });
    } else {
      ApiService.resumeCustomSectionStore(user?.token, resumeId, data, isShow)
        .then((res) => {
          console.log(res);
          reloadTheData();
          isSeving(false);
          setValue("id", "");
          setValue("title", "");
          setValue("sort", "");
          setValue("detail", "");
          setIsFormOpen(false);
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          setIsShow(1);
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
    setIsShow(data.is_show);
    setValue("id", data.id);
    setValue("title", data.title);
    setValue("sort", data.sort);
    setValue("is_show", data.is_show);
    setValue("detail", data.detail);
    setIsFormOpen(true);
  };

  const handleShows = (data) => {
    setIsShow(data.is_show);
    setResumeIsUpdating(true);
    ApiService.resumeCustomSectionEdit(user?.token, data, "show", isShow)
      .then((res) => {
        isSeving(false);
        reloadTheData();
        setValue("id", "");
        setValue("title", "");
        setValue("detail", "");
        setIsFormOpen(false);
        setResumeIsUpdating(false);
        setResumeHasSaved(false);
        setIsShow(1);
      })
      .catch((err) => {
        isSeving(false);
        console.log(err);
        setResumeIsUpdating(false);
      });
  };

  const handleDelete = (id) => {
    setIsFormOpen(false);
    ApiService.resumeCustomSectionDelete(user?.token, id)
      .then((res) => {
        console.log(res.data);
        reloadTheData();
        setIsFormOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDragEnd = (result) => {
    console.log("asdsds");
    console.log(result);
    if (!result.destination) return;
    isSeving(true);

    const reorderedItems = Array.from(customSectionList2);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setCustomSectionList2(reorderedItems);
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
          global.baseurl + "/custom_details/update-sort/" + exp.id,
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
          isSeving(false);
        });
      //console.log(exp.id+' -- '+parseInt(index+1))
    });
  };

  // const handlePaste = (event) => {
  //   const clipboardData = event.clipboardData || window.clipboardData;
  //   if (clipboardData) {
  //     const items = clipboardData.items;
  //     for (let i = 0; i < items.length; i++) {
  //       if (items[i].type.indexOf("image") !== -1) {
  //         event.preventDefault(); // Prevent the paste if an image is detected
  //         alert("Pasting images is not allowed.");
  //         break;
  //       }
  //     }
  //   }

  // };

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

  const editorRef = useRef(null);

  return (
    <>
      <div className="relative">
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer font-lexend text-base">
            {resumeIsUpdating ? "Saving..." : ""}
          </div>
          <div className="font-lexend text-base flex gap-1 justify-end items-center mr-1">
            <span className="m-0">Add</span>
            <button
              className="underline italic !mt-0 !mb-0 hover:text-primary-blue"
              style={{ margin: "0 !important" }}
              onClick={handleEducationFormNew}
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
                  {customSectionList2?.map((item, idx) => (
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
                            <div className="font-semibold font-Lexend text-sm truncate ... w-[110px] sm:w-[360px] lg:[360px]">
                              {item.title}
                            </div>
                          </div>
                          {/* actions */}
                          <div className="flex items-center gap-1">
                            {item.is_show === 1 ? (
                              <button
                                className="bg-primary-green text-white text-lg flex justify-center items-center rounded-md w-[30px] h-[30px]"
                                onClick={() => handleShows(item)}
                              >
                                <FaRegEye />
                              </button>
                            ) : (
                              <button
                                className="bg-primary-green text-white text-lg flex justify-center items-center rounded-md w-[30px] h-[30px]"
                                onClick={() => handleShows(item)}
                              >
                                <FaRegEyeSlash />
                              </button>
                            )}

                            <button
                              className="bg-primary-blue text-white text-lg flex justify-center items-center rounded-md w-[30px] h-[30px]"
                              onClick={() => handleEdit(item)}
                            >
                              <GoPencil />
                            </button>
                            <button
                              className="bg-red-500 text-white text-lg rounded-md flex justify-center items-center w-[30px] h-[30px]"
                              onClick={() => handleDelete(item.id)}
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
            <div className="flex flex-col gap-8 mt-4 border-t">
              <span className="text-lg font-semibold font-Lexend">
                Add New Custom Section
              </span>
              {/* is editing id */}
              <Controller
                name={"id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              <Controller
                name={"sort"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />

              {/* institution */}
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Title is required",
                  validate: {
                    minLength: (value) =>
                      value.length >= 3 ||
                      "The Title must be at least 3 characters",
                    maxLength: (value) =>
                      value.length <= 14 ||
                      "The Title must be at most 15 characters",
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Custom Title*"
                    variant="outlined"
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value.length <= 15) {
                        field.onChange(e);
                      }
                    }}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <Controller
                name="detail"
                control={control}
                rules={{
                  required: "Description is required",
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
                    <label
                      htmlFor="detail"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Description*
                    </label>
                    <SunEditor
                      setContents={field.value} // Set the initial content of the editor
                      onChange={(content) => {
                        field.onChange(content);
                        const textOnly = content.replace(/<[^>]*>/g, "").trim();
                        if (!textOnly) {
                          field.onChange("");
                          setValue("detail", "");
                        }
                        handlePaste();
                      }}
                      setOptions={{
                        height: 200, // Set the height of the editor
                        placeholder: "Enter the description here...",
                        buttonList: [
                          ["bold", "underline", "italic", "strike"],
                          ["list"],
                        ], // Customize the toolbar buttons as needed
                        onImageUpload: (
                          targetImgElement,
                          index,
                          state,
                          imageInfo,
                          remainingFilesCount
                        ) => {
                          // Prevent image uploads
                          return false;
                        },
                      }}
                      getSunEditorInstance={(editor) => {
                        editorRef.current = editor;
                      }}
                    />
                    {errors.detail && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.detail.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <ToggleSwitch
                status={isShow}
                ChangeStatus={(status) => setIsShow(status ? 1 : 0)}
              />
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
    </>
  );
};

export default CertificatesForm;
