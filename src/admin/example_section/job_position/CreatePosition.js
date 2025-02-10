import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import TextAreaGroup from "../../../components/TextAreaGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../services/Auth";
import axios from "axios";
import { post } from "jquery";
import { Controller, useForm } from "react-hook-form";

const CreateCategory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const [jobTitle, setJobTitle] = useState("");

  const [Api_response, set_Api_response] = useState([]);

  const handleGenerateClick = async () => {
    setIsloading(true);
    if (!jobTitle) {
      return;
    }

    try {
      const response = await axios.post(
        "http://ai.jts.aiproresume.com/api/v1/job-title-suggestion",
        JSON.stringify({ job_title: jobTitle }), // Convert the data to JSON format
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type to application/json
          },
        }
      );
      console.log("API Response:", response.data.data);
      set_Api_response(response.data.data.job_titles);
      setIsloading(false);
    } catch (error) {
      console.error("Error calling the API:", error);
      setIsloading(false);
    }
  };

  const handleCreateJobPosition = (data) => {
    const selectedData = data.data.filter((item) => item.isSelected);
    console.log("Selected Data:", selectedData);
    console.log("data", data);
    setIsloading(true);
    ApiService.createJobPosition(user?.token, selectedData)
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

  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="py-4">
          <h1 className="text-2xl font-bold">Create Position</h1>
        </div>
        <div className="flex items-center justify-start gap-3 mt-5 mb-10">
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            placeholder="enter job title"
            className="w-80 border-2 py-1 px-4"
          />
          <button
            onClick={handleGenerateClick}
            className="border-2 border-black px-4 py-1 rounded-lg"
          >
            Generate With AI
          </button>
        </div>

        <form action="#" onSubmit={handleSubmit(handleCreateJobPosition)}>
          <div className="border h-full p-4 ">
            {Api_response?.map((res, idx) => {
              return (
                <div className="border-2 p-3 mt-5 relative" key={idx}>
                  {/* Checkbox at the top-right */}
                  <div className="absolute top-2 right-2">
                    <Controller
                      name={`data.${idx}.isSelected`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          className="w-5 h-5 "
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name={`data.${idx}.job_title`}
                    control={control}
                    defaultValue={res.job_title}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="hidden"
                        className="border-2 py-1 px-3"
                      />
                    )}
                  />

                  <Controller
                    name={`data.${idx}.keywords`}
                    defaultValue={res.keywords}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="hidden"
                        className="border-2 py-1 px-3"
                      />
                    )}
                  />

                  <Controller
                    name={`data.${idx}.similar_job_titles`}
                    defaultValue={res.similar_job_titles}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="hidden"
                        className="border-2 py-1 px-3"
                      />
                    )}
                  />

                  <h1 className="text-xl font-bold text-purple-500">
                    {res.job_title}
                  </h1>
                  <h2 className="text-lg font-bold">Keywords:</h2>
                  <div className="flex flex-wrap items-center mt-1 justify-start gap-3">
                    {res.keywords?.map((kw, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex items-center bg-blue-500 text-white px-5 py-1 rounded-lg"
                        >
                          <span>{kw}</span>
                        </div>
                      );
                    })}
                  </div>
                  <h2 className="text-lg font-bold mt-4">
                    Similar Job Titles:
                  </h2>
                  <div className="flex flex-wrap items-center mt-1 justify-start gap-3">
                    {res.similar_job_titles?.map((sjt, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex items-center bg-blue-500 text-white px-5 py-1 rounded-lg"
                        >
                          <span>{sjt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            {/* Upadte */}
            <div className="py-6">
              <button
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
