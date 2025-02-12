import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import TextAreaGroup from "../../components/TextAreaGroup";
import ToggleSwitch from "../../components/ToggleSwitch";
import InputWithTextEditor from "../../components/InputWithTextEditer";
import { useAuth } from "../../services/Auth";
import RenderInputGroup from "../../components/AllborderInputGroup";
import InputWithTextEditer from "../../components/InputWithTextEditer";

const PlaceholderImage = "/images/placeholder.webp";
const ShowBlog = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const { service_id } = location.state;

  const [isLoading, setIsloading] = useState(false);
  const [imageIsUpdated, setImageIsUpdated] = useState(false);

  const [addService, setAddService] = useState({
    name: "",
    image: "",
    price: null,
    description: "",
    discounted_price: null,
    other_heading: "",
    other_description: "",
    status: 0,
  });

  useEffect(() => {
    ApiService.getSingleService(user?.token, service_id)
      .then((res) => {
        const {
          name,
          price,
          discounted_price,
          description,
          other_description,
          other_heading,
          status,
          image,
        } = res.data.data.services;
        setAddService({
          name,
          price,
          discounted_price,
          description,
          other_description,
          other_heading,
          status,
          image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateService = (e) => {
    e.preventDefault();

    setIsloading(true);

    const {
      name,
      image,
      price,
      discounted_price,
      description,
      other_heading,
      other_description,
      status,
    } = addService;

    ApiService.updateService(
      user?.token,
      service_id,
      name,
      image,
      price,
      discounted_price,
      description,
      other_heading,
      other_description,
      status
    )
      .then((res) => {
        setIsloading(false);
        swal({
          title: "Congratulations🎉",
          text: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form onSubmit={handleCreateService}>
          <div className="border h-full p-4">
            <div className="">
              <div className="relative">
                <div className="relative w-32 h-32 m-auto rounded-full">
                  <img
                    src={
                      addService.image
                        ? imageIsUpdated
                          ? URL.createObjectURL(addService.image)
                          : global.imageUrl + addService.image
                        : PlaceholderImage
                    }
                    alt="Service__img"
                    className="w-32 h-32 rounded-full m-auto"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      setImageIsUpdated(true);
                      setAddService((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }));
                    }}
                    className="hidden"
                    accept=".png"
                    id="addServiceImg"
                  />
                  <div
                    className="absolute bottom-1 right-1 cursor-pointer"
                    onClick={() =>
                      document.getElementById("addServiceImg").click()
                    }
                  >
                    <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
                  </div>
                </div>
              </div>
              <div>
                <RenderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => {
                    setAddService((prev) => ({ ...prev, name: val }));
                  }}
                  type={"text"}
                  value={addService.name}
                />
              </div>
              <div>
                <RenderInputGroup
                  htmlFor={"Other_Heading"}
                  isRequired={true}
                  label={"Other Heading"}
                  onchange={(val) => {
                    setAddService((prev) => ({
                      ...prev,
                      other_heading: val,
                    }));
                  }}
                  type={"text"}
                  value={addService.other_heading}
                />
              </div>
              <div>
                <RenderInputGroup
                  htmlFor={"price"}
                  isRequired={true}
                  label={"Price"}
                  onchange={(val) => {
                    setAddService((prev) => ({ ...prev, price: val }));
                  }}
                  type={"text"}
                  value={addService.price}
                />
              </div>
              <div>
                <RenderInputGroup
                  htmlFor={"discounted_price_add"}
                  isRequired={true}
                  label={"Discounted Price"}
                  onchange={(val) => {
                    setAddService((prev) => ({
                      ...prev,
                      discounted_price: val,
                    }));
                  }}
                  type={"text"}
                  value={addService.discounted_price}
                />
              </div>
              <div>
                <InputWithTextEditer
                  htmlFor={"description"}
                  label={"Description"}
                  onchange={(val) => {
                    setAddService((prev) => ({ ...prev, description: val }));
                  }}
                  value={addService.description}
                />
              </div>
              <div>
                <InputWithTextEditer
                  htmlFor={"other_description"}
                  label={"Other Description"}
                  onchange={(val) => {
                    setAddService((prev) => ({
                      ...prev,
                      other_description: val,
                    }));
                  }}
                  value={addService.other_description}
                />
              </div>
              <div>
                <ToggleSwitch
                  status={addService.status}
                  ChangeStatus={() => {
                    setAddService((prev) => ({
                      ...prev,
                      status: addService.status === 1 ? 0 : 1,
                    }));
                  }}
                />
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />
            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-green  px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-[#00caa5] focus:outline-none shadow-lg  "
              >
                Update Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowBlog;
