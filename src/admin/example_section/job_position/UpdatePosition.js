import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import TextAreaGroup from "../../../components/TextAreaGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../services/Auth";

const UpdateCategory = () => {
  const { user } = useAuth();
  const { positionid } = useParams();

  const navigate = useNavigate();

  // State to store tags
  const [tagsforsimilarname, settagsforsimilarname] = useState([]);
  const [tagsforkeywords, settagsforkeywords] = useState([]);

  const [name, setname] = useState("");
  const [keywords, setkeywords] = useState("");
  const [similar_names, setsimilar_names] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getJobPositionByid(user?.token, positionid)
      .then((res) => {
        console.log(res.data.data);
        let { name, similar_names, keywords } = res.data.data;

        setname(name);
        settagsforsimilarname(similar_names.split(","));
        settagsforkeywords(keywords.split(","));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateJobPosition = (e) => {
    e.preventDefault();
    setIsloading(true);

    const similar_names_updated = tagsforsimilarname.join(",");
    const keywords_updated = tagsforkeywords.join(",");

    ApiService.updateJobPosition(
      user?.token,
      positionid,
      name,
      similar_names_updated,
      keywords_updated
    )
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

  // Function to add a new tag
  const addTag = () => {
    if (
      similar_names.trim() !== "" &&
      !tagsforsimilarname.includes(similar_names.trim())
    ) {
      settagsforsimilarname((prev) => [...prev, similar_names.trim()]);
      setsimilar_names(""); // Clear input field
    }
  };

  // Function to remove a tag
  const removeTag = (index) => {
    settagsforsimilarname((prev) => prev.filter((_, i) => i !== index));
  };

  // Function to add a new tag
  const addTagkeyword = () => {
    if (keywords.trim() !== "" && !tagsforkeywords.includes(keywords.trim())) {
      settagsforkeywords((prev) => [...prev, keywords.trim()]);

      setkeywords(""); // Clear input field
    }
  };
  console.log(tagsforkeywords);

  // Function to remove a tag
  const removeTagkeyword = (index) => {
    settagsforkeywords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleUpdateJobPosition}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Update Position</h1>

              {/* Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"job_name"}
                  isRequired={true}
                  label={"Position"}
                  onchange={(val) => setname(val)}
                  value={name}
                  placeholder={"Enter Position"}
                />
              </div>

              {/* associate job position */}
              <div className="w-full">
                {/* Input and Add Button */}
                <label>Associate Job Positions</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={similar_names}
                    onChange={(e) => setsimilar_names(e.target.value)}
                    placeholder="Enter a position"
                    className="flex-grow border border-gray-300 rounded px-3 py-2 outline-none"
                  />
                  <p
                    onClick={addTag}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    +
                  </p>
                </div>

                {/* Tags Section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {tagsforsimilarname.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-500 text-white px-5 py-1 rounded-lg"
                    >
                      <span>{tag}</span>
                      <p
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-500 bg-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        &times;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* keywords */}
              <div className="w-full">
                {/* Input and Add Button */}
                <label>Keywords</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setkeywords(e.target.value)}
                    placeholder="Enter a keyword"
                    className="flex-grow border border-gray-300 rounded px-3 py-2 outline-none"
                  />
                  <p
                    onClick={addTagkeyword}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    +
                  </p>
                </div>

                {/* Tags Section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {tagsforkeywords.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-500 text-white px-5 py-1 rounded-lg"
                    >
                      <span>{tag}</span>
                      <p
                        onClick={() => removeTagkeyword(index)}
                        className="ml-2 text-gray-500 bg-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                      >
                        &times;
                      </p>
                    </div>
                  ))}
                </div>
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
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCategory;
