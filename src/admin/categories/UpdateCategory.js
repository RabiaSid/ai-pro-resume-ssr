import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useAuth } from "../../services/Auth";
import InputWithTextEditer from "../../components/InputWithTextEditer";

const UpdateCategory = () => {
  const { user } = useAuth();
  const { catid } = useParams();

  const navigate = useNavigate();
  //   Value States
  const [name, setName] = useState("");
  const [parent_id, setParent_id] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [coverDescription, setcoverDescription] = useState("");
  const [sort, setSort] = useState();
  const [top, setTop] = useState(0);
  const [premium, setpremium] = useState(false);
  const [status, setStatus] = useState(false);

  const [errors, setErrors] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getCategoryByid(user?.token, catid)
      .then((res) => {
        console.log(res.data.data);
        let {
          name,
          short_description,
          cover_letter_description,
          parent_id,
          premium,
          sort,
          status,
          top,
        } = res.data.data.category;

        setName(name);
        setParent_id(parent_id);
        setShortDescription(short_description);
        setcoverDescription(cover_letter_description);
        setTop(top);
        setSort(sort);
        setStatus(status ? true : false);
        setpremium(premium ? true : false);
        // setParent_value(parent_id === 1 ? "Professional" : "Expert");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateBlog = (e) => {
    e.preventDefault();

    const cat_status = status ? 1 : 0;
    const cat_premium = premium ? 1 : 0;
    const parentId = 2;

    setIsloading(true);
    ApiService.updateCategory(
      user?.token,
      catid,
      name,
      parentId,
      shortDescription,
      coverDescription,
      sort,
      cat_status,
      top,
      cat_premium
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

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateBlog}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Update Category</h1>
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
