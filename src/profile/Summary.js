import React, { useEffect, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { ApiService } from "../services/ApiService";
import { useAuth } from "../services/Auth";
import { TbLoader3 } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import AiModal from "../components/shared-components/ai_modal/AiModal";
import SunEditor from "suneditor-react";

function Summary({ data, summaryObjectives, reload }) {
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });
  const [edit_mode, set_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [suggestionForAi, setSuggestionForAi] = useState([]);

  const summaryDescription = watch("summary");
  useEffect(() => {
    summaryObjectives?.map((sug) => {
      setSuggestionForAi((prev) => [
        ...prev,
        { id: sug?.pivot?.id, suggestion: sug?.detail },
      ]);
    });
    //setSummary(summaryDescription);
  }, [summaryDescription]);

  const customToolbar = [
    ["undo", "redo"],
    ["bold", "italic", "underline"],
  ];

  useEffect(() => {
    setValue("summary", data ? data.description : "");
  }, [data]);

  const submitSummary = (dataform) => {
    set_loader_mode(true);
    if (data) {
      ApiService.resumeSummaryEditSubmit(user?.token, dataform.summary, data.id)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          reload();
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    } else {
      ApiService.resumeSummarySubmit(user?.token, dataform)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          reload();
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    }
  };

  const summaryRef = useRef(null);

  const getSunEditorInstance = (sunEditor) => {
    summaryRef.current = sunEditor;
    sunEditor.core.context.element.wysiwyg.setAttribute("spellcheck", "false");
  };

  return (
    <div className="mt-4 font-Lexend">
      {aiModal ? (
        <AiModal
          open={aiModal}
          handleClose={() => setAiModal(false)}
          suggestionsList={suggestionForAi}
          handleSave={(data) => setValue("summary", data)}
          modalType={["Spell", "Suggestions"]}
          initialContent={getValues("summary") || ""}
          maxLength={1000}
          searcher="spell"
        />
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(submitSummary)}>
        <div className="flex justify-between items-center text-[#A7A7A7] mb-2">
          Summary:
          {edit_mode ? (
            <RxCrossCircled
              size={24}
              className="text-[red] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          ) : (
            <FaPencil
              className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          )}
        </div>
        {edit_mode ? (
          <div className="flex flex-wrap justify-center w-full">
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
                  <div className="relative w-full">
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
                      <p className="mt-1 text-sm text-red-600 break-all">
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
                    </div>
                  </div>
                </>
              )}
            />

            {loader_mode ? (
              <button
                type="button"
                className="flex justify-center items-center bg-[#1877F2] text-md text-white rounded-full mt-4 px-6 py-1"
              >
                <TbLoader3 className="mr-2 animate-spin" /> Saving...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#1877F2] hover:bg-[#343434] text-md text-white rounded-full mt-4 px-6 py-1"
              >
                Save
              </button>
            )}
          </div>
        ) : (
          <p
            className="text-[#343434] text-sm break-all"
            dangerouslySetInnerHTML={{
              __html: data?.description || "No Record Found",
            }}
          ></p>
        )}
      </form>
    </div>
  );
}

export default Summary;
