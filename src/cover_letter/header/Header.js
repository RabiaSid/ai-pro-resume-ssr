import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Templates from "../Templates";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import SelectDropdown from "../../components/SelectDropdown";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import $ from "jquery";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../services/Auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Loader from '../../Loader';

const Header = () => {

  const { user } = useAuth();
  const [check_loader, set_check_loader] = useState(0);
  const {
    register, setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cover_letter, setcover_letter] = useState([]);
  const [countries, setcountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [cities, setcities] = useState([]);
  const page_uuid = useParams().id;
  const [my_updating_data, set_my_updating_data] = useState({});
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );
  const isTemplateTrue = new URLSearchParams(window.location.search).get('template');
  const templateid = new URLSearchParams(window.location.search).get('templateid');
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");
  const is_edit = Cookies.get("is_edit");
  const navigate = useNavigate();
  const formRef = useRef(null);

  const get_country_id = watch('country_id');
  const get_state_id = watch('state_id');

  const nameParts = user?.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0] : "";
  const SecondInitial = nameParts[1] ? nameParts[1] : "";



  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    // const article = {  };

    axios
      .get(global.baseurl + "/states/show-states/" + get_country_id, { headers })
      .then((data) => {
        if (data) {
          setprovince(data.data?.data);
          //$('#state_id').val('');
        }
      })
      .catch(() => { });

  }, [get_country_id])


  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    // const article = {  };

    axios
      .get(global.baseurl + "/cities/show-cities/" + get_state_id, { headers })
      .then((data) => {
        if (data) {
          setcities(data.data?.data);
          //$('#city_id').val('');
        }
      })
      .catch(() => { });

  }, [get_state_id])


  const handlePhoneNumberChange = (value) => {
    //setPhoneNumber(value);
    // setpersonal_info({
    //   ...personal_info,
    //   ['phone_number']: value
    // });

  };

  useEffect(() => {




    if (isExampleTrue === "true") {
      Cookies.set('sel_template', templateid, { expires: 1 });
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/cover_example/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.example.country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data.example.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });


            set_my_updating_data({
              first_name: data.data.data.example.first_name,
              last_name: data.data.data.example.last_name,
              phone_number: data.data.data.example.phone_number,
              email_address: data.data.data.example.email_address,
              street_address: data.data.data.example.street_address,
              country_id: data.data.data.example.country_id,
              city_id: data.data.data.example.city_id,
              state_id: data.data.data.example.state_id,
              zip_code: data.data.data.example.zip_code,
              experience: data.data.data.example.experience,
              opener_detail: data.data.data.example.opener_detail,
              body_skills: data.data.data.example.body_skills,
              employeer_name: data.data.data.example.employeer_name,
              job_title: data.data.data.example.job_title,
              body_detail: data.data.data.example.body_detail,
              cover_template_id: templateid,
              closer_detail: "",
            });

            if (data.data.data.example.first_name) {
              setValue('first_name', data.data.data.example.first_name);
            }

            if (data.data.data.example.last_name) {
              setValue('last_name', data.data.data.example.last_name);
            }

            if (data.data.data.example.phone_number) {
              setValue('phone_number', data.data.data.example.phone_number);
            }

            if (data.data.data.example.email_address) {
              setValue('email_address', data.data.data.example.email_address);
            }

            if (data.data.data.example.street_address) {
              setValue('street_address', data.data.data.example.street_address);
            }

            if (data.data.data.example.zip_code) {
              setValue('zip_code', data.data.data.example.zip_code);
            }



            setTimeout(() => {
              if (data.data.data.example.country_id) {
                setValue('country_id', data.data.data.example.country_id);
              }
              if (data.data.data.example.state_id) {
                setValue('state_id', data.data.data.example.state_id);
              }
              if (data.data.data.example.city_id) {
                setValue('city_id', data.data.data.example.city_id);
              }
            }, 1000);

            Cookies.set(
              "sel_template",
              templateid,
              { expires: 1 }
            ); // Expires in 1 day

            setTimeout(function () {
              setcover_letter(data.data.data.example);
            }, 1000);

            //console.log(data.data.data[0]);
          } else {
            axios
              .get(global.baseurl + "/states/show-states/1")
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch(() => { });
            axios
              .get(global.baseurl + "/cities/show-cities/1", { headers })
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null && isTemplateTrue === null) {
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/cover_letters/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            Cookies.set('profile_id', page_uuid, { expires: 1 });
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });

            set_my_updating_data({
              first_name: data.data.data.first_name,
              last_name: data.data.data.last_name,
              phone_number: data.data.data.phone_number,
              email_address: data.data.data.email_address,
              street_address: data.data.data.street_address,
              country_id: data.data.data.country_id,
              city_id: data.data.data.city_id,
              state_id: data.data.data.state_id,
              zip_code: data.data.data.zip_code,
              experience: data.data.data.experience,
              opener_detail: data.data.data.opener_detail,
              body_skills: data.data.data.body_skills,
              employeer_name: data.data.data.employeer_name,
              job_title: data.data.data.job_title,
              body_detail: data.data.data.body_detail,
              cover_template_id: data.data.data.cover_template_id,
              closer_detail: "",
            });

            if (data.data.data.first_name) {
              setValue('first_name', data.data.data.first_name);
            }

            if (data.data.data.last_name) {
              setValue('last_name', data.data.data.last_name);
            }

            if (data.data.data.phone_number) {
              setValue('phone_number', data.data.data.phone_number);
            }

            if (data.data.data.email_address) {
              setValue('email_address', data.data.data.email_address);
            }

            if (data.data.data.street_address) {
              setValue('street_address', data.data.data.street_address);
            }

            if (data.data.data.zip_code) {
              setValue('zip_code', data.data.data.zip_code);
            }



            setTimeout(() => {
              if (data.data.data.country_id) {
                setValue('country_id', data.data.data.country_id);
              }
              if (data.data.data.state_id) {
                setValue('state_id', data.data.data.state_id);
              }
              if (data.data.data.city_id) {
                setValue('city_id', data.data.data.city_id);
              }
            }, 1000);

            Cookies.set("sel_template", data.data.data.cover_template_id, {
              expires: 1,
            });


          } else {
            axios
              .get(global.baseurl + "/states/show-states/1")
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch(() => { });
            axios
              .get(global.baseurl + "/cities/show-cities/1", { headers })
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValue('first_name', firstNameInitial);
      setValue('last_name', SecondInitial);
      setValue('phone_number', user?.contact);
      setValue('email_address', user?.email);
      setValue('country_id', user?.country_id);

      if (isTemplateTrue === 'true') {

        Cookies.set('sel_template', page_uuid, { expires: 1 });

      }

      set_my_updating_data({
        cover_template_id: res_temp_id,
      });
      axios
        .get(global.baseurl + "/states/show-states/1")
        .then((data) => {
          if (data) {
            setprovince(data.data?.data);
          }
        })
        .catch(() => { });
      axios
        .get(global.baseurl + "/cities/show-cities/1")
        .then((data) => {
          if (data) {
            setcities(data.data?.data);
          }
        })
        .catch(() => { });
    }

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };
    axios
      .get(global.baseurl + "/show-countries", { headers })
      .then((data) => {
        if (data) {
          setcountries(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit2 = (data) => {


    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    set_check_loader(1);
    if (page_uuid && isExampleTrue === null && isTemplateTrue === null) {
      const article = {
        name: data.first_name + data.last_name,
        first_name: data.first_name,
        last_name: data.last_name,
        cover_template_id: my_updating_data.cover_template_id,
        phone_number: data.phone_number,
        email_address: data.email_address,
        street_address: data.street_address,
        country_id: data.country_id,
        state_id: data.state_id,
        city_id: data.city_id,
        zip_code: data.zip_code,
        //experience: '',
        // job_title: '',
        // employeer_name: '',
        // body_skills: '',
        // opener_detail: '',
        // body_detail: '',
        // closer_detail: '',
        _method: "PUT",
      };

      axios
        .post(
          global.baseurl + "/cover_letters/" + page_uuid,
          article,
          { headers }
        )
        .then((data) => {
          if (data) {
            Cookies.set('profile_id', page_uuid, { expires: 1 });
            set_check_loader(0);
            window.location.href = global.localPath + "create-cover-letter/opener/" + page_uuid;

          }
        })
        .catch((err) => {
          console.log(err);
          set_check_loader(0);
          swal("Error!", err.response.data.message, "error");
        });

      //navigate("/create-cover-letter/opener/" + page_uuid);
    } else {
      const article = {
        name: data.first_name + data.last_name,
        first_name: data.first_name,
        last_name: data.last_name,
        cover_template_id: my_updating_data.cover_template_id,
        phone_number: data.phone_number,
        email_address: data.email_address,
        street_address: data.street_address,
        country_id: data.country_id,
        state_id: data.state_id,
        city_id: data.city_id,
        zip_code: data.zip_code,
        //experience: '',
        job_title: '',
        employeer_name: '',
        body_skills: '',
        opener_detail: '',
        body_detail: '',
        closer_detail: '',

      };
      axios
        .post(
          global.baseurl + "/cover_letters",
          article,
          { headers }
        )
        .then((data) => {
          if (data) {
            Cookies.set('profile_id', data.data.data.id, { expires: 1 });
            set_check_loader(0);
            if (isExampleTrue === "true") {
              //navigate("/create-cover-letter/opener/"+data.data.data.id+'?example=true&exampleid='+page_uuid);
              window.location.href = global.localPath + "create-cover-letter/opener/" + data.data.data.id + '?example=true&exampleid=' + page_uuid;
            } else {
              //navigate("/create-cover-letter/opener/"+data.data.data.id);
              window.location.href = global.localPath + "create-cover-letter/opener/" + data.data.data.id;
            }

          }
        })
        .catch((err) => {
          console.log(err);
          set_check_loader(0);
          swal("Error!", err.response.data.message, "error");
        });

      //navigate("/create-cover-letter/opener");
    }



  };

  const set_country = (e) => {
    var country = $("#country_id").val();

    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    // const article = {  };

    axios
      .get(global.baseurl + "/states/show-states/" + country, { headers })
      .then((data) => {
        if (data) {
          setprovince(data.data?.data);


        }
      })
      .catch(() => { });
  };

  const set_city = (n) => {
    var province = $("#state_id").val();

    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/cities/show-cities/" + province, { headers })
      .then((data) => {
        if (data) {
          setcities(data.data?.data);
        }
      })
      .catch(() => { });
  };

  return (
    <div className="flex justify-center items-center pt-20 w-full ">
      {check_loader === 1 ? <Loader /> : ''}
      <div className="h-fit w-full">
        {/* Text */}
        <div className="text-center flex flex-col gap-2  mx-4 sm:mx-0">
          <h1 className="text-xl sm:text-2xl font-bold">
            LET'S START WITH YOUR HEADER
          </h1>
          <span className="text-base">
            Your Name Will Be In The Heading And Signature Of Your Letter.
          </span>
        </div>
        {/* form */}
        <div className="grid lg:grid-cols-[60%,40%]">
          <div className="py-8 lg:pl-20 px-2 flex flex-col  gap-2">
            <form onSubmit={handleSubmit(handleSubmit2)}>
              <div className="flex flex-wrap justify-between sm:px-0 px-4">
                {/* 1:row */}
                <div className="flex flex-wrap justify-between w-full items-center">
                  {/* 1 */}

                  <div className="w-[48%] py-2">
                    <label htmlFor="first_name" className="text-md text-gray-500">
                      FIRST NAME <span className='text-rose-600 font-bold'>*</span>
                    </label>

                    <input type="text"
                      id="first_name"
                      name="first_name"
                      autoComplete="on"
                      placeholder="John"
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("first_name", {
                        required: 'First Name is Empty'
                      })} />

                    <span className="text-rose-600 text-sm font-semibold">
                      {errors?.first_name?.message}
                    </span>
                  </div>

                  <div className="w-[48%] py-2">
                    <label htmlFor="last_name" className="text-md text-gray-500">
                      LAST NAME <span className='text-rose-600 font-bold'>*</span>
                    </label>

                    <input type="text"
                      id="last_name"
                      name="last_name"
                      autoComplete="on"
                      placeholder="Doe"
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("last_name", {
                        required: 'Last Name is Empty'
                      })} />

                    <span className="text-rose-600 text-sm font-semibold">
                      {errors?.last_name?.message}
                    </span>
                  </div>

                  <div className="w-[48%] py-2">
                    <label htmlFor="phone_number" className="text-md text-gray-500">
                      PHONE NUMBER <span className='text-rose-600 font-bold'>*</span>
                    </label>


                    <PhoneInput
                      onChange={handlePhoneNumberChange}
                      id="phone_number"
                      name="phone_number"
                      autoComplete="on"
                      maxLength={20}
                      placeholder='+92 57 ********'
                      value={my_updating_data.phone_number}
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("phone_number", {
                        required: 'Phone Number is Empty',
                        minLength: { value: 10, message: 'Please Add a Valid Phone Number' },
                        maxLength: { value: 20, message: 'Please Add a Valid Phone Number' }
                      })}
                    />

                    <span className="text-rose-600 text-sm font-semibold">
                      {errors?.phone_number?.message}
                    </span>
                  </div>

                  <div className="w-[48%] py-2">
                    <label htmlFor="email_address" className="text-md text-gray-500">
                      EMAIL ADDRESS <span className='text-rose-600 font-bold'>*</span>
                    </label>

                    <input type="text"
                      id="email_address"
                      autoComplete="on"
                      name="email_address"
                      placeholder="JohnDoe@example.com"
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("email_address", {
                        required: "Email Address is Empty",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please Add a Valid Email Address",

                        },
                      })} />

                    <span className="text-rose-600 text-sm font-semibold">
                      {errors?.email_address?.message}
                    </span>
                  </div>

                  <div className="w-full py-2">
                    <label htmlFor="street_address" className="text-md text-gray-500">
                      STREET ADDRESS
                    </label>

                    <input type="text"
                      id="street_address"
                      autoComplete="on"
                      name="street_address"
                      placeholder="Queen Street East, Brampton, Canada"
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("street_address")} />

                  </div>

                  <div className="w-[48%] py-2">
                    <label htmlFor="zip_code" className="text-md text-gray-500">
                      ZIP CODE
                    </label>

                    <input type="text"
                      id="zip_code"
                      name="zip_code"
                      autoComplete="on"
                      maxLength={8}

                      placeholder="A5466"
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      {...register("zip_code")} />

                  </div>

                  <div className="w-[48%] py-2">
                    <label htmlFor="country_id" className="text-md text-gray-500">
                      COUNTRY <span className='text-rose-600 font-bold'>*</span>
                    </label>

                    <select
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      id="country_id"
                      name="country_id"
                      autoComplete="on"
                      {...register("country_id", {
                        required: 'Country is Empty'
                      })}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index_country) => (
                        <option value={country?.id} key={index_country}>
                          {country?.name}
                        </option>
                      ))}
                    </select>

                    <span className="text-rose-600 text-sm font-semibold">
                      {errors?.country_id?.message}
                    </span>

                  </div>


                  <div className="w-[48%] py-2">
                    <label htmlFor="state_id" className="text-md text-gray-500">
                      STATE / PROVINCE
                    </label>

                    <select
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      id="state_id"
                      name="state_id"
                      autoComplete="on"
                      {...register("state_id")}
                    //onChange={(n) => set_country('0')}

                    >
                      <option value=''>Select State / Province</option>
                      {province.map((pro, index_pro) => (
                        <option value={pro?.id} key={index_pro}>
                          {pro?.name}
                        </option>
                      ))}
                    </select>


                  </div>


                  <div className="w-[48%] py-2">
                    <label htmlFor="city_id" className="text-md text-gray-500">
                      CITY
                    </label>

                    <select
                      className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                      id="city_id"
                      name="city_id"
                      autoComplete="on"
                      {...register("city_id")}
                    //onChange={(n) => set_country('0')}

                    >
                      <option value=''>Select City</option>
                      {cities.map((city, index_city) => (
                        <option value={city?.id} key={index_city}>
                          {city?.name}
                        </option>
                      ))}
                    </select>


                  </div>


                </div>


              </div>
              <button type="submit" className="hidden" ref={formRef}></button>
            </form>
            <div className="w-full flex justify-between items-center flex-wrap px-4 py-4">
              <button className="w-full lg:w-auto border-2 text-base font-bold py-2 px-8 rounded-lg hidden">
                BACK
              </button>
              <button
                className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                onClick={() => formRef.current.click()}
              >
                SAVE & CONTINUE
              </button>
            </div>
          </div>
          {/* Live Preview */}
          <div className="w-full lg:w-[70%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2 mb-[50px] lg:mb-auto">

            <Templates
              zoom={50}
              temp_id={
                isExampleTrue === true
                  ? Number(templateid)
                  : Number(is_edit) === 1 && isExampleTrue === null
                    ? Number(my_updating_data.cover_template_id) : Number(res_temp_id)
              }
              doc_id={Number(res_profile_id)}
              uuid={Number(res_uuid)}
              dummy={0}
              my_page={'steps'}
              runtime_firstName={watch('first_name')}
              runtime_lastName={watch('last_name')}
              runtime_phoneNumber={watch('phone_number')}
              runtime_emailAddress={watch('email_address')}
              runtime_streetAddress={watch('street_address')}
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
