import React, { useState, useRef } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Auth";

const CreateReview = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const [reviewDescription, setReviewDescription] = useState("");
  const [user_name, set_user_name] = useState("");

  const [reviewRating, setReviewRating] = useState();

  const [isLoading, setIsloading] = useState(false);

  const handleCreateReview = (e) => {
    e.preventDefault();

    setIsloading(true);
    const data = {
      rating: reviewRating,
      user_name: user_name,
      description: reviewDescription,
    };
    ApiService.createReview(user?.token, data)
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
        <form action="#" onSubmit={handleCreateReview}>
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Review</h1>
            </div>
            {/* Review Inputs */}
            <div className="py-4">
              {/* user name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"user_name"}
                  isRequired={true}
                  label={"User Name"}
                  onchange={(val) => set_user_name(val)}
                  value={user_name}
                  placeholder={"User Name"}
                />
              </div>
              {/* Title */}
              <div>
                <AllborderInputGroup
                  htmlFor={"review_rating"}
                  isRequired={true}
                  label={"Rating"}
                  onchange={(val) => setReviewRating(val)}
                  value={reviewRating}
                  placeholder={"Review Rating"}
                  type={"select"}
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                    { label: "5", value: 5 },
                  ]}
                />
              </div>

              {/* Review Long Description */}
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"review_description"}
                  isRequired={true}
                  label={"Review Description"}
                  onchange={(val) => setReviewDescription(val)}
                  value={reviewDescription}
                  resize={false}
                  rows={4}
                  maxLength={250}
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
                onClick={handleCreateReview}
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Create Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateReview;
