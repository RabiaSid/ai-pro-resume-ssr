import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import LoadingSpiner from "../../components/LoadingSpinner";
import { FiEdit3 } from "react-icons/fi";
import { useAuth } from "../../services/Auth";

const ShowAndUpdateAdmin = () => {
  const { user } = useAuth();
  const location = useLocation();

  const { user_id } = location.state;

  //   Value States
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("");

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    ApiService.showAdminDetails(user?.token, user_id)
      .then((res) => {
        let { name, email } = res.data.data.admin;

        setAdminName(name);
        setAdminEmail(email);
        setAdminRole(res.data.data.user_role[0]);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#">
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Details</h1>

                <div>
                  <Link
                    to={"/admin/admins/update-admin"}
                    state={{ user_id: user_id }}
                    className="bg-primary text-white font-bold py-2 px-4 flex justify-center items-center w-fit gap-2 text-base rounded-lg border border-primary hover:bg-white hover:text-[#0072b1]"
                  >
                    Edit Admin
                    <FiEdit3 className="text-xl" />
                  </Link>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-4">
                {/* Admin Name */}
                <div>
                  <lable className="text-muted">Name:</lable>
                  <h1 className="text-lg text-primary font-bold">
                    {adminName}
                  </h1>
                </div>
                {/* Admin Email */}
                <div>
                  <lable className="text-muted">Email:</lable>
                  <h1 className="text-lg text-primary font-bold">
                    {adminEmail}
                  </h1>
                </div>
                {/* Roles */}
                <div>
                  <lable className="text-muted">Role:</lable>
                  <h1 className="text-lg text-primary font-bold">
                    {adminRole}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowAndUpdateAdmin;
