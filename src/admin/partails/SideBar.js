import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {
  BiHome,
  BiGitRepoForked,
  BiUser,
  BiSolidEdit,
  BiCoin,
  BiCertification,
  BiWebcam,
} from "react-icons/bi";
import { BiSolidChevronDown } from "react-icons/bi";
import {
  LuUsers,
  LuLayers,
  LuServer,
  LuFileText,
  LuArchive,
  LuSettings,
  LuFileJson,
  LuGraduationCap,
  LuList,
  LuFileArchive,
  LuFileBadge2,
  LuUserCheck,
  LuTable,
  LuDatabase,
  LuWebhook,
} from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";
import { BiSpreadsheet } from "react-icons/bi";
import { TfiLayoutSlider } from "react-icons/tfi";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TbCategory2, TbEdit } from "react-icons/tb";

import { useAuth } from "../../services/Auth";

const SideBar = ({ sideBarStatus }) => {
  const location = useLocation();
  const { userPermissions, user } = useAuth();

  const SubNavRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [subLinksOpen, setSubLinksOpen] = useState(false);

  const [exampleLink, setExampleLink] = useState(false);

  const links = [
    { link: "dashboard", text: "DASHBOARD", role: "dashboard" },
    { link: "roles", text: "ROLES", role: "role-list" },
    { link: "admins", text: "ADMINS", role: "admin-list" },
    { link: "blogs", text: "BLOGS", role: "blog-list" },
    { link: "users", text: "USERS", role: "user-list" },
    { link: "career", text: "CAREER", role: "career-list" },
    { link: "coupon", text: "COUPONS", role: "coupon-list" },
    { link: "objective", text: "OBJECTIVE", role: "objective-list" },
    {
      link: "exsuggestion",
      text: "EXPERIENCE SUGGESTIONS",
      role: "experience-suggestion-list",
    },
    { link: "coins", text: "COINS", role: "coin-list" },
    {
      link: "intersted-user",
      text: "INTERSTED USERS",
      role: "interested-user-list",
    },
    { link: "packages", text: "PACKAGE", role: "package-list" },

    { link: "user-services", text: "USER SERVICES", role: "user-service-list" },

    { link: "admin_services", text: "SERVICES", role: "service-list" },
    {
      link: "resume-templates",
      text: "RESUME TEMPLATES",
      role: "resume-template-list",
    },
    {
      link: "cover-templates",
      text: "COVER TEMPLATES",
      role: "cover-template-list",
    },
    {
      link: "resume-examples",
      text: "RESUME EXAMPLES",
      role: "resume-example-list",
    },
    {
      link: "cover-examples",
      text: "COVER EXAMPLES",
      role: "cover-example-list",
    },
    {
      link: "cover-letter-body-suggestions",
      text: "COVER BODY SUGGESTIONS",
      role: "cover-example-list",
    },
    {
      link: "cover-letter-opener-suggestions",
      text: "COVER OPENER SUGGESTIONS",
      role: "cover-example-list",
    },
    {
      link: "order-history",
      text: "ORDER HISTORY",
      role: "order-history-list",
    },
    { link: "subscriber", text: "SUBSCRIBER", role: "subscriber-list" },
    { link: "categories", text: "CATEGORIES", role: "category-list" },
    { link: "job-listing", text: "APPLICATIONS", role: "applied-job-list" },
    { link: "settings", text: "SETTINGS", role: "setting-list" },
    { link: "ads", text: "ADS", role: "ads-list" },
    {
      link: "#",
      text: "WEB SECTION",
      role: "web-section-list",
      subNav: [
        { link: "listings", text: "PAGES", role: "listing-list" },
        // { link: "sliders", text: "SLIDER", role: "slider-list" },
        { link: "partners", text: "PARTNERS", role: "partner-list" },
        { link: "reviews", text: "REVIEWS", role: "review-list" },
        { link: "faqs", text: "FAQS", role: "faq-list" },
      ],
    },
    {
      link: "#",
      text: "EXAMPLES SECTION",
      role: "example-section-list",
      subNavExample: [
        {
          link: "job_position",
          text: "JOB POSITIONS",
          role: "job-position-list",
        },
        { link: "summary", text: "SUMMARY", role: "summary-example-list" },
        {
          link: "soft-skills",
          text: "SOFT SKILLS",
          role: "soft-skill-example-list",
        },
        {
          link: "tech-skills",
          text: "TECH SKILLS",
          role: "tech-skill-example-list",
        },
        {
          link: "education",
          text: "EDUCATION",
          role: "education-example-list",
        },
        {
          link: "certificate",
          text: "CERTIFICATE",
          role: "certificate-example-list",
        },
        {
          link: "experience",
          text: "EXPERIENCE",
          role: "experience-example-list",
        },
      ],
    },
  ];

  const iconMap = {
    DASHBOARD: BiHome,
    ROLES: BiGitRepoForked,
    ADMINS: BiUser,
    BLOGS: BiSolidEdit,
    USERS: LuUsers,
    CAREER: PiStudent,
    COINS: BiCoin,
    "INTERSTED USERS": BiUser,
    SUMMARY: BiSpreadsheet,
    EDUCATION: LuGraduationCap,
    "SOFT SKILLS": BiSpreadsheet,
    "TECH SKILLS": BiSpreadsheet,
    CERTIFICATE: BiCertification,
    EXPERIENCE: SlBadge,
    "USER SERVICES": LuDatabase,
    "JOB POSITIONS": LuFileText,
    "EXAMPLES SECTION": BiWebcam,
    APPLICATIONS: LuList,
    CATEGORIES: TbEdit,
    SUBSCRIBER: LuUserCheck,

    LISTINGS: AiOutlineUnorderedList,
    // SLIDER: TfiLayoutSlider,
    PARTNERS: PiUsersThree,
    REVIEWS: MdOutlineReviews,
    FAQS: RiQuestionAnswerLine,
    SERVICES: LuServer,
    "RESUME TEMPLATES": LuFileText,
    "COVER TEMPLATES": LuFileJson,
    "RESUME EXAMPLES": LuFileArchive,
    "COVER EXAMPLES": LuFileBadge2,
    "ORDER HISTORY": LuArchive,
    CATEGORIES: TbCategory2,
    SETTINGS: LuSettings,
    ADS: LuArchive,
    "WEB SECTION": LuWebhook,

    COUPONS: LuLayers,
    OBJECTIVE: LuTable,
    "EXPERIENCE SUGGESTIONS": LuTable,
    PACKAGE: LuTable,

    "COVER BODY SUGGESTIONS": LuLayers,
    "COVER OPENER SUGGESTIONS": LuLayers,
  };

  const hasPermission = (link) => {
    if (link.link === "#") {
      return (
        (link.subNav &&
          link.subNav.some((subLink) =>
            userPermissions.includes(subLink.role)
          )) ||
        (link.subNavExample &&
          link.subNavExample.some((subLink) =>
            userPermissions.includes(subLink.role)
          ))
      );
    } else {
      return userPermissions.includes(link.role);
    }
  };

  const filteredLinks = links.filter((link) => hasPermission(link));

  //
  const nameParts = user.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  return (
    <section
      style={{ height: "calc(100vh - 80px)" }}
      className={`${isMobile ? (sideBarStatus ? " left-0" : "w-full -left-full") : ""
        } ${!isMobile ? (sideBarStatus ? "w-[300px]" : "w-auto") : ""
        } overflow-y-scroll flex absolute sm:relative bg-white`}
    >
      <div
        className={`!bg-white h-fit  clear-both w-[60px] transition-all flex flex-col  ${sideBarStatus ? "pt-40" : "pt-4"
          }  z-10`}
      >
        <ul className="flex flex-col gap-8">
          {/* Dashboard */}
          <li className="h-12 flex items-center justify-center">
            <NavLink to={"dashboard"}>
              <BiHome className="text-primary" size={30} />
            </NavLink>
          </li>
          {/*  */}
          {filteredLinks.map((link, idx) => {
            const IconComponent = iconMap[link.text.toUpperCase()];
            return hasPermission(link) ? (
              <li
                key={idx}
                className={`h-12 flex items-center justify-center ${subLinksOpen && "last:mt-[23rem]"
                  }  `}
              >
                <NavLink to={link.link}>
                  <IconComponent className="text-primary" size={30} />
                </NavLink>
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div
        className={`bg-[#0072b1]  font_1 text-lg min-h-screen  h-fit relative pb-10  ${sideBarStatus
          ? "left-0 w-full  sm:w-[240px]"
          : "-left-full w-0 overflow-hidden"
          } transition-all`}
      >
        <div className="h-40 flex items-center justify-center flex-col gap-2">
          {user.image !== null ? (
            <img
              src={global.imageUrl + user.image}
              alt="My Image"
              width={100}
              height={100}
              className="border-4 border-white rounded-full w-28 h-28"
            />
          ) : (
            <span className="user-profile-image border-4 border-white rounded-full w-28 h-28 flex justify-center items-center text-4xl text-white bg-black">
              {firstNameInitial}
            </span>
          )}
          <h1 className="text-sm text-white">{user.name}</h1>
        </div>
        <div>
          <ul className="flex flex-col gap-8 justify-center">
            <li>
              <NavLink
                to="dashboard"
                className={`${location.pathname === `/admin/dashboard`
                  ? "bg-white text-[#0072b1]"
                  : "bg-[#0072b1] text-white"
                  } hover:bg-white  hover:text-[#0072b1] px-4 py-2 mr-4 rounded-r-3xl text-base h-12 flex items-center`}
              >
                DASHBOARD
              </NavLink>
            </li>
            {filteredLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.link}
                  exact
                  onClick={() =>
                    link.subNav
                      ? setSubLinksOpen(!subLinksOpen)
                      : link.subNavExample
                        ? setExampleLink(!exampleLink)
                        : ""
                  }
                  className={({ isActive }) =>
                    `${location.pathname === `/admin/${link.link}`
                      ? "bg-white text-[#0072b1]"
                      : "bg-[#0072b1] text-white"
                    }   hover:bg-white hover:text-[#0072b1] px-4 py-2 mr-4 rounded-r-3xl text-base h-12 flex items-center
                    ${link.subNav
                      ? subLinksOpen
                        ? "bg-white !text-[#0072b1]"
                        : ""
                      : ""
                    }
                    
                    ${link.subNavExample
                      ? exampleLink
                        ? "bg-white !text-[#0072b1]"
                        : ""
                      : ""
                    }
                    `
                  }
                >
                  <span className="w-56">{link.text}</span>{" "}
                  {link.subNav && (
                    <BiSolidChevronDown
                      className={`${subLinksOpen ? "" : "-rotate-180"
                        } transition-all ml-2 text-xl`}
                    />
                  )}
                  {link.subNavExample && (
                    <BiSolidChevronDown
                      className={`${exampleLink ? "" : "-rotate-180"
                        } transition-all ml-2 text-2xl`}
                    />
                  )}
                </NavLink>

                {link.subNav && subLinksOpen && (
                  <ul
                    ref={SubNavRef}
                    className={`py-[32px] transition-all flex flex-col gap-4 justify-center bg-[#01c8ab] `}
                  >
                    {link.subNav.map((subLink, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={subLink.link}
                          exact
                          activeClassName="text-red-500"
                          className={({ isActive }) =>
                            `${location.pathname === `/admin/${subLink.link}`
                              ? "bg-[#f4f2f3] text-[#0072b1]"
                              : "bg-transparent  text-[#f4f2f3]"
                            }   hover:bg-[#0072b1] hover:text-[#f4f2f3] px-4 py-2 mr-4 rounded-r-3xl text-base h-12 flex items-center`
                          }
                        >
                          {subLink.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Example Link */}
                {link.subNavExample && exampleLink && (
                  <ul
                    ref={SubNavRef}
                    className={`py-[32px] transition-all flex flex-col gap-4 justify-center bg-[#01c8ab] `}
                  >
                    {link.subNavExample.map((subLink, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={subLink.link}
                          exact
                          activeClassName="text-red-500"
                          className={({ isActive }) =>
                            `${location.pathname === `/admin/${subLink.link}`
                              ? "bg-[#f4f2f3] text-[#0072b1]"
                              : "bg-transparent  text-[#f4f2f3]"
                            }   hover:bg-[#0072b1] hover:text-[#f4f2f3] px-4 py-2 mr-4 rounded-r-3xl text-base h-12 flex items-center`
                          }
                        >
                          {subLink.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
