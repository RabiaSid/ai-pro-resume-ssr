import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../../../components/SelectDropdown";
import { useAuth } from "../../../services/Auth";

const CreateEducation = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [degree_dropdown, set_degree_dropdown] = useState([]);
  //   Value States
  const [institution, setInstitution] = useState("");
  const [degree_id, setDegree_id] = useState("");
  const [field, setField] = useState("");
  const [grade_type, setGrade_type] = useState("Grade");
  const [grade, setGrade] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getDegreeValues(user?.token)
      .then((res) => {
        console.log(res);
        set_degree_dropdown(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateEducation = (e) => {
    e.preventDefault();
    setIsloading(true);

    const data = {
      institution: institution,
      degree_id: degree_id,
      field: field,
      grade_type: grade_type,
      grade: grade,
      start_date: start_date,
      end_date: end_date,
    };

    ApiService.createEducation(user?.token, data)
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

  const [startDateIsSelected, setStartDateIsSelected] = useState(false);

  const [liveDate, setLiveDate] = useState(new Date());
  // Function to get tomorrow's date
  const getTomorrowDate = () => {
    const nextDate = new Date(liveDate);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split("T")[0];
  };
  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateEducation}>
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <h1 className="text-2xl font-bold">Create Education</h1>
            <div>
              <AllborderInputGroup
                htmlFor={"institution"}
                isRequired={true}
                label={"Institution"}
                onchange={(val) => setInstitution(val)}
                value={institution}
                placeholder={"institution"}
              />
            </div>
            <div className="py-2 w-full flex flex-col gap-2">
              <label
                for={"degree_id"}
                className="border-[#9b9b9b] text-xs sm:text-base"
              >
                Select Degree
              </label>
              <select
                id={"degree_id"}
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                required
                onChange={(e) => setDegree_id(e.target.value)}
                value={degree_id}
              >
                <option value={null}>Select</option>
                {degree_dropdown?.map((opt, idx) => {
                  return (
                    <option key={idx} value={opt.id}>
                      {opt.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <AllborderInputGroup
                htmlFor={"field"}
                isRequired={true}
                label={"Field"}
                onchange={(val) => setField(val)}
                value={field}
                placeholder={"field"}
              />
            </div>
            <div>
              <SelectDropdown
                htmlFor={"Grade Type"}
                isRequired={true}
                label={"Grade Type"}
                options={["Grade", "CGPA", "Percentage"]}
                value={grade_type}
                handleOnChange={(val) => setGrade_type(val)}
              />
            </div>
            {grade_type === "CGPA" && (
              <div>
                <AllborderInputGroup
                  htmlFor={"grade"}
                  isRequired={true}
                  label={"CGPA"}
                  onchange={(val) => {
                    // Parse the input value as a float number and limit it to 5.00
                    let cgpaValue = parseFloat(val);
                    cgpaValue = Math.min(cgpaValue, 5.0);

                    // Round off to two decimal places
                    cgpaValue = parseFloat(cgpaValue.toFixed(2));

                    // Update the state with the rounded CGPA value
                    setGrade(cgpaValue.toString());
                  }}
                  value={grade}
                  placeholder={"Enter CGPA (0.01-5.00)"}
                  type={"number"}
                  step={"0.01"}
                  min={"0.01"}
                  max={"5.00"}
                />
              </div>
            )}
            {grade_type === "Percentage" && (
              <div>
                <AllborderInputGroup
                  htmlFor={"grade"}
                  isRequired={true}
                  label={"Percentage"}
                  onchange={(val) => {
                    if (parseInt(val) <= 100) {
                      setGrade(val);
                    }
                  }}
                  value={grade}
                  placeholder={"Enter Percentage (0-100)"}
                  type={"number"}
                  step={"1"}
                  min={"0"}
                  max={"100"}
                />
              </div>
            )}

            {grade_type === "Grade" && (
              <div>
                <label>Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="E+">E+</option>
                  <option value="E">E</option>
                </select>
              </div>
            )}

            {/* Start Date */}
            <div className="py-2 w-full flex flex-col gap-2">
              <label
                htmlFor="start_date"
                className="border-[#9b9b9b] text-xs sm:text-base"
              >
                Start Date
              </label>
              <input
                type="date"
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setStartDateIsSelected(true);
                  setStart_date(e.target.value);
                  setEnd_date(""); // Reset end date when changing start date
                }}
                max={liveDate.toISOString().split("T")[0]} // Start date can't be before live date
                value={start_date}
              />
            </div>

            {/* End Date */}
            <div className="py-2 w-full flex flex-col gap-2">
              <label
                htmlFor="end_date"
                className="border-[#9b9b9b] text-xs sm:text-base"
              >
                End Date{" "}
                <span className="text-xs italic">
                  (Select Start Date First)
                </span>
              </label>
              <input
                type="date"
                disabled={!startDateIsSelected}
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                value={end_date}
                min={start_date ? getTomorrowDate() : ""}
                onChange={(e) => setEnd_date(e.target.value)}
              />
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

export default CreateEducation;
