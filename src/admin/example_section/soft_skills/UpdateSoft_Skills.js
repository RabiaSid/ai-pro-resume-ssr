import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";

const UpdateSoft_Skills = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  //   Value States
  const [name, setname] = useState("");
  const [isExample, setIsExample] = useState(0);

  const { softskills_id } = location.state;

  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    ApiService.showSoftSkills(user?.token, softskills_id)
      .then((res) => {
        console.log(res.data.data);

        // Set Values
        const { name, is_example } = res.data.data;

        setname(name);
        setIsExample(is_example);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateSoftSkills = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      name: name,
      is_example: isExample,
    };

    ApiService.updateSoftSkills(user?.token, softskills_id, data)
      .then((res) => {
        setIsloading(false);
        console.log(res.data);
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
          <form action="#" onSubmit={handleUpdateSoftSkills}>
            {/* Inputs Author */}

            <h1 className="text-2xl font-bold">Update Soft Skill</h1>

            <div>
              <AllborderInputGroup
                htmlFor={"name"}
                isRequired={true}
                label={"name"}
                onchange={(val) => setname(val)}
                value={name}
                placeholder={"name"}
              />
            </div>
            {/*  */}
            <div className="flex flex-col gap-2 mb-4 mt-2">
              <span>Example</span>
              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setIsExample(1);
                  } else {
                    setIsExample(0);
                  }
                }}
                status={isExample}
              />
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

export default UpdateSoft_Skills;
