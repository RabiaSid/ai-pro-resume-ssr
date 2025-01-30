import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Controller, useForm } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

const animatedComponents = makeAnimated();

const CreateExSuggestion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(null);
  const [jobPositions, setJobPositions] = useState([]);
  const [jobPositionsList, setJobPositionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [suggestionListAI, setSuggestionListAI] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

  const generateSuggestion = (e) => {
    e.preventDefault();
    setIsListLoading(true);
    const positionsArray = jobPositions;
    const data = {
      job_title: positionsArray.label,
    };

    ApiService.createJobDescriptionSuggestion(user?.token, data)
      .then((res) => {
        setSuggestionListAI(res?.data?.data?.summary);
        setIsListLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsListLoading(false);
      });
  };

  const handleCreateSuggestion = (e) => {
    e.preventDefault();

    const selected = Object.keys(selectedSuggestions).filter(
      (key) => selectedSuggestions[key]
    );

    if (selected.length === 0) {
      swal("Please select at least one suggestion", { icon: "warning" });
      return;
    }

    const detail = selected.reduce((acc, suggestion, index) => {
      acc[`detail[${index}]`] = suggestion;
      return acc;
    }, {});

    console.log("Mapped Suggestions:", detail);

    const positionsArray = jobPositions;

    console.log(detail, "111kch likho comment m");

    const detailArray = Object.values(detail).filter(
      (value, index) => index >= 0
    );

    const data = {
      detail: detailArray,
      job_position_ids: positionsArray.value,
    };
    console.log(detailArray, "detailArraydetailArraydetailArray-------------");

    // API Call
    ApiService.createExperenceSuggestion(user?.token, data)
      .then((res) => {
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        console.log(err);
        setErrorState(Object.values(err.response.data.errorState));
      });
  };

  const handleCheckboxChange = (e, suggestion) => {
    const { checked } = e.target;
    setSelectedSuggestions((prev) => ({
      ...prev,
      [suggestion]: checked,
    }));
  };

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        const jobs = res.data.data?.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setJobPositionsList(jobs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form onSubmit={handleCreateSuggestion}>
          <div className="border h-full p-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">CREATE SUGGESTION</h1>

              <div className="py-2 w-full flex flex-col gap-1">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={jobPositions}
                  options={jobPositionsList}
                  onChange={(val) => setJobPositions(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  menuPlacement="auto"
                  id="jobPositions"
                />
              </div>
            </div>
            {errorState?.map((err, index) => (
              <li key={index} className="text-red-500 text-sm">
                {err}
              </li>
            ))}
            <div className="py-4">
              <button
                onClick={generateSuggestion}
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Generate With AI
              </button>
            </div>

            <div className="min-h-[350px] w-full relative">
              {isListLoading && (
                <div
                  role="status"
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  {/* Loading spinner SVG */}
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              )}
              <ul>
                {suggestionListAI.map((x, i) => (
                  <li className="my-2 border rounded-md p-2" key={i}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!selectedSuggestions[x]}
                          onChange={(e) => handleCheckboxChange(e, x)}
                        />
                      }
                      label={x}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {suggestionListAI.length > 0 && (
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateExSuggestion;
