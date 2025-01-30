import React from "react";
import whatsapp from "../assets/images/whatsapp.webp";

export default function Whatsapp() {
  return (
    <>
      <div className="z-10 whatsapp block sm:hidden">
        <span>
          <a
            href="https://wa.me/03324446017?text=Hi, I need help with [specific issue]. Can you assist me? &app_absent=1"
            target="_blank"
          >
            <img src={whatsapp} alt="whatsapp" width={300} height={300} />
          </a>
        </span>
      </div>
    </>
  );
}
