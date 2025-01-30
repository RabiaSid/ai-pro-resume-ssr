import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useAuth } from "../../../services/Auth";

const UpdateCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  //   Value States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [institute, setInstitute] = useState("");
  const [date, setDate] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const { certificate_id } = location.state;

  useEffect(() => {
    ApiService.showCertificateDetails(user?.token, certificate_id)
      .then((res) => {
        console.log(res.data.data.certificate);

        // Set Values
        const {
          title: title,
          description: description,
          institute: institute,
          date: date,
        } = res.data.data;

        setTitle(title);
        setDescription(description);
        setInstitute(institute);
        setDate(date);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateCertificate = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      title: title,
      description: description,
      institute: institute,
      date: date,
    };

    ApiService.updateCertificate(user?.token, certificate_id, data)
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
          <form action="#" onSubmit={handleUpdateCertificate}>
            {/* Inputs Author */}

            <h1 className="text-2xl font-bold">Update Certificate</h1>

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

            <div className="py-4">
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCertificate;
