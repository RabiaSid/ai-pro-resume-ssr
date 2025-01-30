import React from "react";

const Template_1 = (props) => {
  const { fisrtName, lastName, email, phone } = props.resumeData;
  return (
    <div className="bg-green-400">
      <h1>{fisrtName}</h1>
      <span>{lastName}</span>

      <br />

      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
};

export default Template_1;
