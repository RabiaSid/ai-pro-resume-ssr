import React from "react";

const loader = "/images/loader2.gif";
function Header() {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[99999]">
      <img src={loader} width="500" height="500" className="shadow-2xl" />
    </div>
  );
}

export default Header;
