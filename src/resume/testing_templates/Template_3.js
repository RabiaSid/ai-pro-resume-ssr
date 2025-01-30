import React from "react";

const Template_3 = (props) => {
  const { fisrtName, lastName, email, phone } = props.resumeData;
  return (
    <div className="bg-red-400">
      <h1>{fisrtName}</h1>
      <span>{lastName}</span>

      <br />

      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
};

export default Template_3;
