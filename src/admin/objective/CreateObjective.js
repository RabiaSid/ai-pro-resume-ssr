import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextAreaGroup from "../../components/TextAreaGroup";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { id } from "date-fns/locale";

const animatedComponents = makeAnimated();

const ShowObjective = () => {
  const { user } = useAuth();
  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [jobPositions, setJobPositions] = useState([]);
  const [jobPositionsList, setJobPositionsList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [apires, setapires] = useState([]);

  const [isAllSelected, setIsAllSelected] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState(
    apires.map(() => false) // Tracks individual checkbox states
  );

  const handleSelectAll = () => {
    const newState = !isAllSelected;
    setIsAllSelected(newState);
    const updatedStates = apires.map(() => newState);

    setCheckboxStates(updatedStates); // Update local state to sync the UI
    apires.forEach((_, idx) => {
      setValue(`data.${idx}.isSelected`, newState); // Update form state
    });
  };

  const handleCheckboxChange = (idx, checked) => {
    const updatedStates = [...checkboxStates];
    updatedStates[idx] = checked;
    setCheckboxStates(updatedStates);

    // Update the "Select All" checkbox state if needed
    setIsAllSelected(updatedStates.every((state) => state));
  };

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        const jobs = res.data.data?.map((item) => ({
          value: item.id.toString(),
          label: item.name,
          keywords: item.keywords ? item.keywords.split(",") : [],
        }));
        setJobPositionsList(jobs);
      })
      .catch((err) => console.error(err));
  }, [user?.token]);

  const handleJobPositionChange = (selectedOption) => {
    setJobPositions(selectedOption);
    setSelectedKeywords(selectedOption?.keywords || []);
    // console.log(selectedOption);
  };

  const handleCreateObjective = (data) => {
    const selectedData = data.data.filter((item) => item.isSelected);
    // console.log("Selected Data:", selectedData);
    setIsloading(true);
    // console.log(jobPositions);
    ApiService.createObjective(user?.token, selectedData, jobPositions.value)
      .then((res) => {
        setIsloading(false);

        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  const handleGenerateClick = async () => {
    setIsloading(true);
    if (!jobPositions) {
      return;
    }

    try {
      const response = await axios.post(
        "https://ai.smrysugst.aiproresume.com/api/v1/job-summary-suggestion",
        JSON.stringify({ job_title: jobPositions, keywords: selectedKeywords }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("API Response:", response.data.data.summary);
      setapires(response.data.data.summary);
      setIsloading(false);
    } catch (error) {
      console.error("Error calling the API:", error);
      setIsloading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="py-4">
          <h1 className="text-2xl font-bold">CREATE OBJECTIVE</h1>
        </div>
        <div className="py-2 w-full flex flex-col gap-1">
          <label htmlFor="jobPositions">Job Positions</label>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            value={jobPositions}
            options={jobPositionsList}
            onChange={handleJobPositionChange}
            className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
            menuPlacement="auto"
            id="jobPositions"
          />
        </div>

        {selectedKeywords.length > 0 && (
          <>
            <p>Keywords : </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-white bg-primary-green rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </>
        )}

        <button
          onClick={handleGenerateClick}
          className="mt-5 rounded-lg bg-primary-blue px-3 py-1 w-[200px] text-white font-bold"
        >
          Generate with AI
        </button>

        {apires?.length > 0 ? (
          <form onSubmit={handleSubmit(handleCreateObjective)} className="mt-5">
            <p className="text-2xl font-bold">Summaries Generated By AI :</p>
            {/* "Select All" Checkbox */}
            <div className="mt-2 p-2">
              <div className="flex items-start justify-end gap-3">
                <p className="text-md">Select All</p>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </div>
            </div>
            {apires.map((res, idx) => {
              return (
                <>
                  <div key={idx} className="mt-2 border p-2">
                    <div className="flex items-start justify-between">
                      <p className="text-md w-[95%]"> {res}</p>
                      <Controller
                        name={`data.${idx}.isSelected`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="checkbox"
                            className="w-5 h-5"
                            checked={checkboxStates[idx]} // Bind to local state
                            onChange={(e) => {
                              field.onChange(e.target.checked); // Update form state
                              handleCheckboxChange(idx, e.target.checked); // Sync UI
                            }}
                          />
                        )}
                      />
                    </div>

                    <Controller
                      name={`data.${idx}.summary`}
                      control={control}
                      defaultValue={res}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="hidden"
                          className="border-2 py-1 px-3"
                        />
                      )}
                    />
                  </div>
                </>
              );
            })}
            <div className="w-full mt-3 flex items-center justify-center">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md w-[200px] px-4 py-2"
              >
                Create
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ShowObjective;
