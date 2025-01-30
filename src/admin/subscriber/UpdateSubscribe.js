import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";

const UpdateSubscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  //   Value States
  const [email, setEmail] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { subscriber_id } = location.state;

  useEffect(() => {
    ApiService.showSubscriberDetails(user?.token, subscriber_id)
      .then((res) => {
        // Set Values
        const { email } = res.data.data;

        setEmail(email);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateSubscribers = () => {
    setIsloading(true);
    const data = {
      email: email,
    };

    ApiService.updateSubscriber(user?.token, subscriber_id, data)
      .then((res) => {
        setIsloading(false);

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
      <div className="p-2">
        <div className="border h-full p-4">
          {/* Inputs Author */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">Update Subscriber</h1>
          </div>
          <hr />

          <div className="py-4">
            {/* Email */}
            <div>
              <AllborderInputGroup
                htmlFor={"email"}
                isRequired={true}
                label={"email"}
                onchange={(val) => setEmail(val)}
                value={email}
                placeholder={"Email"}
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
          <div className="py-6">
            <button
              onClick={handleUpdateSubscribers}
              className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubscribe;
