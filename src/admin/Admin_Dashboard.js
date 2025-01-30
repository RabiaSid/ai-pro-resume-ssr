import React, { useState } from "react";
import {
  BiCertification,
  BiCoin,
  BiGitRepoForked,
  BiSolidEdit,
  BiSpreadsheet,
  BiUser,
} from "react-icons/bi";
import {
  LuAlbum,
  LuArchive,
  LuAward,
  LuDatabase,
  LuFileArchive,
  LuFileBadge2,
  LuFileJson,
  LuFileText,
  LuFunctionSquare,
  LuGraduationCap,
  LuHeartHandshake,
  LuLayers,
  LuList,
  LuServer,
  LuSettings,
  LuShare,
  LuSheet,
  LuSliders,
  LuTable,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { useAuth } from "../services/Auth";
import { AiOutlineLayout } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";

const AdminDashboard = () => {
  const { userPermissions } = useAuth();

  const permissionMappings = [
    {
      permission: "role-list",
      text: "ROLES",
      icon: <BiGitRepoForked className="text-6xl text-[#0072b1] " />,
      link: "/admin/roles",
    },
    {
      permission: "admin-list",
      text: "ADMINS",
      icon: <BiUser className="text-6xl text-[#0072b1] " />,
      link: "/admin/admins",
    },
    {
      permission: "blog-list",
      text: "BLOGS",
      icon: <BiSolidEdit className="text-6xl text-[#0072b1] " />,
      link: "/admin/blogs",
    },
    {
      permission: "user-list",
      text: "USERS",
      icon: <LuUsers className="text-6xl text-[#0072b1] " />,
      link: "/admin/users",
    },
    {
      permission: "career-list",
      text: "CAREERS",
      icon: <PiStudent className="text-6xl text-[#0072b1] " />,
      link: "/admin/career",
    },
    {
      permission: "coupon-list",
      text: "COUPONS",
      icon: <LuLayers className="text-6xl text-[#0072b1] " />,
      link: "/admin/coupon",
    },
    {
      permission: "objective-list",
      text: "OBJECTIVES",
      icon: <LuTable className="text-6xl text-[#0072b1] " />,
      link: "/admin/objective",
    },
    {
      permission: "experience-suggestion-list",
      text: "EXPERIENCE SUGGESTION",
      icon: <LuTable className="text-6xl text-[#0072b1] " />,
      link: "/admin/exsuggestion",
    },
    {
      permission: "coin-list",
      text: "COINS",
      icon: <BiCoin className="text-6xl text-[#0072b1] " />,
      link: "/admin/coins",
    },
    {
      permission: "interested-user-list",
      text: "INTERSTED USER",
      icon: <BiUser className="text-6xl text-[#0072b1] " />,
      link: "/admin/intersted-user",
    },
    {
      permission: "user-service-list",
      text: "USER SERVICES",
      icon: <LuDatabase className="text-6xl text-[#0072b1] " />,
      link: "/admin/user-services",
    },
    {
      permission: "service-list",
      text: "SERVICES",
      icon: <LuServer className="text-6xl text-[#0072b1] " />,
      link: "/admin/admin_services",
    },
    {
      permission: "resume-template-list",
      text: "Resume Templates",
      icon: <LuFileText className="text-6xl text-[#0072b1] " />,
      link: "/admin/resume-templates",
    },
    {
      permission: "cover-template-list",
      text: "COVER-LETTER TEMPLATES",
      icon: <LuFileJson className="text-6xl text-[#0072b1] " />,
      link: "/admin/cover-templates",
    },
    {
      permission: "resume-example-list",
      text: "RESUME Examples",
      icon: <LuFileArchive className="text-6xl text-[#0072b1] " />,
      link: "/admin/resume-examples",
    },
    {
      permission: "cover-example-list",
      text: "COVER-LETTER EXAMPLES",
      icon: <LuFileBadge2 className="text-6xl text-[#0072b1] " />,
      link: "/admin/cover-examples",
    },
    {
      permission: "order-history-list",
      text: "ORDER HISTORY",
      icon: <LuArchive className="text-6xl text-[#0072b1] " />,
      link: "/admin/order-history",
    },
    {
      permission: "subscriber-list",
      text: "Subscribers",
      icon: <LuUserCheck className="text-6xl text-[#0072b1] " />,
      link: "/admin/subscriber",
    },
    {
      permission: "category-list",
      text: "CATEGORIES",
      icon: <TbCategory2 className="text-6xl text-[#0072b1] " />,
      link: "/admin/categories",
    },
    {
      permission: "applied-job-list",
      text: "APPLICATIONS",
      icon: <LuList className="text-6xl text-[#0072b1] " />,
      link: "/admin/job-listing",
    },
    {
      permission: "setting-list",
      text: "SETTINGS",
      icon: <LuSettings className="text-6xl text-[#0072b1] " />,
      link: "/admin/settings",
    },
    {
      permission: "ads-list",
      text: "ADS",
      icon: <LuArchive className="text-6xl text-[#0072b1] " />,
      link: "/admin/ads",
    },
    {
      permission: "listing-list",
      text: "listings",
      icon: <AiOutlineLayout className="text-6xl text-[#0072b1] " />,
      link: "/admin/listings",
    },
    {
      permission: "slider-list",
      text: "SLIDER",
      icon: <LuSliders className="text-6xl text-[#0072b1] " />,
      link: "/admin/sliders",
    },
    {
      permission: "partner-list",
      text: "PARTNERS",
      icon: <LuHeartHandshake className="text-6xl text-[#0072b1] " />,
      link: "/admin/partners",
    },
    {
      permission: "review-list",
      text: "REVIEWS",
      icon: <LuAlbum className="text-6xl text-[#0072b1] " />,
      link: "/admin/reviews",
    },
    {
      permission: "faq-list",
      text: "FAQS",
      icon: <LuFunctionSquare className="text-6xl text-[#0072b1] " />,
      link: "/admin/faqs",
    },
    {
      permission: "job-position-list",
      text: "JOB POSITIONS",
      icon: <LuAward className="text-6xl text-[#0072b1] " />,
      link: "/admin/job-position",
    },

    {
      permission: "summary-example-list",
      text: "SUMMARY",
      icon: <LuShare className="text-6xl text-[#0072b1] " />,
      link: "/admin/summary",
    },
    {
      permission: "soft-skill-example-list",
      text: "SOFT_SKILLS",
      icon: <LuSheet className="text-6xl text-[#0072b1] " />,
      link: "/admin/soft-skills",
    },
    {
      permission: "tech-skill-example-list",
      text: "TECH_SKILLS",
      icon: <BiSpreadsheet className="text-6xl text-[#0072b1] " />,
      link: "/admin/tech-skills",
    },
    {
      permission: "education-example-list",
      text: "EDUCATION",
      icon: <LuGraduationCap className="text-6xl text-[#0072b1] " />,
      link: "/admin/education",
    },
    {
      permission: "certificate-example-list",
      text: "CERTIFICATES",
      icon: <BiCertification className="text-6xl text-[#0072b1] " />,
      link: "/admin/certificate",
    },
    {
      permission: "experience-example-list",
      text: "EXPERIENCE",
      icon: <SlBadge className="text-6xl text-[#0072b1] " />,
      link: "/admin/experience",
    },
  ];
  return (
    <>
      <div id="main_contents" className="w-full">
        <div className=" flex flex-col gap-8">
          {/* Search Section */}
          <div className="flex justify-between items-center flex-wrap mt-[5%]">
            <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
              <div className="font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg">
                DASHBOARD
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full px-6 py-3">
              <div className="text-[#959492] font_3 text-md px-4 border-r-2 border-[#e1dfe0]">
                Home
              </div>
              <div className="flex items-center justify-center text-[#959492] font_3 text-md px-4">
                All Dashboard
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-md overflow-hidden">
            {/* Header */}
            <div className="p-2 bg-primary">
              <h1 className="font-light text-white text-base">
                DASHBOARD PANEL
              </h1>
            </div>

            <div className="bg-primary-gray px-12 py-8">
              <ul className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8">
                {permissionMappings.map((mapping, index) => {
                  // Check if the user has the required permission
                  if (userPermissions.includes(mapping.permission)) {
                    return (
                      <Link key={index} to={mapping.link}>
                        <li className="bg-white rounded-md h-40 flex justify-center items-center  hover:border-2 hover:border-b-8 hover:border-[#0075b1]">
                          <div className="flex flex-col justify-center items-center">
                            {mapping.icon}
                            <h1 className="text-lg font-bold text-center">
                              {mapping.text.toUpperCase()}
                            </h1>
                          </div>
                        </li>
                      </Link>
                    );
                  }
                  return null; // If user doesn't have permission, don't render anything
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
