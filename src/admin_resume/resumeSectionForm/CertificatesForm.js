import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useAuth } from "../../services/Auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { LiaArrowsAltSolid } from "react-icons/lia";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor's CSS

const CertificatesForm = (props) => {
  const {
    userCertificatesList,
    resumeId,
    reloadTheData,
    isSeving,
    resume_sections,
    updateResumeSection,
  } = props;
  const { user } = useAuth();
  const [certificatesList, setCertificatesList] = useState([]);

  useEffect(() => {
    setCertificatesList(userCertificatesList);
  }, [userCertificatesList]);

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm({ mode: "onChange" });
  //   states
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEducationFormNew = () => {
    setValue("certificate_id", null);
    setIsFormOpen(true);
  };

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  const submit = (data) => {
    console.log(data);
    isSeving(true);
    setResumeIsUpdating(true);
    if (data.certificate_id) {
      ApiService.resumeCertificateEdit(user?.token, data)
        .then((res) => {
          isSeving(false);
          reloadTheData();
          setValue("certificate_id", "");
          setValue("title", "");
          setValue("institute", "");
          setValue("date", "");
          setValue("description", "");
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
      ApiService.resumeCertificateStore(user?.token, resumeId, data)
        .then((res) => {
          console.log(res);
          reloadTheData();
          isSeving(false);
          setValue("certificate_id", "");
          setValue("title", "");
          setValue("institute", "");
          setValue("date", "");
          setValue("description", "");
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
    setValue("certificate_id", data.id);
    setValue("title", data.title);
    setValue("institute", data.institute);
    setValue("date", data.date);
    setValue("description", data.description);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setIsFormOpen(false);
    ApiService.resumeCertificateDelete(user?.token, id)
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

    const reorderedItems = Array.from(certificatesList);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setCertificatesList(reorderedItems);
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
        .post(global.baseurl + "/certificate/update-sort/" + exp.id, article, {
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

  // Section Hide/show
  const [isShow, setIsShow] = useState(0);

  useEffect(() => {
    if (resume_sections) {
      setIsShow(resume_sections.show_certificates);
    }
  }, [resume_sections]);

  return (
    <>
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
                  {certificatesList?.map((item, idx) => (
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
                            <div className="font-semibold font-Lexend text-base truncate ... w-[110px] sm:w-[360px] lg:[360px]">
                              {item.title}
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
                Add New Certificate
              </span>
              {/* is editing id */}
              <Controller
                name={"certificate_id"}
                control={control}
                render={({ field }) => <input {...field} type="hidden" />}
              />
              {/* institution */}
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Certificate Title is required",
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Certificate Title*"
                    variant="outlined"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              {/* Authorization Body */}
              <Controller
                name="institute"
                control={control}
                rules={{
                  required: "Authorization Body is required",
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Authorization Body*"
                    variant="outlined"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.institute}
                    helperText={errors.institute?.message}
                  />
                )}
              />
              {/*  date */}
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "Issue Date is required",
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    id="outlined-basic"
                    label="Issue Date*"
                    variant="outlined"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />

              {/* description */}
              {/* <Controller
                name="description"
                control={control}
                rules={{
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters Required",
                  },
                  maxLength: {
                    value: 200,
                    message: "Box only Content 200 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="filled-multiline-static"
                    label={`description (${
                      watch("description")?.length === undefined
                        ? 0
                        : watch("description")?.length
                    }/200)`}
                    rows={4}
                    multiline
                    className="w-full"
                    InputLabelProps={{ shrink: Boolean(field.value) }}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              /> */}

              <Controller
                name="description"
                control={control}
                rules={{
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                  maxLength: {
                    value: 200,
                    message: "Maximum 200 characters Limit",
                  },
                }}
                render={({ field }) => (
                  <div className="w-full">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Description
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
                        height: 200, // Set the height of the editor
                        placeholder: "Enter the description here...",
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
