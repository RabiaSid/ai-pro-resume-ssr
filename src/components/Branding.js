import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo_resume.webp";
import { ApiService } from "../services/ApiService";
import { useAuth } from "../services/Auth";

function Branding({ bottom, left, right }) {
  const { user } = useAuth();
  const [packageDetail, setPackageDetail] = useState();

  useEffect(() => {
    ApiService.getUserDetails(user?.token)
      .then((response) => {
        console.log(response?.data);
        setPackageDetail(response?.data?.package_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        bottom: bottom || "6px",
        left: left || "6px",
        right: right,
      }}
      className={`absolute flex gap-2 items-center justify-between ${packageDetail === 2 ? "" : "isHidePrint"
        }`}
    >
      <span className="text-md font-semibold text-gray-700">Powered by</span>
      <img src={Logo} alt="My Image" className="logo py-2 grayscale h-[50px]" />
    </div>
  );
}

export default Branding;
