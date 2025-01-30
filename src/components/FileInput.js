import React from "react";

const FileInput = ({ label, isRequired, htmlFor, onchange, value, accept }) => {
  return (
    <div className="py-2 w-full flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="border-[#9b9b9b] text-xs sm:text-base"
      >
        {label}
      </label>
      <input
        type={"file"}
        id={htmlFor}
        className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
        required={isRequired}
        value={value ? value : ""}
        onChange={(e) => onchange(e.target.files[0])}
        accept={accept}
      />
    </div>
  );
};

export default FileInput;
