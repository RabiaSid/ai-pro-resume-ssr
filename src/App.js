import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./Config";
import "./css/animate.min.css";
import "./css/style2.css";
import "./css/style3.css";
import { useMediaQuery } from "./MediaQuery";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "./services/Auth.jsx";
import { ApiService } from "./services/ApiService.jsx";
import Cookies from "js-cookie";
import SpinnerLoader from "./components/shared-components/spinnerloader/SpinnerLoader.js";
import ATSChecker from "./ATS_Checker";

const UnderConstruction = lazy(() => import("./UnderConstruction.js"));
const Login = lazy(() => import("./Login.js"));
const Share = lazy(() => import("./Share.js"));
const Register = lazy(() => import("./Register"));
const Pages = lazy(() => import("./Pages"));
const Blog = lazy(() => import("./Blog"));
const BlogDetails = lazy(() => import("./BlogDetails"));
const Contact_us = lazy(() => import("./Contact_us"));
const CoverLetterExamples = lazy(() => import("./CoverLetterExamples"));
const CoverLetterTemplates = lazy(() => import("./CoverLetterTemplates"));
const ResumeExamples = lazy(() => import("./ResumeExamples"));
const ResumeTemplates = lazy(() => import("./ResumeTemplates"));
const Faq = lazy(() => import("./Faq"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const Verify = lazy(() => import("./Verify"));
const PagesHeader = lazy(() => import("./PagesHeader"));
// Ads
const AdsListing = lazy(() => import("./admin/ads_section/AdsListing"));

const UpdateListing = lazy(() => import("./admin/ads_section/UpdateAds"));

const ForgotPassword = lazy(() => import("./Forgot_password"));
const ResetPassword = lazy(() => import("./Reset_password"));
const Home = lazy(() => import("./Home"));

const AdminDashboard = lazy(() => import("./admin/Admin_Dashboard"));

const Services = lazy(() => import("./Services"));
const Cart = lazy(() => import("./Cart"));
const MyServices = lazy(() => import("./MyServices"));
const Checkout = lazy(() => import("./Checkout"));
const MyTransactions = lazy(() => import("./MyTransactions"));
const CoverLetterUpload = lazy(() => import("./Cover_letter_upload"));
//intersted user
const InterstedUserListing = lazy(() =>
  import("./admin/InterestedUsers/InterstedUserListings")
);
//User Services
const UserServiceListing = lazy(() =>
  import("./admin/userServices/UserServiceListing.js")
);
const UpdateUserService = lazy(() =>
  import("./admin/userServices/UpdateUserService")
);
const ShowUserService = lazy(() =>
  import("./admin/userServices/ShowUserService.js")
);
const CreateUser = lazy(() => import("./admin/users/CreateUser.js"));
const UpdateUser = lazy(() => import("./admin/users/UpdateUser.js"));

// When User Login Website
const Account = lazy(() => import("./Account"));
//ADMIN PANEL

const OrderHistory = lazy(() => import("./admin/OrderHistory"));
const ImportResume = lazy(() => import("./ImportResume.js"));
const ImportResumeTesting = lazy(() => import("./ImportResumeTesting.js"));
//ADMIN PANEL
const AdminLayout = lazy(() => import("./admin/layout/Layout"));
const AdminServices = lazy(() => import("./admin/services/Admin_Services"));
const AdminServicesAdd = lazy(() => import("./admin/services/Add_service.js"));
const AdminServicesUpdate = lazy(() =>
  import("./admin/services/Update_service.js")
);
// Roles
const Roles = lazy(() => import("./admin/roles/Roles"));
const ShowRole = lazy(() => import("./admin/roles/Show"));
const CreateRole = lazy(() => import("./admin/roles/Create"));
const UpdateRole = lazy(() => import("./admin/roles/update"));
// Admins
const Admins = lazy(() => import("./admin/admins/Admins"));
const CreateAdmins = lazy(() => import("./admin/admins/CreateAdmin"));
const ShowAdmin = lazy(() => import("./admin/admins/ShowAdmin"));
const UpdateAdmin = lazy(() => import("./admin/admins/UpdateAdmin"));
// Blogs
const Blogs = lazy(() => import("./admin/blogs/BlogsListing"));
const ShowBlog = lazy(() => import("./admin/blogs/ShowBlog"));
const CreateBlog = lazy(() => import("./admin/blogs/CreateBlogs"));
// Career Admin
const CareerListing = lazy(() => import("./admin/career/CareerListing"));
const ShowCareer = lazy(() => import("./admin/career/ShowCareer"));
const CreateCareer = lazy(() => import("./admin/career/CreateCareer"));
// Categories
const Categories = lazy(() => import("./admin/categories/CategoriesListing"));
const UpdateCategory = lazy(() => import("./admin/categories/UpdateCategory"));
const CreateCategory = lazy(() => import("./admin/categories/CreateCategory"));
// Job Positions
const JobPositions = lazy(() =>
  import("./admin/example_section/job_position/JobPositionListing")
);
const UpdateJobPosition = lazy(() =>
  import("./admin/example_section/job_position/UpdatePosition")
);

const ViewJobPosition = lazy(() =>
  import("./admin/example_section/job_position/ViewPosition")
);

const CreateJobPosition = lazy(() =>
  import("./admin/example_section/job_position/CreatePosition")
);
// Users
const Users = lazy(() => import("./admin/users/Users"));
const ShowUser = lazy(() => import("./admin/users/ShowUser"));
// -- // Admin Web section  // -- //
// Listings
const Listings = lazy(() => import("./admin/web_section/listings/PageListing"));
const CreateListingPage = lazy(() =>
  import("./admin/web_section/listings/CreatePage")
);
const ShowPage = lazy(() => import("./admin/web_section/listings/ShowPage"));
// Sliders
const Sliders = lazy(() => import("./admin/web_section/slider/SlidersListing"));
const CreateSlider = lazy(() =>
  import("./admin/web_section/slider/CreateSlider")
);
const ShowSlider = lazy(() => import("./admin/web_section/slider/ShowSlider"));
// Partners
const PartnersListing = lazy(() =>
  import("./admin/web_section/partners/PartnersListing")
);
const CreatePartner = lazy(() =>
  import("./admin/web_section/partners/CreatePartner")
);
const ShowPartner = lazy(() =>
  import("./admin/web_section/partners/ShowPartner")
);
// Faqs
const FaqsListing = lazy(() => import("./admin/web_section/faqs/FaqsListing"));
const CreateFaq = lazy(() => import("./admin/web_section/faqs/CreateFaq"));
const ShowFaq = lazy(() => import("./admin/web_section/faqs/ShowFaq"));
const ViewFaq = lazy(() => import("./admin/web_section/faqs/ViewFaq"));
// Reviews
const ReviewListing = lazy(() =>
  import("../src/admin/web_section/reviews/ReviewListing")
);
const ShowReview = lazy(() =>
  import("../src/admin/web_section/reviews/ShowReview")
);
const CreateReview = lazy(() =>
  import("../src/admin/web_section/reviews/CreateReview")
);
// -- // Admin Web section end  // -- //

// Admin Resume Templates
const ResumeListing = lazy(() =>
  import("./admin/resume_templates/ResumeListing")
);
const CreateTemplate = lazy(() =>
  import("./admin/resume_templates/CreateResumeTemplate")
);
const ShowResumeTemplate = lazy(() =>
  import("./admin/resume_templates/ShowResumeTemplate")
);

// Admin Cover Templates
const CoverListing = lazy(() => import("./admin/cover_templates/CoverListing"));
const CreateCoverTemplate = lazy(() =>
  import("./admin/cover_templates/CreateCoverTemplate")
);
const ShowCoverTemplate = lazy(() =>
  import("./admin/cover_templates/ShowCoverTemplate")
);

// Cover Letter body suggestions
const CoverLetterBodySuggestionsListing = lazy(() =>
  import("./admin/coverletter_body_suggestions/BodySuggestionListing.js")
);
const CoverLetterBodySuggestionsCreate = lazy(() =>
  import("./admin/coverletter_body_suggestions/CreateBodySuggestion.js")
);
const CoverLetterBodySuggestionsUpdate = lazy(() =>
  import("./admin/coverletter_body_suggestions/UpdateBodySuggestion.js")
);
// Cover Letter opener suggestions
const CoverLetterOpenerSuggestionsListing = lazy(() =>
  import("./admin/coverletter_opener_suggestions/OpenerSuggestionListing.js")
);
const CoverLetterOpenerSuggestionsCreate = lazy(() =>
  import("./admin/coverletter_opener_suggestions/CreateOpenerSuggestion.js")
);
const CoverLetterOpenerSuggestionsUpdate = lazy(() =>
  import("./admin/coverletter_opener_suggestions/UpdateOpenerSuggestion.js")
);

// Coins Admin Side Routes
const CoinListing = lazy(() => import("./admin/coins/CoinListing"));
const ShowCoins = lazy(() => import("./admin/coins/ShowCoins"));
const CreateCoins = lazy(() => import("./admin/coins/CreateCoins"));
// Experience
const ExperienceListing = lazy(() =>
  import("./admin/example_section/experience/ExperienceListing")
);
const CreateExperience = lazy(() =>
  import("./admin/example_section/experience/CreateExperience")
);
const UpdateExperience = lazy(() =>
  import("./admin/example_section/experience/UpdateExperience")
);
//Certificates
const Certificatelisting = lazy(() =>
  import("./admin/example_section/certificate/Certificatlisting")
);
const UpdateCertificate = lazy(() =>
  import("./admin/example_section/certificate/UpdateCertificate")
);
const CreateCertificate = lazy(() =>
  import("./admin/example_section/certificate/CreateCertificate")
);

// Subscribers
const Subscriber = lazy(() => import("./admin/subscriber/SubscribeListing"));
const UpdateSubscriber = lazy(() =>
  import("./admin/subscriber/UpdateSubscribe")
);
const CreateSubscriber = lazy(() =>
  import("./admin/subscriber/CreateSubscribe")
);
// Settings
const Settings = lazy(() => import("./admin/settings/Settings"));
// Cover Letter Example
const Cover_Example_listing = lazy(() =>
  import("./admin/cover_examples/Cover_Example_listing")
);
const Show_Cover_Example = lazy(() =>
  import("./admin/cover_examples/Show_Cover_Example")
);
const Create_Cover_Example = lazy(() =>
  import("./admin/cover_examples/Create_Cover_Example")
);
// Steps for add
const CoverExample_header = lazy(() =>
  import("./admin/cover_examples/steps/header/Header")
);
const CoverExample_opener = lazy(() =>
  import("./admin/cover_examples/steps/opener/Opener")
);
const CoverExample_body = lazy(() =>
  import("./admin/cover_examples/steps/body/Body")
);
const CoverExample_closer = lazy(() =>
  import("./admin/cover_examples/steps/closer/Closer")
);
// Steps for Update
const CoverExample_headerUpdate = lazy(() =>
  import("./admin/cover_examples/steps_update/header/Header")
);
const CoverExample_openerUpdate = lazy(() =>
  import("./admin/cover_examples/steps_update/opener/Opener")
);
const CoverExample_bodyUpdate = lazy(() =>
  import("./admin/cover_examples/steps_update/body/Body")
);
const CoverExample_closerUpdate = lazy(() =>
  import("./admin/cover_examples/steps_update/closer/Closer")
);
// Resume__Example
const Resume_Example_listing = lazy(() =>
  import("./admin/resume_examples/Resume_Example_listing")
);
const Show_Resume_Example = lazy(() =>
  import("./admin/resume_examples/Show_Resume_Example")
);
const Create_Resume_Example = lazy(() =>
  import("./admin/resume_examples/Create_Resume_Example")
);
// Steps for add
const ResumeExample_header = lazy(() =>
  import("./admin/resume_examples/steps/header/Header")
);
const ResumeExample_summary = lazy(() =>
  import("./admin/resume_examples/steps/summary/Summary")
);

// Steps for Update
const ResumeExampleUpdate_header = lazy(() =>
  import("./admin/resume_examples/steps_update/header/Header")
);
const ResumeExampleUpdate_summary = lazy(() =>
  import("./admin/resume_examples/steps_update/summary/Summary")
);

const Job_Listing = lazy(() => import("./admin/jobListing/Job_Listing"));
const Show_Job_listing = lazy(() =>
  import("./admin/jobListing/Show_Job_Listing")
);

// Education
const EducationListing = lazy(() =>
  import("./admin/example_section/education/EducationListing")
);
const CreateEducation = lazy(() =>
  import("./admin/example_section/education/CreateEducation")
);
const UpdateEducation = lazy(() =>
  import("./admin/example_section/education/UpdateEducation")
);

// Summary
const SummaryListing = lazy(() =>
  import("./admin/example_section/summary/SummaryListing")
);
const CreateSummary = lazy(() =>
  import("./admin/example_section/summary/CreateSummary")
);
const UpdateSummary = lazy(() =>
  import("./admin/example_section/summary/UpdateSummary")
);

// Tech_Skills
const TechSkillsListing = lazy(() =>
  import("./admin/example_section/technical_skills/Technical_Skills_Listing")
);

const CreateTech_Skills = lazy(() =>
  import("./admin/example_section/technical_skills/Create_Technical_Skills")
);
const UpdateTech_Skills = lazy(() =>
  import("./admin/example_section/technical_skills/Update_Technical_Skills")
);

// Soft_Skills
const SoftSkillsListing = lazy(() =>
  import("./admin/example_section/soft_skills/SoftSkillsListing")
);
const CreateSoft_Skills = lazy(() =>
  import("./admin/example_section/soft_skills/CreateSoft_Skills")
);
const UpdateSoft_Skills = lazy(() =>
  import("./admin/example_section/soft_skills/UpdateSoft_Skills")
);
// Packages
const PackagesAdmin = lazy(() => import("./admin/packages/PackagesListing.js"));
const UpdatePackages = lazy(() => import("./admin/packages/UpdatePackages.js"));

//USER PANEL OF RESUME
const ResumeHeader = lazy(() => import("./resume/Header"));
const ResumeEducation = lazy(() => import("./resume/Education"));
const ResumeEducationDetails = lazy(() => import("./resume/EducationDetails"));
const ResumeExperience = lazy(() => import("./resume/Experience"));
const ResumeExperienceDetails = lazy(() =>
  import("./resume/ExperienceDetails")
);
const ResumeReferences = lazy(() => import("./resume/References"));
const ResumeReferencesDetails = lazy(() =>
  import("./resume/ReferencesDetails")
);
const ResumeCertificates = lazy(() => import("./resume/Certificates"));
const ResumeCertificatesDetails = lazy(() =>
  import("./resume/CertificatesDetails")
);
const ResumeAwards = lazy(() => import("./resume/Awards"));
const ResumeAwardsDetails = lazy(() => import("./resume/AwardsDetails"));
const ResumeFinalize = lazy(() => import("./resume/Finalize"));
const ResumeLanguages = lazy(() => import("./resume/Languages"));
const ResumeLanguagesDetails = lazy(() => import("./resume/LanguagesDetails"));
const ResumeCustomSection = lazy(() => import("./resume/CustomSection"));
const ResumeCustomSectionDetails = lazy(() =>
  import("./resume/CustomSectionDetails")
);
const ResumeDigitalSignature = lazy(() => import("./resume/DigitalSignature"));
const ResumeSummary = lazy(() => import("./resume/Summary"));
const TechnicalSkills = lazy(() => import("./resume/TechnicalSkills"));
const SoftSkills = lazy(() => import("./resume/SoftSkills"));
const ResumeDashboard = lazy(() => import("./resume/Dashboard"));
const ResumeLoading = lazy(() => import("./resume/Loading"));
const Documents = lazy(() => import("./resume/Documents"));
const ChooseTemplate = lazy(() => import("./resume/ChooseTemplate"));
const ResumeFormatting = lazy(() => import("./resume/Formatting"));
const ResumeFormattingTesting = lazy(() =>
  import("./resume/FormattingTesting.js")
);
const V2Testing = lazy(() => import("./V2Testing.js"));
const ResumeFormattingAdmin = lazy(() =>
  import("./admin_resume/Formatting_admin.js")
);
const Careers = lazy(() => import("./Careers"));
const Job_detail = lazy(() => import("./Job_detail"));
const ApplyNowForm = lazy(() => import("./ApplyNowForm"));
const ResumeNavbar = lazy(() => import("./resume/Navbar"));
const ResumeSidebar = lazy(() => import("./resume/Sidebar"));
const Packages = lazy(() => import("./Packages"));

const Objective = lazy(() => import("./admin/objective/ObjectiveListing.js"));
const ShowObjective = lazy(() => import("./admin/objective/ShowObjective"));
const CreateObjective = lazy(() => import("./admin/objective/CreateObjective"));
const ViewObjective = lazy(() => import("./admin/objective/ViewObjective"));

const ExSuggestion = lazy(() =>
  import("./admin/ExperienceSuggestion/ExperienceSuggestionListing")
);
const UpdateExSuggestion = lazy(() =>
  import("./admin/ExperienceSuggestion/UpdateExSuggestion")
);
const CreateExSuggestion = lazy(() =>
  import("./admin/ExperienceSuggestion/CreateExSuggestion")
);

const Coupon = lazy(() => import("./admin/coupons/CouponsListing"));
const ShowCoupon = lazy(() => import("./admin/coupons/ShowCoupons"));
const CreateCoupon = lazy(() => import("./admin/coupons/CreateCoupons"));
const ShowSingleCoupon = lazy(() =>
  import("./admin/coupons/ShowSingleCoupon.js")
);

//USER PANEL OF COVER LETTER
// Siraj1
const Create_cover_letter_index = lazy(() =>
  import("./cover_letter/Cover_letter_index")
);
const Cover_letter_Header = lazy(() => import("./cover_letter/header/Header"));
const Cover_letter_Opener = lazy(() => import("./cover_letter/opener/Opener"));
const Cover_letter_body = lazy(() => import("./cover_letter/body/Body"));
const Cover_letter_closer = lazy(() => import("./cover_letter/closer/Closer"));

const CoverLetterChooseTemplate = lazy(() =>
  import("./cover_letter/ChooseTemplate")
);
const CoverLetterFormatting = lazy(() => import("./cover_letter/Formatting"));
const CoverLetterFormattingTasting = lazy(() =>
  import("./cover_letter/FormattingTesting.js")
);
const CoverLetterLoading = lazy(() => import("./cover_letter/Loading"));

function App() {
  const { user, userSessionExpired } = useAuth();
  const [websiteStatus, setWebsiteStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [shearImage, setShearImage] = useState("");

  useEffect(() => {
    const checkPathname = () => {
      // if (window.location.hostname === "www.aiproresume.com") {
      //   window.location.href = "https://aiproresume.com";
      // }

      const currentPath = window.location.pathname;
      const disallowedEndings = ["formatting", "formatting-admin", "checkout"];

      const shouldKeepCookies = disallowedEndings.some((ending) =>
        currentPath.endsWith(ending)
      );

      if (!shouldKeepCookies) {
        // Remove specific data from cookies
        Cookies.remove("newResumeId");
        Cookies.remove("resumeExampleId");
        Cookies.remove("freshCoverId");
        Cookies.remove("newExampleCoverId");
        Cookies.remove("gen_cvr_ai");
        Cookies.remove("payotp");
      } else {
        console.log("Path ends with disallowed ending, keeping cookies."); // Debugging log
      }
    };

    // Check the initial pathname
    checkPathname();

    // Add event listener for popstate
    window.addEventListener("popstate", checkPathname);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", checkPathname);
    };
  }, []);
  useEffect(() => {
    ApiService.getSettingForWebsite().then((res) => {
      setWebsiteStatus(res.data.data.settings.website_status);
      setShearImage(
        `${res.data.data.image_url}/${res.data.data.settings.share_image}`
      );
      setIsLoading(false);
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const isMobile = useMediaQuery("(max-width: 550px)");

  const postId = async () => {
    const token = global.getCookie("token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const user_id = global.getCookie("user_id");
    const res = await axios.post(
      global.baseurl + "api/get_parent",
      { id: user_id },
      { headers }
    );
    return res;
  };

  const handleOpen = () => {
    if (isMobile) {
      setIsLink((prevLink) => (prevLink ? false : true));
      setIsOpen((prevOpen) => (prevOpen ? false : true));
    }
  };

  return (
    <>
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <BrowserRouter>
          <div className="App">
            <Suspense fallback={<SpinnerLoader />}>
              <Routes>
                {websiteStatus !== 1 ? (
                  <>
                    <Route path="*" element={<UnderConstruction />} />

                    <Route
                      path="*"
                      element={<Navigate to={"/under-construction"} />}
                    />
                  </>
                ) : (
                  <>
                    {user?.is_admin === 1 ? (
                      <Route
                        path="*"
                        element={<Navigate to="/admin/dashboard" />}
                      />
                    ) : (
                      <>
                        <Route path="/" exact element={<Home />} />
                        <Route
                          path="/login"
                          element={user ? <Navigate to={"/"} /> : <Login />}
                        />
                        <Route path="/share/:link" element={<Share />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/services" element={<Services />} />
                        <Route
                          path="/job-detail/:slug"
                          element={<Job_detail />}
                        />
                        <Route path="/:page" element={<Pages />} />
                        <Route path="/pages/:page" element={<PagesHeader />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:page" element={<BlogDetails />} />
                        <Route path="/contact-us" element={<Contact_us />} />
                        {/* cover letter body */}
                        <Route
                          path="/cover-letter-examples"
                          element={<CoverLetterExamples />}
                        />
                        <Route
                          path="/cover-letter-templates"
                          element={<CoverLetterTemplates />}
                        />
                        <Route
                          path="/resume-examples"
                          element={<ResumeExamples />}
                        />
                        <Route
                          path="/resume-templates"
                          element={<ResumeTemplates />}
                        />

                        <Route
                          path="/faq"
                          element={<Faq hideHeaderFooter={false} />}
                        />

                        <Route
                          path="/register"
                          element={user ? <Navigate to={"/"} /> : <Register />}
                        />
                        <Route
                          path="/register/:reffered"
                          element={user ? <Navigate to={"/"} /> : <Register />}
                        />
                        <Route path="/verify" element={<Verify />} />
                        <Route
                          path="/forgot-password"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="/Reset-password"
                          element={<ResetPassword />}
                        />
                        <Route
                          path="/import-resume"
                          element={<ImportResume />}
                        />
                        <Route path="/ats-checker" element={<ATSChecker />} />
                        <Route
                          path="/import-resume-v2-testing"
                          element={<ImportResumeTesting />}
                        />
                        <Route
                          path="/packages"
                          element={
                            <Packages
                              setIsOpen={setIsOpen}
                              setIsLogin={setIsLogin}
                              isLogin={isLogin}
                              isOpen={isOpen}
                              setIsLink={setIsLink}
                              postId={postId}
                              handleOpen={handleOpen}
                              isLink={isLink}
                            />
                          }
                        />
                        <Route
                          path="*"
                          element={
                            !user ? (
                              <Navigate to={"/login"} />
                            ) : (
                              <PageNotFound />
                            )
                          }
                        />
                      </>
                    )}

                    {user?.is_admin === 1 ? (
                      <Route
                        path="/resume/formatting-admin"
                        element={<ResumeFormattingAdmin />}
                      />
                    ) : (
                      ""
                    )}

                    {user?.is_admin === 1 ? (
                      <>
                        <Route
                          path="admin"
                          element={
                            user?.is_admin === 1 ? (
                              <AdminLayout />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        >
                          <Route
                            index
                            path="dashboard"
                            element={<AdminDashboard />}
                          />
                          {/* resume formmating admin */}

                          {/*  */}
                          <Route
                            path="cover-letter-body-suggestions"
                            element={<CoverLetterBodySuggestionsListing />}
                          />
                          <Route
                            path="cover-letter-body-suggestions/create"
                            element={<CoverLetterBodySuggestionsCreate />}
                          />
                          <Route
                            path="cover-letter-body-suggestions/update"
                            element={<CoverLetterBodySuggestionsUpdate />}
                          />
                          {/*  */}
                          <Route
                            path="cover-letter-opener-suggestions"
                            element={<CoverLetterOpenerSuggestionsListing />}
                          />
                          <Route
                            path="cover-letter-opener-suggestions/create"
                            element={<CoverLetterOpenerSuggestionsCreate />}
                          />
                          <Route
                            path="cover-letter-opener-suggestions/update"
                            element={<CoverLetterOpenerSuggestionsUpdate />}
                          />

                          <Route
                            path="order-history"
                            element={<OrderHistory />}
                          />
                          <Route
                            path="admin-services"
                            element={<AdminServices />}
                          />
                          <Route
                            path="admin-services/service-add"
                            element={<AdminServicesAdd />}
                          />
                          <Route
                            path="admin-services/service-update"
                            element={<AdminServicesUpdate />}
                          />

                          <Route path="coupon" element={<Coupon />} />
                          <Route
                            path="coupon/show-Coupon"
                            element={<ShowCoupon />}
                          />
                          <Route
                            path="coupon/create-Coupon"
                            element={<CreateCoupon />}
                          />

                          <Route
                            path="coupon/coupon-details"
                            element={<ShowSingleCoupon />}
                          />

                          <Route path="Objective" element={<Objective />} />
                          <Route
                            path="objective/show-Objective"
                            element={<ShowObjective />}
                          />
                          <Route
                            path="objective/create-Objective"
                            element={<CreateObjective />}
                          />

                          <Route
                            path="objective/view-Objective"
                            element={<ViewObjective />}
                          />

                          <Route
                            path="exsuggestion"
                            element={<ExSuggestion />}
                          />
                          <Route
                            path="exsuggestion/show-ex-suggestion"
                            element={<UpdateExSuggestion />}
                          />
                          <Route
                            path="exsuggestion/create-ex-suggestion"
                            element={<CreateExSuggestion />}
                          />

                          <Route path="job-listing" element={<Job_Listing />} />
                          <Route
                            path="job-listing/show-job-listing"
                            element={<Show_Job_listing />}
                          />

                          {/* Roles */}

                          <Route path="roles" element={<Roles />} />
                          <Route
                            path="roles/show-role"
                            element={<ShowRole />}
                          />
                          <Route
                            path="roles/update-role"
                            element={<UpdateRole />}
                          />
                          <Route
                            path="roles/create-role"
                            element={<CreateRole />}
                          />
                          {/* Admins */}
                          <Route path="admins" element={<Admins />} />
                          <Route
                            path="admins/create-admin"
                            element={<CreateAdmins />}
                          />
                          <Route
                            path="admins/show-admin"
                            element={<ShowAdmin />}
                          />
                          <Route
                            path="admins/update-admin"
                            element={<UpdateAdmin />}
                          />
                          {/* Blogs */}
                          <Route path="blogs" element={<Blogs />} />
                          <Route
                            path="blogs/show-blog"
                            element={<ShowBlog />}
                          />
                          <Route
                            path="blogs/create-blog"
                            element={<CreateBlog />}
                          />
                          {/* Blogs */}
                          <Route path="career" element={<CareerListing />} />
                          <Route
                            path="career/show-job"
                            element={<ShowCareer />}
                          />
                          <Route
                            path="career/create-job"
                            element={<CreateCareer />}
                          />
                          {/* Categories */}
                          <Route path="categories" element={<Categories />} />
                          <Route
                            path="categories/update-category/:catid"
                            element={<UpdateCategory />}
                          />
                          <Route
                            path="categories/create-category"
                            element={<CreateCategory />}
                          />
                          {/* Job Position */}
                          <Route
                            path="job-position"
                            element={<JobPositions />}
                          />
                          <Route
                            path="job-position/update-jobposition/:positionid"
                            element={<UpdateJobPosition />}
                          />
                          <Route
                            path="job-position/view-jobposition/:positionid"
                            element={<ViewJobPosition />}
                          />
                          <Route
                            path="job-position/create-jobposition"
                            element={<CreateJobPosition />}
                          />
                          {/* Users */}
                          <Route path="users" element={<Users />} />
                          <Route
                            path="users/show-user"
                            element={<ShowUser />}
                          />
                          <Route path="users/create" element={<CreateUser />} />
                          <Route path="users/eidt" element={<UpdateUser />} />
                          {/* Web Section Admin */}
                          {/* Listing */}
                          <Route path="listings" element={<Listings />} />
                          <Route
                            path="listings/create-page"
                            element={<CreateListingPage />}
                          />
                          <Route
                            path="listings/show-page"
                            element={<ShowPage />}
                          />
                          {/* Sliders */}
                          <Route path="sliders" element={<Sliders />} />
                          <Route
                            path="sliders/create-slider"
                            element={<CreateSlider />}
                          />
                          <Route
                            path="sliders/show-slider"
                            element={<ShowSlider />}
                          />
                          {/* Partners */}
                          <Route
                            path="partners"
                            element={<PartnersListing />}
                          />
                          <Route
                            path="partners/create-partner"
                            element={<CreatePartner />}
                          />
                          <Route
                            path="partners/show-partner"
                            element={<ShowPartner />}
                          />
                          <Route path="ads" element={<AdsListing />} />

                          <Route
                            path="ads/update-ads"
                            element={<UpdateListing />}
                          />
                          {/* Faqs */}
                          <Route path="faqs" element={<FaqsListing />} />
                          <Route
                            path="faqs/create-faq"
                            element={<CreateFaq />}
                          />
                          <Route path="faqs/show-faq" element={<ShowFaq />} />
                          <Route path="faqs/view-faq" element={<ViewFaq />} />
                          {/* Reviews */}
                          <Route path="reviews" element={<ReviewListing />} />
                          <Route
                            path="reviews/create-review"
                            element={<CreateReview />}
                          />
                          <Route
                            path="reviews/show-review"
                            element={<ShowReview />}
                          />
                          {/* end web section */}
                          {/* Resume Templates */}
                          <Route
                            path="resume-templates"
                            element={<ResumeListing />}
                          />
                          <Route
                            path="resume-templates/create-template"
                            element={<CreateTemplate />}
                          />
                          <Route
                            path="resume-templates/show-template"
                            element={<ShowResumeTemplate />}
                          />
                          {/* Cover Templates */}
                          <Route
                            path="cover-templates"
                            element={<CoverListing />}
                          />
                          <Route
                            path="cover-templates/create-cover-template"
                            element={<CreateCoverTemplate />}
                          />
                          <Route
                            path="cover-templates/show-template"
                            element={<ShowCoverTemplate />}
                          />
                          {/* Settings */}
                          <Route path="settings" element={<Settings />} />
                          {/* Cover Examples */}
                          <Route
                            path="cover-examples"
                            element={<Cover_Example_listing />}
                          />
                          <Route
                            path="cover-examples/create-cover-examples"
                            element={<Create_Cover_Example />}
                          >
                            {/* Admin Side Crud */}
                            {/* Header */}
                            <Route
                              path="header"
                              element={<CoverExample_header />}
                            />
                            <Route
                              path="opener"
                              element={<CoverExample_opener />}
                            />
                            <Route
                              path="body"
                              element={<CoverExample_body />}
                            />
                            <Route
                              path="closer"
                              element={<CoverExample_closer />}
                            />
                          </Route>
                          <Route
                            path="cover-examples/show-cover-examples/:id"
                            element={<Show_Cover_Example />}
                          >
                            {/* Admin Side Crud */}
                            {/* Header */}
                            <Route
                              path="header"
                              element={<CoverExample_headerUpdate />}
                            />
                            <Route
                              path="opener"
                              element={<CoverExample_openerUpdate />}
                            />
                            <Route
                              path="body"
                              element={<CoverExample_bodyUpdate />}
                            />
                            <Route
                              path="closer"
                              element={<CoverExample_closerUpdate />}
                            />
                          </Route>

                          {/* Resume Examples */}
                          <Route
                            path="resume-examples"
                            element={<Resume_Example_listing />}
                          />
                          <Route
                            path="resume-examples/create-resume-examples"
                            element={<Create_Resume_Example />}
                          >
                            <Route
                              path="header"
                              element={<ResumeExample_header />}
                            />
                            <Route
                              path="summary"
                              element={<ResumeExample_summary />}
                            />
                          </Route>

                          {/* </Route> */}
                          <Route
                            path="resume-examples/show-resume-examples/:id"
                            element={<Show_Resume_Example />}
                          >
                            <Route
                              path="header"
                              element={<ResumeExampleUpdate_header />}
                            />
                            <Route
                              path="summary"
                              element={<ResumeExampleUpdate_summary />}
                            />
                          </Route>
                          {/* Coins */}
                          <Route path="coins" element={<CoinListing />} />
                          <Route
                            path="intersted-user"
                            element={<InterstedUserListing />}
                          />
                          <Route
                            path="coins/create-coins"
                            element={<CreateCoins />}
                          />
                          <Route
                            path="coins/show-coins"
                            element={<ShowCoins />}
                          />
                          {/* certificate */}
                          <Route
                            path="certificate"
                            element={<Certificatelisting />}
                          />
                          <Route
                            path="certificate/create-certificate"
                            element={<CreateCertificate />}
                          />
                          <Route
                            path="certificate/update-certificate"
                            element={<UpdateCertificate />}
                          />
                          {/* experience */}
                          <Route
                            path="experience"
                            element={<ExperienceListing />}
                          />
                          <Route
                            path="experience/create-experience"
                            element={<CreateExperience />}
                          />
                          <Route
                            path="experience/update-experience"
                            element={<UpdateExperience />}
                          />
                          {/*  */}
                          {/* UserServices  */}
                          <Route
                            path="user-services"
                            element={<UserServiceListing />}
                          />
                          <Route
                            path="user-services/show-user-services"
                            element={<ShowUserService />}
                          />
                          <Route
                            path="user-services/update-user-services"
                            element={<UpdateUserService />}
                          />
                          {/* Examples links */}
                          <Route path="summary" element={<SummaryListing />} />
                          <Route
                            path="summary/create-summary"
                            element={<CreateSummary />}
                          />
                          <Route
                            path="summary/update-summary"
                            element={<UpdateSummary />}
                          />

                          <Route
                            path="soft-skills"
                            element={<SoftSkillsListing />}
                          />
                          <Route
                            path="soft-skills/create-soft-skills"
                            element={<CreateSoft_Skills />}
                          />
                          <Route
                            path="soft-skills/update-soft-skills"
                            element={<UpdateSoft_Skills />}
                          />

                          <Route
                            path="tech-skills"
                            element={<TechSkillsListing />}
                          />
                          <Route
                            path="tech-skills/create-tech-skills"
                            element={<CreateTech_Skills />}
                          />
                          <Route
                            path="tech-skills/update-tech-skills"
                            element={<UpdateTech_Skills />}
                          />

                          <Route
                            path="education"
                            element={<EducationListing />}
                          />
                          <Route
                            path="education/create-education"
                            element={<CreateEducation />}
                          />
                          <Route
                            path="education/update-education"
                            element={<UpdateEducation />}
                          />

                          {/* SUbscriber  */}
                          <Route path="subscriber" element={<Subscriber />} />
                          <Route
                            path="subscriber/update-subscriber"
                            element={<UpdateSubscriber />}
                          />
                          <Route
                            path="subscriber/create-subscriber"
                            element={<CreateSubscriber />}
                          />
                          <Route path="Packages" element={<PackagesAdmin />} />
                          <Route
                            path="Packages/update-packages"
                            element={<UpdatePackages />}
                          />
                        </Route>
                      </>
                    ) : user?.is_admin === 0 ? (
                      <>
                        <Route
                          path="create-cover-letter"
                          element={
                            user.is_admin === 0 ? (
                              <Create_cover_letter_index />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        >
                          {/* Children Components */}
                          <Route
                            path="header"
                            index
                            element={<Cover_letter_Header />}
                          />
                          <Route
                            path="opener"
                            element={<Cover_letter_Opener />}
                          />
                          <Route path="body" element={<Cover_letter_body />} />
                          <Route
                            path="closer"
                            element={<Cover_letter_closer />}
                          />

                          <Route
                            path="header/:id"
                            index
                            element={<Cover_letter_Header />}
                          />
                          <Route
                            path="opener/:id"
                            element={<Cover_letter_Opener />}
                          />
                          <Route
                            path="body/:id"
                            element={<Cover_letter_body />}
                          />
                          <Route
                            path="closer/:id"
                            element={<Cover_letter_closer />}
                          />
                        </Route>
                        {/* End Cover Letter */}
                        <Route
                          path="account"
                          element={
                            user?.is_admin === 0 ? (
                              <Account />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/header"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/header"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeHeader isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/header/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/header"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeHeader isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/education"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/education"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeEducation isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/education/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/education"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeEducation isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/education-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/education-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeEducationDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/education-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/education-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeEducationDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/experience"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/experience"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeExperience isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/experience/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/experience"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeExperience isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/experience-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/experience-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeExperienceDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/experience-details/:uuid/:path"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/experience-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeExperienceDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/references"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/references"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeReferences isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/references/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/references"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeReferences isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/references-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/references-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeReferencesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/references-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/references-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeReferencesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/certificates"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/certificates"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCertificates isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/certificates/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/certificates"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCertificates isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/certificates-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/certificates-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCertificatesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/certificates-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/certificates-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCertificatesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/honors-and-awards"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/honors-and-awards"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeAwards isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/honors-and-awards/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/honors-and-awards"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeAwards isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/honors-and-awards-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/honors-and-awards-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeAwardsDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/honors-and-awards-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/honors-and-awards-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeAwardsDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/languages"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/languages"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeLanguages isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/languages/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/languages"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeLanguages isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/languages-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/languages-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeLanguagesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/languages-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/languages-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeLanguagesDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/custom-section"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/custom-section"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCustomSection isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/custom-section/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/custom-section"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCustomSection isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />

                        <Route
                          path="resume/custom-section-details"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/custom-section-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCustomSectionDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/custom-section-details/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/custom-section-details"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeCustomSectionDetails isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/digital-signature"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/digital-signature"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeDigitalSignature isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/digital-signature/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/digital-signature"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeDigitalSignature isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/finalize"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <ResumeSidebar
                                  checkOpen="resume/finalize"
                                  isOpen={isOpen}
                                  postId={postId}
                                  handleOpen={handleOpen}
                                  isLink={isLink}
                                />
                                <ResumeFinalize isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/finalize/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <ResumeSidebar
                                  checkOpen="resume/finalize"
                                  isOpen={isOpen}
                                  postId={postId}
                                  handleOpen={handleOpen}
                                  isLink={isLink}
                                />
                                <ResumeFinalize isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/formatting"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeFormatting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/formatting-dev-testing"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeFormattingTesting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="v2_testing"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <V2Testing isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/formatting/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  checkOpen="formatting"
                                  setIsLink={setIsLink}
                                />
                                <ResumeFormatting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="create-cover-letter/formatting"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <CoverLetterFormatting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="create-cover-letter/formatting-dev-testing"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <CoverLetterFormattingTasting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="create-cover-letter/formatting/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  checkOpen="formatting"
                                  setIsLink={setIsLink}
                                />
                                <CoverLetterFormatting isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/summary"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/summary"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeSummary isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/summary/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/summary"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <ResumeSummary isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/technical-skills"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/technical-skills"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <TechnicalSkills isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/technical-skills/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/technical-skills"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <TechnicalSkills isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/soft-skills"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/soft-skills"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <SoftSkills isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/soft-skills/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <div className="flex justify-between items-start flex-wrap">
                                  <ResumeSidebar
                                    checkOpen="resume/soft-skills"
                                    isOpen={isOpen}
                                    postId={postId}
                                    handleOpen={handleOpen}
                                    isLink={isLink}
                                  />
                                  <SoftSkills isOpen={isOpen} />
                                </div>
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/choose-template"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  checkOpen="choose_template"
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <ChooseTemplate isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume/choose-template/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  checkOpen="choose_template"
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <ChooseTemplate isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="cover-letter/choose-template"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  checkOpen="choose_template"
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <CoverLetterChooseTemplate isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="cover-letter/choose-template/:uuid"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  checkOpen="choose_template"
                                  setIsLogin={setIsLogin}
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />
                                <CoverLetterChooseTemplate isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="/cart"
                          element={
                            user?.is_admin === 0 ? (
                              <Cart />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="/my-services"
                          element={
                            user?.is_admin === 0 ? (
                              <MyServices />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="/checkout"
                          element={
                            user?.is_admin === 0 ? (
                              <Checkout />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="/my-transaction"
                          element={
                            user?.is_admin === 0 ? (
                              <MyTransactions />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="/cover-letter-upload"
                          element={
                            user?.is_admin === 0 ? (
                              <CoverLetterUpload />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="dashboard"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  checkOpen="dashboard"
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />

                                <ResumeDashboard />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="resume-loading"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeLoading isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />

                        <Route
                          path="cover-letter-loading"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <CoverLetterLoading isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="apply-now/:id"
                          element={
                            user?.is_admin === 0 ? (
                              <ApplyNowForm />
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                        <Route
                          path="documents/:slug"
                          element={
                            user?.is_admin === 0 ? (
                              <>
                                <ResumeNavbar
                                  setIsOpen={setIsOpen}
                                  setIsLogin={setIsLogin}
                                  checkOpen="documents"
                                  isLogin={isLogin}
                                  setIsLink={setIsLink}
                                />

                                <Documents isOpen={isOpen} />
                              </>
                            ) : (
                              <Navigate to={"/login"} />
                            )
                          }
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
