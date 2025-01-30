import React from "react";
import "./spinnerloader.css";
import logo from "../../../assets/images/logo_resume.webp";

const SpinnerLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center gap-4 flex-col">
      <div>
        <img src={logo} width={200} alt="logo" />
      </div>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default SpinnerLoader;
