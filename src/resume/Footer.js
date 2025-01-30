import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ checkOpen, isOpen, postId, handleOpen, isLink }) => {
  const [show_pages, set_show_pages] = useState([]);
  const [our_settings, set_our_settings] = useState([]);

  useEffect(() => {
    axios
      .get(global.baseurl + "/show-pages")
      .then((response) => {
        // console.log(response.data.data);
        set_show_pages(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <footer className="bg-[#0072b1] text-white z-50 w-full">
      <div className="flex flex-wrap items-center justify-center px-4 py-10">
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0 font_3">
            {show_pages.map((show_pages, index_show_pages) => (
            <li key={index_show_pages}>
                <a href={'/page/'+show_pages.slug} className="mr-4 hover:underline md:mr-6 text-lg">{show_pages.title}</a>
            </li>
            ))}
            <li>
                <a href="/contact-us" className="hover:underline text-lg">Contact</a>
            </li>
        </ul> */}
        <span className="text-center text-md sm:text-center">
          {our_settings.footer_text}
        </span>
      </div>
    </footer>
  );
};

export default Sidebar;
