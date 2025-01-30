import React from "react";

const DropdownWithIdValue = ({
  label,
  htmlFor,
  isRequired,
  handleOnChange,
  options,
  value,
  nameHolder,
}) => {
  return (
    <div className="py-2 w-full flex flex-col gap-2">
      <label for={htmlFor} className="border-[#9b9b9b] text-xs sm:text-base">
        {label}
      </label>
      <select
        id={htmlFor}
        className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
        required={isRequired}
        onChange={(e) => handleOnChange(e.target.value)}
        value={value}
      >
        <option value={""}>Select</option>
        {options?.map((opt, idx) => {
          return (
            <option
              key={idx}
              value={opt.id}
              onClick={() => nameHolder(opt.name)}
            >
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownWithIdValue;
