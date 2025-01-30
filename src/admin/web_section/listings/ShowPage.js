import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import InputWithTextEditer from "../../../components/InputWithTextEditer";
import TextAreaGroup from "../../../components/TextAreaGroup";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";

const CreatePage = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { page_id } = location.state;

  //   Value States
  const [pageTitle, setPageTitle] = useState("");
  const [pageHeading, setPageHeading] = useState("");
  const [pageShortDescription, setPageShortDescription] = useState("");
  const [pageLongDescription, setPageLongDescription] = useState("");
  const [pageMetaKey, setPageMetaKey] = useState("");
  const [pageMetaDescription, setPageMetaDescription] = useState("");
  const [isHeader, setIsHeader] = useState(0);
  const [display, setDisplay] = useState("");
  const [isLoading, setIsloading] = useState(false);

  //new states
  const [page_main_title, set_page_main_title] = useState("");
  const [card_heading_one, set_card_heading_one] = useState("");
  const [card_heading_two, set_card_heading_two] = useState("");
  const [card_heading_three, set_card_heading_three] = useState("");
  const [card_description_one, set_card_description_one] = useState("");
  const [card_description_two, set_card_description_two] = useState("");
  const [card_description_three, set_card_description_three] = useState("");
  const [show_boxes, set_show_boxes] = useState(0);

  useEffect(() => {
    ApiService.getSinglePage(user?.token, page_id)
      .then((res) => {
        console.log(res.data.data);
        const {
          title,
          heading,
          short_description,
          long_description,
          meta_keywords,
          meta_description,
          is_header,
          display,
          page_main_title,
          card_heading_one,
          card_heading_two,
          card_heading_three,
          card_description_one,
          card_description_two,
          card_description_three,
          show_boxes,
        } = res.data.data;

        setPageTitle(title);
        setPageHeading(heading);
        setPageShortDescription(short_description);
        setPageLongDescription(long_description);
        setPageMetaKey(meta_keywords);
        setPageMetaDescription(meta_description);
        setIsHeader(is_header);
        setDisplay(display);
        set_page_main_title(page_main_title);
        set_card_heading_one(card_heading_one);
        set_card_heading_two(card_heading_two);
        set_card_heading_three(card_heading_three);
        set_card_description_one(card_description_one);
        set_card_description_two(card_description_two);
        set_card_description_three(card_description_three);
        set_show_boxes(show_boxes);

        console.log(show_boxes);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdatePage = (e) => {
    e.preventDefault();

    setIsloading(true);
    ApiService.updatePage(
      user?.token,
      page_id,
      pageTitle,
      pageHeading,
      pageShortDescription,
      pageLongDescription,
      pageMetaKey,
      pageMetaDescription,
      isHeader,
      display,
      page_main_title,
      card_heading_one,
      card_heading_two,
      card_heading_three,
      card_description_one,
      card_description_two,
      card_description_three,
      show_boxes
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
        <form action="#" onSubmit={handleUpdatePage}>
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Update {pageTitle} Page</h1>
              {/* Page Title */}
              <div>
                <AllborderInputGroup
                  htmlFor={"title"}
                  isRequired={true}
                  label={"Title"}
                  onchange={(val) => setPageTitle(val)}
                  value={pageTitle}
                  placeholder={"Enter page title"}
                />
              </div>

              {/* Page Heading */}
              <div>
                <AllborderInputGroup
                  htmlFor={"heading"}
                  isRequired={true}
                  label={"Heading"}
                  onchange={(val) => setPageHeading(val)}
                  value={pageHeading}
                  placeholder={"Enter page heading"}
                />
              </div>

              {/* pageShortDescription */}
              <div>
                <AllborderInputGroup
                  htmlFor={"short_description"}
                  isRequired={true}
                  label={"Short Description"}
                  onchange={(val) => setPageShortDescription(val)}
                  value={pageShortDescription}
                  placeholder={"Enter page Short Description"}
                />
              </div>

              {/* Long Description */}
              <div>
                <InputWithTextEditer
                  htmlFor={"long_description"}
                  label={"Long Description"}
                  onchange={(val) => setPageLongDescription(val)}
                  value={pageLongDescription}
                />
              </div>

              {/* Roles */}
              <div>
                <AllborderInputGroup
                  htmlFor={"meta_key"}
                  isRequired={true}
                  label={"Meta Keyword"}
                  onchange={(val) => setPageMetaKey(val)}
                  value={pageMetaKey}
                  placeholder={"Enter page Meta Keyword"}
                />
              </div>

              {/*  */}
              <div>
                <TextAreaGroup
                  htmlFor={"meta_des"}
                  isRequired={true}
                  label={"Meta Description"}
                  onchange={(val) => setPageMetaDescription(val)}
                  value={pageMetaDescription}
                  placeholder={"Enter page Meta Keyword"}
                  cols={4}
                  rows={4}
                  resize={"resize"}
                  maxLength={250}
                />
              </div>

              {/* is Header */}
              <div className="flex flex-col gap-2">
                <span>Is Header</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setIsHeader(1);
                    } else {
                      setIsHeader(0);
                    }
                  }}
                  status={isHeader}
                />
              </div>

              {/* display */}
              <div>
                <AllborderInputGroup
                  htmlFor={"display"}
                  isRequired={true}
                  label={"Display"}
                  onchange={(val) => setDisplay(val)}
                  value={display}
                  placeholder={"display"}
                  type={"select"}
                  options={[
                    { label: "select", value: "none" },
                    { label: "resume", value: "resume" },
                    { label: "cover letter", value: "cover letter" },
                    { label: "tool", value: "tool" },
                  ]}
                />
              </div>

              {/* hamza work */}
              <div className="text-xl font-semibold mt-2">Cards Section</div>

              {/* card section heading  */}
              <div>
                <AllborderInputGroup
                  htmlFor={"page_main_title"}
                  label={"Card Section Title"}
                  onchange={(val) => set_page_main_title(val)}
                  value={page_main_title}
                  placeholder={"Enter Card Section title"}
                />
              </div>

              {/* card #1 */}
              <div className="border p-2 mt-2">
                <div>
                  <AllborderInputGroup
                    htmlFor={"card_heading_one"}
                    label={"Card 1 Heading"}
                    onchange={(val) => set_card_heading_one(val)}
                    value={card_heading_one}
                    placeholder={"Enter Card 1 Heading"}
                  />
                </div>

                <div>
                  <InputWithTextEditer
                    htmlFor={"card_description_one"}
                    label={"Card 1 Description"}
                    onchange={(val) => set_card_description_one(val)}
                    value={card_description_one}
                  />
                </div>
              </div>

              {/* card #2 */}
              <div className="border p-2 mt-4">
                <div>
                  <AllborderInputGroup
                    htmlFor={"card_heading_two"}
                    label={"Card 2 Heading"}
                    onchange={(val) => set_card_heading_two(val)}
                    value={card_heading_two}
                    placeholder={"Enter Card 2 Heading"}
                  />
                </div>

                <div>
                  <InputWithTextEditer
                    htmlFor={"card_description_two"}
                    label={"Card 2 Description"}
                    onchange={(val) => set_card_description_two(val)}
                    value={card_description_two}
                  />
                </div>
              </div>

              {/* card #3 */}
              <div className="border p-2 mt-4">
                <div>
                  <AllborderInputGroup
                    htmlFor={"card_heading_three"}
                    label={"Card 3 Heading"}
                    onchange={(val) => set_card_heading_three(val)}
                    value={card_heading_three}
                    placeholder={"Enter Card 3 Heading"}
                  />
                </div>

                <div>
                  <InputWithTextEditer
                    htmlFor={"card_description_three"}
                    label={"Card 3 Description"}
                    onchange={(val) => set_card_description_three(val)}
                    value={card_description_three}
                  />
                </div>
              </div>

              {/* show cards */}
              <div className="flex flex-col gap-2 mt-2">
                <span>Show Cards</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      set_show_boxes(1);
                    } else {
                      set_show_boxes(0);
                    }
                  }}
                  status={show_boxes}
                />
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />
            {/* Create */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update Page
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
