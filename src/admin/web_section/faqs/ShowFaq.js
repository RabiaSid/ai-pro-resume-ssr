import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";
import InputWithTextEditer from "../../../components/InputWithTextEditer";

const ShowUpdateFaq = () => {
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

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getFaqById(user?.token, faq_id)
      .then((res) => {
        console.log(res.data.data);

        const { answer, question, sort, status, page } = res.data.data;

        setQuestion(question);
        setAnswer(answer);
        setSort(sort);
        setStatus(status);
        setPage(page);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateFaq = (e) => {
    e.preventDefault();

    setIsloading(true);
    const data = {
      id: faq_id,
      question: question,
      answer: answer,
      sort: sort,
      status: status,
      page: page,
    };
    ApiService.updateFaq(user?.token, data)
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
        <form action="#" onSubmit={handleUpdateFaq}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create FAQ</h1>

              <div className="mt-3">
                <label>Page</label>
                <select
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md mt-2"
                >
                  <option value="">Select page</option>
                  <option value="Home">Home</option>
                  <option value="Resume Template">Resume Template</option>
                  <option value="Resume Example">Resume Example</option>
                  <option value="Cover Template">Cover Template</option>
                  <option value="Cover Example">Cover Example</option>
                  <option value="Services">Services</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Ats">Ats Checker</option>
                </select>
              </div>

              {/* Question */}
              <div>
                <AllborderInputGroup
                  htmlFor={"question"}
                  isRequired={true}
                  label={"Question"}
                  onchange={(val) => setQuestion(val)}
                  value={question}
                  placeholder={"Enter Question"}
                />
              </div>
              {/* Slider Name */}
              <div>
                {/* <AllborderInputGroup
                  htmlFor={"asnwer"}
                  isRequired={true}
                  label={"Answer"}
                  onchange={(val) => setAnswer(val)}
                  value={answer}
                  placeholder={"Enter Answer"}
                /> */}
                <InputWithTextEditer
                  htmlFor={"answer"}
                  label={"Answer"}
                  onchange={(val) => setAnswer(val)}
                  value={answer} // Use the value from the Controller
                />
              </div>
              {/* Slider Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"sort"}
                  isRequired={true}
                  label={"Sort"}
                  onchange={(val) => setSort(val)}
                  value={sort}
                  placeholder={"Enter Sort Number"}
                  type={"number"}
                />
              </div>
              {/* Status */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Status
                </label>
                <ToggleSwitch
                  status={status}
                  ChangeStatus={(val) => setStatus(val ? 1 : 0)}
                />
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />
            {/* Upload */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update FAQ
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowUpdateFaq;
