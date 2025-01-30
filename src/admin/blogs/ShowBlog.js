import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { PiPencilBold } from "react-icons/pi";
import TextAreaGroup from "../../components/TextAreaGroup";
import ToggleSwitch from "../../components/ToggleSwitch";
import InputWithTextEditor from "../../components/InputWithTextEditer2";
import { useAuth } from "../../services/Auth";

const ShowBlog = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState();
  const [authorimageUpdated, setAuthorimageUpdated] = useState(false);
  const [blogimageUpdated, setBlogimageUpdated] = useState(false);

  //   Value States
  const [blogName, setBlogName] = useState("");
  const [blogImage, setBlogImage] = useState();
  const [blogId, setBlogId] = useState();
  const [authorName, setAuthorName] = useState("");
  const [updatedAuthorImage, setUpdatedAuthorImage] = useState();
  const [longDescription, setLongDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [blogStatus, setBlogStatus] = useState();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTop, setBlogTop] = useState();

  const [isLoading, setIsloading] = useState(false);

  const { blog_id } = location.state;

  useEffect(() => {
    ApiService.showBlogDetails(user?.token, blog_id)
      .then((res) => {
        setBlogData(res.data.data.blog);
        // Set Values
        const {
          author_name,
          author_image,
          id,
          image,
          long_description,
          meta_description,
          meta_keyword,
          short_description,
          status,
          title,
          top,
          name,
        } = res.data.data.blog;

        setBlogId(id);
        setAuthorName(author_name);
        setUpdatedAuthorImage(author_image);
        setBlogImage(image);
        setLongDescription(long_description);
        setMetaDescription(meta_description);
        setMetaKeyword(meta_keyword);
        setShortDescription(short_description);

        setBlogStatus(status);
        setBlogTitle(title);
        setBlogTop(top);
        setBlogName(name);
        console.log(res.data.data.blog);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateBlog = () => {
    setIsloading(true);
    const data = {
      id: blogId,
      name: blogName,
      title: blogTitle,
      image: blogimageUpdated ? blogImage : null,
      short_description: shortDescription,
      long_description: longDescription,
      author_name: authorName,
      author_image: authorimageUpdated ? updatedAuthorImage : null,
      meta_keyword: metaKeyword,
      meta_description: metaDescription,
      top: blogTop,
      status: blogStatus,
    };

    ApiService.updateBlog(user?.token, data)
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
        console.log(err);
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
        <div className="border h-full p-4">
          {/* Inputs Author */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">Author</h1>
            <div className="relative w-32 h-32 m-auto rounded-full">
              <img
                src={
                  authorimageUpdated
                    ? URL.createObjectURL(updatedAuthorImage)
                    : `${global.imageUrl + blogData?.author_image}`
                }
                alt="Service__img"
                className="w-32 h-32 rounded-full m-auto"
              />
              <input
                type="file"
                onChange={handleAuthorImageChange}
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp"
                id="addServiceImg"
              />
              <div
                className="absolute bottom-1 right-1 cursor-pointer"
                onClick={() => document.getElementById("addServiceImg").click()}
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
                label={"Long Description"}
                value={longDescription}
                onchange={(val) => setLongDescription(val)}
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
                type={"select"}
                options={[
                  { label: "0", value: 0 },
                  { label: "1", value: 1 },
                ]}
              />
            </div>
            {/* Blog Status */}
            <div className="flex flex-col gap-2">
              <span>Status</span>
              <ToggleSwitch
                ChangeStatus={(val) => {
                  if (val) {
                    setBlogStatus(1);
                  } else {
                    setBlogStatus(0);
                  }
                }}
                status={blogStatus}
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
                      : `${global.imageUrl + blogData?.image}`
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
          <hr />
          {/* Upadte */}
          <div className="py-6">
            <button
              onClick={handleUpdateBlog}
              className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBlog;
