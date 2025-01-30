import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import TextAreaGroup from "../../../components/TextAreaGroup";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";

const ShowReview = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { review_id } = location.state;

  const [reviewDescription, setReviewDescription] = useState("");
  const [user_name, set_user_name] = useState("");

  const [reviewStatus, setReviewStatus] = useState();
  const [reviewRating, setReviewRating] = useState();

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getReviewById(user?.token, review_id)
      .then((res) => {
        console.log(res.data.data);

        const { rating, description, status, user_name } = res.data.data;

        set_user_name(user_name);

        setReviewRating(rating);
        setReviewDescription(description);

        setReviewStatus(status);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateReview = (e) => {
    e.preventDefault();

    setIsloading(true);
    const data = {
      id: review_id,
      rating: reviewRating,
      description: reviewDescription,
      status: reviewStatus,
      user_name: user_name,
    };
    ApiService.updateReview(user?.token, data)
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
        <form action="#" onSubmit={handleUpdateReview}>
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
              {/* Review Short Description */}

              {/* Top */}

              {/* Review Status */}
              <div className="flex flex-col gap-2">
                <span>Status</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setReviewStatus(1);
                    } else {
                      setReviewStatus(0);
                    }
                  }}
                  status={reviewStatus}
                />
              </div>
              {/* Review IMage */}
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
                onClick={handleUpdateReview}
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowReview;
