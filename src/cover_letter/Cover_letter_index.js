import React, { useEffect, useState } from "react";
import Header from "../resume/Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Cover_letter_index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("create-cover-letter")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      localStorage.removeItem("createCoverLetterData");
    }
  }, [location.pathname]);

  const [sideBarStattus, setSideBarStattus] = useState(true);

  const handleSideBarToggle = () => {
    setSideBarStattus(!sideBarStattus);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setSideBarStattus(false);
    }
  }, []);

  return (
    <div>
      <Header handleSideBarToggle={handleSideBarToggle} />
      <div className="flex justify-between items-start flex-wrap">
        {/* SideBar */}

        <Sidebar sideBarStatus={sideBarStattus} />

        {/* Main Content */}
        <div id='main_contents_wrap' className='w-full  lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Cover_letter_index;
