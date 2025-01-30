import React, { useRef } from "react";
import { Link } from "react-router-dom";
// Add to cart
import { useCart } from "../data/CartStore";
import { toast } from "react-toastify";
import { useAuth } from "../services/Auth";
import check from "../assets/images/check.webp";

const PackageCard = ({
  id,
  packageName,
  daysAccess,
  packagefeatures,
  price,
  userCurrentId,
  currentPackageEndDate,
  setPackageDetailText,
}) => {
  const { addToCart } = useCart();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }
  const { user, clearSession } = useAuth();

  const handlePackageDetail = (packageName) => {
    if (packageName === "Free") {
      setPackageDetailText(
        "This package is perfect for those just starting and looking for essential tools to create or enhance their resumes and cover letters. Enjoy unlimited PDF downloads, 5 attempts at spell and grammar checks, and the ability to edit and share your documents. With access to basic resume sections, templates, examples, and manual cover letter generation, you can get started without any extra cost."
      );
    } else if (packageName === "Premium") {
      setPackageDetailText(
        "Our Premium Package offers the ultimate experience for job seekers. You’ll have access to 5 premium templates, unlimited examples, and 50 tries for spell and grammar checks. Enjoy the convenience of unlimited downloads, access to global job opportunities, and real-time AI suggestions. With 20 resume parser tokens, limitless customization options, and branding-free downloads, this plan ensures you stand out."
      );
    } else {
      setPackageDetailText(
        "It is ideal for professionals aiming to create standout resumes and cover letters with enhanced features. With spell and grammar check attempts and access to advanced AI chat support, you’ll have more tools to refine your documents. This package includes two premium templates and AI-based cover letter generation. Additionally, enjoy resume parser tokens that allow you to create tailored job applications easily."
      );
    }
  };

  // Function to dynamically add images before red-highlighted points
  const modifyFeaturesWithImages = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Select all list items
    const listItems = doc.querySelectorAll("li");

    listItems.forEach((item) => {
      // Create an image element
      const img = document.createElement("img");
      img.src = check;
      // img.alt = "Icon";
      img.style.width = "20px";
      img.style.marginRight = "8px";

      // Insert the image before the text in the list item
      item.prepend(img);
    });

    return doc.body.innerHTML; // Return the modified HTML
  };

  return (
    <>
      <div className="w-[450px] h-auto 2xl:h-[700px] shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden p-0">
        {/* Head Package name */}
        <div className="border-b-2 border-[#01B2AC25] py-2 text-center font-bold text-lg text-[white] bg-[#0072B1]">
          {packageName}
        </div>
        {/* Package Pricing */}
        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-center border-b-2 w-[80%] border-[#0072B1] py-1">
            {id === 1 ? (
              <div className="text-base font-bold my-4">Life Time Access</div>
            ) : id === 2 ? (
              <div>
                <h1 className="text-black text-base font-bold my-[14px]">
                  {daysAccess / 30}-{daysAccess / 30 > 1 ? "MONTHS" : "MONTH"}/
                  $ {price}
                </h1>
              </div>
            ) : (
              <>
                {/* <div className="text-sm my-1">Full Access</div> */}
                <div className="my-[14px]">
                  <h1 className="text-black text-base font-bold">
                    {daysAccess / 30}-{daysAccess / 30 > 1 ? "MONTHS" : "MONTH"}{" "}
                    / $ {price}
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className=" px-4 py-4 flex flex-col gap-4">
          {/* Package features */}
          <div
            className="__packages__feature h-auto 2xl:h-[450px]"
            dangerouslySetInnerHTML={{
              __html: modifyFeaturesWithImages(packagefeatures),
            }}
          ></div>
          {/* Button */}
          <div className="">
            <>
              {price <= 0 ? (
                <div className="w-full flex items-center justify-center">
                  <div className="text-center cursor-not-allowed py-2 bg-[#fff] border  text-[#00caa5] font_1 font-Lexend text-md shadow-md transition-all duration-300 ease rounded-3xl w-[200px] ">
                    {userCurrentId === 1 ? "OWNED" : "FREE"}
                  </div>
                </div>
              ) : id === 2 && userCurrentId === 3 ? (
                <Link
                  to={"#"}
                  type="button"
                  className="w-full text-center cursor-not-allowed  text-xs py-3 bg-[#fff] mt-[-5px] text-[#00caa5] shadow-md font-Lexend text-md transition-all duration-300 ease  rounded-3xl"
                >
                  Can't downgrade until: {formatDate(currentPackageEndDate)}
                </Link>
              ) : id === userCurrentId ? (
                <div className="w-full flex items-center justify-center mt-10">
                  <div className="border text-center font-bold cursor-not-allowed py-2 bg-[#00caa5] mt-[-45px] text-[#fff] shadow-md font-Lexend text-md transition-all duration-300 ease rounded-3xl w-[200px]">
                    OWNED
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center">
                  <Link
                    to={user ? "/cart" : "/login"}
                    type="button"
                    onClick={() => {
                      if (user) {
                        if (userCurrentId === id) {
                          toast.error(
                            "You are currently using the same package."
                          );
                        }
                        addToCart("package", {
                          id: id,
                          name: packageName,
                          duration: daysAccess,
                          price: price,
                          quantity: 1,
                        });
                      }
                    }}
                    className="hover:text-white text-[#00caa5] hover:bg-[#00caa5] hover:shadow-md font_1 text-md transition-all duration-300 ease rounded-3xl w-[200px] animate-pulse border-[#00caa5] shadow-md text-center py-2 bg-[#fff] mt-[-5px] border"
                  >
                    {price <= 0 ? "FREE" : "GET STARTED"}
                  </Link>
                </div>
              )}
              <div>
                {/* Package Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handlePackageDetail(packageName)}
                    className="text-center bg-primary-blue px-4 py-1 border-2 border-primary-blue rounded-full text-white cursor-pointer mt-4 text-sm hover:bg-white hover:text-primary-blue font-semibold"
                  >
                    View Details
                  </button>
                </div>

                {/* Section where the text is displayed */}
                {/* <div
                  className="detailSectionRef"
                  ref={detailSectionRef} // Attach the reference to this section
                ></div> */}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
