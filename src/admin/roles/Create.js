import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";

const CreateRole = () => {
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [roleName, setRoleName] = useState("");
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionsList, setPermissionsList] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    ApiService.getRolePermissionsList(user?.token)
      .then((res) => {
        setPermissionsList(res.data.data.permission);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLabelClick = (role_id) => {
    let id = Number(role_id);
    const isChecked = checkedRoles.includes(id);
    if (isChecked) {
      setCheckedRoles((prevRoles) =>
        prevRoles.filter((role) => Number(role) !== id)
      );
    } else {
      setCheckedRoles((prevRoles) => [...prevRoles, id]);
    }
  };

  const handleAddRole = () => {
    setIsLoading(true);
    ApiService.createRole(user?.token, roleName, checkedRoles)
      .then((res) => {
        setIsLoading(false);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => {
            Navigate("/admin/roles");
          })
          .catch(() => Navigate("/admin/roles"));
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="border h-full p-4">
          {/* Input */}
          <div className="">
            <AllborderInputGroup
              htmlFor={"role__name"}
              isRequired={true}
              label={"Name"}
              onchange={(val) => setRoleName(val)}
              value={roleName}
              placeholder={""}
            />
          </div>
          <hr />
          {/*  List */}
          <div className="py-5">
            <h1 className="font-bold my-2">Permissions:</h1>

            <div className="flex flex-wrap gap-4">
              {permissionsList.map((role, idx) => {
                const isChecked = checkedRoles.includes(role.id);

                return (
                  <label
                    key={role.id}
                    htmlFor={role.id}
                    className={`rounded-sm w-fit flex border items-center justify-center gap-2 p-2 text-lg font-bold cursor-pointer select-none ${
                      isChecked
                        ? "bg-primary text-white"
                        : "bg-gray text-black border-primary "
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={role.id}
                      checked={isChecked}
                      onChange={() => handleLabelClick(role.id)}
                    />
                    <span>{role.name}</span>
                  </label>
                );
              })}
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
              onClick={handleAddRole}
              className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
            >
              Add Role
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRole;
