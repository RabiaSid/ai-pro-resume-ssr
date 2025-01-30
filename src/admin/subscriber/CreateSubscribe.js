import React, { useState, useRef } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth";

const CreateSubscribe = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  //   Value States
  const [email, setEmail] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState(null);
  const handleCreateSubscriber = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      email: email,
    };

    ApiService.createSubscriber(user?.token, data)
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
        <form action="#" onSubmit={handleCreateSubscriber}>
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create Subscriber</h1>
            </div>
            <hr />

            <div className="py-4">
              {/* Subscriber*/}

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
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
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

export default CreateSubscribe;
