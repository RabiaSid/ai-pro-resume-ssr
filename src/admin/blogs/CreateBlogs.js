import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import TextAreaGroup from "../../components/TextAreaGroup";
import InputWithTextEditor from "../../components/InputWithTextEditer2";
import { useAuth } from "../../services/Auth";

const PlaceholderImage = "/images/placeholder.webp";
const ShowBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [authorimageUpdated, setAuthorimageUpdated] = useState(false);
  const [blogimageUpdated, setBlogimageUpdated] = useState(false);

  //   Value States
  const [blogName, setBlogName] = useState("");
  const [blogImage, setBlogImage] = useState();
  const [authorName, setAuthorName] = useState("");
  const [updatedAuthorImage, setUpdatedAuthorImage] = useState();
  const [longDescription, setLongDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [blogStatus, setBlogStatus] = useState(0);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTop, setBlogTop] = useState(0);

  const [isLoading, setIsloading] = useState(false);

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const data = {
      name: blogName,
      title: blogTitle,
      image: blogImage,
      short_description: shortDescription,
      long_description: longDescription,
      author_name: authorName,
      author_image: updatedAuthorImage,
      meta_keyword: metaKeyword,
      meta_description: metaDescription,
      top: blogTop,
    };
    setIsloading(true);
    ApiService.createBlog(user?.token, data)
      .then((res) => {
        setIsloading(false);
        console.log(res.data.data);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedAuthorImage(file);
    setAuthorimageUpdated(true);
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
    setBlogimageUpdated(true);
  };

  return (
    <>
      {/* {isLoading && <LoadingSpiner isLoading={isLoading} />} */}
      <div className="p-2">
        <form onSubmit={handleCreateBlog}>
          <div className="border h-full p-4">
            {/* Inputs Author */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Author</h1>
              <div className="relative w-32 h-32 m-auto rounded-full">
                <img
                  src={
                    authorimageUpdated
                      ? URL.createObjectURL(updatedAuthorImage)
                      : PlaceholderImage
                  }
                  alt="Service__img"
                  className="w-32 h-32 rounded-full m-auto"
                />
                <input
                  type="file"
                  onChange={handleAuthorImageChange}
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.webp"
                  id="addauthorImage"
                />
                <div
                  className="absolute bottom-1 right-1 cursor-pointer"
                  onClick={() =>
                    document.getElementById("addauthorImage").click()
                  }
                >
                  <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
                </div>
              </div>
              <div>
                <AllborderInputGroup
                  htmlFor={"authour_name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setAuthorName(val)}
                  value={authorName}
                  placeholder={"Author Name"}
                />
              </div>
            </div>
            <hr />
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">BLOG</h1>
              {/* Title */}
              <div>
                <AllborderInputGroup
                  htmlFor={"blog_title"}
                  isRequired={true}
                  label={"Title"}
                  onchange={(val) => setBlogTitle(val)}
                  value={blogTitle}
                  placeholder={"Blog Title"}
                />
              </div>
              {/* Blog Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"blog_name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setBlogName(val)}
                  value={blogName}
                  placeholder={"Blog Name"}
                />
              </div>
              {/* Blog Meta */}
              <div>
                <AllborderInputGroup
                  htmlFor={"blog_meta"}
                  isRequired={true}
                  label={"Meta Keyword"}
                  onchange={(val) => setMetaKeyword(val)}
                  value={metaKeyword}
                  placeholder={"Blog Meta Keyword"}
                />
              </div>
              {/* Blog Meta Description */}
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"Meta_descriptio"}
                  isRequired={true}
                  label={"Meta Description"}
                  onchange={(val) => setMetaDescription(val)}
                  value={metaDescription}
                  resize={false}
                  rows={4}
                  maxLength={250}
                />
              </div>
              {/* Blog Long Description */}
              <div>
                <InputWithTextEditor
                  htmlFor={"long_descriptio"}
                  isRequired={true}
                  label={"Long Description"}
                  onchange={(val) => setLongDescription(val)}
                  value={longDescription}
                  resize={false}
                  InputClass="h-[400px]"
                />
              </div>
              {/* Blog Short Description */}
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"short_descriptio"}
                  isRequired={true}
                  label={"Short Description"}
                  onchange={(val) => setShortDescription(val)}
                  value={shortDescription}
                  resize={false}
                  rows={4}
                  maxLength={150}
                />
              </div>
              {/* Top */}
              <div>
                <AllborderInputGroup
                  htmlFor={"blog_top"}
                  isRequired={true}
                  label={"Top (Show Blog Position)"}
                  onchange={(val) => setBlogTop(val)}
                  value={blogTop}
                  placeholder={"Blog Top"}
                  type={"select"}
                  options={[
                    { label: "0", value: 0 },
                    { label: "1", value: 1 },
                  ]}
                />
              </div>

              {/* Blog IMage */}
              <div className="flex flex-col gap-2">
                <span>Blog Image</span>
                <div className="relative w-[220px] h-[220px] border">
                  <img
                    src={
                      blogimageUpdated
                        ? URL.createObjectURL(blogImage)
                        : PlaceholderImage
                    }
                    alt="Service__img"
                    className="w-[200px] h-[200px]"
                  />
                  <input
                    type="file"
                    onChange={handleBlogImageChange}
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.webp"
                    id="addBlogImage"
                  />
                  <div
                    className="absolute bottom-1 right-1 cursor-pointer"
                    onClick={() =>
                      document.getElementById("addBlogImage").click()
                    }
                  >
                    <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
                  </div>
                </div>
              </div>
            </div>
            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>
            <hr />
            {/* create */}
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

export default ShowBlog;
