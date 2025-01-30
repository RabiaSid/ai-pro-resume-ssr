import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useAuth } from "../../../services/Auth";

const UpdateSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  //   Value States
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const { summary_id } = location.state;

  useEffect(() => {
    ApiService.showSummaryDetails(user?.token, summary_id)
      .then((res) => {
        console.log(res.data.data.summary_id);

        // Set Values
        const { title: title, description: description } = res.data.data;

        settitle(title);
        setdescription(description);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateSummary = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      title: title,
      description: description,
    };

    ApiService.updateSummary(user?.token, summary_id, data)
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
        <div className="border h-full p-4">
          <form action="#" onSubmit={handleUpdateSummary}>
            <div className="border h-full p-4">
              {/* Inputs Author */}

              <h1 className="text-2xl font-bold">Update Summary</h1>

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
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSummary;
