import React from "react";
import { Switch } from "@headlessui/react";

const ToggleSwitch = ({ status, ChangeStatus }) => {
  return (
    <>
      <div className="">
        <Switch
          checked={status}
          onChange={ChangeStatus}
          className={`${status ? "bg-primary-green" : "bg-primary-gray"}
          relative inline-flex h-[23px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${status ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </>
  );
};

export default ToggleSwitch;
