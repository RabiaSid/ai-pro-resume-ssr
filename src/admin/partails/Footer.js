import React from "react";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";

const Footer = () => {
  const [our_settings, set_our_settings] = useState([]);

  useEffect(() => {
    ApiService.getOurSettings()
      .then((response) => {
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <footer className="bg-[#0072b1] text-white z-50 w-full">
      <div className="flex flex-wrap items-center justify-between text-center px-4 py-10">
        <span className="text-md text-center sm:text-center ">
          {our_settings.footer_text}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
