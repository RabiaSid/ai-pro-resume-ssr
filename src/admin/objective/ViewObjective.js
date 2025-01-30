import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextAreaGroup from "../../components/TextAreaGroup";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

const ViewObjective = () => {
  const { user } = useAuth();

  const location = useLocation();
  const { objective_id } = location.state || {};

  const [obj_detail, set_obj_detail] = useState();
  const [obj_job_position, set_obj_job_position] = useState([]);

  useEffect(() => {
    ApiService.showObjectiveDetails(user?.token, objective_id)
      .then((res) => {
        console.log(res.data.data);
        const { detail, job_positions } = res.data.data;
        set_obj_detail(detail);
        set_obj_job_position(job_positions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Job Position:</h1>
      <p className="mt-2 text-md font-semibold w-[50%]">
        {obj_job_position.map((job) => {
          return (
            <>
              <p>{job.name}</p>
            </>
          );
        })}
      </p>
      <h1 className="text-2xl font-bold">Detail:</h1>
      <p className="mt-2 text-md font-semibold w-[50%]">{obj_detail}</p>
    </>
  );
};

export default ViewObjective;
