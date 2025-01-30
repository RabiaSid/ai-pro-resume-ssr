import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { json, useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Auth";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

const Create_Technical_Skills = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  //   Value States
  const [name, setname] = useState("");
  const [isExample, setIsExample] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [alljobs, setAlljobs] = useState([]);
  const [selected_job, setSelected_job] = useState();
  const [tech_skill, set_tech_skill] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });

  const [checkboxStates, setCheckboxStates] = useState(
    tech_skill.map(() => false) // Tracks individual checkbox states
  );

  const handleSelectAll = () => {
    const newState = !isAllSelected;
    setIsAllSelected(newState);
    const updatedStates = tech_skill.map(() => newState);

    setCheckboxStates(updatedStates); // Update local state to sync the UI
    tech_skill.forEach((_, idx) => {
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

  const handleCreateTechSkills = (data) => {
    const arr = [];
    console.log("array", arr);
    const selectedData = data.data.filter((item) => item.isSelected);
    selectedData.map((d) => arr.push(d.name));
    
    setIsloading(true);
    ApiService.createTechSkills(user?.token, arr, selected_job, isExample)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        console.log(res.data.data);
        setAlljobs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.token]);

  const AIsuggestion = async () => {
    setIsloading(true);
    if (!alljobs) {
      return;
    }
    try {
      const response = await axios.post(
        "https://ai.skillsgen.aiproresume.com/api/v1/technical-skill-generation",
        JSON.stringify({ job_title: selected_job }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data.data.technical_Skills);
      set_tech_skill(response.data.data.technical_Skills);
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
        <h1 className="text-2xl font-bold">Create Tech Skill</h1>
        <div className="py-2 w-full flex flex-col gap-1">
          <label htmlFor="jobPositions">Job Positions</label>
          <div className="flex items-center justify-start gap-5">
            <select
              onChange={(e) => setSelected_job(e.target.value)}
              className="w-80 border-2 px-3 py-1"
            >
              {alljobs.map((job, idx) => {
                return (
                  <option key={idx} value={job.id}>
                    {job.name}
                  </option>
                );
              })}
            </select>
            <button
              onClick={AIsuggestion}
              className="bg-primary-blue text-white rounded-md px-3 py-1 "
            >
              Generate with AI
            </button>
          </div>
        </div>

        {tech_skill.length > 0 ? (
          <>
            <h2 className="text-2xl mt-5 font-bold">
              Technical Skill Suggestions Generated By AI :
            </h2>
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
            <form onSubmit={handleSubmit(handleCreateTechSkills)}>
              <div className="mt-3 flex flex-wrap gap-2">
                {tech_skill.map((ts, idx) => {
                  return (
                    <>
                      <Controller
                        name={`data.${idx}.name`}
                        control={control}
                        defaultValue={ts}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="hidden"
                            className="border-2 py-1 px-3"
                          />
                        )}
                      />
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-3 bg-primary-blue text-white px-5 py-1 rounded-lg"
                      >
                        <span>{ts}</span>
                        <Controller
                          control={control}
                          name={`data.${idx}.isSelected`}
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
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 mb-4 mt-2">
                <span>Example</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setIsExample(1);
                    } else {
                      setIsExample(0);
                    }
                  }}
                  status={isExample}
                />
              </div>

              <div className="py-2">
                <button
                  type="submit"
                  className="bg-primary-green text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Create_Technical_Skills;
