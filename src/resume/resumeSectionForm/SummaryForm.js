import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ApiService } from "../../services/ApiService";
import { TextField } from "@mui/material";
import { useAuth } from "../../services/Auth";
import AiModal from "../../components/shared-components/ai_modal/AiModal";
import SunEditor from "suneditor-react";

export const SummaryForm = (props) => {
  const [SummaryIsUpdating, setSummaryIsUpdating] = useState(false);
  const [SummaryHasSaved, setSummaryHasSaved] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [suggestionForAi, setSuggestionForAi] = useState([]);

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
    userJobTitle,
  } = props;
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });

  const [selectedSummaryObjectives, setSelectedSummaryObjectives] = useState(
    []
  );
  const summaryRef = useRef(null);

  useEffect(() => {
    const summaryValue = watch("summary");
    if (summaryValue === "") {
      setSelectedSummaryObjectives([]);
    }
  }, [watch("summary")]);

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

    // update or create new
    if (data.summaryId) {
      ApiService.resumeSummaryEditSubmit(
        user?.token,
        data.summary,
        data.summaryId
      )
        .then((res) => {
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
    if (summaryDescription) {
      setSummary(summaryDescription);
    }
  }, [summaryDescription]);

  useEffect(() => {
    summaryObjectives?.forEach((sug) => {
      setSuggestionForAi((prev) => {
        const alreadyExists = prev.some(
          (item) => item.id === sug?.pivot?.objective_id
        );
        if (!alreadyExists) {
          return [
            ...prev,
            { id: sug?.pivot?.objective_id, suggestion: sug?.detail },
          ];
        }
        return prev;
      });
    });
  }, [summaryObjectives]);

  const customToolbar = [
    ["undo", "redo"],
    ["bold", "italic", "underline"],
  ];

  const getSunEditorInstance = (sunEditor) => {
    summaryRef.current = sunEditor;
    sunEditor.core.context.element.wysiwyg.setAttribute("spellcheck", "false");
  };

  return (
    <>
      {aiModal ? (
        <AiModal
          open={aiModal}
          handleClose={() => setAiModal(false)}
          suggestionsList={suggestionForAi}
          handleSave={(data) => setValue("summary", data)}
          modalType={["Spell", "Suggestions"]}
          initialContent={getValues("summary") || ""}
          searcher="spell"
          maxLength={1000}
          userJobTitle={userJobTitle}
        />
      ) : (
        <></>
      )}
      <form
        onSubmit={handleSubmit(submitSummary)}
        className="sticky top-[-5px]"
      >
        <div className="bg-white pt-5 sticky -top-1">
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
            // rules={{
            //   required: "Summary is required",
            //   validate: {
            //     minLength: (value) =>
            //       value.trim().length >= 50 ||
            //       "The Summary must be at least 50 characters",
            //     maxLength: (value) =>
            //       value.trim().length <= 1000 ||
            //       "The Summary must be at most 1000 characters",
            //   },
            // }}
            render={({ field }) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Summary*
                </label>
                <div className="relative">
                  <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    setContents={field.value || ""}
                    onChange={(newContent) => {
                      field.onChange(newContent);
                    }}
                    setOptions={{
                      frameAttributes: {
                        spellcheck: "false",
                      },
                      buttonList: customToolbar,
                      strictMode: false,
                      height: "400px",
                      maxCharCount: 1000,
                      resizeEnable: false,
                    }}
                    setDefaultStyle="font-size: 20px;"
                    placeholder="Type Here...."
                  />
                  {errors.summary && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.summary.message}
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
                      className=""
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
              </>
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
      {/* <div className="h-[300px] p-4">
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
      </div> */}
    </>
  );
};
