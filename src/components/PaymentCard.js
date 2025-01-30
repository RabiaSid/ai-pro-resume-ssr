import React from "react";

const PaymentCard = (cardNumber, handleChangeCardNumber) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-green text-white text-2xl h-14 flex items-center p-4">
        <h1>Credit Card</h1>
      </div>
      {/* Body */}
      <div className="bg-light-yellow h-fit px-4 pt-6 pb-8 flex flex-col gap-4">
        <div>
          <input
            placeholder={"Card Number"}
            onChange={(e) => handleChangeCardNumber(e.target.value)}
            value={""}
            className="border-2 px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none "
            required
          />
        </div>
        {/*  */}
        <div className="flex gap-4 items-center">
          <input
            placeholder={"Expiration date (MM/ YY)"}
            onChange={(e) => handleChangeCardNumber(e.target.value)}
            value={""}
            className="border-2 px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none "
            required
          />
          <input
            placeholder={"Securty Code"}
            onChange={(e) => handleChangeCardNumber(e.target.value)}
            value={""}
            className="border-2 px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none "
            required
          />
        </div>
        {/*  */}
        <div>
          <input
            placeholder={"Name on card"}
            onChange={(e) => handleChangeCardNumber(e.target.value)}
            value={""}
            className="border-2 px-2 py-3 text-base placeholder:text-base w-full rounded-md focus-within:outline-none "
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
