import React from "react";

const SingleInput = ({ value, handleChange, placeholder, isRequired }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      value={value}
      className="border-2 border-muted px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none focus:border-[#0072b1]"
      required={isRequired}
    />
  );
};

export default SingleInput;
