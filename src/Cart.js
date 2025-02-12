import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineRight } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { useCart } from "./data/CartStore";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { ApiService } from "./services/ApiService";
import { useNavigate } from "react-router-dom";
import TextAreaGroup from "./components/TextAreaGroup";
// import PackageImg from "/images/free_basic_img.webp";
import { useAuth } from "./services/Auth";
import axios from "axios";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "react-tippy/dist/tippy.css";
import { TiArrowSortedDown } from "react-icons/ti";
import Cookies from "js-cookie";
import SpinnerLoader from "./components/shared-components/spinnerloader/SpinnerLoader.js";

const PackageImg = "/images/free_basic_img.webp";

const Cart = () => {
  const driverObj = driver();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    removeFromCart,
    clearCart,
    updatePackagesQuantity,
    addToCart,
    uploadFile,
  } = useCart();

  useEffect(() => {
    console.log(cart);
  }, []);

  const [isCheckboxchecked, setCheckboxchecked] = useState(false);
  const [allServices, setAllservices] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Get All services

    axios
      .get(`${global.baseurl}/web-services`)
      .then((res) => {
        setAllservices(res.data.data.services);
      })
      .catch((err) => console.log(err));
    console.log();
    ApiService.getUserDetails(user?.token)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = () => {
    setCheckboxchecked(!isCheckboxchecked);
  };

  const handleCheckoutClick = () => {
    Cookies.remove("payotp");
    let isFileNameMissing = false;

    cart?.services?.some((service, idx) => {
      if (!service.file.fileName) {
        const button = document.getElementById(`tipy_${idx}`);
        const text = document.getElementById("id_here");
        text.style.display = "block";

        if (button) {
          button.style.display = "flex";
          isFileNameMissing = true;
        }
      } else {
        const button = document.getElementById(`tipy_${idx}`);
        const text = document.getElementById("id_here");
        button.style.display = "none";
        text.style.display = "none";
      }
    });

    if (isFileNameMissing) {
      return; // Stop the function if any file name is missing
    }

    if (!isCheckboxchecked) {
      swal({
        title: "Error",
        text: "Please accept all policies before checking out.",
        icon: "error",
      });
      return;
    } else {
      if (cart.package.length > 0) {
        if (cart.package[0].id === 2 && cart.services.length === 0) {
          driverObj.highlight({
            element: "#services-placeholder",
            popover: {
              title: "Select Your Free Service",
              description:
                "Upon purchasing the package, you are required to choose one premium professional service from the available options at no cost.",
              footer: "Selecting a free service is mandatory.",
            },
          });
          return;
        }
      }
      const state = {
        totalAmount: totalWithoutDiscount,
        subtotal: totalWithDiscount,
        remainingAmount: remainingAmount,
        noteValue: noteValue,
        selectedFree: selectedFree,
        selectedFreeServices: selectedFreeServices,
      };

      navigate("/checkout", { state });
    }
  };

  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [packagesPrice, setPackagesPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  // Note
  const [isNote, setIsNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [selectedFree, setSelectedFree] = useState(0);
  const [selectedFreeServices, setSelectedFreeServices] = useState([]);
  const [allowedFreeServices, setAllowedFreeServices] = useState(0);
  const [msgFreeServices, setMsgFreeServices] = useState("");
  // Initialize allowed free services and preselect services
  useEffect(() => {
    let allowed = 0;

    if (cart.package.length > 0) {
      if (cart.package[0].id === 2) {
        allowed = 1; // Package 2 allows 1 free service
      } else if (cart.package[0].id === 3) {
        allowed = 2; // Package 3 allows 2 free services
      }
    }

    if (cart.package?.package_id === 3) {
      allowed = 2; // User package 3 allows 2 free services
    }

    setAllowedFreeServices(allowed);

    // Automatically select free services
    const initialFreeServices = [];
    let freeServicesCount = 0;

    cart.services.forEach((_, idx) => {
      if (freeServicesCount < allowed) {
        initialFreeServices.push(idx);
        freeServicesCount++;
      }
    });

    setSelectedFreeServices(initialFreeServices);
    updateCartPrice(initialFreeServices);
  }, [cart, userData]);

  // Handle free service selection
  const handleFreeServiceSelection = (serviceIdx) => {
    setSelectedFreeServices((prev) => {
      let newSelection = [];
      if (prev.includes(serviceIdx)) {
        // Remove the service if it was previously selected
        newSelection = prev.filter((idx) => idx !== serviceIdx);
      } else {
        // Ensure not exceeding the allowed free services
        if (prev.length >= allowedFreeServices) {
          newSelection = [...prev.slice(1), serviceIdx];
        } else {
          newSelection = [...prev, serviceIdx];
        }
      }
      updateCartPrice(newSelection);
      return newSelection;
    });
  };

  // Validate if the required number of free services is selected
  const validateFreeServiceSelection = () => {
    if (selectedFreeServices.length < allowedFreeServices) {
      // Only log or perform actions that don't trigger state changes
      console.log(
        `Please select ${allowedFreeServices} free service${allowedFreeServices > 1 ? "s" : ""
        } before proceeding.`
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (selectedFreeServices.length < allowedFreeServices) {
      setMsgFreeServices(
        `Please select ${allowedFreeServices} free service${allowedFreeServices > 1 ? "s" : ""
        } before proceeding.`
      );
    } else {
      setMsgFreeServices(""); // Clear the message if criteria are met
    }
  }, [selectedFreeServices, allowedFreeServices]);

  // Update cart price based on selected free services
  const updateCartPrice = (freeServices = selectedFreeServices) => {
    let totalWithoutDiscount = 0;
    let totalWithDiscount = 0;

    cart.services.forEach((ser, idx) => {
      const servicePrice = Number(ser.price);
      let discountedPrice =
        ser.discounted_price > 0 ? Number(ser.discounted_price) : servicePrice;

      // Apply free service logic
      if (freeServices.includes(idx)) {
        discountedPrice = 0; // Free services have no cost
      }

      totalWithoutDiscount += servicePrice;
      totalWithDiscount += discountedPrice;
    });

    const packagePrice =
      cart.package.length > 0 ? Number(cart.package[0].price) : 0;
    const packagesQuantity =
      cart.package.length > 0 ? cart.package[0]?.quantity : 0;

    const calculatedTotalWithoutDiscount =
      totalWithoutDiscount + packagePrice * packagesQuantity;
    const calculatedTotalWithDiscount =
      totalWithDiscount + packagePrice * packagesQuantity;
    const calculatedRemainingAmount =
      calculatedTotalWithoutDiscount - calculatedTotalWithDiscount;

    setTotalWithoutDiscount(Number(calculatedTotalWithoutDiscount.toFixed(2)));
    setTotalWithDiscount(Number(calculatedTotalWithDiscount.toFixed(2)));
    setRemainingAmount(Number(calculatedRemainingAmount.toFixed(2)));
    setPackagesPrice(Number(packagePrice.toFixed(2)));

    const finalSubtotal =
      packagesQuantity > 0
        ? packagePrice * packagesQuantity + totalWithDiscount
        : totalWithDiscount;

    setSubtotal(Number(finalSubtotal.toFixed(2)));
  }; // Recalculate whenever `cart` or `userData` changes
  // useEffect(() => {
  //   if (cart.services || cart.template) {
  //     let totalWithoutDiscount = 0;
  //     let totalWithDiscount = 0;

  //     let isPackage3 = false;
  //     let isFirstServiceInPackage2 = true; // Flag to track if the first service in package 2 has been encountered
  //     cart.services.forEach((ser, idx) => {
  //       const servicePrice = Number(ser.price);
  //       let discountedPrice =
  //         ser.discounted_price > 0
  //           ? Number(ser.discounted_price)
  //           : servicePrice;

  //       // Check if the package ID is 2 and it's the first service encountered in the loop
  //       if (cart.package.length > 0) {
  //         if (cart.package[0].id === 2 && idx === selectedFree) {
  //           discountedPrice = 0; // Set the price to 0 for the first service in package 2
  //           isFirstServiceInPackage2 = false; // Update the flag to indicate that the first service in package 2 has been encountered
  //         }

  //         if (cart.package[0].id === 3) {
  //           isPackage3 = true;
  //         }
  //       }

  //       if (userData?.package_id === 3) {
  //         isPackage3 = true;
  //       }

  //       totalWithoutDiscount += servicePrice;
  //       totalWithDiscount += discountedPrice;
  //     });

  //     // If the package ID is 3, update the totalWithoutDiscount and totalWithDiscount to 0
  //     if (isPackage3) {
  //       totalWithoutDiscount = 0;
  //       totalWithDiscount = 0;
  //     }

  //     const packagePrice =
  //       cart.package.length > 0 ? Number(cart.package[0].price) : 0;
  //     const packagesQuantity =
  //       cart.package.length > 0 ? cart.package[0]?.quantity : 0;
  //     const calculatedTotalWithoutDiscount =
  //       totalWithoutDiscount + packagePrice * packagesQuantity;
  //     const calculatedTotalWithDiscount =
  //       totalWithDiscount + packagePrice * packagesQuantity;
  //     const calculatedRemainingAmount =
  //       calculatedTotalWithoutDiscount - calculatedTotalWithDiscount;

  //     setTotalWithoutDiscount(calculatedTotalWithoutDiscount);
  //     setTotalWithDiscount(calculatedTotalWithDiscount);
  //     setRemainingAmount(calculatedRemainingAmount);
  //     setPackagesPrice(packagePrice);
  //     setSubtotal(packagePrice * cart.package[0]?.quantity + totalWithDiscount);

  //     packagesQuantity > 0
  //       ? setSubtotal(packagePrice * packagesQuantity + totalWithDiscount)
  //       : setSubtotal(totalWithDiscount);
  //   }
  // }, [cart, userData, selectedFree]);

  const handleRemoveCartItem = async (cartSection, itemId, fileName) => {
    console.log(fileName);
    swal({
      dangerMode: true,
      icon: "error",
      title: "Do you want to remove this from your cart?",
      buttons: true,
    }).then(async (delt) => {
      // Make this function async as well

      if (delt) {
        await removeFromCart(cartSection, itemId);

        if (fileName) {
          ApiService.deleteOldServiceFile(user?.token, fileName)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
      }
    });
  };

  const handleClearCart = () => {
    clearCart();
  };

  // !siraj
  const upload_service_image = (e, serviceId, index_number) => {
    let file = e.target.files[0];

    // swal({
    //   buttons: true,
    //   icon: "success",
    //   title: `${file.name}`,
    //   text: "Want to continue with This File",
    //   className: "sm:w-[600px]",
    // }).then((will) => {

    // });

    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    setLoading(true); // Show the loader
    console.log(cart.services[index_number]);
    if (cart.services[index_number]?.file.fileName) {
      console.log(
        "has old file and the name is" +
        cart.services[index_number]?.file.fileName
      );

      ApiService.deleteOldServiceFile(
        user?.token,
        cart.services[index_number]?.file.fileName
      )
        .then((res) => {
          console.log(res.data);
          ApiService.uploadServiceFile(user?.token, file)
            .then((res) => {
              uploadFile(
                serviceId,
                res.data.data.file_name,
                res.data.data.file_url,
                file.name
              );
              setLoading(false); // Hide the loader

              swal({
                icon: "success",
                title: "File Uploaded Successfully",
                text: "Now you proceed to checkout",
              });
            })
            .catch((err) => {
              setLoading(false); // Hide the loader in case of error
              console.log(err);
            });
        })
        .catch((err) => {
          setLoading(false); // Hide the loader in case of error
          console.log(err);
        });
    } else {
      ApiService.uploadServiceFile(user?.token, file)
        .then((res) => {
          uploadFile(
            serviceId,
            res.data.data.file_name,
            res.data.data.file_url,
            file.name
          );

          setLoading(false); // Hide the loader
          swal({
            icon: "success",
            title: "File Uploaded Successfully",
            text: "Now you proceed to checkout",
          });
        })
        .catch((err) => {
          setLoading(false); // Hide the loader in case of error
          console.log(err);
        });
    }
  };

  async function deleteFileAndUploadNew(fileId) {
    const url = `${global.baseurl}/delete-file/${fileId}`;
    console.log(`${global.baseurl}/delete-file/${fileId}`);
    const token = user?.token; // Replace with your actual token

    try {
      // Step 1: Delete the file
      const deleteResponse = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete file: " + deleteResponse.statusText);
      }

      const deleteData = await deleteResponse.json();
      console.log(deleteData.message); // "File deleted successfully."

      // Step 2: Handle UI update or other operations if needed
      // Example: Remove the file from the UI list

      // Step 3: Upload a new file from local system
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*"; // Adjust the accept attribute as per your file type

      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const uploadUrl = `${global.baseurl}/upload-file`;

        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(
            "Failed to upload file: " + uploadResponse.statusText
          );
        }

        const uploadData = await uploadResponse.json();
        console.log(uploadData.message); // Success message from upload

        // Update UI or perform further actions after successful upload
      };

      // Optionally trigger file selection programmatically
      fileInput.click();
    } catch (error) {
      console.error("There was a problem with the delete request:", error);
      // Handle error scenarios as needed
    }
  }
  return (
    <div>
      <Header />

      <div className="w-full lg:w-[80%] m-auto">
        <div className="container m-auto py-20 px-4 sm:px-4 font-Lexend">
          {/* Content */}
          <div className="flex flex-col gap-20">
            <div className="grid  lg:grid-cols-[70%,30%] gap-2 ">
              {/* Left Section */}
              <div className="sm:px-8 select-none">
                <div>
                  <h1 className="text-primary font-bold text-2xl">YOUR CART</h1>
                  <span id="id_here" className="hidden text-md text-red-500">
                    For expert assistance, share your document and our
                    professionals rewrite it in a polished way that reflects
                    your strengths to ensure each document meets industry
                    standards.
                  </span>
                </div>

                {/* Packages */}
                <div>
                  {cart.package.map(
                    (cart, idx) =>
                      cart.price > 0 && (
                        <div
                          key={idx}
                          className="sm:flex gap-8 items-center border-b-2 py-6 px-4 "
                        >
                          {/* Img */}
                          <div className="w-full sm:w-[100px]">
                            <img src={PackageImg} className="w-full" alt="" />
                          </div>
                          {/* Details */}
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                            <div className="pt-4 sm:pt-0">
                              <h1 className="text-lg sm:text-2xl font-bold text-primary">
                                {cart.name}
                              </h1>
                              <span className="text-sm text-muted hidden sm:block">
                                {cart.quantity > 1
                                  ? `Package For ${cart.quantity} Months`
                                  : `Package For  ${cart.quantity} Month`}
                              </span>
                            </div>
                            <div className="text-lg flex items-center sm:block justify-between w-full sm:w-auto py-2 sm:py-0">
                              <span className="text-sm text-muted block sm:hidden">
                                {cart.quantity > 1
                                  ? `Package For ${cart.quantity} Months`
                                  : `Package For  ${cart.quantity} Month`}
                              </span>
                              <h1>${cart.price * cart.quantity}</h1>
                            </div>
                          </div>
                          {/* Action */}
                          <div className=" flex items-center gap-4 justify-end">
                            {/* <div className=" p-2 sm:w-fit cursor-pointer flex justify-center items-center gap-4">
                              <FaCirclePlus
                                onClick={() => updatePackagesQuantity("add")}
                                className="text-primary text-2xl"
                              />
                              <div className="flex items-center">
                                <span className="text-xl">{cart.quantity}</span>
                              </div>

                              <FaCircleMinus
                                onClick={() => updatePackagesQuantity("min")}
                                className="text-primary text-2xl"
                              />
                            </div> */}
                            <div
                              className="lg:w-full p-2 sm:w-fit cursor-pointer flex sm:block justify-center items-center gap-2 w-[20%] bg-[red]"
                              onClick={() =>
                                handleRemoveCartItem("package", cart.id)
                              }
                            >
                              <span className="text-white font-semibold block sm:hidden"></span>
                              <RiDeleteBinLine className="text-xl bg-[red] text-white" />
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>

                {/* service Carts List */}
                <div>
                  {cart.services.map((carts, idx) => (
                    <div
                      key={idx}
                      className="sm:flex gap-8 items-center border-b-2 py-6 px-4 relative"
                    >
                      {/* {cart.package.length > 0 &&
                        (cart.package[0].id === 2 ||
                          cart.package[0].id === 3) && (
                          <label className="absolute top-4 right-4 flex items-center gap-2">
                            use Free
                            <input
                              type="checkbox"
                              checked={selectedFree === idx}
                              onChange={() => setSelectedFree(idx)}
                            />
                          </label>
                        )} */}

                      {cart.package.length > 0 &&
                        (cart.package[0].id === 2 ||
                          cart.package[0].id === 3) && (
                          <label className="absolute top-4 right-4 flex items-center gap-2">
                            Use Free
                            <input
                              type="checkbox"
                              checked={selectedFreeServices.includes(idx)} // Check if this service is selected
                              onChange={() => handleFreeServiceSelection(idx)}
                            />
                          </label>
                        )}
                      {/* Img */}
                      <div className="w-full sm:w-[100px]">
                        <img
                          src={`${global.imageUrl + carts.image}`}
                          className="w-full"
                          alt=""
                        />
                      </div>
                      {/* Details */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                        <div className="pt-4 sm:pt-0">
                          <h1 className="text-lg sm:text-2xl font-bold text-primary">
                            {carts.name}
                          </h1>
                          <span className="text-sm text-muted hidden sm:block">
                            Size: A4
                          </span>
                          <span
                            className="text-xs flex items-center gap-2"
                            id="hideWholeLine"
                          >
                            <ImAttachment />
                            {Object.keys(carts.file).length > 0
                              ? carts.file.fileRealName
                              : ""}
                          </span>
                        </div>
                        <div className="text-lg flex items-center sm:block justify-between w-full sm:w-auto py-2 sm:py-0">
                          <span className="text-sm text-muted block sm:hidden">
                            Size: A4
                          </span>
                          <h1>
                            {cart?.package.length > 0 &&
                              cart?.package[0].id === 2 &&
                              selectedFreeServices.includes(idx) ? (
                              <div>
                                <span>FREE</span>
                                {" / "}
                                <span className="line-through">
                                  $
                                  {carts.discounted_price > 0
                                    ? carts.discounted_price
                                    : carts.price}
                                </span>
                              </div>
                            ) : cart?.package.length > 0 &&
                              cart?.package[0].id === 3 &&
                              selectedFreeServices.includes(idx) ? (
                              <div>
                                <span>FREE</span>
                                {" / "}
                                <span className="line-through">
                                  $
                                  {carts.discounted_price > 0
                                    ? carts.discounted_price
                                    : carts.price}
                                </span>
                              </div>
                            ) : carts.discounted_price > 0 ? (
                              <>
                                ${carts.discounted_price}
                                {" / "}
                                <span className="line-through">
                                  ${carts.price}
                                </span>
                              </>
                            ) : (
                              carts.price
                            )}
                          </h1>
                        </div>
                      </div>
                      {/* Action */}
                      {/* !siraj */}
                      {loading && (
                        <div className="w-full h-full bg-[rgba(250,250,250,1)] fixed top-0 left-0 text-white z-50 flex flex-wrap justify-center items-center">
                          <SpinnerLoader />
                        </div>
                      )}
                      <div className="w-full sm:w-[60px] flex gap-4 justify-end">
                        <input
                          id={`uploadFile_${idx}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            console.log(e.target);
                            if (e.target.files[0]) {
                              upload_service_image(e, carts.id, idx);
                              document.getElementById(
                                `tipy_${idx}`
                              ).style.display = "none";
                            }
                          }}
                          accept=".pdf,.docx,.jpeg,.jpg,.png"
                        />

                        <div>
                          <div
                            onClick={() =>
                              document
                                .getElementById(`uploadFile_${idx}`)
                                .click()
                            }
                            className="relative w-full bg-primary p-2 sm:w-fit cursor-pointer flex sm:block justify-center items-center gap-2"
                          >
                            <div
                              id={`tipy_${idx}`}
                              className="hidden absolute p-2 font-Lexend bottom-[130%] left-[-0px] sm:left-[-82px] justify-center bg-black text-white  border rounded-lg sm:w-[200px] text-center"
                            >
                              Service need a file Please Upload
                              <TiArrowSortedDown className="text-black absolute bottom-[-15px] text-[25px]" />
                            </div>

                            <span className="text-white font-semibold block sm:hidden">
                              Upload File
                            </span>
                            <BiUpload className="text-xl bg-primary text-white" />
                          </div>
                        </div>

                        <div
                          className="lg:w-full bg-[red] p-2 sm:w-fit cursor-pointer flex justify-center items-center gap-2 w-[20%]"
                          onClick={() =>
                            handleRemoveCartItem(
                              "service",
                              carts.id,
                              carts.file.fileName
                            )
                          }
                        >
                          <span className="text-white font-semibold block sm:hidden">
                            {/* Add content here if needed */}
                          </span>
                          <RiDeleteBinLine className="text-xl bg-[red] text-white flex justify-center" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* If No Services Set */}
                <div id="services-placeholder">
                  {cart.package.length > 0 &&
                    cart.services.length === 0 &&
                    cart.package[0].id === 2 && (
                      <>
                        {allServices?.map((service, idx) => {
                          if (!service.status) return;
                          return (
                            <div
                              key={idx}
                              className="sm:flex gap-8 items-center border-b-2 py-6 px-4 opacity-20 hover:opacity-100"
                            >
                              {/* Img */}
                              <div className="w-full sm:w-[100px]">
                                <img
                                  src={`${global.imageUrl + service.image}`}
                                  className="w-full"
                                  alt=""
                                />
                              </div>
                              {/* Details */}
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                                <div className="pt-4 sm:pt-0">
                                  <h1 className="text-lg sm:text-2xl font-bold text-primary">
                                    {service.name}
                                  </h1>

                                  <span className="text-xs flex items-center gap-2">
                                    Price: $ {service.price}
                                  </span>
                                </div>
                                <div className="text-lg flex gap-2 items-center flex-col pt-6 justify-between w-full sm:w-auto ">
                                  <h1>
                                    <div className="text-sm flex items-end justify-end">
                                      <span>FREE</span>
                                      {" / "}
                                      <span className="line-through">
                                        $ {service.price}
                                      </span>
                                    </div>
                                  </h1>
                                  <button
                                    className="bg-primary px-12 py-1 text-white"
                                    onClick={() => {
                                      driverObj.destroy(
                                        "#services-placeholder"
                                      );
                                      addToCart("service", {
                                        id: service.id,
                                        name: service.name,
                                        image: service.image,
                                        price: service.price,
                                        discounted_price:
                                          service.discounted_price,
                                        description: service.description,
                                        file: {},
                                      });
                                    }}
                                  >
                                    Avail
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                  {cart.package.length > 0 &&
                    cart.services.length <= 1 &&
                    cart.package[0].id === 3 && (
                      <>
                        {allServices?.map((service, idx) => {
                          if (!service.status) return;
                          return (
                            <div
                              key={idx}
                              className="sm:flex gap-8 items-center border-b-2 py-6 px-4 opacity-20 hover:opacity-100"
                            >
                              {/* Img */}
                              <div className="w-full sm:w-[100px]">
                                <img
                                  src={`${global.imageUrl + service.image}`}
                                  className="w-full"
                                  alt=""
                                />
                              </div>
                              {/* Details */}
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4">
                                <div className="pt-4 sm:pt-0">
                                  <h1 className="text-lg sm:text-2xl font-bold text-primary">
                                    {service.name}
                                  </h1>

                                  <span className="text-xs flex items-center gap-2">
                                    Price: $ {service.price}
                                  </span>
                                </div>
                                <div className="text-lg flex gap-2 items-center flex-col pt-6 justify-between w-full sm:w-auto ">
                                  <h1>
                                    <div className="text-sm flex items-end justify-end">
                                      <span>FREE</span>
                                      {" / "}
                                      <span className="line-through">
                                        $ {service.price}
                                      </span>
                                    </div>
                                  </h1>
                                  <button
                                    className="bg-primary px-12 py-1 text-white"
                                    onClick={() => {
                                      driverObj.destroy(
                                        "#services-placeholder"
                                      );
                                      addToCart("service", {
                                        id: service.id,
                                        name: service.name,
                                        image: service.image,
                                        price: service.price,
                                        discounted_price:
                                          service.discounted_price,
                                        description: service.description,
                                        file: {},
                                      });
                                    }}
                                  >
                                    Avail
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                </div>

                {/* CONTINUE SHOPPING */}
                <div className="flex justify-center items-center py-8">
                  <Link
                    to={"/services"}
                    className="bg-primary text-white py-2 px-4 rounded-2xl hover:bg-[#0056b1d2]"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
              {/* Right Section */}
              <div className="sticky flex flex-col gap-8 top-[100px] h-fit">
                <div className="border-2 p-8 ">
                  {/* Card Title */}
                  <div className="">
                    <h1 className="text-lg sm:text-2xl font-bold">
                      Your order
                    </h1>
                  </div>
                  {/* Details */}
                  <div className="flex flex-col gap-4 py-6">
                    <div className="flex items-center justify-between font-bold text-lg sm:text-2xl">
                      <h1>SUBTOTAL:</h1>
                      <h1>{!userData ? "$0" : "$" + subtotal.toFixed(2)} </h1>
                    </div>
                  </div>
                  {/* Checkout Page */}
                  <div className="flex flex-col gap-2">
                    {/* {subtotal !== 0 ? (
                      <button
                        onClick={handleCheckoutClick}
                        className="bg-primary text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : userData?.package_id === 3 ? (
                      <button
                        onClick={handleCheckoutClick}
                        className="bg-primary text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-center text-white py-3 px-4 font-bold text-lg sm:text-xl cursor-not-allowed">
                        {" "}
                        Checkout
                      </button>
                    )} */}
                    <span className="text-red-500">{msgFreeServices}</span>

                    {cart?.package.length == 0 && subtotal !== 0 ? (
                      <button
                        onClick={handleCheckoutClick}
                        className="bg-primary text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : cart?.package[0]?.id >= 2 &&
                      validateFreeServiceSelection() ? (
                      <button
                        onClick={handleCheckoutClick}
                        className="bg-primary text-center text-white py-3 px-4 font-bold text-lg sm:text-xl  hover:bg-[#0056b1d2]"
                      >
                        Checkout
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-center text-white py-3 px-4 font-bold text-lg sm:text-xl cursor-not-allowed">
                        {" "}
                        Checkout
                      </button>
                    )}
                  </div>
                  {/*  */}
                  <div className="py-4">
                    <p className="text-muted text-sm">
                      By proceeding to checkout, you confirm your agreement to
                      adhere to our terms and conditions for the AI Pro Resume
                      service. Kindly review the terms document for
                      comprehensive information.
                    </p>
                  </div>
                  {/*  */}
                  <div>
                    <label
                      htmlFor="store_policies"
                      className="w-fit text-sm flex items-center gap-2 text-primary cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isCheckboxchecked}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5"
                        id="store_policies"
                      />
                      I agree to the{" "}
                      <Link
                        to={"/terms-and-conditions"}
                        className=" text-primary-green hover:text-primary-blue"
                      >
                        store policies
                      </Link>
                    </label>
                  </div>
                </div>
                {/*  */}
                <div className="border-2 p-8">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsNote(!isNote)}
                  >
                    <h1 className="text-lg sm:text-2xl font-bold">
                      Add a Note
                    </h1>
                    <AiOutlineRight className="text-xl font-bold" />
                  </div>
                  <div className={`${isNote ? "block" : "hidden"}`}>
                    <TextAreaGroup
                      htmlFor={"add_note"}
                      isRequired={false}
                      label={"Note"}
                      cols={4}
                      onchange={(val) => setNoteValue(val)}
                      placeholder={"add your note..."}
                      resize={false}
                      rows={4}
                      value={noteValue}
                    />
                  </div>
                </div>
                {cart.package.length > 0 ||
                  (cart.services.length > 0 && (
                    <div
                      onClick={handleClearCart}
                      className="flex items-center gap-2 text-base justify-center text-primary cursor-pointer"
                    >
                      <span>Clear Cart</span>
                      <RiDeleteBinLine />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
