import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const Fonts = (props) => {
  const { activeFont, activeFontSize, userDetails } = props;
  const fonts = [
    {
      name: "font1",
      label: "Arial",
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
      label: "Georgia",
    },
    {
      name: "font5",
      label: "Raleway",
    },
    {
      name: "font6",
      label: "Helvetica",
    },
    {
      name: "font7",
      label: "Trebuchet",
    },
    {
      name: "font8",
      label: "OpenSans",
    },
    {
      name: "font9",
      label: "Rubik",
    },
    {
      name: "font10",
      label: "Bitter",
    },
    {
      name: "font11",
      label: "Exo 2",
    },
    {
      name: "font12",
      label: "Chivo",
    },
    {
      name: "font13",
      label: "Montserrat",
    },
    {
      name: "font14",
      label: "Cambria",
    },
    {
      name: "font15",
      label: "Palatino",
    },
    {
      name: "font16",
      label: "Book Anitqua",
    },
    {
      name: "font17",
      label: "Times New Roman",
    },
    {
      name: "font18",
      label: "Volkhov",
    },
    {
      name: "font19",
      label: "Calibri",
    },
    {
      name: "font20",
      label: "Tahoma",
    },
  ];
  const fontSizes = [
    {
      name: "fontsize1",
      label: "Small",
    },
    {
      name: "fontsize2",
      label: "Medium",
    },
    {
      name: "fontsize3",
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

  const setAvtiveFontSize = (fontSize) => {
    activeFontSize(fontSize);
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
        <div className="flex flex-wrap justify-start items-center">
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
                  <div>
                    <FaLock
                      className="mr-1 text-primary-blue cursor-not-allowed"
                      size={12}
                    />
                  </div>
                </Tooltip>
              ) : (
                <div className="mr-[12px]">&nbsp;</div>
              )}
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
          ))}
          <div className="w-full font-Lexend text-lg font-bold text-[#0f4d76] mt-4">
            Font Size
          </div>
          {fontSizes.map((size, idx) => (
            <div
              key={idx}
              onClick={() => {
                setAvtiveFontSize(size.name);
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
