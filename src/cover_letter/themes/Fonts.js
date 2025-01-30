import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const Fonts = (props) => {
  const { activeFont, setActiveFontSize, userDetails } = props;
  const fonts = [
    {
      name: "font1",
      label: "Poppins",
    },
    {
      name: "font2",
      label: "Lato",
    },
    {
      name: "font3",
      label: "Roboto",
    },
    {
      name: "font4",
      label: "Manrope",
    },
    {
      name: "font5",
      label: "Raleway",
    },
    {
      name: "font6",
      label: "Almarai",
    },
    {
      name: "font7",
      label: "Sarala",
    },
    {
      name: "font8",
      label: "OpenSans",
    },
    {
      name: "font9",
      label: "Nokora",
    },
    {
      name: "font10",
      label: "Allerta",
    },
    {
      name: "font11",
      label: "Kanit",
    },
    {
      name: "font12",
      label: "Inter",
    },
    {
      name: "font13",
      label: "Montserrat",
    },
    {
      name: "font14",
      label: "JosefinSans",
    },
    {
      name: "font15",
      label: "PlayfairDisplay",
    },
    {
      name: "font16",
      label: "Gotu",
    },
  ];
  const fontSizes = [
    {
      name: "cover_fontsize1",
      label: "Small",
    },
    {
      name: "cover_fontsize2",
      label: "Medium",
    },
    {
      name: "cover_fontsize3",
      label: "Large",
    },
  ];

  const [currentFontFamily, setCurrentFontFamily] = useState(
    props.currentFont ? props.currentFont : "font1"
  );
  const [currentFontSize, setCurrentFontSize] = useState(
    props.currentFontSize ? props.currentFontSize : "fontsize2"
  );

  const setActiveFont = (font) => {
    activeFont(font);
  };

  const setFontSize = (size) => {
    setActiveFontSize(size);
  };
  const [count_restriction, set_count_restriction] = useState(0);
  console.log(userDetails);
  useEffect(() => {
    set_count_restriction(
      userDetails?.package_id == Number(1)
        ? 3
        : userDetails?.package_id == Number(2)
          ? 6
          : 50
    );
  }, []);

  console.log(count_restriction);

  return (
    <>
      <div className="flex p-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full font-Lexend text-lg font-bold text-[#0f4d76]">
            Font Style
          </div>
          {fonts.map((font, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (idx < count_restriction) {
                  setActiveFont(font.name);
                  setCurrentFontFamily(font.name);
                }
              }}
              className={
                currentFontFamily === font.name
                  ? "text-[#01B2AC] flex items-center w-full lg:w-[50%] font-semibold cursor-pointer mt-2 " +
                  font.label
                  : " w-full lg:w-[50%] flex items-center font-semibold cursor-pointer mt-2 " +
                  font.label
              }
            >
              {idx >= count_restriction ? (
                <Tooltip title="Upgrade Package to Use">
                  <div className="flex gap-1 items-center">
                    <FaLock
                      className="mr-1 text-primary-blue cursor-not-allowed"
                      size={12}
                    />
                    <div
                      className={
                        idx >= count_restriction
                          ? "cursor-not-allowed"
                          : "text-[#111] hover:text-[#01B2AC]"
                      }
                    >
                      {font.label}
                    </div>
                  </div>
                </Tooltip>
              ) : (

                <div
                  className={
                    idx >= count_restriction
                      ? "cursor-not-allowed ml-2"
                      : "text-[#111] hover:text-[#01B2AC]"
                  }
                >
                  {font.label}
                </div>
              )}

            </div>
          ))}

          <div className="w-full font-Lexend text-lg font-bold text-[#0f4d76] mt-4">
            Font Size
          </div>
          {fontSizes.map((size, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveFontSize(size.name);
                setCurrentFontSize(size.name);
              }}
              className={
                currentFontSize === size.name
                  ? "w-full text-[#01B2AC] font-semibold hover:text-[#01B2AC] cursor-pointer mt-2"
                  : "w-full text-[#111] font-semibold hover:text-[#01B2AC] cursor-pointer mt-2"
              }
            >
              {size.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Fonts;
