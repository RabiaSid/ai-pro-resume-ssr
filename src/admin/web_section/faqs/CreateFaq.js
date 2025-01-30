import React, { useRef, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Auth";
import { useForm, Controller } from "react-hook-form";
import InputWithTextEditer from "../../../components/InputWithTextEditer";

const CreatePage = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({ mode: "onChange" });

  //   Value States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleCreateFaq = (data) => {
    console.log(data);
    setIsloading(true);
    ApiService.createFaq(user?.token, data)
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

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form onSubmit={handleSubmit(handleCreateFaq)}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create FAQ</h1>

              {/* select page  */}
              <div className="mt-2">
                <label>Page</label>
                <Controller
                  name="page"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md mt-2"
                    >
                      <option value="">Select page</option>
                      <option value="Home">Home</option>
                      <option value="Resume Template">Resume Template</option>
                      <option value="Resume Example">Resume Example</option>
                      <option value="Cover Template">Cover Template</option>
                      <option value="Cover Example">Cover Example</option>
                      <option value="Services">Services</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Ats">Ats Checker</option>
                    </select>
                  )}
                />
              </div>

              {/* Question */}
              <div className="mt-2">
                <label>Question</label>
                <Controller
                  name="question"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md mt-2"
                      placeholder={"Enter Question"}
                    />
                  )}
                />
              </div>

              {/* Answer */}
              <div className="mt-2">
                <Controller
                  name="answer"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputWithTextEditer
                      htmlFor={"answer"}
                      label={"Answer"}
                      onchange={(val) => {
                        field.onChange(val); // Update the `answer` field in the Controller
                      }}
                      value={field.value || ""} // Use the value from the Controller
                    />
                  )}
                />
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />
            {/* Upload */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Create FAQ
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
