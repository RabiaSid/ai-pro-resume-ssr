import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import TextAreaGroup from "../../components/TextAreaGroup";
import ToggleSwitch from "../../components/ToggleSwitch";
import InputWithTextEditer from "../../components/InputWithTextEditer";
import { useAuth, userAuth } from "../../services/Auth";

const ShowBlog = () => {
  const lc = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  //   Value States
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [formErr, setFormErr] = useState("");
  const [status, setStatus] = useState();

  const [isLoading, setIsloading] = useState(false);

  const { job_id } = lc.state;

  useEffect(() => {
    ApiService.getSingleCareerVacancy(user?.token, job_id)
      .then((res) => {
        const {
          name,
          title,
          location,
          long_description,
          meta_description,
          meta_keywords,
          short_description,
          status,
        } = res.data.data;

        setName(name);
        setTitle(title);
        setLocation(location);
        setLongDescription(long_description);
        setShortDescription(short_description);
        setMetaDescription(meta_description);
        setMetaKeyword(meta_keywords);
        setStatus(status);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateBlog = () => {
    setIsloading(true);
    const data = {
      id: job_id,
      name: name,
      title: title,
      location: location,
      short_description: shortDescription,
      long_description: longDescription,
      meta_keywords: metaKeyword,
      meta_description: metaDescription,
      status: status,
    };

    ApiService.updateCareerVacancy(user?.token, data)
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
        setFormErr(err.response.data.errors);
        console.log(err);
      });
  };

  const ErrorsList = ({ errors }) => {
    return (
      <ul className="list-decimal pl-4">
        {Object.values(errors).map((err, idx) => (
          <li className="text-red-500 text-base" key={idx}>
            {err}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="border h-full p-4">
          {/* Blog Inputs */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">UPDATE VACANCY</h1>
            {/* Title */}
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
            {/* Name */}
            <div>
              <AllborderInputGroup
                htmlFor={"name"}
                isRequired={true}
                label={"Name"}
                onchange={(val) => setName(val)}
                value={name}
                placeholder={"Job Name"}
              />
            </div>
            {/* Location */}
            <div>
              <AllborderInputGroup
                htmlFor={"location"}
                isRequired={true}
                label={"Location"}
                onchange={(val) => setLocation(val)}
                value={location}
                placeholder={"Job Location"}
              />
            </div>
            {/* Meta */}
            <div>
              <AllborderInputGroup
                htmlFor={"meta_key"}
                isRequired={true}
                label={"Meta Keyword"}
                onchange={(val) => setMetaKeyword(val)}
                value={metaKeyword}
                placeholder={"Meta Keyword"}
              />
            </div>
            {/* Meta Description */}
            <div>
              <TextAreaGroup
                cols={4}
                htmlFor={"Meta_descriptio"}
                isRequired={true}
                label={"Meta Description"}
                onchange={(val) => setMetaDescription(val)}
                value={metaDescription}
                resize={false}
                rows={4}
                maxLength={250}
              />
            </div>
            {/* Short Description */}
            <div>
              <TextAreaGroup
                cols={4}
                htmlFor={"short_descriptio"}
                isRequired={true}
                label={"Short Description"}
                onchange={(val) => setShortDescription(val)}
                value={shortDescription}
                resize={false}
                rows={4}
                maxLength={150}
              />
            </div>
            {/* Long Description */}
            <div>
              <InputWithTextEditer
                cols={4}
                htmlFor={"long_descriptio"}
                isRequired={true}
                label={"Long Description"}
                onchange={(val) => setLongDescription(val)}
                value={longDescription}
                resize={false}
                rows={4}
              />
            </div>
            {/* Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <ToggleSwitch
                ChangeStatus={(status) =>
                  status ? setStatus(1) : setStatus(0)
                }
                status={status}
              />
            </div>
          </div>
          <hr />
          {/* Upadte */}
          <div className="py-6 flex flex-col gap-2">
            <ErrorsList errors={formErr} />
            <button
              onClick={handleUpdateBlog}
              className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2 w-fit"
            >
              Update Vacancy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBlog;
