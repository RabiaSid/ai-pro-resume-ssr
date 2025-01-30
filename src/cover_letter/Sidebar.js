import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BiSolidChat,
  BiHome,
  BiGitRepoForked,
  BiUser,
  BiSolidEdit,
  BiLockOpenAlt,
} from "react-icons/bi";
import {
  LuUsers,
  LuLayers,
  LuServer,
  LuFileText,
  LuPanelTop,
  LuArchive,
  LuSettings,
  LuMails,

} from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import Cookies from "js-cookie";
import { Link, useLocation, useParams } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import swal from "sweetalert";
import { useAuth } from '../services/Auth';

const Sidebar = ({ sideBarStatus }) => {
  const { user } = useAuth()
  const user_name = global.getCookie("name");
  const user_image = global.getCookie("user_image");
  const res_profile_id = Cookies.get("profile_id");

  const location = useLocation();
  const page_uuid = useParams().id;
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );
  const templateid = new URLSearchParams(window.location.search).get('templateid');
  const exampleid = new URLSearchParams(window.location.search).get('exampleid');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [temp_id, set_temp_id] = useState();

  const [isLockedLink, setIsLockedLink] = useState(true);

  useEffect(() => {
    console.log(user?.image);
    const coverTemplateId = res_profile_id;
    set_temp_id(coverTemplateId);

    setIsLockedLink(coverTemplateId ? false : true);
  });

  const [sideBarLinks, setSideBarLinks] = useState([
    {
      name: "HEADER",
      link:
        isExampleTrue === "true"
          ? `header/${page_uuid + "?example=true&templateid=" + templateid}`
          : page_uuid && isExampleTrue === null
            ? `header/${page_uuid}`
            : "header",
    },
    {
      name: "OPENER",
      link:
        isExampleTrue === "true"
          ? `opener/${page_uuid + "?example=true&exampleid=" + exampleid}`
          : page_uuid && isExampleTrue === null
            ? `opener/${page_uuid}`
            : "opener",
    },
    {
      name: "BODY",
      link:
        isExampleTrue === "true"
          ? `body/${page_uuid + "?example=true&exampleid=" + exampleid}`
          : page_uuid && isExampleTrue === null
            ? `body/${page_uuid}`
            : "body",
    },
    {
      name: "CLOSER",
      link: page_uuid ? `closer/${page_uuid}` : "closer",
      isLocked: isLockedLink,
    },
    {
      name: "REVIEW",
      link: page_uuid ? `formatting` : "formatting",
      isLocked: isLockedLink,
    },
  ]);

  const nameParts = user?.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  return (
    <section id='sidebar' className="bg-[#0072b1] hidden w-full  lg:w-[25%] xl:w-[20%] 2xl:w-[15%] lg:block sticky top-0 z-[9999] ">
      <div className="flex items-center justify-between h-fit pb-[450px] flex-wrap w-full">
        <div className="h-40 flex items-center justify-center flex-col gap-2 w-full mt-10">
          {user?.image !== null ? (
            <img
              src={global.imageUrl + user?.image}
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
          <h1 className="text-sm text-white">{user?.name}</h1>
        </div>

        <div className="flex flex-col w-full mt-10">
          {sideBarLinks.map((link, idx) => {
            const state = {
              cover_template_id: temp_id,
            };

            return (
              <Link
                to={link.link}
                state={state}
                key={idx}
                onClick={(e) => {
                  if (link.name === "OPENER" || link.name === "BODY" || link.name === "CLOSER" || link.name === "REVIEW") {
                    if (isLockedLink) {
                      e.preventDefault();
                      // swal({
                      //   title: "Empty Fields",
                      //   text: "You have to fill Header, Opener and Closer First",
                      // });
                    }
                  }
                }}
                className={`ml-5 flex justify-between items-center rounded-l-full my-2 px-4 py-2
              ${location.pathname ===
                    `/create-cover-letter/${link.name.toLocaleLowerCase()}`
                    ? "bg-white text-[#00caa5]"
                    : "bg-transparent text-white hover:text-[#00caa5] hover:bg-white"
                  }
              `}
              >
                <div className="flex justify-between items-center w-full font_3">{link.name} {isLockedLink ? link.name === "OPENER" ? <BiLockOpenAlt /> : "" : ""} {isLockedLink ? link.name === "BODY" ? <BiLockOpenAlt /> : "" : ""} {isLockedLink ? link.name === "CLOSER" ? <BiLockOpenAlt /> : "" : ""} {isLockedLink ? link.name === "REVIEW" ? <BiLockOpenAlt /> : "" : ""}</div>
                {/* <span>
                  {isLockedLink ? link.name === "OPENER" ? <CiLock /> : "" : ""}
                </span>
                <span>
                  {isLockedLink ? link.name === "BODY" ? <CiLock /> : "" : ""}
                </span>
                <span>
                  {isLockedLink ? link.name === "CLOSER" ? <CiLock /> : "" : ""}
                </span>
                <span >
                  {isLockedLink ? link.name === "REVIEW" ? <CiLock /> : "" : ""}
                </span> */}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
