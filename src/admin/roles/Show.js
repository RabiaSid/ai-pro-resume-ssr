import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import LoadingSpiner from "../../components/LoadingSpinner";
import { FiEdit3 } from "react-icons/fi";
import { useAuth } from "../../services/Auth";

const ShowRole = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [roleName, setRoleName] = useState("");
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [permissionsList, setPermissionsList] = useState([]);

  const { role_uuid } = location.state;

  useEffect(() => {
    setIsloading(true);
    ApiService.showRoleDetails(user?.token, role_uuid)
      .then((res) => {

        setRoleName(res.data.data.role.name);
        setPermissionsList(res.data.data.all_permission);
        setIsloading(false);
        // Permissions List
        setCheckedRoles([]);
        const givenRolePermissions = res.data.data.given_role_permissions;
        const rolePermissionsArray = Object.values(givenRolePermissions);
        rolePermissionsArray.map((role) =>
          setCheckedRoles((prev) => [...prev, Number(role)])
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <div className="border h-full p-4">
          {/*  */}
          <div className="p-4 flex justify-between items-center">
            {/* Role Name */}
            <div className="">
              <span className="text-sm">Role Name:</span>
              <h1 className="text-xl font-bold text-primary">{roleName}</h1>
            </div>
            {/* Upadte Section */}
            <div>
              <Link
                to={"/admin/roles/update-role"}
                state={{ role_uuid: role_uuid }}
                className="bg-primary text-white font-bold py-2 px-4 flex justify-center items-center w-fit gap-2 text-base rounded-lg border border-primary hover:bg-white hover:text-[#0072b1]"
              >
                Edit Role
                <FiEdit3 className="text-xl" />
              </Link>
            </div>
          </div>
          <hr />
          {/*  List */}
          <div className="py-5">
            <h1 className="font-bold my-2">Permissions:</h1>

            <div className="flex flex-wrap gap-4">
              {permissionsList.map((role, idx) => {
                if (checkedRoles.includes(role.id)) {
                  return (
                    <div
                      key={role.id}
                      className={`rounded-sm w-fit flex border items-center justify-center gap-2 p-2 text-lg font-bold select-none bg-primary text-white`}
                    >
                      <span>{role.name}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowRole;
