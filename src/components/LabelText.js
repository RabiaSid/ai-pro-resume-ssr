import React from "react";

const LabelText = ({ label, text }) => {
  return (
    <div className="flex flex-col">
      <label className="text-base">{label}</label>
      <span className="text-base text-muted">{text}</span>
    </div>
  );
};

export default LabelText;
