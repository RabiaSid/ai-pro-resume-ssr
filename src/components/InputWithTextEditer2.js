import React from "react";
import TextEditer from "./TextEditer2";

const InputWithTextEditer = ({
  label,
  htmlFor,
  onchange,
  value,
  InputClass,
}) => {
  return (
    <div className="py-2 w-full flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="border-[#9b9b9b] text-xs sm:text-base"
      >
        {label}
      </label>
      <TextEditer
        InputClass={InputClass}
        value={value}
        contentHtml={(val) => onchange(val)}
      />
    </div>
  );
};

export default InputWithTextEditer;
