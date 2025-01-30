import React, { useEffect } from "react";
import Header from "../partails/Header";
import SideBar from "../partails/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../partails/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const AdminLayout = () => {
  const [isSideBar, setIsSideBar] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("show-cover-examples")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      Cookies.remove("coverLetterExampleUpdateStep1");
      Cookies.remove("coverLetterExampleUpdateStep2");
      Cookies.remove("coverLetterExampleUpdateStep3");
    }
    if (!location.pathname.includes("create-cover-examples")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      Cookies.remove("coverLetterExampleStep1");
      Cookies.remove("coverLetterExampleStep2");
      Cookies.remove("coverLetterExampleStep3");
    }

    if (!location.pathname.includes("show-resume-examples")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      Cookies.remove("resumeExampleUpdateStep1");
    }
    if (!location.pathname.includes("create-resume-examples")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      Cookies.remove("resumeExampleStep1");
    }
  }, [location.pathname]);
  return (
    <>
      <section>
        <div>
          {/* Header */}
          <div className="w-full">
            <Header
              handleSideBarAction={() => {
                setIsSideBar(!isSideBar);
              }}
            />
          </div>
          {/* body Section */}
          <div className="flex" style={{ paddingTop: "78px" }}>
            {/* SideBra */}
            <SideBar sideBarStatus={isSideBar} />
            <div
              className="__content flex-1 flex flex-col overflow-y-scroll"
              style={{ height: "calc(100vh - 80px)" }}
            >
              <div className="flex-1 px-8 py-4">
                <Outlet />
              </div>
              <div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
