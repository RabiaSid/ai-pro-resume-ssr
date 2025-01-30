import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";

const ShowCoins = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const formErrorText = useRef("");
  //   Value States
  const [duration, setDuration] = useState();
  const [referrals, setReferrals] = useState();
  const [coins, setCoins] = useState();
  const [isLoading, setIsloading] = useState(false);

  const [errors, setErrors] = useState(null);

  const { coin_id } = location.state;

  useEffect(() => {
    ApiService.showCoinDetails(user?.token, coin_id)
      .then((res) => {
        // Set Values
        const { coins, duration, referrals } = res.data.data;

        setCoins(coins);
        setDuration(duration);
        setReferrals(referrals);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateCoins = (e) => {
    e.preventDefault();
    setIsloading(true);
    if (formErrorText.current) {
      formErrorText.current.textContent = "";
    }
    const data = {
      coins: coins,
      duration: duration,
      referrals: referrals,
    };

    ApiService.updateCoins(user?.token, coin_id, data)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        swal({
          title: res.data.message,
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
      <form onSubmit={handleUpdateCoins}>
        <div className="p-2">
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">UpdateCoins</h1>
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
                  placeholder={"Refferrals"}
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
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2 w-fit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShowCoins;
