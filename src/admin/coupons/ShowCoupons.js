import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";

const ShowCoupons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  //   Value States
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [couponExpiry, setCouponExpiry] = useState("");
  const [couponMaxUsages, setCouponMaxUsages] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const { coupon_id } = location.state;

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    ApiService.showCouponDetails(user?.token, coupon_id)
      .then((res) => {
        // Set Values
        const { name, code, discount_rate, expiry_date, maximum_uses } =
          res.data.data;

        setCouponName(name);
        setCouponCode(code);
        setDiscountRate(discount_rate);
        const ex_data = new Date(expiry_date).toISOString().split("T")[0];
        setCouponExpiry(ex_data);
        setCouponMaxUsages(maximum_uses);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateCoupon = () => {
    setIsloading(true);
    const data = {
      name: couponName,
      code: couponCode,
      discount: discountRate,
      expiry_date: couponExpiry,
      maximum_uses: couponMaxUsages,
      id: coupon_id,
    };

    ApiService.updateCoupon(user?.token, data)
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
        <div className="border h-full p-4">
          {/* Blog Inputs */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">COUPON</h1>

            {/* Coupon Name */}
            <div>
              <AllborderInputGroup
                htmlFor={"coupon_name"}
                isRequired={true}
                label={"Name"}
                onchange={(val) => setCouponName(val)}
                value={couponName}
                placeholder={"Coupon Name"}
              />
            </div>

            {/* Coupon Code */}
            <div>
              <AllborderInputGroup
                htmlFor={"coupon_code"}
                isRequired={true}
                label={"Code"}
                onchange={(val) => setCouponCode(val)}
                value={couponCode}
                placeholder={"Coupon Code"}
              />
            </div>

            {/* Coupon Discount Rate */}
            <div>
              <AllborderInputGroup
                htmlFor={"coupon_discount_rate"}
                isRequired={true}
                label={"Discount-Rate"}
                onchange={(val) => setDiscountRate(val)}
                value={discountRate}
                placeholder={"Discount Rate"}
                type={"number"}
              />
            </div>

            {/* coupon_usgaes */}
            <div>
              <AllborderInputGroup
                htmlFor={"coupon_usgaes"}
                isRequired={true}
                label={"Max Usages"}
                onchange={(val) => setCouponMaxUsages(val)}
                value={couponMaxUsages}
                placeholder={"Coupon Max Usages Number"}
                type={"number"}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  htmlFor={"expiry_date"}
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  Expiry Date
                </label>
                <input
                  type={"date"}
                  id={"expiry_date"}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                  value={couponExpiry}
                  onChange={(e) => setCouponExpiry(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
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
              onClick={handleUpdateCoupon}
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

export default ShowCoupons;
