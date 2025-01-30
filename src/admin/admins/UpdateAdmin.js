import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import PlaceholderImage from "../../assets/images/placeholder.webp";
import FileInput from "../../components/FileInput";
import { useAuth } from "../../services/Auth";

const UpdateAdmin = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authorimageUpdated, setAuthorimageUpdated] = useState(false);
  const [blogimageUpdated, setBlogimageUpdated] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const formErrorText = useRef("");

  const [errors, setErrors] = useState(null);

  const { user_id } = location.state;

  //   Value States
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [rolesData, setRolesData] = useState();
  const [profileImage, setProfileImage] = useState("");
  const [AdminImage, setAdminImage] = useState();

  //passowrd Showing or not
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isC_PasswordShow, setIsC_PasswordShow] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getAdminRolesList(user?.token)
      .then((res) => {
        setRolesData(res.data.data);
        const rolesArray = Object.values(res.data.data);
        setRolesList(rolesArray);
      })
      .catch((err) => console.log(err));

    ApiService.showAdminDetails(user?.token, user_id)
      .then((res) => {
        console.log(res.data.data);
        let { name, email, image } = res.data.data.admin;
        setAdminName(name);
        setAdminEmail(email);
        setAdminImage(image);
        const { user_role } = res.data.data;
        setAdminRole(user_role[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateAdmin = (e) => {
    e.preventDefault();

    setIsloading(true);

    ApiService.updateAdmin(
      user?.token,
      user_id,
      adminName,
      adminEmail,
      adminRole,
      profileImage
    )
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
        console.log(err);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleUpdateAdmin}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Admin Details</h1>
              {/* Admin Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setAdminName(val)}
                  value={adminName}
                  placeholder={"Name"}
                />
              </div>
              {/* Admin Email */}
              <div>
                <AllborderInputGroup
                  htmlFor={"email"}
                  isRequired={true}
                  label={"Email"}
                  onchange={(val) => setAdminEmail(val)}
                  value={adminEmail}
                  type={"email"}
                  placeholder={"Email"}
                />
              </div>

              {/* Roles */}
              <div>
                <div className="py-2 w-full flex flex-col gap-2">
                  <label
                    htmlFor="role"
                    className="border-[#9b9b9b] text-xs sm:text-base"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                    required
                    onChange={(e) => setAdminRole(e.target.value)}
                    value={adminRole}
                  >
                    <option selected disabled>
                      Select
                    </option>
                    {rolesList.map((opt, idx) => {
                      return (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/*  */}
              <div>
                <FileInput
                  htmlFor={"profile_image"}
                  isRequired={false}
                  label={"Profile Image"}
                  onchange={(val) => setProfileImage(val)}
                  accept={".png,.jpeg,.jpg"}
                />
                <div>
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : AdminImage
                          ? global.imageUrl + AdminImage
                          : PlaceholderImage
                    }
                    alt=""
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>
            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>
            <hr />
            {/* Create */}
            <div className="py-6">
              <span className="text-sm text-red-500" ref={formErrorText}></span>
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update Detail
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAdmin;
