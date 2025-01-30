import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const Partners = () => {
  const [our_clients, set_our_clients] = useState([]);
  useEffect(() => {
    axios
      .get(global.baseurl + "/our-clients")
      .then((response) => {
        set_our_clients(response.data.data.clients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, // Hide navigation arrows
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300, // Laptop screen
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // Tablet screen
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile screen
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="w-full  bg-white py-6 px-4  sm:px-20 justify-between items-center align-middle rounded-tr-[150px]">
      <div className="text-md sm:text-lg text-center  font-bold text-primary flex sm:gap-2 justify-center items-center">
        <h3 className="text-[#0072b1] drop-shadow-lg font-lexend font-bold text-xl md:text-3xl leading-[1.5] text-center sm:text-left">
          OUR <span className="text-[#00caa5]">CLIENTS</span> {""}
        </h3>
      </div>

      <Slider {...settings}>
        {our_clients.map((client, index) => (
          <div
            key={index}
            className="focus-visible:outline-none focus:outline-none border-none outline-none p-10"
          >
            <div className="bg-white shadow-[0px_0px_50px_rgba(100,100,100,0.2)] border-2 rounded-md p-4 m-auto w-[150px] md:w-[220px] lg:w-[240px] flex justify-center items-center">
              <img
                src={global.imageUrl + client.image}
                alt="Client Logo"
                className="w-[120px] md:w-[140px] lg:w-[160px] focus-visible:outline-none focus:outline-none border-none outline-none"
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Partners;
