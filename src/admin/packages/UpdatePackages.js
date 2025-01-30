import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import LoadingSpiner from "../../components/LoadingSpinner";
import InputWithTextEditer from "../../components/InputWithTextEditer";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useAuth } from "../../services/Auth";
import swal from "sweetalert";

const UpdatePackages = () => {
  const { user } = useAuth();
  const location = useLocation();

  const { package_Id } = location.state;
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  //   Value States
  const [name, setName] = useState("");
  const [resume_templates, setresume_templates] = useState();
  const [cover_templates, setcover_templates] = useState();
  const [description, setdescription] = useState("");
  const [sort, setSort] = useState();
  const [duration, setduration] = useState("");
  const [price, setprice] = useState(false);
  const [status, setStatus] = useState(false);
  const [coins, setCoins] = useState(0);
  const [ai_based_cover_letter_tries, setai_based_cover_letter_tries] =
    useState(0);
  const [max_services, setmax_services] = useState(0);
  const [resume_parser_tries, setresume_parser_tries] = useState(0);
  const [spell_and_grammer_tries, setspell_and_grammer_tries] = useState(0);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    ApiService.getPackageById(user?.token, package_Id)
      .then((res) => {
        let {
          name,
          resume_templates,
          cover_templates,
          description,
          price,
          duration,
          sort,
          status,
          coins,
          ai_based_cover_letter_tries,
          max_services,
          resume_parser_tries,
          spell_and_grammer_tries,
        } = res.data.data;
        console.log(res.data.data);
        setName(name);
        setresume_templates(resume_templates);
        setcover_templates(cover_templates);
        setdescription(description);
        setduration(duration);
        setSort(sort);
        setStatus(status ? true : false);
        setprice(price);
        setCoins(coins);
        setai_based_cover_letter_tries(ai_based_cover_letter_tries);
        setmax_services(max_services);
        setresume_parser_tries(resume_parser_tries);
        setspell_and_grammer_tries(spell_and_grammer_tries);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdatePackage = (e) => {
    e.preventDefault();
    setIsloading(true);
    ApiService.updatePackage(
      user?.token,
      package_Id,
      name,
      resume_templates,
      cover_templates,
      description,
      price,
      duration,
      sort,
      status,
      coins,
      ai_based_cover_letter_tries,
      max_services,
      resume_parser_tries,
      spell_and_grammer_tries
    )
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
        setErrors(Object.values(err.response.data.errors));
        setIsloading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleUpdatePackage}>
          <div className="border h-full p-4">
            {/* Package Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Update Package</h1>

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

              {/* Resume Templates */}
              <div>
                <AllborderInputGroup
                  htmlFor={"resume_templates"}
                  isRequired={true}
                  label={"Resume Templates"}
                  onchange={(val) => setresume_templates(val)}
                  value={resume_templates}
                  placeholder={"Resume Templates"}
                  type={"number"}
                />
              </div>

              {/* Cover Templates */}
              <div>
                <AllborderInputGroup
                  htmlFor={"cover_templates"}
                  isRequired={true}
                  label={"Cover Templates"}
                  onchange={(val) => setcover_templates(val)}
                  value={cover_templates}
                  placeholder={"Cover Templates"}
                  type={"number"}
                />
              </div>

              {/*ai_based_cover_letter_tries */}
              <div>
                <AllborderInputGroup
                  htmlFor={"ai_based_cover_letter_tries"}
                  isRequired={true}
                  label={"AI Based Cover Letter Tries"}
                  onchange={(val) => setai_based_cover_letter_tries(val)}
                  value={ai_based_cover_letter_tries}
                  placeholder={"AI Based Cover Letter Tries"}
                  type={"number"}
                />
              </div>

              {/* max_services*/}
              <div>
                <AllborderInputGroup
                  htmlFor={"max_services"}
                  isRequired={true}
                  label={"Max Services"}
                  onchange={(val) => setmax_services(val)}
                  value={max_services}
                  placeholder={"max_services"}
                  type={"number"}
                />
              </div>

              {/* resume_parser_tries */}
              <div>
                <AllborderInputGroup
                  htmlFor={"resume_parser_tries"}
                  isRequired={true}
                  label={"Resume Parser Tries"}
                  onchange={(val) => setresume_parser_tries(val)}
                  value={resume_parser_tries}
                  placeholder={"Resume parser Tries"}
                  type={"number"}
                />
              </div>

              {/* spell_and_grammer_tries */}
              <div>
                <AllborderInputGroup
                  htmlFor={"spell_and_grammer_tries"}
                  isRequired={true}
                  label={"Spell And Grammer Tries"}
                  onchange={(val) => setspell_and_grammer_tries(val)}
                  value={spell_and_grammer_tries}
                  placeholder={"Spell And Grammer Tries"}
                  type={"number"}
                />
              </div>

              {name !== "Free" && (
                <div>
                  <AllborderInputGroup
                    htmlFor={"coins"}
                    isRequired={true}
                    label={"Coins"}
                    onchange={(val) => setCoins(val)}
                    value={coins}
                    placeholder={"Coins"}
                    type={"number"}
                  />
                </div>
              )}

              {/* decription */}
              <div>
                <InputWithTextEditer
                  htmlFor={"description"}
                  isRequired={true}
                  label={"Description"}
                  onchange={(val) => setdescription(val)}
                  value={description}
                  placeholder={"Description"}
                />
              </div>

              {/* price */}
              <div>
                <AllborderInputGroup
                  htmlFor={"price"}
                  isRequired={true}
                  label={"Price"}
                  onchange={(val) => setprice(val)}
                  value={price}
                  placeholder={"Price"}
                  type={"number"}
                />
              </div>

              {/* duration */}
              <div>
                <AllborderInputGroup
                  htmlFor={"duration"}
                  isRequired={true}
                  label={"Duration"}
                  onchange={(val) => setduration(val)}
                  value={duration}
                  placeholder={"Duration"}
                  type={"number"}
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

export default UpdatePackages;
