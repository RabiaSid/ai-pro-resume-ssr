import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { LuPlus } from "react-icons/lu";
import plus_resume from "../assets/images/plus_resume.webp";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
export default function CreateNewResumeOrCoverLetter() {
  const [isOpen1, setIsOpen1] = useState(false);

  const navigate = useNavigate();
  const doc_new = (name) => {
    if (name === "Resume") {
      navigate("/resume/formatting", {
        state: { isExample: false, selectedTemplateId: 3 },
      });
    } else {
      navigate("/create-cover-letter/formatting", {
        state: { isExample: false, selectedTemplateId: 1 },
      });
    }
  };

  return (
    <>
      <div className="custom_create_resume z-[100] relative block sm:hidden">
        <div className="fixed z-[40] bottom-[150px] right-[24px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] bg-white rounded-full ">
          <button
            type="button"
            className="rounded-full p-2 text-white z-[40]"
            onClick={() => setIsOpen1(!isOpen1)}
          >
            <img src={plus_resume} alt="icon" className="h-8 w-8" />
          </button>
        </div>

        {isOpen1 && (
          <div className="origin-top-right fixed z-[40] bottom-[210px] right-0 mt-2 w-56">
            <div className="flex flex-col items-end justify-center gap-3 p-3">
              <div
                onClick={() => doc_new("Resume")}
                className="flex items-center justify-center shadow-[0px_0px_10px_rgba(0,0,0,0.3)] gap-2 text-md p-1 text-white font-bold border-2 border-white rounded-3xl px-2 bg-[#01B2AC]"
              >
                <LuPlus />
                <span> New Resume </span>
              </div>
              <div
                onClick={() => doc_new("Cover Letter")}
                className="flex items-center justify-center shadow-[0px_0px_10px_rgba(0,0,0,0.3)] gap-2 text-md p-1 bg-[#0072B1] rounded-3xl px-2 text-white border-2 border-white font-bold"
              >
                <LuPlus />
                <span>New Cover Letter</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
