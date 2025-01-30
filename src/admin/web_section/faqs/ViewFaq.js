import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";

const ViewFaq = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { faq_id } = location.state;

  //   Value States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [page, setPage] = useState();
  const [created_at, setcreated_at] = useState();
  const [updated_at, setupdated_at] = useState();

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getFaqById(user?.token, faq_id)
      .then((res) => {
        console.log(res.data.data);

        const { answer, question, sort, status, page, created_at, updated_at } =
          res.data.data;

        setQuestion(question);
        setAnswer(answer);
        setSort(sort);
        setStatus(status);
        setPage(page);
        setcreated_at(created_at);
        setupdated_at(updated_at);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="flex flex-col gap-5 mx-auto p-6 bg-white border border-gray-200 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700">FAQ Details</h2>
        <div className="space-y-2 flex flex-col gap-10">
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">Page:</span>
            <span className="text-gray-800">{page}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">
              Question:
            </span>
            <span className="text-gray-800 w-[75%]">{question}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">Answer:</span>
            <span
              className="text-gray-800 w-[75%]"
              dangerouslySetInnerHTML={{ __html: answer }}
            ></span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">
              Sort Order:
            </span>
            <span className="text-gray-800">{sort}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">Status:</span>
            <span
              className={`text-white px-4 py-1 rounded ${
                status === 1 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {status === 1 ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">
              Created At:
            </span>
            <span className="text-gray-800">
              {new Date(created_at).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-start">
            <span className="font-medium text-gray-600 w-[100px]">
              Updated At:
            </span>
            <span className="text-gray-800">
              {new Date(updated_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFaq;
