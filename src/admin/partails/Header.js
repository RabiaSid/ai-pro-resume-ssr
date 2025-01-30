import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import logo from "../../assets/images/logo_resume.webp";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { useAuth } from "../../services/Auth";
import { MdReplay } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RiLoaderFill } from "react-icons/ri";

const Header = ({ handleSideBarAction }) => {
  const { user, clearSession } = useAuth();
  const [our_settings, set_our_settings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getOurSettings()
      .then((res) => set_our_settings(res.data.data.settings))
      .catch((err) => console.log(err));
  }, []);

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

  const [clearCacheInProgress, setClearCacheInProgress] = useState(false);
  const [CacheCleared, isCacheCleared] = useState(false);
  const clearServerCahce = () => {
    if (user) {
      setClearCacheInProgress(true);
      ApiService.clear_server_cache(user?.token)
        .then((res) => {
          console.log(res.data);

          isCacheCleared(true);
          setTimeout(() => {
            isCacheCleared(false);
            setClearCacheInProgress(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          isCacheCleared(true);
          setTimeout(() => {
            isCacheCleared(false);
            setClearCacheInProgress(false);
          }, 2000);
        });
    }
  };

  return (
    <nav className="bg-white border-b-2 border-[#f4f2f3] fixed w-full z-10 h-20">
      <div className="w-full m-auto px-4 sm:px-10">
        <div className="flex items-center justify-between flex-wrap">
          {/* Mobile Sidebar Toggle */}
          <div className="block sm:hidden">
            <RiBarChartHorizontalLine
              className="text-2xl cursor-pointer"
              onClick={() => handleSideBarAction()}
            />
          </div>
          {/* Logo */}
          <div className="flex items-center gap-4 justify-start">
            <Link to="/admin/dashboard" className="flex">
              <img src={logo} alt="My Image" className="py-2 w-44" />
            </Link>
            <div className="hidden sm:block">
              <RiBarChartHorizontalLine
                className="text-2xl cursor-pointer"
                onClick={() => handleSideBarAction()}
              />
            </div>
          </div>
          {/* NavBar */}
          <div className="hidden sm:flex">
            {user?.roles.role_name === "Admin" ? (
              <div className="flex items-center justify-between px-2">
                {clearCacheInProgress ? (
                  <>
                    {CacheCleared ? (
                      <FaCheck
                        className=" text-green-300 cursor-pointer"
                        size={22}
                      />
                    ) : (
                      <RiLoaderFill
                        className="text-[#0072b1] cursor-pointer animate-spin"
                        size={22}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <MdReplay
                      className="text-[#0072b1] cursor-pointer"
                      size={22}
                      onClick={() => clearServerCahce()}
                    />
                  </>
                )}
                <span className="font_4 ml-2 text-md text-black">
                  Clear Server Cache
                </span>
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center justify-between px-2">
              <BiSolidUser className="pr-2 text-[#0072b1]" size={26} />
              <span className="font_4 text-md text-black hover:text-[#0072b1] cursor-pointer">
                {user.name}
              </span>
            </div>

            <div className="flex items-center justify-between px-2">
              <BiLogOut className="pr-2 text-[#0072b1]" size={26} />
              <span
                className="font_4 text-md text-black hover:text-[#0072b1] cursor-pointer"
                onClick={destroy}
              >
                LOGOUT
              </span>
            </div>
          </div>
          {/* Mobile Manu Bar */}
          <div className="block sm:hidden"></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
