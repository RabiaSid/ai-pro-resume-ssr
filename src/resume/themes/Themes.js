import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
const Themes = ({
  activeTheme,
  currentTheme: initialTheme,
  isChecked,
  userDetails,
  handleCheckboxChange,
}) => {
  const themes = [
    {
      name: "theme1",
      color1: "#22405c",
      color2: "#008cff",
    },
    {
      name: "theme2",
      color1: "#006666",
      color2: "#1ab0b3",
    },
    {
      name: "theme3",
      color1: "#8a0202",
      color2: "#fe6100",
    },
    {
      name: "theme4",
      color1: "#773c91",
      color2: "#2c242c",
    },
    {
      name: "theme5",
      color1: "#049eaf",
      color2: "#1f1e1e",
    },
    {
      name: "theme6",
      color1: "#005842",
      color2: "#00ad82",
    },
    {
      name: "theme7",
      color1: "#267bb1",
      color2: "#1f1e1e",
    },
    {
      name: "theme8",
      color1: "#2a0857",
      color2: "#7b1bf8",
    },
    {
      name: "theme9",
      color1: "#cd6155",
      color2: "#333",
    },
    {
      name: "theme10",
      color1: "#002a79",
      color2: "#4f88ae",
    },
    {
      name: "theme11",
      color1: "#32a02f",
      color2: "#061f06",
    },
    {
      name: "theme12",
      color1: "#042630",
      color2: "#60b0b3",
    },
    {
      name: "theme13",
      color1: "#293241",
      color2: "#ee6b4d",
    },
    {
      name: "theme14",
      color1: "#4e3b40",
      color2: "#ff6c82",
    },
    {
      name: "theme15",
      color1: "#570606",
      color2: "#ff2121",
    },
  ];

  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  const setActiveTheme = (theme) => {
    activeTheme(theme);
  };

  const [count_restriction, set_count_restriction] = useState(0);

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
      <div className="flex flex-row flex-wrap">
        <label className="cursor-pointer w-full font-Lexend text-md pl-4 mt-2 text-black hover:text-[#01B2AC]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(!isChecked)}
            className="mr-1"
          />{" "}
          Set as Default Theme
        </label>
        <div className="grid grid-cols-5 lg:grid-cols-5">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (idx < count_restriction) {
                  setActiveTheme(theme.name);
                  setCurrentTheme(theme.name);
                }
              }}
              className="shadow-md shadow-slate-300 rounded-full -rotate-90 relative flex flex-col m-3 justify-center items-center w-[50px] h-[50px] overflow-hidden cursor-pointer"
            >
              {idx >= count_restriction ? (
                <Tooltip title="Upgrade Package to Use">
                  <div className="absolute cursor-not-allowed rotate-90 z-40 bg-primary-blue text-white rounded-full border border-white w-7 h-7 flex justify-center items-center">
                    <FaLock size={15} />
                  </div>
                </Tooltip>
              ) : (
                ""
              )}
              <div
                className={
                  currentTheme === theme.name
                    ? "absolute rounded-full w-[20px] h-[20px] bg-[#01B2AC] border-white border-2 "
                    : "absolute rounded-full w-[20px] h-[20px] bg-slate-100 border-white border-2 "
                }
              ></div>

              <div
                style={{ background: theme.color1 }}
                className={`w-full h-full`}
              ></div>
              <div
                style={{ background: theme.color2 }}
                className={`w-full h-full`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Themes;
