import React, { useEffect, useRef, useState } from "react";
import {
  BiCaretDown,
  BiUserCircle,
  BiMenuAltLeft,
  BiSolidUser,
  BiSolidBell,
  BiMenu,
} from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaCoins, FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import $ from "jquery";
import axios from "axios";
import { useCart } from "../data/CartStore";
import { Link, useNavigate } from "react-router-dom";
import coin from "../assets/images/dollar.webp";
import { ApiService } from "../services/ApiService";
import { title } from "process";
import { useAuth } from "../services/Auth";
import Logo from "../assets/images/logo_resume.webp";

function Header({ handleSideBarToggle, checkOpen }) {
  const links = [
    { href: "/account", label: "Profile" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const { user, clearSession } = useAuth();
  const [our_settings, set_our_settings] = useState([]);
  const [our_settings_random_blogs, set_our_settings_random_blogs] = useState(
    []
  );
  // const [numCoins, setNumCoins]=useState();
  const navigate = useNavigate();

  const [userCoins, setUserCoins] = useState();

  const [dynamicPages, setDynamicPages] = useState();

  useEffect(() => {
    ApiService.getHeaderDynamicPages()
      .then((res) => {
        // console.log(res.data.data);
        setDynamicPages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Carts
  const { cart, clearCart } = useCart();

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
        set_our_settings_random_blogs(response.data.data.randomBlogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user?.token) {
      ApiService.getCoins(user?.token)
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
    // ... (your existing useEffect)

    // Event listener to close dropdown when clicking outside
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
        // console.log(response);
        clearCart();
        clearSession();
        navigate("/");
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
  var chk_menu = 0;
  const sidemenu = () => {
    $("#sidebar").fadeToggle();
    if (chk_menu === 0) {
      $("#main_contents_wrap").addClass("c-w-full");
      chk_menu = 1;
    } else {
      $("#main_contents_wrap").removeClass("c-w-full");
      chk_menu = 0;
    }

    // if ($(window).width() < 768) {
    //   chk_menu = 1;

    //   // Adjust the main_contents width and marginLeft accordingly
    //   $("#main_contents").css("width", "100%");
    //   $("#main_contents").css("marginLeft", "0%");
    // } else {
    //   const sidebar = document.getElementById("sidebar");

    //   if (chk_menu === 0) {
    //     $("#main_contents").css("width", "100%");
    //     $("#main_contents").css("marginLeft", "0%");
    //     chk_menu = 1;
    //   } else {
    //     $("#main_contents").css("width", "85%");
    //     $("#main_contents").css("marginLeft", "15%");
    //     chk_menu = 0;
    //   }
    // }

    // if (handleSideBarToggle) {
    //   handleSideBarToggle();
    // }
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
    // Use the navigate function to go to the "/cart" route
    navigate("/cart");
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
  const handleToggleDiv = () => {
    $("#topContentCenter").fadeOut();
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
  return (
    <>
      <div className="top-0 left-0 w-full z-[99999]" id="topContentCenter">
        <div>
          <div className="flex text-center items-center justify-between  bg-[#0072b1] p-[3px] text-white font-size-2">
            <span className="flex-grow">
              Refer friends and earn coins for yourself!{" "}
              <Link
                className="text-[#00caa5] underline"
                to={user ? "/account" : "/login"}
              >
                Click Here
              </Link>{" "}
              To get Started with AI PRO RESUME
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
          <div className="flex items-center justify-between flex-wrap">
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

              {checkOpen === "dashboard" ||
                checkOpen === "documents" ||
                checkOpen === "formatting" ||
                checkOpen === "choose_template" ? (
                ""
              ) : (
                <BiMenuAltLeft
                  onClick={sidemenu}
                  className="text-[#616161] cursor-pointer hover:text-[#0072b1] text-4xl ml-5"
                />
              )}
            </div>
            <div className="flex justify-between items-center ">
              <ul className="items-center justify-between font_4 hidden xl:flex">
                <div
                  className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                  onMouseEnter={account_dd}
                >
                  <li className="flex items-center gap-1">
                    Tools <BiCaretDown />
                  </li>
                  <ul className="dd_menu absolute w-[250px] !mt-0 left-0 top-full">
                    <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                      <li className="px-4 py-4  hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white">
                        <Link to={user ? "/resume-loading" : "/login"}>
                          Create a Resume
                        </Link>
                      </li>
                      <li className="px-4 py-4  hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white">
                        <Link to={user ? "/cover-letter-loading" : "/login"}>
                          Create a Cover Letter
                        </Link>
                      </li>

                      {dynamicPages?.map((item, index) => {
                        if (item.display !== "tool") return;
                        return (
                          <li
                            className="px-4 py-4  hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white"
                            key={index}
                          >
                            <Link to={"/pageheader/" + item.slug}>
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </div>

                <div
                  className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                  onMouseEnter={account_dd}
                >
                  <li className="flex gap-1 items-center">
                    Resume <BiCaretDown />
                  </li>
                  <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0">
                    <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                      <li className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#fff69c] text-[#616161] hover:text-white">
                        <Link to={"/resume-templates"}>Resume Template's</Link>
                      </li>
                      <li className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#fff69c] text-[#616161] hover:text-white">
                        <Link to={"/resume-examples"}>Resume Example's</Link>
                      </li>
                      {dynamicPages?.map((item, idx) => {
                        if (item.display !== "resume") return;
                        return (
                          <li
                            className="px-4 py-4  hover:bg-[#0072b1] hover:border-l-4 transition border-[#fff69c] text-[#616161] hover:text-white"
                            key={idx}
                          >
                            <Link to={"/pageheader/" + item.slug}>
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </div>

                <div
                  className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                  onMouseEnter={account_dd}
                >
                  <li className="flex gap-1 items-center">
                    Cover Letter <BiCaretDown />
                  </li>
                  <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0">
                    <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                      <li className="px-4 py-4 hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white">
                        <Link to={"/cover-letter-templates"}>
                          Cover Letter Template's
                        </Link>
                      </li>
                      <li className="px-4 py-4 hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white">
                        <Link to={"/cover-letter-examples"}>
                          Cover Letter Example's
                        </Link>
                      </li>
                      {dynamicPages?.map((item, index) => {
                        if (item.display !== "cover letter") return;
                        return (
                          <li
                            className="px-4 py-4 hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white"
                            key={index}
                          >
                            <Link to={"/pageheader/" + item.slug}>
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
                </li> */}
                <li>
                  <Link
                    className="mx-2 hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                    to={"/services"}
                  >
                    Services
                  </Link>
                </li>

                {/* <div
                  className="dd_btn mx-2 relative hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                  onMouseEnter={account_dd}
                >
                  <li className="flex gap-1 flex-wrap items-center">
                    <Link to={"/blog"}>Blogs</Link>
                    <BiCaretDown />
                  </li>
                  <ul className="dd_menu transition absolute w-[250px] top-full !mt-0 left-0 z-10">
                    <div className="mt-2 bg-white overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
                      {our_settings_random_blogs.map(
                        (
                          our_settings_random_blogs,
                          index_our_settings_random_blogs
                        ) => (
                          <li
                            key={index_our_settings_random_blogs}
                            className="px-4 py-4 hover:border-l-4 transition border-[#fff69c] hover:bg-[#0072b1] text-[#616161] hover:text-white overflow-hidden w-full text-ellipsis"
                          >
                            <Link
                              to={"/blog/" + our_settings_random_blogs.slug}
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
                </div> */}

                <li>
                  <Link
                    to={"/contact-us"}
                    className="mx-2  hover:bg-[#0072b1] text-[#616161] hover:text-white py-3 px-4 rounded-md"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              {user?.token === "" ? (
                <div className="hidden lg:flex">
                  <Link
                    to={"/login"}
                    className="flex items-center cursor-pointer hover:text-[#0072b1] font_4"
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
                // siraj
                <div className=" relative">
                  <div>
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
                            className={`hover:bg-[#0072b1] hover:text-white  text-[#616161]  px-4 py-2 font_4 border-b rounded-md`}
                          >
                            <li>{link.label}</li>
                          </Link>
                        ))}
                        <Link
                          to={"#"}
                          className={`hover:bg-[#0072b1] hover:text-white  text-[#616161] px-4 py-2 font_4 w-full rounded-md`}
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
                className="relative cursor-pointer"
                onClick={() => {
                  user?.token ? handleButtonClick() : navigate("/login");
                }}
              >
                <div
                  style={{ minHeight: "22px", minWidth: "22px" }}
                  className="select-none absolute max-h-8 max-w-8 text-primary font-bold   flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                >
                  {cart.package[0]?.quantity
                    ? Number(cart?.package[0].quantity) + cart?.services.length
                    : cart?.services.length}
                </div>

                <FaShoppingCart
                  className="text-[#0072b1] text-md ml-4"
                  size={25}
                />
              </div>

              <div className="relative cursor-pointer">
                <div
                  style={{ minHeight: "22px", minWidth: "22px" }}
                  className="select-none absolute max-h-8 max-w-8 text-primary font-bold   flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                >
                  {userCoins?.coins | 0}
                </div>

                <img
                  src={coin}
                  className="text-md ml-4 coin-icon"
                  width="30"
                  height="30"
                />
              </div>
              {/* this is for coins in header of that person */}
            </div>

            <div className="xl:hidden">
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

            <ul
              className="items-center justify-between font_4 relative hidden flex-wrap"
              id="dd_menu_mobile"
            >
              <div className="dd_btn mx-2 px-2 text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]">
                <li className="flex justify-between" onClick={toggledropdown2}>
                  Tools{" "}
                  <BiCaretDown
                    className={`mt-1 ${isDropdownOpen2 ? "transform rotate-180" : ""
                      }`}
                  />
                </li>
                {isDropdownOpen2 && (
                  <ul className="dd_menu text-center">
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]">
                      {user?.token ? (
                        <Link to={"/resume-loading"}>Create a Resume</Link>
                      ) : (
                        <Link to={"/login"}>Create a Resume</Link>
                      )}
                    </li>
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]">
                      {user?.token ? (
                        <Link to={"/cover-letter-loading"}>
                          Create a Cover Letter
                        </Link>
                      ) : (
                        <Link to={"/login"}>Create a Cover Letter</Link>
                      )}
                    </li>
                    {dynamicPages?.map((item, index) => {
                      if (item.display !== "tool") return;
                      return (
                        <li
                          className="px-4 py-4 bg-[#fff] hover:bg-[#fff69c] text-[#616161] hover:text-[#0072b1]"
                          key={index}
                        >
                          <Link to={"/pageheader/" + item.slug}>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="dd_btn mx-2 px-2 text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]">
                <li className="flex justify-between" onClick={toggledropdown}>
                  Resume{" "}
                  <BiCaretDown
                    className={`mt-1 ${isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                  />
                </li>
                {isDropdownOpen && (
                  <ul className="dd_menu text-center">
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]">
                      <Link to={"/resume-templates"}>Resume Template</Link>
                    </li>
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff] text-[#616161] hover:text-[#0072b1]">
                      <Link to={"/resume-examples"}>Resume Examples</Link>
                    </li>
                    {dynamicPages?.map((item, idx) => {
                      if (item.display !== "resume") return;
                      return (
                        <li
                          className="border-b-2 last:border-b-0 px-4 py-4 bg-[#fff] hover:bg-[#fff69c] text-[#616161] hover:text-[#0072b1]"
                          key={idx}
                        >
                          <Link to={"/pageheader/" + item.slug}>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="dd_btn mx-2 px-2  text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]">
                <li className="flex justify-between" onClick={toggledropdown1}>
                  Cover Letter{" "}
                  <BiCaretDown
                    className={`mt-1 ${isDropdownOpen1 ? "transform rotate-180" : ""
                      }`}
                  />
                </li>
                {isDropdownOpen1 && (
                  <ul className="dd_menu text-center">
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]">
                      <Link to={"/cover-letter-templates"}>
                        Cover Letter Templates
                      </Link>
                    </li>
                    <li className="border-b-2 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1]">
                      <Link to={"/cover-letter-examples"}>
                        Cover Letter Examples
                      </Link>
                    </li>
                    {dynamicPages?.map((item, index) => {
                      if (item.display !== "cover letter") return;
                      return (
                        <li
                          className="border-b-2 last:border-b-0 px-4 py-4 bg-[#fff] hover:bg-[#fff69c] text-[#616161] hover:text-[#0072b1]"
                          key={index}
                        >
                          <Link to={"/pageheader/" + item.slug}>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* <li className="mx-2 px-2 py-4 w-full border-b-2 border-[#ccc]">
                <Link
                  to={"/page/about-us"}
                  className="hover:bg-[#fff69c] text-[#616161] hover:text-[#0072b1] text-xl "
                >
                  About
                </Link>
              </li> */}
              <li className="mx-2 px-2 py-4 w-full border-b-2 border-[#ccc]">
                <Link
                  to={"/services"}
                  className="hover:bg-[#fff69c] text-[#616161] hover:text-[#0072b1] text-xl "
                >
                  Services
                </Link>
              </li>

              {/* <div className="dd_btn mx-2 px-2  text-[#616161] hover:text-[#0072b1] text-xl py-4 w-full border-b-2 border-[#ccc]">
                <li className="flex justify-between" onClick={toggledropdown3}>
                  <Link to={"/blog"} className="flex justify-between w-full">
                    Blog{" "}
                    <BiCaretDown
                      className={`mt-1 ${
                        isDropdownOpen3 ? "transform rotate-180" : ""
                      }`}
                    />
                  </Link>
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
                          className="border-b-2 last:border-b-0 border-[#ccc] px-2 py-4 bg-[#fff]  text-[#616161] hover:text-[#0072b1] overflow-hidden text-ellipsis w-[50] whitespace-nowrap"
                        >
                          <Link to={"/blog/" + our_settings_random_blogs.slug}>
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
              </div> */}

              <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                <Link
                  to={"/contact-us"}
                  className="text-[#616161] hover:text-[#0072b1] text-xl"
                >
                  Contact
                </Link>
              </li>

              {user?.token === "" ? (
                <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                  <Link
                    to={"/login"}
                    className="  text-[#616161] hover:text-[#0072b1] text-xl"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/account"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/my-services"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      My Services
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/dashboard"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/documents/all"}
                      className=" text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      My Documents
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/documents/my_resumes"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      My Resumes
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/documents/my_cover_letter"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      My Cover Letters
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <Link
                      to={"/my-transaction"}
                      className="  text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      My Transaction
                    </Link>
                  </li>
                  <li className="border-b-2 border-[#ccc] mx-2 px-2 py-4 w-full">
                    <div
                      onClick={destroy}
                      className="text-[#616161] hover:text-[#0072b1] text-xl"
                    >
                      Logout
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
