import React, { useState, useRef } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Auth";

const CreateSummary = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  //   Value States
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleCreateSummary = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      title: title,
      description: description,
    };

    ApiService.createSummary(user?.token, data)

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
        <form action="#" onSubmit={handleCreateSummary}>
          <div className="border h-full p-4">
            {/* Inputs Author */}

            <h1 className="text-2xl font-bold">Create Summary</h1>

            <div>
              <AllborderInputGroup
                htmlFor={"title"}
                isRequired={true}
                label={"title"}
                onchange={(val) => settitle(val)}
                value={title}
                placeholder={"title"}
              />
            </div>

            <div className="py-4">
              <div>
                <TextAreaGroup
                  cols={4}
                  rows={4}
                  resize={false}
                  htmlFor={"description"}
                  isRequired={true}
                  label={"description"}
                  onchange={(val) => setdescription(val)}
                  value={description}
                  placeholder={"description"}
                  maxLength={250}
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
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
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

export default CreateSummary;
