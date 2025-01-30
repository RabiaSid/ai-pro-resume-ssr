import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import TextAreaGroup from "../../components/TextAreaGroup";
import PlaceholderImage from "../../assets/images/placeholder.webp";
import InputWithTextEditor from "../../components/InputWithTextEditer";
import { useAuth } from "../../services/Auth";

const CreateOpenerSuggestion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  //   Value States
  const [body, setBody] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleCreateSuggestion = (e) => {
    e.preventDefault();

    setIsloading(true);
    ApiService.createCovertLetterOpenerSuggestion(user?.token, body)
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

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form onSubmit={handleCreateSuggestion}>
          <div className="border h-full p-4">
            <div className="py-4">
              <TextAreaGroup
                cols={4}
                htmlFor={"body"}
                isRequired={true}
                label={"Body"}
                maxLength={500}
                minLength={10}
                onchange={(val) => setBody(val)}
                placeholder={"Cover Letter Opener Suggestion..."}
                resize={true}
                rows={4}
                value={body}
              />
            </div>
            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>
            <hr />
            {/* create */}
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

export default CreateOpenerSuggestion;
