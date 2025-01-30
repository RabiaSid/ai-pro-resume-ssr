import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import Logo from "../../assets/images/logo_resume.webp";
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { useAuth } from "../../services/Auth";

const SideNav = ({ isOpen, close }) => {
  const { user, clearSession } = useAuth();

  const navigate = useNavigate();

  const destroy = () => {
    ApiService.logout(user?.token)
      .then((response) => {
        clearSession();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className={`${isOpen ? "showSideNav" : "hideSideNav"
          } sideNavFormatting w-full sm:w-[400px] bg-white  z-[99999999999999] sm:z-10 fixed right-0 top-0 h-screen`}
      >
        <div className="h-full relative bg-white w-full">
          <div className="flex relative left-5 items-center justify-start flex-1">
            <Link to={"/"} className="flex">
              <img
                src={Logo}
                alt="My Image"
                width={120}
                height={40}
                className="logo py-2"
              />
            </Link>
          </div>
          <div className="absolute top-2 right-2">
            <LiaTimesSolid
              onClick={() => close(false)}
              className="text-[#00caa5] text-3xl cursor-pointer"
            />
          </div>

          <div className="w-full h-[2px] bg-[#0072b1]"></div>

          <div className="my-3">
            <ul className="px-3">
              <li className="bg-white text-[#0072b1] text-lg font-bold font-Lexend px-2 py-2 hover:bg-[#00caa5] hover:text-white">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/about-us"}>About Us</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/services"}>Services</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/careers"}>Careers</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/blog"}>Blogs</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/account"}>Profile</Link>
              </li>
              <li className="bg-white text-[#0072b1] text-lg font-bold px-2 hover:bg-[#00caa5] hover:text-white py-2 font-Lexend">
                <Link to={"/import-resume"}>Import Resume</Link>
              </li>
            </ul>
          </div>

          <div className="w-full h-[2px] bg-[#0072b1]"></div>

          <div className="px-5 py-4">
            <button
              className="text-lg w-[120px] py-1 rounded-2xl font-Lexend bg-[#0072b1] hover:bg-[#00caa5] text-white"
              onClick={destroy}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
