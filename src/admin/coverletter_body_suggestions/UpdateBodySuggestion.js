import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import TextAreaGroup from "../../components/TextAreaGroup";
import { useAuth } from "../../services/Auth";
import ToggleSwitch from "../../components/ToggleSwitch";
import RenderInputGroup from "../../components/AllborderInputGroup";

const ShowBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const location = useLocation();
  const { suggestion_id } = location.state;

  //   Value States
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(0);
  const [sort, setSort] = useState(0);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getSingleCoverLetterBodySuggestion(user?.token, suggestion_id)
      .then((res) => {
        const { body, sort, status } = res.data.data;
        setBody(body);
        setSort(sort);
        setStatus(status);
      })
      .catch((err) => {});
  }, []);

  const handleUpdateSuggestion = (e) => {
    e.preventDefault();

    setIsloading(true);

    const data = {
      body: body,
      status: status,
      sort: sort,
    };

    ApiService.updateCoverLetterSuggestionById(user?.token, suggestion_id, data)
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
        <form onSubmit={handleUpdateSuggestion}>
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
                placeholder={"Cover Letter Body Suggestion..."}
                resize={true}
                rows={4}
                value={body}
              />

              <RenderInputGroup
                htmlFor={"sort"}
                isRequired={true}
                label={"Sort"}
                onchange={(val) => setSort(val)}
                type={"number"}
                value={sort}
                placeholder={"Sort"}
              />

              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setStatus(1);
                  } else {
                    setStatus(0);
                  }
                }}
                status={status}
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowBlog;
