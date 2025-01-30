import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpinner from "../../components/LoadingSpinner";
import PasswordInputGroup from "../../components/PasswordInputGroup";
import SelectDropdown from "../../components/SelectDropdown";
import { useNavigate } from "react-router-dom";
import FileInput from "../../components/FileInput";
import { useAuth } from "../../services/Auth";

const CreateAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rolesList, setRolesList] = useState([]);
  const [errors, setErrors] = useState(null);
  const formErrorText = useRef("");

  // Value States
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminRole, setAdminRole] = useState("");

  // Profile Image
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageName, setProfileImageName] = useState("");

  // Password Showing or not
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isC_PasswordShow, setIsC_PasswordShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ApiService.getAdminRolesList(user?.token)
      .then((res) => {
        const rolesArray = Object.values(res.data.data);
        setRolesList(rolesArray);
      })
      .catch((err) => console.log(err));
  }, [user?.token]);

  const handleCreateAdmin = (e) => {
    e.preventDefault();

    if (adminPassword === adminConfirmPassword) {
      if (formErrorText.current) {
        formErrorText.current.textContent = "";
      }
      setIsLoading(true);

      ApiService.storeAdmin(
        user?.token,
        adminName,
        adminEmail,
        adminPassword,
        adminConfirmPassword,
        adminRole,
        profileImage
      )
        .then((res) => {
          setIsLoading(false);
          swal({
            title: res.data.message,
            icon: "success",
          })
            .then(() => navigate(-1))
            .catch(() => navigate(-1));
        })
        .catch((err) => {
          setIsLoading(false);
          setErrors(Object.values(err.response.data.errors));
          console.log(err);
        });
    } else {
      if (formErrorText.current) {
        formErrorText.current.textContent = "Passwords must be same";
      }
    }
  };

  const handleFileChange = (file) => {
    setProfileImage(file);
    setProfileImageName(file.name);
  };

  return (
    <>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateAdmin}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create Admin</h1>
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
              {/* Password */}
              <div>
                <PasswordInputGroup
                  htmlFor={"password"}
                  isRequired={true}
                  label={"Password"}
                  handleOnChange={(val) => setAdminPassword(val)}
                  value={adminPassword}
                  placeholder={"Password"}
                  isPasswordVisible={isPasswordShow}
                  togglePasswordVisibility={() =>
                    setIsPasswordShow(!isPasswordShow)
                  }
                />
              </div>
              {/* Confirm Password */}
              <div>
                <PasswordInputGroup
                  htmlFor={"c_password"}
                  isRequired={true}
                  label={"Confirm Password"}
                  handleOnChange={(val) => setAdminConfirmPassword(val)}
                  value={adminConfirmPassword}
                  placeholder={"Confirm Password"}
                  isPasswordVisible={isC_PasswordShow}
                  togglePasswordVisibility={() =>
                    setIsC_PasswordShow(!isC_PasswordShow)
                  }
                />
              </div>
              {/* Roles */}
              <div>
                <SelectDropdown
                  htmlFor={"role"}
                  isRequired={true}
                  label={"Role"}
                  options={rolesList}
                  value={adminRole}
                  handleOnChange={(val) => setAdminRole(val)}
                />
              </div>
              {/* Profile Image */}
              <div>
                <FileInput
                  htmlFor={"profile_image"}
                  isRequired={false}
                  label={"Profile Image"}
                  onchange={handleFileChange}
                  accept={".png,.jpeg,.jpg"}
                />
                {profileImageName && (
                  <p className="text-sm text-gray-600">{profileImageName}</p>
                )}
              </div>
            </div>
            <hr />
            {/* Create */}
            <div className="py-6 flex flex-col gap-2">
              <span className="text-sm text-red-500" ref={formErrorText}></span>
              <ul className="list-disc ml-2 py-2">
                {errors?.map((err, index) => (
                  <li key={index} className="text-red-500 text-sm">
                    {err}
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2 w-fit"
              >
                Create Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAdmin;
