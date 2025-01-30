import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ApiService } from "../../services/ApiService";
import { TextField } from "@mui/material";
import { useAuth } from "../../services/Auth";

export const SummaryForm = (props) => {
  const [SummaryIsUpdating, setSummaryIsUpdating] = useState(false);
  const [SummaryHasSaved, setSummaryHasSaved] = useState(false);

  const {
    setSummary,
    summaryObjectives,
    summaryObjectives2,
    resumeSummary,
    summaryId,
    profileId,
    itSaving,
    storePreviewImage,
    closeOpenForms,
  } = props;
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
  } = useForm({ mode: "onChange" });

  const [selectedSummaryObjectives, setSelectedSummaryObjectives] = useState(
    []
  );

  /////***********useEffects Section *************//////
  useEffect(() => {
    const contentSummary = selectedSummaryObjectives
      .map((item) => item.objective)
      .join(" ");

    setValue("summary", contentSummary);
  }, [selectedSummaryObjectives]);

  useEffect(() => {
    setValue("summary", resumeSummary);
    if (summaryId) {
      setValue("summaryId", summaryId);
    }
    if (profileId) {
      setValue("profileId", profileId);
    }
  }, []);

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  // ******** funtions section *******//
  // submit
  const submitSummary = (data) => {
    setSummaryHasSaved(false);
    setResumeIsUpdating(true);
    // if (formHasError) return;
    itSaving(true);
    console.log(data);

    // update or create new
    if (data.summaryId) {
      console.log("working");
      ApiService.resumeSummaryEditSubmit(
        user?.token,
        data.summary,
        data.summaryId
      )
        .then((res) => {
          console.log(res);
          itSaving(false);
          setSummaryHasSaved(true);
          storePreviewImage();
          closeOpenForms();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
        })
        .catch((err) => {
          console.log(err);
          itSaving(false);
          setResumeIsUpdating(false);
        });
    } else if (data.profileId) {
      ApiService.resumeSummarySubmit(user?.token, data)
        .then((res) => {
          console.log(res);
          itSaving(false);
          setSummaryHasSaved(true);
          storePreviewImage();
          closeOpenForms();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
        })
        .catch((err) => {
          console.log(err);
          itSaving(false);
          setResumeIsUpdating(false);
        });
    }
  };
  // handeObjectiveClick
  const handleObjectiveClick = (obj) => {
    setSelectedSummaryObjectives((prevState) => {
      if (prevState.some((item) => item.id === obj.id)) {
        return prevState.filter((item) => item.id !== obj.id);
      } else {
        return [...prevState, obj];
      }
    });
  };
  //

  const summaryDescription = watch("summary");
  useEffect(() => {
    setSummary(summaryDescription);
  }, [summaryDescription]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitSummary)}
        className="sticky top-[0.1px]"
      >
        <div className="sticky top-0 bg-white">
          <Controller
            name="summaryId"
            control={control}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <Controller
            name="profileId"
            control={control}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <Controller
            name="summary"
            control={control}
            rules={{
              required: "summary is required",
              validate: {
                minLength: (value) =>
                  value.trim().split(/\s+/).length >= 10 ||
                  "The Summary must be at least 10 words",
                maxLength: (value) =>
                  value.trim().split(/\s+/).length <= 150 ||
                  "The Summary must be at most 150 words",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="filled-multiline-static"
                label="Summary*"
                rows={4}
                multiline
                className="w-full"
                InputLabelProps={{ shrink: Boolean(field.value) }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.summary}
                helperText={errors.summary?.message}
              />
            )}
          />
        </div>
        <div className="w-full bg-white">
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
      <div className="h-[300px] overflow-auto p-4">
        <ul className="flex flex-col gap-4">
          {summaryObjectives?.map((obj, idx) => (
            <li
              key={obj.id}
              className={
                selectedSummaryObjectives.some((item) => item.id === obj.id)
                  ? "selected"
                  : ""
              }
            >
              <div
                className={`border cursor-pointer p-2 select-none rounded-md flex ${
                  selectedSummaryObjectives.some((item) => item.id === obj.id)
                    ? "border-primary-green bg-primary-green text-white"
                    : ""
                }`}
                onClick={() => {
                  handleObjectiveClick(obj);
                }}
              >
                <div className={`flex-1`}>
                  <span className="">{obj.objective}</span>
                </div>
              </div>
            </li>
          ))}
          {summaryObjectives2?.map((obj, idx) => (
            <li
              key={obj.id}
              className={
                selectedSummaryObjectives.some((item) => item.id === obj.id)
                  ? "selected"
                  : ""
              }
            >
              <div
                className={`border cursor-pointer p-2 select-none rounded-md flex ${
                  selectedSummaryObjectives.some((item) => item.id === obj.id)
                    ? "border-primary-green bg-primary-green text-white"
                    : ""
                }`}
                onClick={() => {
                  handleObjectiveClick(obj);
                }}
              >
                <div className={`flex-1`}>
                  <span className="">{obj.objective}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
