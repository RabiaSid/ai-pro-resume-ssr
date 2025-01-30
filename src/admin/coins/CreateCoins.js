import React, { useState, useRef } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth";

const CreateCoins = () => {
  const { user } = useAuth();

  const formErrorText = useRef("");
  const navigate = useNavigate();
  //   Value States
  const [duration, setDuration] = useState();
  const [referrals, setReferrals] = useState();
  const [coins, setCoins] = useState();

  const [errors, setErrors] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const handleCreateCoins = (e) => {
    e.preventDefault();
    if (formErrorText.current) {
      formErrorText.current.textContent = "";
    }
    setIsloading(true);
    const data = {
      coins: coins,
      duration: duration,
      referrals: referrals,
    };

    ApiService.storeCoins(user?.token, data)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then((will) => navigate(-1))
          .catch((will) => navigate(-1));
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
        <form action="#" onSubmit={handleCreateCoins}>
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">CreateCoins</h1>
            </div>
            <hr />

            <div className="py-4">
              {/* Coins*/}
              <div>
                <AllborderInputGroup
                  htmlFor={"coins"}
                  isRequired={true}
                  label={"Coins"}
                  onchange={(val) => setCoins(val)}
                  value={coins}
                  placeholder={"Coin Number"}
                  type="number"
                />
              </div>
              {/* Duration */}
              <div>
                <AllborderInputGroup
                  htmlFor={"duration"}
                  isRequired={true}
                  label={"Duration"}
                  onchange={(val) => setDuration(val)}
                  value={duration}
                  placeholder={"Duration"}
                  type="number"
                />
              </div>
              {/* Refferals*/}
              <div>
                <AllborderInputGroup
                  htmlFor={"referrals"}
                  isRequired={true}
                  label={"Referrals"}
                  onchange={(val) => setReferrals(val)}
                  value={referrals}
                  placeholder={"Referrals"}
                  type="number"
                />
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />

            {/* Upadte */}
            <div className="py-6 flex flex-col gap-2">
              <span className="text-sm text-red-500" ref={formErrorText}></span>
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2 w-fit"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCoins;
