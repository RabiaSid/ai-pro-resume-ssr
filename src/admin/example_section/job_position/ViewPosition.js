import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import TextAreaGroup from "../../../components/TextAreaGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../services/Auth";

const ViewJobPosition = () => {
  const { user } = useAuth();
  const { positionid } = useParams();

  const [keywords, set_keywords] = useState([]);

  const [similar_names, set_similar_names] = useState([]);
  const [name, set_name] = useState();

  useEffect(() => {
    ApiService.getJobPositionByid(user?.token, positionid)
      .then((res) => {
        console.log(res.data.data);
        const { keywords, similar_names, name } = res.data.data;
        set_keywords(keywords.split(","));
        set_similar_names(similar_names.split(","));
        set_name(name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Job Position Details</h1>

        <p className="mt-3 text-xl font-bold">Job Name : {name}</p>

        <div className="mt-5">
          <p>Keywords:</p>
          <div className="flex flex-wrap items-center mt-1 justify-start gap-3">
            {keywords?.map((kw, idx) => {
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
        </div>

        <div className="mt-5">
          <p>Similar Job Titles:</p>
          <div className="flex flex-wrap items-center mt-1 justify-start gap-3">
            {similar_names?.map((sn, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center bg-blue-500 text-white px-5 py-1 rounded-lg"
                >
                  <span>{sn}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJobPosition;
