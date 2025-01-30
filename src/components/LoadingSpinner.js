import React, { useEffect } from "react";
import logo from "../assets/images/logo_resume.webp";

const LoadingSpiner = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

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

export default LoadingSpiner;
