import React, { useState, useRef } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Auth";

const CreateCertificate = ({}) => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  //   Value States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [institute, setInstitute] = useState("");
  const [date, setDate] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleCreateCertificate = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      institute: institute,
      date: date,
    };
    setIsloading(true);
    ApiService.createCertificate(user?.token, data)
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
        <form action="#" onSubmit={handleCreateCertificate}>
          <div className="border h-full p-4">
            {/* Inputs Author */}

            <h1 className="text-2xl font-bold">Create Certificate</h1>

            <div>
              <AllborderInputGroup
                htmlFor={"title"}
                isRequired={true}
                label={"Title"}
                onchange={(val) => setTitle(val)}
                value={title}
                placeholder={"Title"}
              />
            </div>

            <div>
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"description"}
                  isRequired={true}
                  label={"Description"}
                  onchange={(val) => setDescription(val)}
                  value={description}
                  resize={false}
                  rows={4}
                  maxLength={250}
                />
              </div>
              {/* Blog Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"institue"}
                  isRequired={true}
                  label={"Institue"}
                  onchange={(val) => setInstitute(val)}
                  value={institute}
                  placeholder={"Institue"}
                />
              </div>

              <div>
                <AllborderInputGroup
                  htmlFor={"date"}
                  isRequired={true}
                  label={"Date"}
                  onchange={(val) => setDate(val)}
                  value={date}
                  placeholder={"Date"}
                  type={"date"}
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

export default CreateCertificate;
