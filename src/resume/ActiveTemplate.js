import axios from "axios";
import React, { useEffect, useState } from "react";
// Dummy Templates
import Template_1 from "./templates/dummy/Templates_1";
import Template_2 from "./templates/dummy/Templates_2";
import Template_3 from "./templates/dummy/Templates_3";
import Template_4 from "./templates/dummy/Templates_4";
import Template_5 from "./templates/dummy/Templates_5";
import Template_6 from "./templates/dummy/Templates_6";
import Template_7 from "./templates/dummy/Templates_7";
import Template_8 from "./templates/dummy/Templates_8";
import Template_9 from "./templates/dummy/Templates_9";
import Template_10 from "./templates/dummy/Templates_10";
import Template_11 from "./templates/dummy/Templates_11";
import Template_12 from "./templates/dummy/Templates_12";
import Template_13 from "./templates/dummy/Templates_13";
import Template_14 from "./templates/dummy/Templates_14";
import Template_15 from "./templates/dummy/Templates_15";
import Template_16 from "./templates/dummy/Templates_16";
import Template_17 from "./templates/dummy/Templates_17";
import Template_18 from "./templates/dummy/Templates_18";
import Template_19 from "./templates/dummy/Templates_19";
import Template_20 from "./templates/dummy/Templates_20";
import Template_21 from "./templates/dummy/Templates_21";
import Template_22 from "./templates/dummy/Templates_22";
import Template_23 from "./templates/dummy/Templates_23";
import Template_24 from "./templates/dummy/Templates_24";
import Template_25 from "./templates/dummy/Templates_25";
import Template_26 from "./templates/dummy/Templates_26";
import Template_27 from "./templates/dummy/Templates_27";
import Template_28 from "./templates/dummy/Templates_28";
import Template_29 from "./templates/dummy/Templates_29";
import Template_30 from "./templates/dummy/Templates_30";
import Template_31 from "./templates/dummy/Templates_31";

const ActiveTemplate = ({
  activeId,
  resumeData,
  allCountries,
  activeTheme,
  activeFont,
  activeFontSize,
  isChecked,
}) => {
  if (activeId === 0) return;
  // Store the component functions in an array
  const Templates = [
    Template_1,
    Template_2,
    Template_3,
    Template_4,
    Template_5,
    Template_6,
    Template_7,
    Template_8,
    Template_9,
    Template_10,
    Template_11,
    Template_12,
    Template_13,
    Template_14,
    Template_15,
    Template_16,
    Template_17,
    Template_18,
    Template_19,
    Template_20,
    Template_21,
    Template_22,
    Template_23,
    Template_24,
    Template_25,
    Template_26,
    Template_27,
    Template_28,
    Template_29,
    Template_30,
    Template_31,
  ];
  // Instantiate the component function and render it as JSX
  const TemplateComponent = Templates[activeId - 1];

  return (
    <TemplateComponent
      resumeData={resumeData}
      allCountries={allCountries}
      activeTheme={activeTheme}
      activeFont={activeFont}
      activeFontSize={activeFontSize}
      isChecked={isChecked}
    />
  );
};

export default ActiveTemplate;
