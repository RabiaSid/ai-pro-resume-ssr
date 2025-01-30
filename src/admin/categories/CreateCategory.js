import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useAuth } from "../../services/Auth";
import InputWithTextEditer from "../../components/InputWithTextEditer";

const CreateCategory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  //   Value States
  const [name, setName] = useState("");
  // const [parent_value, setParent_value] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [coverDescription, setcoverDescription] = useState("");
  const [sort, setSort] = useState();
  const [top, setTop] = useState(0);
  const [premium, setpremium] = useState(false);
  const [status, setStatus] = useState(false);

  const [errors, setErrors] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const handleCreateBlog = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      parent_id: 2,
      short_description: shortDescription,
      cover_letter_description: coverDescription,
      sort: sort,
      premium: premium ? 1 : 0,
      top: top,
      status: status,
    };

    setIsloading(true);
    ApiService.createCategoty(user?.token, data)
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
        <form action="#" onSubmit={handleCreateBlog}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create Category</h1>
              {/* Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setName(val)}
                  value={name}
                  placeholder={"Name"}
                />
              </div>

              {/* short decription */}
              <div>
                <InputWithTextEditer
                  htmlFor={"short_description"}
                  label={"Resume Description"}
                  onchange={(val) => setShortDescription(val)}
                  value={shortDescription}
                />
              </div>

              {/* cover decription */}
              <div>
                <InputWithTextEditer
                  htmlFor={"cover_letter_description"}
                  label={"Cover Description"}
                  onchange={(val) => setcoverDescription(val)}
                  value={coverDescription}
                />
              </div>

              {/* sort */}
              <div>
                <AllborderInputGroup
                  htmlFor={"sort"}
                  isRequired={true}
                  label={"Sort"}
                  onchange={(val) => setSort(val)}
                  value={sort}
                  placeholder={"Sort"}
                  type={"number"}
                />
              </div>
              {/* Top */}
              <div>
                <AllborderInputGroup
                  htmlFor={"top"}
                  isRequired={true}
                  label={"Top"}
                  onchange={(val) => setTop(val)}
                  value={top}
                  placeholder={"Top"}
                  type={"select"}
                  options={[
                    { label: "0", value: 0 },
                    { label: "1", value: 1 },
                  ]}
                />
              </div>
              {/* premium */}
              {/* <div className="flex flex-col gap-2">
                <span>Premium</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setpremium(1);
                    } else {
                      setpremium(0);
                    }
                  }}
                  status={premium}
                />
              </div> */}
              {/* Status */}
              <div className="flex flex-col gap-2">
                <span>Status</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setStatus(1);
                    } else {
                      setStatus(0);
                    }
                  }}
                  status={status}
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
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                type="submit"
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

export default CreateCategory;
