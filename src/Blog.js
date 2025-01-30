import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import BlogBanner from "./components/BlogBanner";
import cnn from "./assets/images/cnn.webp";
import bbc from "./assets/images/bbc.webp";
import warnerbros from "./assets/images/warnerbros.webp";
import fox from "./assets/images/fox.webp";
import newyorktimes from "./assets/images/newyorktimes.webp";
import nbc from "./assets/images/nbc.webp";
import loadMore from "./assets/images/loadMore.webp";
import SingleBlogComponentcopy from "./components/SingleBlogComponentcopy";
import { Link } from "react-router-dom";
import { useAuth } from "./services/Auth";
import { ApiService } from "./services/ApiService";
import Skeleton from "react-loading-skeleton";

const BrandImg = [cnn, bbc, warnerbros, fox, newyorktimes, nbc];

function Pages() {
  const { user } = useAuth();
  const [random_blog, set_random_blog] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [blogs, setBlogs] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(global.baseurl + "/all-blogs")
      .then((response) => {
        const { recent_blogs, random_blog, other_blogs } = response.data.data;
        console.log("Fetched Data:", response.data.data);

        set_random_blog(random_blog || []);

        // Combine all blogs into a single array
        const allBlogs = [
          ...(recent_blogs || []),
          ...(random_blog || []),
          ...(other_blogs || []),
        ];

        setBlogs(allBlogs);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const RandomBlogComponent = ({ blog }) => {
    const { short_description, name, image, author_name, created_at, slug } =
      blog;
    return (
      <>
        <div className="mb-3 rounded-sm">
          <Link to={`/blog/${slug}`}>
            <div className="w-full p-2 rounded-sm flex flex-col sm:flex sm:flex-row gap-2 items-start sm:items-center h-[300px] sm:h-auto">
              <div className="overflow-hidden w-full sm:w-[400px] flex justify-center items-center rounded-md shadow-sm border/50">
                <img
                  src={global.imageUrl + image}
                  className="w-full rounded-t-md h-[220px] object-center"
                />
              </div>

              <div className="w-full  h-auto xl:h-[200px] ">
                <div className="flex flex-row items-start sm:items-center gap-5 mt-3 text-sm text-[#0072B1]">
                  <span>{author_name}</span>
                  &#9679;
                  <span>{formatDate(created_at)}</span>
                </div>
                <span className="text-xl text-[#01B2AC] font-bold line-clamp-2">
                  {name}
                </span>
                <p className="text-sm text-slate-700/90 font-normal w-[100%] mt-3 line-clamp-2">
                  {short_description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisible) => prevVisible + 6);
  };

  return (
    <div>
      {/* header */}
      <Header />
      <div className="container mx-auto">
        <section className="lg:h-[450px] flex items-center justify-center">
          <BlogBanner />
        </section>

        <div className="flex items-center justify-center gap-[20px] sm:gap-[50px] lg:gap-[100px] my-3 pb-3">
          {BrandImg?.map((x) => (
            <>
              <img
                src={x}
                alt="full shade image"
                className="w-[30px] sm:w-[50px] lg:w-[60px]"
              />
            </>
          ))}
        </div>

        {ads
          .filter((ad) => ad.slug === "blog-main-page-top")
          .map((ad) => (
            <div key={ad.id} className="px-2">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <img
                    className="w-full"
                    src={`${global.imageUrl + ad.image}`}
                    alt={`Ad ${ad.id}`}
                  />
                </a>
              ) : (
                <div className="p-4">
                  <p className="text-xl font-semibold my-4">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}

        <div className="text-[#0072B1] px-2 text-2xl lg:text-4xl font-bold my-[30px] lg:my-[40px]">
          Featured Blog Posts
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-2">
          {loading ? (
            // Skeleton for the large featured blog
            <div className="lg:col-span-5">
              <div className="w-full flex items-center justify-center overflow-hidden bg-gray-300 rounded-md h-[300px]"></div>
              <div className="py-6">
                <div className="flex items-center gap-5 mt-3 sm:mt-3 text-sm">
                  <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
                  &#9679;
                  <div className="w-16 h-5 bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-3/4 h-6 bg-gray-300 rounded-md mt-3"></div>
                <div className="w-full h-4 bg-gray-300 rounded-md mt-3"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded-md mt-2"></div>
              </div>
            </div>
          ) : random_blog.length > 0 ? (
            <div className="lg:col-span-5">
              <Link to={`/blog/${random_blog[0].slug}`}>
                <div className="w-[100%]">
                  <div className="w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={global.imageUrl + random_blog[0].image}
                      className="w-full shadow-sm max-h-[300px] object-center"
                    />
                  </div>
                  <div className="py-6">
                    <div className="flex items-center gap-5 mt-3 sm:mt-3 text-sm text-[#0072B1]">
                      <span className="">{random_blog[0].author_name} </span>
                      &#9679;
                      <span>{formatDate(random_blog[0].created_at)}</span>
                    </div>
                    <span className="text-2xl text-[#01B2AC] font-bold">
                      {random_blog[0].name}
                    </span>
                    <p className="text-md text-slate-700/90 font-normal w-[85%] mt-3">
                      {random_blog[0].short_description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : null}

          <div className="lg:col-span-7">
            {loading ? (
              <>
                {/* Skeleton for the first smaller featured blog */}
                <div className="mb-6">
                  <div className="w-full h-[180px] bg-gray-300 rounded-md"></div>
                  <div className="w-3/4 h-5 bg-gray-300 rounded-md mt-3"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-2"></div>
                  <div className="w-full h-3 bg-gray-300 rounded-md mt-2"></div>
                </div>
                {/* Skeleton for the second smaller featured blog */}
                <div>
                  <div className="w-full h-[180px] bg-gray-300 rounded-md"></div>
                  <div className="w-3/4 h-5 bg-gray-300 rounded-md mt-3"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-2"></div>
                  <div className="w-full h-3 bg-gray-300 rounded-md mt-2"></div>
                </div>
              </>
            ) : random_blog.length > 1 ? (
              <>
                <RandomBlogComponent blog={random_blog[1]} />
                <RandomBlogComponent blog={random_blog[2]} />
              </>
            ) : null}
          </div>
        </div>

        <div className="text-[#0072B1] px-2 text-2xl sm:text-4xl font-bold my-[20px] sm:my-[40px]">
          All Blog Posts
        </div>

        <div className="container md:container-xl mx-auto mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {loading
              ? // Render Skeletons While Loading
              Array.from({ length: visibleBlogs }).map((_, idx) => (
                <div key={idx} className="p-4 border rounded shadow-md">
                  <Skeleton height={200} />
                  <Skeleton width="60%" height={20} className="my-2" />
                  <Skeleton count={2} />
                </div>
              ))
              : // Render Blogs Once Loaded
              blogs
                .slice(0, visibleBlogs)
                .map((blog, idx) => (
                  <SingleBlogComponentcopy key={idx} blog={blog} />
                ))}
          </div>
        </div>

        {loading
          ? null
          : visibleBlogs < blogs.length && (
            <div className="flex items-center justify-center gap-2 mt-[10px] sm:mt-[70px] my-5">
              <span
                className="text-[#01B2AC] text-sm hover:text-[#0072B1] cursor-pointer font-medium"
                onClick={loadMoreBlogs}
              >
                Load More
              </span>
              <img
                src={loadMore}
                className="w-[10px] h-[15px] transform transition duration-500 hover:scale-150"
                alt="Load More"
              />
            </div>
          )}

        {ads
          .filter((ad) => ad.slug === "blog-main-page-bottom")
          .map((ad) => (
            <div key={ad.id} className="px-2">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <img
                    className="w-full"
                    src={`${global.imageUrl + ad.image}`}
                    alt={`Ad ${ad.id}`}
                  />
                </a>
              ) : (
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Pages;
