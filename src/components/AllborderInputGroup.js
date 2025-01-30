import React from "react";

const RenderInputGroup = ({
  label,
  isRequired,
  htmlFor,
  onchange,
  value,
  type,
  placeholder,
  options,
}) => {
  const isSelectType = type === "select";

  return (
    <div className="py-2 w-full flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="border-[#9b9b9b] text-xs sm:text-base"
      >
        {label}
      </label>
      {isSelectType ? (
        <select
          id={htmlFor}
          className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
          required={isRequired}
          value={value}
          onChange={(e) => onchange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type ? type : "text"}
          id={htmlFor}
          className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
          required={isRequired}
          value={value}
          onChange={(e) => onchange(e.target.value)}
          placeholder={placeholder ? placeholder : ""}
        />
      )}
    </div>
  );
};

export default RenderInputGroup;

