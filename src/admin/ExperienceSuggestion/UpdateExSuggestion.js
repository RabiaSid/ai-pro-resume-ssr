import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useAuth } from "../../services/Auth";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextAreaGroup from "../../components/TextAreaGroup";

const animatedComponents = makeAnimated();

const UpdateExSuggestion = () => {
  const [Suggestion, setSuggestion] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  //   Value States
  const [detail, setDetail] = useState();
  const [SuggestionStatus, setSuggestionStatus] = useState();
  const [sort, setSort] = useState();
  const [jobPositions, setJobPositions] = useState([]);

  const [jobPositionsList, setJobPositionsList] = useState([]);

  const [isLoading, setIsloading] = useState(false);

  const [errors, setErrors] = useState(null);

  const { Suggestion_id } = location.state;

  useEffect(() => {
    ApiService.getAllExperenceSuggestion(user?.token)
      .then((response) => {
        setSuggestion(response.data.data);
      })
      .catch((err) => console.log(err));
    ApiService.showExperenceSuggestion(user?.token, Suggestion_id)
      .then((res) => {
        // Set Values
        const { detail, status, sort, job_positions } = res.data.data;
        console.log(job_positions);
        const jobs = job_positions?.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setJobPositions(jobs);

        setSort(sort);
        setSuggestionStatus(status);
        setDetail(detail);
      })
      .catch((err) => console.log(err));

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

  const handleUpdateSuggestion = () => {
    setIsloading(true);
    const positionsArray = jobPositions.map((item) => Number(item.value));
    const data = {
      id: Suggestion_id,
      detail: detail,
      job_position_ids: positionsArray,
      sort: sort,
      status: SuggestionStatus,
    };

    ApiService.updateExperenceSuggestion(user?.token, data)
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
        setErrors(Object.values(err.response.data.errors));
      });
  };
  const options = [];
  for (let i = 0; i <= Suggestion.length; i++) {
    options.push({ label: i.toString(), value: i });
  }
  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="border h-full p-4">
          {/* Blog Inputs */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">Suggestion</h1>
            
            {/* Detail */}
            <div>
              <TextAreaGroup
                htmlFor={"detail"}
                isRequired={true}
                label={"Detail"}
                onchange={(val) => setDetail(val)}
                value={detail}
                placeholder={"detail"}
              />
            </div>


            <div className="py-2 w-full flex flex-col gap-1">
              <label>Job Positions</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={jobPositions}
                options={jobPositionsList}
                onChange={(val) => setJobPositions(val)}
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                menuPlacement="auto"
              />
            </div>
            {/* sort */}
            <div>
              <AllborderInputGroup
                htmlFor={"Suggestion_sort"}
                isRequired={true}
                label={"Sort"}
                onchange={(val) => setSort(val)}
                value={sort}
                type={"select"}
                options={options}
              />
            </div>
            {/* Blog Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setSuggestionStatus(1);
                  } else {
                    setSuggestionStatus(0);
                  }
                }}
                status={SuggestionStatus}
              />
            </div>
          </div>

          <ul className="list-disc ml-2 py-2">
            {errors?.map((err) => (
              <li className="text-red-500 text-sm">{err}</li>
            ))}
          </ul>

          <hr />
          {/* Upadte */}
          <div className="py-6">
            <button
              onClick={handleUpdateSuggestion}
              className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateExSuggestion;
