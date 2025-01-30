import React, { useEffect, useState, Fragment, useRef } from "react";
import { BiCaretDown, BiUserCircle, BiSolidUser, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import $ from "jquery";
import axios from "axios";
import { useCart } from "./data/CartStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import coin from "./assets/images/dollar.webp";
import { ApiService } from "./services/ApiService";
import { useAuth } from "./services/Auth";
import { Menu } from "@headlessui/react";
import Logo from "./assets/images/logo_resume.webp";
import CreateNewResumeOrCoverLetter from "./components/CreateNewResumeOrCoverLetter";
import { Box, Modal } from "@mui/material";
import Cookies from "js-cookie";

function Header({ CoinIcon }) {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showPackagePopup, setShowPackagePopup] = useState(false);
  const [PackageDays, setPackageDays] = useState();
  const [userData, setUserData] = useState([]);
  const links = [
    { href: "/account", label: "Profile" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const [our_settings, set_our_settings] = useState([]);
  const [our_settings_random_blogs, set_our_settings_random_blogs] = useState(
    []
  );
  const [dynamicPages, setDynamicPages] = useState();

  const { user, clearSession } = useAuth();

  useEffect(() => {
    ApiService.getHeaderDynamicPages()
      .then((res) => {
        setDynamicPages(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [userCoins, setUserCoins] = useState();

  // Carts
  const { cart, clearCart } = useCart();

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
        set_our_settings_random_blogs(response.data.data.randomBlogs);
        console.log(response.data.data.randomBlogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      ApiService.getCoins(user.token)
        .then((res) => {
          if (res.data.id) {
            const UserCoins = {
              coin_end_date: res.data.coin_end_date,
              coin_start_date: res.data.coin_start_date,
              coins: res.data.coins,
              id: res.data.id,
            };
            setUserCoins(UserCoins);
          } else {
            const UserCoins = {
              coin_end_date: null,
              coin_start_date: null,
              coins: 0,
              id: 0,
            };
            setUserCoins(UserCoins);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setUserCoins(0);
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const ddMenu2 = document.getElementById("dd_menu2");
      const accountButton = document.getElementById("accountButton");

      if (
        ddMenu2 &&
        accountButton &&
        !ddMenu2.contains(event.target) &&
        !accountButton.contains(event.target)
      ) {
        ddMenu2.classList.add("hidden");
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const destroy = () => {
    ApiService.logout(user?.token)
      .then((response) => {
        clearCart();
        clearSession();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dropdown_menu = () => {
    const sidebar = document.getElementById("dropdown");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
    }
  };
  const dropdown_menu2 = () => {
    const sidebar = document.getElementById("dd_menu2");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
    }
  };

  const show = () => {
    const mobile_open = document.getElementById("mobile_open");
    const mobile_close = document.getElementById("mobile_close");
    const dd_menu_mobile = document.getElementById("dd_menu_mobile");
    if (mobile_open) {
      mobile_open.classList.toggle("hidden");
      mobile_close.classList.toggle("hidden");
      dd_menu_mobile.classList.remove("hidden");
      dd_menu_mobile.classList.add("flex");
    }
  };

  const hide = () => {
    const mobile_open = document.getElementById("mobile_open");
    const mobile_close = document.getElementById("mobile_close");
    const dd_menu_mobile = document.getElementById("dd_menu_mobile");
    if (mobile_open) {
      mobile_open.classList.toggle("hidden");
      mobile_close.classList.toggle("hidden");
      dd_menu_mobile.classList.add("hidden");
      dd_menu_mobile.classList.remove("flex");
    }
  };

  const handleButtonClick = () => {
    navigate("/cart");
  };

  const handleToggleDiv = () => {
    $("#topContentCenter").fadeOut();
  };

  const account_dd = () => {
    if (user?.token) {
      setIsDropOpen(false);
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);

  const toggledropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggledropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };
  const toggledropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const toggledropdown3 = () => {
    setDropdownOpen3(!isDropdownOpen3);
  };

  const [isDropOpen, setIsDropOpen] = useState(false);

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsDropOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the menu is open
    if (isDropOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      // Remove event listener when the menu is closed
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropOpen]);

  const isCartEmpty =
    !cart?.package[0]?.quantity && cart?.services.length === 0;

  useEffect(() => {
    if (user?.token) {
      ApiService.getUserDetails(user.token)
        .then((res) => {
          console.log(res.data, "user Detail.................");
          setUserData(res.data);
        })
        .catch((err) => {
          console.log("Error fetching user details:", err);
        });
    }
  }, [user?.token]);

  useEffect(() => {
    const popupProfileResponse = Cookies.get("profilePopupResponse");

    if (popupProfileResponse) {
      return;
    }
    if (location.pathname === "/account" || location.pathname === "/profile") {
      setShowProfilePopup(false);
    } else {
      if (userData.profile_percentage <= 80) {
        setShowProfilePopup(true);
      } else {
        setShowProfilePopup(false);
      }
    }
  }, [location.pathname]);

  const closeProfilePopup = () => {
    Cookies.set("profilePopupResponse", "No", { expires: 7 });
    setShowProfilePopup(false);
  };

  useEffect(() => {
    const popupPackageResponse = Cookies.get("packagePopupResponse");

    // If the user has already responded to the popup, do not show it again
    if (popupPackageResponse) {
      return;
    }
    if (location.pathname === "/packages") {
      setShowProfilePopup(false);
    } else {
      const { end_date } = userData;
      if (end_date) {
        const currentDate = new Date();
        const packageEndDate = new Date(end_date);
        const remainingDays = Math.ceil(
          (packageEndDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        setPackageDays(remainingDays);
        // Show popup if 7 or fewer days remain
        if (remainingDays <= 7 && remainingDays > 0) {
          setShowPackagePopup(true);
        } else {
          setShowPackagePopup(false);
        }
      }
    }
  }, [location.pathname]);

  const closePackagePopup = () => {
    Cookies.set("packagePopupResponse", "No", { expires: 7 });
    setShowPackagePopup(false);
  };

  return (
    <>
      <CreateNewResumeOrCoverLetter />

      <div className="top-0 left-0 w-full" id="topContentCenter">
        <div>
          <div className="flex text-center items-center justify-between  bg-[#0072b1] p-[3px] text-white font-size-2">
            <span className="flex-grow font-Lexend">
              Refer friends and earn coins for yourself!{" "}
              <Link
                className="text-[#00caa5] underline"
                to={user ? "/account" : "/login"}
              >
                get Refer link
              </Link>{" "}
              To start with AI PRO RESUME
            </span>
            <button onClick={() => handleToggleDiv()} className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className="bg-white w-full z-[9999]">
        <div className="w-[95%] lg:w[95%] xl:w-[95%] md:w[100%] m-auto">
          <div className="">
            <div className="max-w-[1500px] flex items-center justify-between flex-wrap m-auto">
              <div className="flex items-center justify-between flex-wrap w-full">
                <div className="container flex items-center justify-between flex-wrap m-auto">
                  <div className="flex items-center justify-start flex-1">
                    <Link to={"/"} className="flex">
                      <img
                        src={Logo}
                        alt="My Image"
                        width={150}
                        height={40}
                        className="logo py-2"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between items-center ">
                    <ul className="items-center justify-between  hidden xl:flex font-Lexend">
                      <div
                        className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                        onMouseEnter={account_dd}
                      >
                        <li className="flex items-center gap-1 font-Lexend">
                          Tools
                          <BiCaretDown />
                        </li>
                        <ul className="dd_menu absolute w-[250px] !mt-0 left-0 top-full z-10 font-Lexend">
                          <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                            <li className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              {user ? (
                                <Link
                                  to={"/resume/formatting"}
                                  state={{
                                    isExample: false,
                                    selectedTemplateId: 3,
                                  }}
                                >
                                  Create a Resume
                                </Link>
                              ) : (
                                <Link to={"/login"}>Create a Resume</Link>
                              )}
                            </li>
                            <li className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              {user ? (
                                <Link
                                  to={"/create-cover-letter/formatting"}
                                  state={{
                                    selectedTemplateId: 1,
                                    isExample: false,
                                  }}
                                >
                                  Create a Cover Letter
                                </Link>
                              ) : (
                                <Link to={"/login"}>Create a Cover Letter</Link>
                              )}
                            </li>
                            <li className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              <Link to={user ? "/import-resume" : "/login"}>
                                Import Resume
                              </Link>
                            </li>
                            {/* <li className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              <Link to={user ? "/ats-checker" : "/login"}>
                                ATS Checker
                              </Link>
                            </li> */}

                            {/* <li className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              <Link to={user ? "/import-resume" : "/login"}>
                                ATS Checker
                              </Link>
                            </li> */}

                            {dynamicPages?.map((item, index) => {
                              if (item.display !== "tool") return;
                              return (
                                <li
                                  className="px-4 py-4  hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white"
                                  key={index}
                                >
                                  <Link to={"/pages/" + item.slug}>
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </div>

                      <div
                        className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md font-Lexend"
                        onMouseEnter={account_dd}
                      >
                        <li className="flex gap-1 items-center font-Lexend">
                          Resume <BiCaretDown />
                        </li>
                        <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0 z-50">
                          <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                            <li className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#00caa5] text-[#616161] hover:text-white font-Lexend">
                              <Link to={"/resume-templates"}>
                                Resume Templates
                              </Link>
                            </li>
                            <li className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#00caa5] text-[#616161] hover:text-white font-Lexend">
                              <Link to={"/resume-examples"}>
                                Resume Examples
                              </Link>
                            </li>
                            {dynamicPages?.map((item, idx) => {
                              if (item.display !== "resume") return;
                              return (
                                <li
                                  className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#00caa5] text-[#616161] hover:text-white font-Lexend"
                                  key={idx}
                                >
                                  <Link to={"/pages/" + item.slug}>
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </div>

                      <div
                        className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] z-50 hover:text-white py-3 px-4 rounded-md"
                        onMouseEnter={account_dd}
                      >
                        <li className="flex gap-1 items-center font-Lexend">
                          Cover Letter <BiCaretDown />
                        </li>
                        <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0 z-10">
                          <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                            <li className="px-4 py-4 hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              <Link to={"/cover-letter-templates"}>
                                Cover Letter Templates
                              </Link>
                            </li>
                            <li className="px-4 py-4 hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend">
                              <Link to={"/cover-letter-examples"}>
                                Cover Letter Examples
                              </Link>
                            </li>
                            {dynamicPages?.map((item, index) => {
                              if (item.display !== "cover letter") return;
                              return (
                                <li
                                  className="px-4 py-4 hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white font-Lexend"
                                  key={index}
                                >
                                  <Link to={"/pages/" + item.slug}>
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </div>

                      {/* <li>
                    <Link
                      className="mx-2 hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                      to={"/page/about-us"}
                    >
                      About
                    </Link>
                  </li>  */}

                      <div
                        className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                        onMouseEnter={account_dd}
                      >
                        <li className="flex gap-1 flex-wrap items-center">
                          <Link to={"/blog"}>Blogs</Link>
                          <BiCaretDown />
                        </li>
                        <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0 z-50">
                          <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                            {our_settings_random_blogs.map(
                              (
                                our_settings_random_blogs,
                                index_our_settings_random_blogs
                              ) => (
                                <li
                                  key={index_our_settings_random_blogs}
                                  className="px-4 py-4 hover:border-l-4 transition border-[#00caa5] hover:bg-[#0072b1] text-[#616161] hover:text-white overflow-hidden w-full text-ellipsis"
                                >
                                  <Link
                                    to={
                                      "/blog/" + our_settings_random_blogs.slug
                                    }
                                  >
                                    {our_settings_random_blogs.name
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ") + "..."}
                                  </Link>
                                </li>
                              )
                            )}
                          </div>
                        </ul>
                      </div>

                      <li>
                        <Link
                          className="mx-2 hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md font-Lexend"
                          to={"/services"}
                        >
                          Services
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={"/packages"}
                          className="mx-2  hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md font-Lexend"
                        >
                          Pricing
                        </Link>
                      </li>
                    </ul>

                    {!user ? (
                      <div className="hidden lg:flex">
                        <Link
                          to={"/login"}
                          className="flex items-center cursor-pointer hover:text-[#0072b1]  font-Lexend"
                        >
                          <BiUserCircle
                            className="text-lg text-[#00bfab] hover:text-[#0072b1]"
                            size={36}
                            onClick={dropdown_menu}
                          />{" "}
                          <span className="text-black ml-2 hover:text-[#0072b1]">
                            Login
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <div className=" relative">
                        <div className="hidden xl:block">
                          <button
                            className={"flex items-center border-l gap-2 pl-2"}
                            ref={menuRef}
                            onClick={() => setIsDropOpen(!isDropOpen)}
                          >
                            <BiSolidUser className="bg-[#0072b1] text-white rounded-full p-1 text-2xl " />
                            {/* <h1 className="text-[#616161] text-lg font-semibold">
                          My Account
                        </h1> */}
                            <BiCaretDown
                              className="text-[#616161] text-md"
                              size={20}
                            />
                          </button>
                          {isDropOpen && (
                            <ul
                              className={`${isDropOpen ? "transition-all " : ""
                                }  flex flex-col absolute top-10 bg-white -left-8 w-[200px] p-1 z-20  shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg overflow-hidden`}
                            >
                              {links.map((link, idx) => (
                                <Link
                                  key={idx}
                                  to={link.href}
                                  className={`hover:bg-[#0072b1] hover:text-white  text-[#616161]  px-4 py-2  border-b rounded-md font-Lexend`}
                                >
                                  <li>{link.label}</li>
                                </Link>
                              ))}
                              <Link
                                to={"#"}
                                className={`hover:bg-[#0072b1] hover:text-white  text-[#616161] px-4 py-2  w-full rounded-md font-Lexend`}
                                onClick={() => destroy()}
                              >
                                <li className="">Sign out</li>
                              </Link>
                            </ul>
                          )}
                        </div>

                        <div className="hidden relative cursor-pointer">
                          <div
                            style={{ minHeight: "22px", minWidth: "22px" }}
                            className="select-none absolute max-h-8 max-w-8 text-primary font-bold   flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                          >
                            {cart.package[0]?.quantity
                              ? Number(cart?.package[0].quantity) +
                              cart?.services.length
                              : cart?.services.length}
                          </div>

                          <img
                            src={coin}
                            className="text-md ml-4 coin-icon"
                            width="30"
                            height="30"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={`relative cursor-pointer ${isCartEmpty ? "cursor-not-allowed" : ""
                        }`}
                      onClick={() => {
                        if (!isCartEmpty) {
                          user ? navigate("/cart") : navigate("/login");
                        }
                      }}
                    >
                      <div
                        style={{ minHeight: "20px", minWidth: "20px" }}
                        className="select-none absolute max-h-8 max-w-8 text-primary font-bold flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                      >
                        {cart.package[0]?.quantity
                          ? Number(cart?.package[0].quantity) +
                          cart?.services.length
                          : cart?.services.length}
                      </div>

                      <FaShoppingCart
                        className="text-[#0072b1] text-md ml-4"
                        size={25}
                      />
                    </div>

                    <div className="relative cursor-pointer">
                      <div
                        style={{ minHeight: "20px", minWidth: "20px" }}
                        className="select-none absolute max-h-8 max-w-8 text-primary font-bold   flex justify-center items-center text-sm -right-1 -top-1 bg-white rounded-full shadow-lg border"
                      >
                        {userCoins?.coins | 0}
                      </div>

                      <Link to={"/packages#coins_purchase"}>
                        <img
                          src={coin}
                          className="text-md ml-4 coin-icon"
                          width="30"
                          height="30"
                          id="coinIcon"
                        />
                      </Link>
                    </div>
                    {/* this is for coins in header of that person */}
                  </div>
                  <div className="ml-2 xl:hidden">
                    <BiMenu
                      size={40}
                      className="mobile_open"
                      id="mobile_open"
                      onClick={show}
                    />
                    <AiOutlineClose
                      size={40}
                      className="text-red-600 hidden mobile_close"
                      id="mobile_close"
                      onClick={hide}
                    />
                  </div>
                </div>

                <ul
                  className="items-center justify-between font_4 relative hidden flex-wrap font-Lexend"
                  id="dd_menu_mobile"
                >
                  <div className="dd_btn mx-2 px-2 text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]">
                    <li
                      className="flex justify-between  font-Lexend"
                      onClick={toggledropdown2}
                    >
                      Tools{" "}
                      <BiCaretDown
                        className={`mt-1 ${isDropdownOpen2 ? "transform rotate-180" : ""
                          }`}
                      />
                    </li>
                    {isDropdownOpen2 && (
                      <ul className="dd_menu text-center">
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          {user ? (
                            <Link
                              to={"/resume/formatting"}
                              state={{
                                isExample: false,
                                selectedTemplateId: 3,
                              }}
                            >
                              Create a Resume
                            </Link>
                          ) : (
                            <Link to={"/login"}>Create a Resume</Link>
                          )}
                        </li>
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          {user ? (
                            <Link
                              to={"/create-cover-letter/formatting"}
                              state={{
                                selectedTemplateId: 1,
                                isExample: false,
                                showCoverLetterModal: true,
                              }}
                            >
                              Create a Cover Letter
                            </Link>
                          ) : (
                            <Link to={"/login"}>Create a Cover Letter</Link>
                          )}
                        </li>
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={user ? "/import-resume" : "/login"}>
                            Import Resume
                          </Link>
                        </li>
                        {/* <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={user ? "/import-resume" : "/login"}>
                            ATS Checker
                          </Link>
                        </li> */}

                        {dynamicPages?.map((item, index) => {
                          if (item.display !== "tool") return;
                          return (
                            <li
                              className="px-4 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend"
                              key={index}
                            >
                              <Link to={"/pages/" + item.slug}>
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div className="dd_btn mx-2 px-2 text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]  font-Lexend">
                    <li
                      className="flex justify-between"
                      onClick={toggledropdown}
                    >
                      Resume{" "}
                      <BiCaretDown
                        className={`mt-1 ${isDropdownOpen ? "transform rotate-180" : ""
                          }`}
                      />
                    </li>
                    {isDropdownOpen && (
                      <ul className="dd_menu text-center">
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={"/resume-templates"}>Resume Template</Link>
                        </li>
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={"/resume-examples"}>Resume Examples</Link>
                        </li>
                        {dynamicPages?.map((item, idx) => {
                          if (item.display !== "resume") return;
                          return (
                            <li
                              className="border-b-2 last:border-b-0 px-4 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]  font-Lexend"
                              key={idx}
                            >
                              <Link to={"/pages/" + item.slug}>
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div className="dd_btn mx-2 px-2  text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]  font-Lexend">
                    <li
                      className="flex justify-between"
                      onClick={toggledropdown1}
                    >
                      Cover Letter{" "}
                      <BiCaretDown
                        className={`mt-1 ${isDropdownOpen1 ? "transform rotate-180" : ""
                          }`}
                      />
                    </li>
                    {isDropdownOpen1 && (
                      <ul className="dd_menu text-center z-50">
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={"/cover-letter-templates"}>
                            Cover Letter Templates
                          </Link>
                        </li>
                        <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]  font-Lexend">
                          <Link to={"/cover-letter-examples"}>
                            Cover Letter Examples
                          </Link>
                        </li>
                        {dynamicPages?.map((item, index) => {
                          if (item.display !== "cover letter") return;
                          return (
                            <li
                              className="border-b-2 last:border-b-0 px-4 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]  font-Lexend"
                              key={index}
                            >
                              <Link to={"/pages/" + item.slug}>
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div className="dd_btn mx-2 px-2 text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]  font-Lexend">
                    <li
                      className="flex justify-between  font-Lexend"
                      onClick={toggledropdown3}
                    >
                      <Link
                        to={"/blog"}
                        className="flex justify-between w-full"
                      >
                        Blogs
                      </Link>
                      <BiCaretDown
                        className={`mt-1 ${isDropdownOpen3 ? "transform rotate-180" : ""
                          }`}
                      />
                    </li>
                    {isDropdownOpen3 && (
                      <ul className="dd_menu ">
                        {our_settings_random_blogs.map(
                          (
                            our_settings_random_blogs,
                            index_our_settings_random_blogs
                          ) => (
                            <li
                              key={index_our_settings_random_blogs}
                              className="border-b-2 last:border-b-0 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1] overflow-hidden text-ellipsis w-[50] whitespace-nowrap  font-Lexend"
                            >
                              <Link
                                to={"/blog/" + our_settings_random_blogs.slug}
                              >
                                {our_settings_random_blogs.name
                                  .split(" ")
                                  .slice(0, 4)
                                  .join(" ") + "..."}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  <li className="mx-2 px-2 py-4 w-full border-b-2 border-[#ccc]  font-Lexend">
                    <Link
                      className=" text-[#616161] hover:text-[#0072b1] text-xl "
                      to={"/services"}
                    >
                      Services
                    </Link>
                  </li>

                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full  font-Lexend">
                    <Link
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                      to={"/packages"}
                    >
                      Pricing
                    </Link>
                  </li>

                  {!user ? (
                    <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full  font-Lexend">
                      <Link
                        className="text-[#616161] hover:text-[#0072b1] text-xl"
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full font-Lexend">
                        <Link
                          className="text-[#616161] hover:text-[#0072b1] text-xl"
                          to={"/account"}
                        >
                          Profile
                        </Link>
                      </li>

                      <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full   font-Lexend">
                        <Link
                          to={"/dashboard"}
                          className="  text-[#616161] hover:text-[#0072b1] text-xl"
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full font-Lexend">
                        <div
                          onClick={destroy}
                          className="text-[#616161] hover:text-[#0072b1] text-xl"
                        >
                          Signout
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Profile Incomplete */}
      <Modal open={showProfilePopup} className="w-full bg-gray-950/15">
        <>
          <Box
            className="shadow-custom-shadow max-w-11/12 xs:max-w-[550px] sm:max-w-[650px]"
            sx={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              borderRadius: "20px",
              flexDirection: "column",
              alignItems: "center",
              outline: "none",
              overflow: "auto",
            }}
          >
            <div className="bg-[#FAFAFA] border-b-2 w-full p-5 text-center rounded-t-3xl shadow-custom-shadow-2 flex gap-4 justify-between items-center">
              <h1 className="font-bold font-Lexend text-lg md:text-xl capitalize text-center text-[#343434] mx-auto">
                Profile Incomplete
              </h1>
              <button
                className="absolute right-4 top-6"
                onClick={closeProfilePopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M3.13099 0.515417L10.4996 7.88398L17.8299 0.553596C17.9919 0.381251 18.1869 0.243381 18.4034 0.148254C18.6199 0.0531259 18.8534 0.00269992 19.0898 0C19.5961 0 20.0817 0.201121 20.4397 0.55912C20.7977 0.917118 20.9988 1.40267 20.9988 1.90895C21.0033 2.143 20.9598 2.37548 20.8712 2.59213C20.7826 2.80879 20.6506 3.00505 20.4834 3.16886L13.0576 10.4992L20.4834 17.9251C20.798 18.2329 20.9825 18.6497 20.9988 19.0895C20.9988 19.5958 20.7977 20.0814 20.4397 20.4394C20.0817 20.7974 19.5961 20.9985 19.0898 20.9985C18.8466 21.0086 18.6038 20.968 18.3771 20.8792C18.1503 20.7905 17.9445 20.6556 17.7727 20.4831L10.4996 13.1145L3.15008 20.464C2.98879 20.6306 2.7961 20.7636 2.58313 20.8553C2.37016 20.9471 2.14113 20.9957 1.90926 20.9985C1.40298 20.9985 0.917428 20.7974 0.55943 20.4394C0.201432 20.0814 0.000310599 19.5958 0.000310599 19.0895C-0.00414012 18.8555 0.0392827 18.623 0.127914 18.4064C0.216546 18.1897 0.348517 17.9934 0.515728 17.8296L7.94156 10.4992L0.515728 3.07342C0.201104 2.76561 0.0166123 2.3488 0.000310599 1.90895C0.000310599 1.40267 0.201432 0.917118 0.55943 0.55912C0.917428 0.201121 1.40298 0 1.90926 0C2.36741 0.00572686 2.80647 0.190895 3.13099 0.515417Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <p className="text-center my-4 text-[#343434] font-normal text-[14px] md:text-[16px] font-Lexend w-9/12">
              your profile is currently incomplete. please complete your missing
              details.
            </p>
            <div className="flex justify-evenly gap-4 mb-8 mx-4">
              <button
                className="
                         border border-primary-green bg-primary-green text-white px-1 py-2 w-32 md:p-2 rounded-full mx-auto
                           font-semibold font-Lexend flex justify-center "
                onClick={() => navigate("/account")}
              >
                Sure
              </button>
              <button
                className="bg-white border-primary-green
                         border text-primary-green px-1 py-2 w-32 md:p-2 rounded-full mx-auto
                           font-semibold font-Lexend flex justify-center "
                onClick={closeProfilePopup}
              >
                Close
              </button>
            </div>
          </Box>
        </>
      </Modal>
      {/* Package Days Remaining */}
      <Modal open={showPackagePopup} className="w-full bg-gray-950/15">
        <>
          <Box
            className="shadow-custom-shadow max-w-11/12 xs:max-w-[550px] sm:max-w-[650px]"
            sx={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              borderRadius: "20px",
              flexDirection: "column",
              alignItems: "center",
              outline: "none",
              overflow: "auto",
            }}
            role="dialog"
            aria-labelledby="package-upgrade-title"
            aria-describedby="package-upgrade-description"
          >
            {/* Header Section */}
            <div className="bg-[#FAFAFA] border-b-2 w-full p-5 text-center rounded-t-3xl shadow-custom-shadow-2 flex gap-4 justify-between items-center relative">
              <h1
                id="package-upgrade-title"
                className="font-bold font-Lexend text-lg md:text-xl capitalize text-center text-red-700/80 mx-auto"
              >
                Package Alert!
              </h1>
              <button
                className="absolute right-4 top-6"
                onClick={closePackagePopup}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M3.13099 0.515417L10.4996 7.88398L17.8299 0.553596C17.9919 0.381251 18.1869 0.243381 18.4034 0.148254C18.6199 0.0531259 18.8534 0.00269992 19.0898 0C19.5961 0 20.0817 0.201121 20.4397 0.55912C20.7977 0.917118 20.9988 1.40267 20.9988 1.90895C21.0033 2.143 20.9598 2.37548 20.8712 2.59213C20.7826 2.80879 20.6506 3.00505 20.4834 3.16886L13.0576 10.4992L20.4834 17.9251C20.798 18.2329 20.9825 18.6497 20.9988 19.0895C20.9988 19.5958 20.7977 20.0814 20.4397 20.4394C20.0817 20.7974 19.5961 20.9985 19.0898 20.9985C18.8466 21.0086 18.6038 20.968 18.3771 20.8792C18.1503 20.7905 17.9445 20.6556 17.7727 20.4831L10.4996 13.1145L3.15008 20.464C2.98879 20.6306 2.7961 20.7636 2.58313 20.8553C2.37016 20.9471 2.14113 20.9957 1.90926 20.9985C1.40298 20.9985 0.917428 20.7974 0.55943 20.4394C0.201432 20.0814 0.000310599 19.5958 0.000310599 19.0895C-0.00414012 18.8555 0.0392827 18.623 0.127914 18.4064C0.216546 18.1897 0.348517 17.9934 0.515728 17.8296L7.94156 10.4992L0.515728 3.07342C0.201104 2.76561 0.0166123 2.3488 0.000310599 1.90895C0.000310599 1.40267 0.201432 0.917118 0.55943 0.55912C0.917428 0.201121 1.40298 0 1.90926 0C2.36741 0.00572686 2.80647 0.190895 3.13099 0.515417Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            {/* Remaining Days */}
            <div className="bg-primary-blue/10 rounded-lg p-2 text-center mt-8">
              <div className="text-primary-blue text-4xl font-bold">
                {PackageDays}
              </div>
              <div className="text-primary-blue text-xs font-semibold">
                Remaining Days
              </div>
            </div>

            {/* Description */}
            <p
              id="package-upgrade-description"
              className="text-center my-4 text-[#343434] font-normal text-[14px] md:text-[16px] font-Lexend w-9/12"
            >
              Ensure uninterrupted access to premium features by renewing or
              upgrading your plan.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-evenly gap-4 mb-8 mx-4">
              <button
                className="border border-primary-blue bg-primary-blue text-white px-1 py-2 w-32 md:p-2 rounded-full mx-auto font-semibold font-Lexend flex justify-center hover:bg-primary-green-dark"
                onClick={() => navigate("/packages")}
              >
                Upgrade
              </button>
              <button
                className="bg-white border-red-800 border text-red-800 px-1 py-2 w-32 md:p-2 rounded-full mx-auto font-semibold font-Lexend flex justify-center hover:bg-primary-green-light"
                onClick={closePackagePopup}
              >
                Cancel
              </button>
            </div>
          </Box>
        </>
      </Modal>
    </>
  );
}

export default Header;
