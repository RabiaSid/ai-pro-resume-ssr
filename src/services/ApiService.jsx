import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.aiproresume.com/public/api/",
});

const axiosInstance2 = axios.create({
  baseURL: "https://ai.jobdesc.aiproresume.com",
});

const axiosInstanceForAi = axios.create({
  baseURL: "https://ai.chatbot.aiproresume.com/api/",
});

const axiosInstanceAiCoverLetter2 = axios.create({
  baseURL: "https://ai.cvrletter.aiproresume.com/api",
});

const endPoints = {
  //update revision
  revision: "service-user-revisions",
  parserTries: "update-tries",
  //  // UserServices
  userServices: "user-services",
  //
  usersReferral: "single-user-with-referrals",
  //subscribe
  subscriber: "subscribers",
  //interested Users
  interstedUserCandidate: "interested-users",
  //
  // Admin can create resume and cover
  adminUserResume: "admin/user-profile",
  ourSettings: "our-settings",
  // Logout
  logout: "destroy",
  // Website
  userDetails: "user_details",
  // Categories
  showCategories: "/show-categories",
  //delete user profile cover from admin
  deleteUserCoverAdmin: "admin/user-cover-letter/delete",
  //delete user profile resume from admin
  deleteUserResumeAdmin: "admin/user-profile/delete",
  //admin user transaction get
  getUsertransactionAdmin: "get-user-transactions",
  //admin user services get
  userServiceAdmin: "get-user-services",
  // Update User Details
  updateUserDetails: "update-profile",
  // Update User Details
  updateProfilePicShare: "update-picture-and-share",
  // Chnage Pasword
  changePassword: "change_password",
  // Packages Api
  showPackages: "show-packages",
  // All Services
  adminServices: "services",
  // Upload Service File
  uploadServiceFile: "upload-service-file",
  // Coupun
  verifyCoupon: "verify-coupon",
  // Store Order
  storeOrder: "store-order",
  // Resume Template Order
  resumeTemplateOrder: "user/purchase-template",
  // Cover Template Order
  coverTemplateOrder: "user/purchase-cover-template",
  // My Services
  myServices: "my-services",
  // Roles
  roles: "/roles",
  // Blogs
  blogs: "/blogs",
  // Admins
  admins: "/admins",
  // Users
  users: "/users",
  // Listings
  listingPages: "/pages",
  // Sliders
  sliders: "/sliders",
  // Partners
  partners: "/clients",
  // faqs
  faqs: "/faqs",
  // Resume Templates
  resumeTemplates: "/templates",
  // cover-templates
  CoverTemplates: "/cover-templates",
  // Admin setting
  adminSettings: "/settings",
  // my transitions User
  userTansition: "/user-transactions",
  // my transitions invoice
  userInvoice: "/user-invoice",
  // checkout
  stripeCheckout: "/checkout",
  // get stripe key
  getStripeKey: "/get-stripe-secret",
  // store cover letter

  // Digital Signature
  digitalSignatureStore: "/user_digital_signature",
  // Categories
  categories: "/categories",
  // job positions
  jobPositions: "/job-positions",
  // Admin Careers
  adminCareer: "/careers",
  // Cover Examples
  coverExamples: "cover-examples",
  // Resume Examples
  resumeExamples: "resume-examples",
  // Coins
  coins: "coins",
  // Review on Admin side Crud
  reviews: "/reviews",
  //certificate
  certificate: "certificate-examples",
  //experience
  experience: "experience-examples",
  // New
  //tech_skills
  tech_skills: "tech-skills-examples",
  //soft_skills
  soft_skills: "soft-skills-examples",
  //summary
  summary: "summary-examples",
  //education
  education: "education-examples",
  // Job Positions front end
  objective: "objective",
  // Objective
  coupon: "coupons",
  webads: "web-ad",
  // ADS
  ads: "ads",
  // Coupons
  appliedJobs: "applied-jobs",
  addPassword: "add-password",
  // Login
  login: "login",
  // register
  register: "register",
  // Pyament Stripe Intent
  stripeIntent: "create-pyament-intent",
  package: "packages",
  coverTemplatesListing: "/show-cover-templates",

  // Cover letter Body
  bodySuggestions: "body-suggestions",
  // Cover letter Opener
  openerSuggestions: "opener-suggetions",
  // Show Profle Resume Data
  showProfileResumeData: "/show-profile",
  showProfileSectionUpload: "/show-resume-sections",
  // show countries/states/cities
  showCountries: "/show-countries",
  showStatesByCountryId: "/states/show-states",
  showCitiesByStateId: "/cities/show-cities",
  showResumeTechnicalSkills: "/tech_skills",
  showLanguages: "/languages",
  showLavels: "show_levels",
  showUserLanguages: "/user_languages",

  // ****** resume edit submit ***** \\
  // reusme header
  resumeHeaderEdit: "/personal_information",
  resumeHeaderImageRemove: "/delete-image",
  // resume summary
  resumeSummaryEdit: "/user_summary",
  resumeSummaryAdd: "/add_summary",
  resumeUpdateProfileImage: "/update-profile-image-name",
  updatePercentage: "/user/update-percentage",
  resumeTechnicalSkillsAdd: "/technical_skills",
  // languages
  resumeLanguagesEdit: "/update_user_language_level",

  // ****** Store resume ****///
  resumeLanguageStore: "/store_user_language",

  //***** delete resume Apis *** ///
  resumeLanguageDelete: "/delete_user_language",
  // ****** resume new submit **** \\\\
  resumeExperience: "/experiences",
  resumeEducation: "/education",
  resumeTechnicalSkills: "/technical_skills",
  resumeSoftSkills: "/soft_skills",
  resumeCertificates: "/certificates",
  resumeCustomDetails: "/custom_details",
  reusmeAwards: "/awards",
  ResumeUpdateReference: "/update_reference",
  resumeReferenceStore: "/add_reference",
  resumeReferenceDelete: "/delete_reference",
  // Store user Resume and Cover Letter preview images
  updateUserResumePreviewImage: "/resume/update-image",
  updateUserCoverLetterPreviewImage: "/cover-letter/update-image",
  // resume and cover show
  showResumeTemplates: "/show-resume-templates",
  // ****** Cover Letter Data ****///
  showCoverLetterDataSingle: "/show-cover-letter",
  showCoverLetterData: "/cover_letters",
  // Handle Formmating
  reusmeFormating: "/resume-formating",
  coverFormating: "/cover-formating",

  // reusme example
  resumeExampleWithId: "/resume_example",
  coverExampleWithId: "/cover_example",
  // All cities and states
  allStates: "/all-states",
  // Cover Letter Signature
  coverLetterSignature: "user_digital_signature",
  experience_suggestion: "experience-suggestions",
  // intersted User
  intrested_user: "order-history/add",
  // clear Cache
  clear_cache: "clear_cache",
  // kashish -> endpoints
  //shareusersids
  shareuserscvs: "admin/share-cvs",
  //shareusersids
  shareusersIds: "admin/user-cvs",
  // all cities
  cities: "/cities/show-cities/",
  covLetByTit: "job-title",
  covLetByDesc: "job-description",
  covLetByUploadJson: "upload-json",

  // experience
  createExperienceSection: "/api/v1/job-description-suggestion",

  chatbot_contents: "/chatbot_contents",
  chatbot_contents_answer_ai: "v1/askquestion",

  coverletterTitleAndDescription: "v1/cover-letter",
  updateCoverLetterTries: "update-tries",
  // Ai based Summaries Suggestions
  showSummariesWithJobPosition: "show-objective-suggestions",
  exprinceSuggestionWithJobPsotion: "job-position/experience-suggestions",
  updateResumePercentage: "/user/update-resume-percentage",
};

export const ApiService = {
  // Login Auth Module
  login: (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    return axiosInstance.post(endPoints.login, formData);
  },
  // Register
  register: (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.phone);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
    formData.append("country_id", data.country);
    formData.append("referred_by", data.reffered ? data.reffered : "admin");

    return axiosInstance.post(endPoints.register, formData);
  },

  // clear Servier cache
  clear_server_cache: (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(endPoints.clear_cache, { headers });
  },

  showSummariesSuggestionsWithJobPosioton: (token, job_position) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("name", job_position);
    formData.append("keywords[0]", "");

    return axiosInstance.post(
      endPoints.showSummariesWithJobPosition,
      formData,
      {
        headers,
      }
    );
  },

  // if a user intrested in a Services
  intrested_user: (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(endPoints.intrested_user, { headers });
  },

  storeCoverLetterSignature: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log(data);
    const formData = new FormData();
    formData.append("alignment", data.alignment);
    formData.append("size", data.size);
    formData.append("text", data.text);
    formData.append("font", data.font);
    formData.append("is_draw", data.is_draw);
    formData.append("is_upload", data.is_upload);
    formData.append("is_text", data.is_text);
    formData.append("cover_letter_id", data.cover_id);

    if (data.image) {
      formData.append("image", data.image, "signature.png");
    }
    return axiosInstance.post(endPoints.coverLetterSignature, formData, {
      headers,
    });
  },

  exprinceSuggestionRelatedJobPosition: (token, job_position) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    formData.append("job_position", job_position);

    return axiosInstance.post(
      `${endPoints.exprinceSuggestionWithJobPsotion}`,
      formData,
      { headers }
    );
  },

  updateCoverLetterSignature: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log(data);
    const formData = new FormData();
    formData.append("alignment", data.alignment);
    formData.append("size", data.size);
    formData.append("text", data.text);
    formData.append("font", data.font);
    formData.append("is_draw", data.is_draw);
    formData.append("is_upload", data.is_upload);
    formData.append("is_text", data.is_text);
    formData.append("_method", "PUT");
    if (data.image) {
      formData.append("image", data.image, "signature.png");
    }

    return axiosInstance.post(
      `${endPoints.coverLetterSignature}/${data.hasOldSignature}`,
      formData,
      {
        headers,
      }
    );
  },

  deleteCoverSignature: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.coverLetterSignature}/${id}`, {
      headers,
    });
  },

  getCoverLetterSignature: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(
      `${endPoints.coverLetterSignature}?cover_letter_id=${id}`,
      {
        headers,
      }
    );
  },
  // get all cities
  getAllStates: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.allStates, { headers });
  },

  showResumeExampleWithId: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.resumeExampleWithId}/${id}`, {
      headers,
    });
  },
  // Cover Example with id
  showCoverExampleWithId: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.coverExampleWithId}/${id}`, {
      headers,
    });
  },

  // Formmating Apis
  handleResumeFormating: (token, data, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);
    const formData = new URLSearchParams();
    formData.append("template_id", Number(data.template_id));
    formData.append("heading_fontsize", data.heading_fontsize);
    formData.append("color", data.color);
    formData.append("heading_font_style", data.heading_font_style);
    formData.append("paragraph_fontsize", "0px");
    formData.append("paragraph_font_style", "none");
    formData.append("top_bottom_margins", "0px");
    formData.append("side_margin", "0px");
    formData.append("paragraph_spacing ", "0px");

    console.log(formData.toString());

    return axiosInstance.put(
      `${endPoints.reusmeFormating}/${id}`,
      formData.toString(),
      {
        headers,
      }
    );
  },

  handleCoverFormating: (token, data, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);
    const formData = new URLSearchParams();
    formData.append("cover_template_id", Number(data.template_id));
    formData.append("heading_fontsize", data.heading_fontsize);
    formData.append("color", data.color);
    formData.append("heading_font_style", data.heading_font_style);
    formData.append("paragraph_fontsize", "0px");
    formData.append("paragraph_font_style", "none");
    formData.append("top_bottom_margins", "0px");
    formData.append("side_margin", "0px");
    formData.append("paragraph_spacing ", "0px");

    return axiosInstance.put(
      `${endPoints.coverFormating}/${id}`,
      formData.toString(),
      {
        headers,
      }
    );
  },

  // ***
  getCoverTemplatesListingUser: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.coverTemplatesListing, { headers });
  },

  getResumeFormating: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.reusmeFormating}/${id}`, { headers });
  },
  // **** Cover Letter **///

  showCoverLetterData: (token, coverId) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(
      `${endPoints.showCoverLetterDataSingle}/${coverId}`,
      {
        headers,
      }
    );
  },

  coverLetterDataStore: (token, data, templateId) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append(
      "name",
      data.name ? data.name : data.first_name + " " + data.last_name
    );
    formData.append("first_name", data.first_name ?? "");
    formData.append("last_name", data.last_name ?? "");
    formData.append(
      "contact_person_name",
      data.contact_person_name ? data.contact_person_name : " "
    );
    formData.append(
      "contact_person_designation",
      data.contact_person_designation ? data.contact_person_designation : " "
    );
    formData.append("contact_person_email", data.contact_person_email ?? "");
    formData.append("contact_person_phone", data.contact_person_phone ?? "");
    formData.append(
      "company_address",
      data.company_address ? data.company_address : " "
    );
    formData.append("cover_template_id", Number(templateId));
    formData.append("phone_number", data?.phone_number ?? "");
    formData.append("email_address", data?.email_address ?? "");
    formData.append("street_address", data?.street_address ?? "");
    formData.append("country_id", data?.country_id ?? "");
    formData.append("state", data?.state ? data?.state : " ");
    formData.append("city", data?.city ? data?.city : " ");
    formData.append("zip_code", data?.zip_code ?? "");
    formData.append("experience", data?.experience ?? "");
    formData.append("job_title", data?.job_title ?? "");
    formData.append(
      "employeer_name",
      data.employeer_name ? data?.employeer_name : " "
    );
    formData.append("opener_detail", data?.opener_detail ?? "");
    formData.append("closer_detail", data?.closer_detail ?? "");
    formData.append(
      "show_personal_information",
      data?.show_personal_information
    );

    return axiosInstance.post(
      "/v1" + `${endPoints.showCoverLetterData}`,
      formData,
      {
        headers,
      }
    );
  },

  coverLetterDataUpdate: (token, data, template_id, coverId) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const coverLetterName = `${
      data.first_name + "_" + data.last_name
    }'s Cover Letter`;

    const formData = new FormData();
    formData.append(
      "name",
      coverLetterName ? coverLetterName : coverLetterName
    );
    formData.append("first_name", data.first_name ? data.first_name : " ");
    formData.append("last_name", data.last_name ? data.last_name : " ");
    formData.append(
      "contact_person_name",
      data.contact_person_name ? data.contact_person_name : " "
    );
    formData.append(
      "contact_person_designation",
      data.contact_person_designation ? data.contact_person_designation : " "
    );
    formData.append(
      "contact_person_email",
      data.contact_person_email ? data.contact_person_email : " "
    );
    formData.append(
      "contact_person_phone",
      data.contact_person_phone ? data.contact_person_phone : " "
    );
    formData.append(
      "company_name",
      data.company_name ? data.company_name : " "
    );
    formData.append(
      "company_address",
      data.company_address ? data.company_address : " "
    );
    formData.append("cover_template_id", template_id);
    formData.append(
      "phone_number",
      data.phone_number ? data.phone_number : " "
    );
    formData.append(
      "email_address",
      data.email_address ? data.email_address : " "
    );
    formData.append(
      "street_address",
      data.street_address ? data.street_address : " "
    );
    formData.append("country_id", data.country_id);
    formData.append("state", data.state ? data.state : " ");
    formData.append("city", data.city ? data.city : " ");
    formData.append("zip_code", data.zip_code ? data.zip_code : " ");
    formData.append("experience", data.experience ? data.experience : " ");
    formData.append("job_title", data.job_title ? data.job_title : " ");
    formData.append(
      "employeer_name",
      data.employeer_name ? data.employeer_name : " "
    );
    formData.append(
      "opener_detail",
      data.opener_detail ? data.opener_detail : " "
    );
    formData.append(
      "closer_detail",
      data.closer_detail ? data.closer_detail : " "
    );
    formData.append(
      "show_personal_information",
      data.show_personal_information ? 1 : 0
    );

    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.showCoverLetterData}/${coverId}`,
      formData,
      {
        headers,
      }
    );
  },

  // *** Cover Letter end **///
  // Update user Cover and Resume Preview Images
  updateUserResumePreviewImage: (token, file, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("preview_image", file);

    return axiosInstance.post(
      `${endPoints.updateUserResumePreviewImage}/${id}`,
      formData,
      { headers }
    );
  },

  updateUserCoverLetterPreviewImage: (token, file, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("preview_image", file);

    return axiosInstance.post(
      `${endPoints.updateUserCoverLetterPreviewImage}/${id}`,
      formData,
      { headers }
    );
  },
  //
  showResumeTemplatesListing: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.showResumeTemplates, { headers });
  },
  showCountries: () => {
    return axiosInstance.get(`${endPoints.showCountries}`);
  },
  showStatesById: (country_id) => {
    return axiosInstance.get(
      `${endPoints.showStatesByCountryId}/${country_id}`
    );
  },
  showCitiesById: (state_id) => {
    return axiosInstance.get(`${endPoints.showCitiesByStateId}/${state_id}`);
  },

  getAllCities: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(`${endPoints.showCitiesByStateId}`, { headers });
  },
  showResumeTechnicalSkills: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.showResumeTechnicalSkills, { headers });
  },
  showResumeTechnicalSkillsFilter: (token, position) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(
      endPoints.showResumeTechnicalSkills + "?job_position=" + position,
      { headers }
    );
  },
  showResumeSoftSkills: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.resumeSoftSkills, { headers });
  },
  showLanguages: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.showLanguages, { headers });
  },
  showLavels: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.showLavels, { headers });
  },

  showUserLanguages: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.showUserLanguages}/${id}`, {
      headers,
    });
  },
  // resume Header Submit First Time
  resumeHeaderSubmit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append(
      "resume_name",
      data.resume_name ? data.resume_name : data.first_name
    );
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email_address", data.email_address);
    formData.append("job_title", data.job_title ? data.job_title : "");
    formData.append("phone_number", data.phone_number);
    formData.append("contact_number", data.contact_number);
    formData.append("template_id", Number(data.template_id));
    formData.append("country_id", Number(data.country_id));
    formData.append("state", data.state ? data.state : "");
    formData.append("city", data.city ? data.city : "");
    formData.append(
      "street_address",
      data.street_address ? data.street_address : ""
    );
    formData.append("postal_code", data.postal_code ? data.postal_code : "");
    // formData.append("gender", "Male");
    formData.append("website", data.website ? data.website : "");

    // Create an object to store the form data
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Log the object
    console.log(formDataObj);

    return axiosInstance.post("/v1" + endPoints.resumeHeaderEdit, formData, {
      headers,
    });
  },

  // ***** resume eidt section Api's ***** \\
  resuemHeaderEditSubmit: (token, resumeuuId, profileImage, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name ? data.last_name : "");
    formData.append("email_address", data.email_address);
    formData.append("job_title", data.job_title ? data.job_title : "");
    formData.append("phone_number", data.phone_number);
    formData.append(
      "contact_number",
      data.contact_number ? data.contact_number : ""
    );
    formData.append("template_id", Number(data.template_id));
    formData.append("country_id", Number(data.country_id));
    formData.append("state", data.state ? data.state : "");
    formData.append("city", data.city ? data.city : "");
    formData.append(
      "street_address",
      data.street_address ? data.street_address : ""
    );
    formData.append("postal_code", data.postal_code ? data.postal_code : "");
    // formData.append("gender", "Male");
    formData.append("website", data.website ? data.website : "");
    formData.append("status", "1");
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeHeaderEdit}/${resumeuuId}`,
      formData,
      { headers }
    );
  },

  resumeHeaderImageRemove: (token, resumeuuId) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(
      `${endPoints.resumeHeaderImageRemove}/${resumeuuId}`,
      { headers }
    );
  },

  resumeSummaryEditSubmit: (token, data, summary_id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("description", data);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeSummaryEdit}/${summary_id}`,
      formData,
      {
        headers,
      }
    );
  },

  // reusme Experince Update
  resumeExperienceEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formatDate = (date) => {
      // Check if the date is in 'YYYY' format
      if (/^\d{4}$/.test(date)) {
        return `${date}-01-01`;
      }
      // Check if the date is in 'YYYY-MM' format
      else if (/^\d{4}-\d{2}$/.test(date)) {
        return `${date}-01`;
      }
      // If the date is in full 'YYYY-MM-DD' format or any other, return as it is
      return date;
    };

    const formData = new FormData();
    formData.append("job_position", data.job_position);
    formData.append("company_name", data.company_name);
    formData.append("country_id", Number(data.country_id));
    formData.append("state", data.state ? data.state : "");
    formData.append("city", data.city ? data.city : "");
    formData.append("type", "Onsite");
    formData.append("start_date", formatDate(data.start_date));
    if (!data.currently_working) {
      formData.append("end_date", formatDate(data.end_date));
    }
    formData.append("currently_working", Number(data.currently_working));
    formData.append(
      "job_description",
      data.job_description ? data.job_description : ""
    );
    formData.append("status", "1");
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeExperience}/${data.exp_id}`,
      formData,
      {
        headers,
      }
    );
  },

  // resume Education Update
  resumeEducationEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    console.log(data.end_date);

    const formData = new FormData();
    formData.append("institution", data.institution);
    formData.append("degree", data.degree);
    formData.append("field", data.field);
    formData.append("grade_type", data.grade_type ? data.grade_type : "none");
    if (data.grade_type === "grade") {
      formData.append("grade", data.grade);
    } else if (data.grade_type === "cgpa") {
      formData.append("grade", data.cgpa);
    } else if (data.grade_type === "percentage") {
      formData.append("grade", data.percentage);
    }
    formData.append(
      "start_date",
      data.start_date ? data.start_date + "-1" : data.start_date
    );
    if (!data.currently_studying) {
      console.log("working");
      formData.append(
        "end_date",
        data.end_date ? data.end_date + "-1" : data.end_date
      );
    }
    formData.append("currently_studying", Number(data.currently_studying));
    formData.append("status", "1");
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeEducation}/${data.edu_id}`,
      formData,
      {
        headers,
      }
    );
  },
  // resume technical skills update
  resumeTechnicalSkillsEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", data.section_name);
    const skills = data.skills.join(",,");
    formData.append("body", skills);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeTechnicalSkills}/${data.skill_id}`,
      formData,
      {
        headers,
      }
    );
  },

  resumeTechnicalSkillsAdd: (token, data, profile_id, full_skills) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", data.section_name);

    if (full_skills) {
      formData.append("body", full_skills);
    } else {
      const skills = data.skills.join(",,");
      formData.append("body", skills);
    }
    if (profile_id) {
      formData.append("profile_id", Number(profile_id));
    }

    return axiosInstance.post(`${endPoints.resumeTechnicalSkills}`, formData, {
      headers,
    });
  },
  resumeTechnicalSkillsSubmit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("profile_id", Number(data.profileId));

    return axiosInstance.post(
      `${endPoints.resumeTechnicalSkillsAdd}`,
      formData,
      {
        headers,
      }
    );
  },
  // resume Soft skills update
  resumeSoftSkillsEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", data.section_name);
    const skills = data.skills.join(",,");
    formData.append("body", skills);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeSoftSkills}/${data.skill_id}`,
      formData,
      {
        headers,
      }
    );
  },
  // Add new Soft Skills
  resumeSoftSkillsAdd: (token, data, profile_id, full_skills) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(profile_id);

    const formData = new FormData();
    formData.append("title", data.section_name);
    if (full_skills) {
      formData.append("body", full_skills);
    } else {
      const skills = data.skills.join(",,");
      formData.append("body", skills);
    }

    if (profile_id) {
      formData.append("profile_id", profile_id);
    }

    return axiosInstance.post(`${endPoints.resumeSoftSkills}`, formData, {
      headers,
    });
  },
  // resume Certificates update
  resumeCertificateEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", data.date ? data.date + "-1" : data.date);
    formData.append("institute", data.institute);
    formData.append("description", data.description ? data.description : "");
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeCertificates}/${data.certificate_id}`,
      formData,
      {
        headers,
      }
    );
  },
  resumeCustomSectionEdit: (token, data, showedit, isShow) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("detail", data.detail ? data.detail : "");
    formData.append(
      "is_show",
      showedit === "show" ? (data.is_show === 1 ? 0 : 1) : isShow
    );
    formData.append("sort", data.sort ? data.sort : 1);
    formData.append("status", 1);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeCustomDetails}/${data.id}`,
      formData,
      {
        headers,
      }
    );
  },

  // resume Awards update
  resumeAwardsEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("date", data.date ? data.date + "-1" : data.date);
    formData.append("body", data.institute);
    formData.append("description", data.description ? data.description : "");
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.reusmeAwards}/${data.award_id}`,
      formData,
      {
        headers,
      }
    );
  },
  // resume Language Update
  resumeLanguageEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("language_id", data.language_id);
    formData.append("level_id", data.level_id);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.resumeLanguagesEdit}/${data.lang_id}`,
      formData,
      {
        headers,
      }
    );
  },
  // resume Refrance update
  ResumeUpdateReferenceEdit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name ? data.name : "");
    formData.append("email", data.email ? data.email : "");
    formData.append("contact_no", data.contact_no ? data.contact_no : "");
    formData.append("company", data.company ? data.company : "");
    formData.append("designation", data.designation ? data.designation : "");
    formData.append("status", 1);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.ResumeUpdateReference}/${data.ref_id}`,
      formData,
      {
        headers,
      }
    );
  },

  // ***** resume stores ***** \\\\\
  resumeExperienceStore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formatDate = (date) => {
      if (!date) {
        return "";
      }
      // Check if the date is in 'YYYY' format
      if (/^\d{4}$/.test(date)) {
        return `${date}-01-01`;
      }
      // Check if the date is in 'YYYY-MM' format
      else if (/^\d{4}-\d{2}$/.test(date)) {
        return `${date}-01`;
      }
      // If the date is in full 'YYYY-MM-DD' format or any other, return as it is
      return date;
    };

    const formData = new FormData();
    if (Number(resumeId) === 0) {
      formData.append("profile_id", "");
    } else {
      formData.append("profile_id", Number(resumeId));
    }

    formData.append("job_position", data.job_position);
    formData.append("company_name", data.company_name);
    formData.append("country_id", Number(data.country_id));
    formData.append("state", data.state ? data.state : "");
    formData.append("city", data.city ? data.city : "");
    formData.append("type", "");
    formData.append("start_date", formatDate(data.start_date));
    if (!data.currently_working) {
      formData.append("end_date", formatDate(data.end_date));
    }
    formData.append("currently_working", Number(data.currently_working));
    formData.append(
      "job_description",
      data.job_description ? data.job_description : ""
    );

    return axiosInstance.post(`${endPoints.resumeExperience}`, formData, {
      headers,
    });
  },
  resumeSummarySubmit: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("description", data.summary);
    if (data.profileId) {
      formData.append("profile_id", Number(data.profileId));
    }

    return axiosInstance.post(`${endPoints.resumeSummaryAdd}`, formData, {
      headers,
    });
  },
  resumeUpdateProfileImage: (token, profile_image, resume_id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("profile_image_name", profile_image);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `v1${endPoints.resumeUpdateProfileImage}/${resume_id}`,
      formData,
      {
        headers,
      }
    );
  },
  updatePercentage: (token, profile_percentage, resume_percentage) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    if (profile_percentage) {
      formData.append("profile_percentage", profile_percentage);
    }
    if (resume_percentage) {
      formData.append("resume_percentage", resume_percentage);
    }

    return axiosInstance.post(`${endPoints.updatePercentage}`, formData, {
      headers,
    });
  },

  updateResumePercentage: (token, id, resume_percentage) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("resume_id", id);
    formData.append("resume_percentage", resume_percentage);

    return axiosInstance.post(`${endPoints.updateResumePercentage}`, formData, {
      headers,
    });
  },

  resumeEducationStore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log("formattedDate2(data.start_date)");
    console.log(data.start_date);
    console.log(data.end_date);

    const formData = new FormData();
    if (Number(resumeId) === 0) {
      //formData.append("profile_id", "");
    } else {
      formData.append("profile_id", Number(resumeId));
    }

    formData.append("institution", data.institution);
    formData.append("degree", data.degree);
    formData.append("grade_type", data.grade_type ? data.grade_type : "none");
    if (data.grade_type === "grade") {
      formData.append("grade", data.grade);
    } else if (data.grade_type === "cgpa") {
      formData.append("grade", data.cgpa);
    } else if (data.grade_type === "percentage") {
      formData.append("grade", data.percentage);
    }
    formData.append("field", data.field);
    formData.append(
      "start_date",
      data.start_date ? data.start_date + "-1" : data.start_date
    );
    if (!data.currently_studying) {
      formData.append(
        "end_date",
        data.end_date ? data.end_date + "-1" : data.end_date
      );
    }
    formData.append("currently_studying", Number(data.currently_studying));

    return axiosInstance.post(`${endPoints.resumeEducation}`, formData, {
      headers,
    });
  },
  // resume Certificates Store
  resumeCertificateStore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", data.date ? data.date + "-1" : data.date);
    formData.append("institute", data.institute);
    formData.append("description", data.description ? data.description : "");
    if (Number(resumeId) === 0) {
      //formData.append("profile_id", "");
    } else {
      formData.append("profile_id", resumeId);
    }

    return axiosInstance.post(`${endPoints.resumeCertificates}`, formData, {
      headers,
    });
  },

  resumeCustomSectionStore: (token, resumeId, data, isShow) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("detail", data.detail ? data.detail : "");
    formData.append("is_show", isShow);
    formData.append("sort", 1);
    formData.append("personal_profile_id", resumeId);

    return axiosInstance.post(`${endPoints.resumeCustomDetails}`, formData, {
      headers,
    });
  },

  // resume Awards Store
  resumeAwardstore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("date", data.date ? data.date + "-1" : data.date);
    formData.append("body", data.institute);
    formData.append("description", data.description ? data.description : "");
    if (Number(resumeId) === 0) {
      //formData.append("profile_id", resumeId);
    } else {
      formData.append("profile_id", resumeId);
    }

    return axiosInstance.post(`${endPoints.reusmeAwards}`, formData, {
      headers,
    });
  },
  // resume Language Store
  resumeLanguageStore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("language_id", data.language_id);
    formData.append("level_id", data.level_id);
    if (Number(resumeId) === 0) {
      //formData.append("profile_id", resumeId);
    } else {
      formData.append("profile_id", resumeId);
    }

    return axiosInstance.post(`${endPoints.resumeLanguageStore}`, formData, {
      headers,
    });
  },

  resumeReferenceStore: (token, resumeId, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name ? data.name : "");
    formData.append("email", data.email ? data.email : "");
    formData.append("contact_no", data.contact_no ? data.contact_no : "");
    formData.append("company", data.company ? data.company : "");
    formData.append("designation", data.designation ? data.designation : "");
    if (Number(resumeId) === 0) {
      //formData.append("profile_id", resumeId);
    } else {
      formData.append("profile_id", resumeId);
    }

    return axiosInstance.post(`${endPoints.resumeReferenceStore}`, formData, {
      headers,
    });
  },

  // ***** Delete Oprations Resume Section *****////

  resumeExperienceDelete: (token, exp_id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeExperience}/${exp_id}`, {
      headers,
    });
  },

  resumeEducationDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeEducation}/${id}`, {
      headers,
    });
  },

  resumeCertificateDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeCertificates}/${id}`, {
      headers,
    });
  },
  resumeCustomSectionDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeCustomDetails}/${id}`, {
      headers,
    });
  },

  resumeAwardsDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.reusmeAwards}/${id}`, {
      headers,
    });
  },

  resumeLanguageDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeLanguageDelete}/${id}`, {
      headers,
    });
  },

  resumeRefranceDelete: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeReferenceDelete}/${id}`, {
      headers,
    });
  },
  // ******** Resume drodown/data/text get Api's ***** ////
  getResumeObjectives: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get("objectives", { headers });
  },

  getOurSettings: () => {
    return axiosInstance.get(endPoints.ourSettings);
  },

  logout: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.post(endPoints.logout, { headers });
  },

  getUserDetails: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.userDetails, { headers });
  },

  updateParserTries: (token, usage, name) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("usage", usage);
    formData.append("tries", name);

    return axiosInstance.post(endPoints.parserTries, formData, { headers });
  },

  // userParserTry:

  showAllCategories: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.categories, { headers });
  },

  updateUserDetails: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();
    formData.append("name", data.first_name + " " + data.last_name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("contact", data.contact_number);
    formData.append("phone_number", data.phone_number);
    formData.append("website", data.website);
    formData.append("address", data.street_address);
    formData.append("country_id", data.country_id);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("postal_code", data.postal_code);
    formData.append("experience", data.experience);
    //formData.append("email", data.email);
    formData.append("job_position", data.job_title);
    //formData.append("allow_shares", data.allow_shares);
    // if (data.image !== null) {
    //   formData.append("image", data.image);
    // }

    return axiosInstance.post(endPoints.updateUserDetails, formData, {
      headers,
    });
  },

  updateProfilePicShare: (token, data) => {
    console.log("apihamza", data);
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();
    if (data.allow_shares !== null) {
      formData.append("allow_shares", data.allow_shares);
    }

    if (data.image !== null) {
      formData.append("image", data.image);
    }

    return axiosInstance.post(endPoints.updateProfilePicShare, formData, {
      headers,
    });
  },

  updateUserPassword: (token, oldPassword, newPassWord, confirmPassword) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("password", newPassWord);
    formData.append("c_password", confirmPassword);

    return axiosInstance.post(endPoints.changePassword, formData, {
      headers,
    });
  },

  showAllPackages: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.showPackages, { headers });
  },

  getAllAdminServies: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.adminServices, { headers });
  },

  updateService: (
    token,
    id,
    name,
    image,
    price,
    discounted_price,
    description,
    other_heading,
    other_description,
    status
  ) => {
    const service_id = id;
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("discounted_price", discounted_price);
    formData.append("description", description);
    formData.append("other_heading", other_heading);
    formData.append("other_description", other_description);
    formData.append("status", status);
    formData.append("_method", "PUT");

    return axiosInstance.post(
      `${endPoints.adminServices}/${service_id}`,
      formData,
      {
        headers,
      }
    );
  },

  deleteService: (token, id) => {
    const service_id = id;
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(
      `${endPoints.adminServices}/${service_id}`,

      {
        headers,
      }
    );
  },

  addService: (
    token,
    name,
    image,
    price,
    discounted_price,
    description,
    other_heading,
    other_description,
    status
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("discounted_price", discounted_price);
    formData.append("description", description);
    formData.append("other_heading", other_heading);
    formData.append("other_description", other_description);
    formData.append("status", status);

    return axiosInstance.post(`${endPoints.adminServices}`, formData, {
      headers,
    });
  },

  getSingleService: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${endPoints.adminServices}/${id}/edit`, {
      headers,
    });
  },

  // Upload File
  uploadServiceFile: (token, file) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post(endPoints.uploadServiceFile, formData, {
      headers,
    });
  },
  deleteOldServiceFile: (token, fileName) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`delete-file/${fileName}`, {
      headers,
    });
  },
  verifyCoupon: (token, couponValue) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("coupon_code", couponValue);

    return axiosInstance.post(endPoints.verifyCoupon, formData, {
      headers,
    });
  },

  resumeTemplateOrder: (token, data, template) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const {
      order_id,
      currency,
      discounted_amount,
      sub_total,
      tax_amount,
      total_amount,
      description,
      payment_type,
      card_number,
      card_name,
      coupon_code,
      coupon_discount_percent,
      used_coins,
      tax_type,
      status,
      decline_issue,
    } = data;

    const formData = new FormData();

    formData.append("order_id", order_id);
    formData.append("template_id", Number(template[0].id));
    formData.append("currency", currency);
    formData.append("discount_amount", discounted_amount);
    formData.append("subtotal", sub_total);
    formData.append("tax_amount", tax_amount);
    formData.append("tax_type", tax_type);
    formData.append("total_amount", total_amount);
    formData.append(
      "description",
      "Purchase Resume Template " + template[0].name
    );
    formData.append("payment_type", payment_type);
    formData.append("card_number", card_number);
    formData.append("card_name", card_name);
    formData.append("coupon_code", coupon_code);
    formData.append("coupon_discount_percent", coupon_discount_percent);
    formData.append("used_coins", used_coins);
    if (decline_issue) {
      formData.append("decline_issue", decline_issue);
    }
    formData.append("status", status);

    return axiosInstance.post(endPoints.resumeTemplateOrder, formData, {
      headers,
    });
  },

  coverTemplateOrder: (token, data, template) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const {
      order_id,
      currency,
      discounted_amount,
      sub_total,
      tax_amount,
      total_amount,
      description,
      payment_type,
      card_number,
      card_name,
      coupon_code,
      coupon_discount_percent,
      used_coins,
      tax_type,
      status,
      decline_issue,
    } = data;

    const formData = new FormData();

    formData.append("order_id", order_id);
    formData.append("template_id", Number(template[0].id));
    formData.append("currency", currency);
    formData.append("discount_amount", discounted_amount);
    formData.append("subtotal", sub_total);
    formData.append("tax_amount", tax_amount);
    formData.append("tax_type", tax_type);
    formData.append("total_amount", total_amount);
    formData.append(
      "description",
      "Purchase Cover Template " + template[0].name
    );
    formData.append("payment_type", payment_type);
    formData.append("card_number", card_number);
    formData.append("card_name", card_name);
    formData.append("coupon_code", coupon_code);
    formData.append("coupon_discount_percent", coupon_discount_percent);
    formData.append("used_coins", used_coins);
    if (decline_issue) {
      formData.append("decline_issue", decline_issue);
    }
    formData.append("status", status);

    return axiosInstance.post(endPoints.coverTemplateOrder, formData, {
      headers,
    });
  },

  paymentStatusResumeTemplate: (token, data, template) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log("data", data.id);
    // console.log("Update Status", data.services.length);
    const formData = new FormData();
    formData.append("template_id", Number(template[0].id));

    formData.append("order_id", data.order_id);
    formData.append("currency", data.currency);
    formData.append("discount_amount", data.discounted_amount);
    formData.append("subtotal", data.sub_total);
    formData.append("tax_amount", data.tax_amount);
    formData.append("tax_type", data.tax_type);
    formData.append("total_amount", data.total_amount);
    formData.append(
      "description",
      "Purchase Resume Template " + template[0].name
    );
    formData.append("payment_type", data.payment_type);
    formData.append("coupon_code", data.coupon_code);
    formData.append("coupon_discount_percent", data.coupon_discount_percent);
    formData.append("used_coins", data.used_coins);

    if (data.card_number) {
      formData.append("card_number", data.card_number);
    }
    if (data.card_name) {
      formData.append("card_name", data.card_name);
    }
    if (data.decline_issue) {
      formData.append("decline_issue", data.decline_issue);
    }
    if (data.card_holder_email) {
      formData.append("card_holder_email", data.card_holder_email);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.postal_code) {
      formData.append("postal_code", data.postal_code);
    }
    if (data.city) {
      formData.append("city", data.city);
    }
    if (data.state) {
      formData.append("state", data.state);
    }
    if (data.country) {
      formData.append("country", data.country);
    }
    formData.append("status", data.status);

    return axiosInstance.post(
      `user/purchase-template?id=${data.id}`,
      formData,
      {
        headers,
      }
    );
  },

  paymentStatusCoverTemplate: (token, data, template) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log("data", data.id);
    // console.log("Update Status", data.services.length);
    const formData = new FormData();
    formData.append("template_id", Number(template[0].id));

    formData.append("order_id", data.order_id);
    formData.append("currency", data.currency);
    formData.append("discount_amount", data.discounted_amount);
    formData.append("subtotal", data.sub_total);
    formData.append("tax_amount", data.tax_amount);
    formData.append("tax_type", data.tax_type);
    formData.append("total_amount", data.total_amount);
    formData.append(
      "description",
      "Purchase Cover Template " + template[0].name
    );
    formData.append("payment_type", data.payment_type);
    formData.append("coupon_code", data.coupon_code);
    formData.append("coupon_discount_percent", data.coupon_discount_percent);
    formData.append("used_coins", data.used_coins);

    if (data.card_number) {
      formData.append("card_number", data.card_number);
    }
    if (data.card_name) {
      formData.append("card_name", data.card_name);
    }
    if (data.decline_issue) {
      formData.append("decline_issue", data.decline_issue);
    }
    if (data.card_holder_email) {
      formData.append("card_holder_email", data.card_holder_email);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.postal_code) {
      formData.append("postal_code", data.postal_code);
    }
    if (data.city) {
      formData.append("city", data.city);
    }
    if (data.state) {
      formData.append("state", data.state);
    }
    if (data.country) {
      formData.append("country", data.country);
    }
    formData.append("status", data.status);

    return axiosInstance.post(
      `user/purchase-cover-template?id=${data.id}`,
      formData,
      {
        headers,
      }
    );
  },

  Payment: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const {
      packageId,
      packageDuration,
      packagePrice,
      services,
      order_id,
      currency,
      discounted_amount,
      sub_total,
      tax_amount,
      total_amount,
      description,
      payment_type,
      card_number,
      card_name,
      coupon_code,
      coupon_discount_percent,
      used_coins,
      tax_type,
      status,
      decline_issue,
    } = data;

    const formData = new FormData();
    if (packageId !== 0) {
      formData.append("package[id]", packageId);
      formData.append("package[duration]", packageDuration);
      formData.append("package[price]", packagePrice);
    }
    services.forEach((service, idx) => {
      formData.append(`services[${idx}][id]`, service.id);
      formData.append(
        `services[${idx}][price]`,
        service.discounted_price > 0
          ? service.discounted_price.toString()
          : service.price.toString()
      );
      formData.append(`services[${idx}][file]`, service.file.fileName);
      formData.append(`services[${idx}][is_revision]`, 1);
    });
    formData.append("order_id", order_id);
    formData.append("currency", currency);
    formData.append("discount_amount", discounted_amount);
    formData.append("subtotal", sub_total);
    formData.append("tax_amount", tax_amount);
    formData.append("tax_type", tax_type);
    formData.append("total_amount", total_amount);
    formData.append("description", description);
    formData.append("payment_type", payment_type);
    formData.append("card_number", card_number);
    formData.append("card_name", card_name);
    formData.append("coupon_code", coupon_code);
    formData.append("coupon_discount_percent", coupon_discount_percent);
    formData.append("used_coins", used_coins);
    if (decline_issue) {
      formData.append("decline_issue", decline_issue);
    }
    formData.append("status", status);

    return axiosInstance.post(endPoints.storeOrder, formData, { headers });
  },

  paymentStatus: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    // console.log("Update Status", data.services.length);
    const formData = new FormData();
    if (data.packageId) {
      formData.append("package[id]", data.packageId);
      formData.append("package[duration]", data.packageDuration);
      formData.append("package[price]", data.packagePrice);
    }
    if (data.services.length > 0) {
      data.services.forEach((service, idx) => {
        formData.append(`services[${idx}][id]`, service.id);
        formData.append(
          `services[${idx}][price]`,
          service.discounted_price > 0
            ? service.discounted_price.toString()
            : service.price.toString()
        );
        formData.append(`services[${idx}][file]`, service.file.fileName);
        formData.append(`services[${idx}][is_revision]`, 1);
      });
    }

    formData.append("order_id", data.order_id);
    formData.append("currency", data.currency);
    formData.append("discount_amount", data.discounted_amount);
    formData.append("subtotal", data.sub_total);
    formData.append("tax_amount", data.tax_amount);
    formData.append("tax_type", data.tax_type);
    formData.append("total_amount", data.total_amount);
    formData.append("description", data.description);
    formData.append("payment_type", data.payment_type);
    formData.append("coupon_code", data.coupon_code);
    formData.append("coupon_discount_percent", data.coupon_discount_percent);
    formData.append("used_coins", data.used_coins);

    if (data.card_number) {
      formData.append("card_number", data.card_number);
    }
    if (data.card_name) {
      formData.append("card_name", data.card_name);
    }
    if (data.decline_issue) {
      formData.append("decline_issue", data.decline_issue);
    }
    if (data.card_holder_email) {
      formData.append("card_holder_email", data.card_holder_email);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.postal_code) {
      formData.append("postal_code", data.postal_code);
    }
    if (data.city) {
      formData.append("city", data.city);
    }
    if (data.state) {
      formData.append("state", data.state);
    }
    if (data.country) {
      formData.append("country", data.country);
    }
    formData.append("status", data.status);

    return axiosInstance.post(`update-order-status/${data.id}`, formData, {
      headers,
    });
  },

  getMyServices: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.myServices, { headers });
  },

  getAllRoles: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.roles, { headers });
  },
  // Roles Curd Methods
  showRoleDetails: (token, uuid) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.roles + `/${uuid}/edit`, { headers });
  },

  getRolePermissionsList: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.roles + "/create", { headers });
  },
  createRole: (token, name, permission) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("permission", permission);
    return axiosInstance.post(endPoints.roles, formData, { headers });
  },

  UpdateRole: (token, uuid, name, permission) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      name: name,
      permission: String(permission),
    };

    return axiosInstance.put(endPoints.roles + `/${uuid}`, null, {
      headers: headers,
      params: queryParams,
    });
  },

  deleteRole: (token, uuid) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.roles + `/` + uuid, { headers });
  },
  // Blogs
  getAllBlogs: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.blogs, { headers });
  },

  showBlogDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.blogs + `/${id}`, { headers });
  },

  updateBlog: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const {
      id,
      name,
      title,
      image,
      short_description,
      long_description,
      author_name,
      author_image,
      meta_keyword,
      meta_description,
      top,
      status,
    } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }
    formData.append("short_description", short_description);
    formData.append("long_description", long_description);
    formData.append("author_name", author_name);
    if (author_image) {
      formData.append("author_image", author_image);
    }
    formData.append("meta_keyword", meta_keyword);
    formData.append("meta_description", meta_description);
    formData.append("top", top);
    formData.append("status", status);
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.blogs + `/${id}`, formData, {
      headers,
    });
  },

  deleteBlog: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.blogs + `/${id}`, { headers });
  },

  createBlog: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const {
      name,
      title,
      image,
      short_description,
      long_description,
      author_name,
      author_image,
      meta_keyword,
      meta_description,
      top,
    } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("short_description", short_description);
    formData.append("long_description", long_description);
    formData.append("author_name", author_name);
    formData.append("author_image", author_image);
    formData.append("meta_keyword", meta_keyword);
    formData.append("meta_description", meta_description);
    formData.append("top", top);

    return axiosInstance.post(endPoints.blogs, formData, { headers });
  },
  // Categories
  getAllCategories: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.categories, { headers });
  },

  getCategoryByid: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.categories + `/${id}`, { headers });
  },

  updateCategory: (
    token,
    id,
    name,
    parent_id,
    short_description,
    cover_letter_description,
    sort,
    toggledStatus,
    top,
    premium
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = new URLSearchParams({
      name: name,
      parent_id: parent_id,
      short_description: short_description,
      cover_letter_description: cover_letter_description,
      sort: sort,
      status: toggledStatus,
      top: top,
      premium: premium,
    }).toString();

    return axiosInstance.put(
      `${endPoints.categories}/${id}?${queryParams}`,
      null,
      {
        headers,
      }
    );
  },

  createCategoty: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    let {
      name,
      parent_id,
      short_description,
      cover_letter_description,
      sort,
      premium,
      top,
      status,
    } = data;

    console.log(data);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent_id", parent_id);
    formData.append("short_description", short_description);
    formData.append("cover_letter_description", cover_letter_description);
    formData.append("sort", sort);
    formData.append("premium", premium);
    formData.append("top", top);
    formData.append("status", status);

    return axiosInstance.post(endPoints.categories, formData, { headers });
  },

  deleteCategory: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.categories + `/${id}`, { headers });
  },
  // job positions
  getAllJobPositions: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.jobPositions, { headers });
  },

  getAllJobPositionsNamesExamples: (param) => {
    return axiosInstance.get(`/show-job-positions?type=${param}`);
  },

  deleteJobPosition: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.jobPositions + `/${id}`, { headers });
  },

  createJobPosition: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log(data);

    const formData = new FormData();

    data.map((item, idx) => {
      // Append job title
      formData.append(`job_positions[${idx}][name]`, item.job_title);

      // Append keywords array

      formData.append(`job_positions[${idx}][keywords]`, item.keywords);

      // Append similar job titles array

      formData.append(
        `job_positions[${idx}][similar_names]`,
        item.similar_job_titles
      );
    });

    // Log all key-value pairs in FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return axiosInstance.post(endPoints.jobPositions, formData, { headers });
  },

  getJobPositionByid: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.jobPositions + `/${id}`, { headers });
  },

  updateJobPosition: (token, id, name, similar_names, keywords) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = new URLSearchParams({
      name: name,
      similar_names: similar_names,
      keywords: keywords,
    }).toString();
    console.log("abc", queryParams);

    return axiosInstance.put(
      `${endPoints.jobPositions}/${id}?${queryParams}`,
      null,
      {
        headers,
      }
    );
  },

  // Admins Methods
  getAllAdmins: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.admins, { headers });
  },

  deleteAdmin: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.delete(endPoints.admins + `/${id}`, { headers });
  },

  getAdminRolesList: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.admins + `/create`, { headers });
  },

  storeAdmin: (token, name, email, password, c_password, role, image) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("c_password", c_password);
    formData.append("role", role);
    formData.append("image", image);

    return axiosInstance.post(endPoints.admins, formData, { headers });
  },

  showAdminDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.admins + `/${id}`, { headers });
  },

  updateAdmin: (token, id, name, email, role, image) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT");

    return axiosInstance.post(`${endPoints.admins}/${id}`, formData, {
      headers,
    });
  },
  // All users Methods
  createUser: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", data.image);
    formData.append("password", data.password);
    formData.append("c_password", data.c_password);
    formData.append("contact", data.contact);
    formData.append("country_id", data.country_id);
    formData.append("status", data.status);
    formData.append("verify", data.verify);

    return axiosInstance.post(endPoints.users, formData, { headers });
  },

  getAllUsers: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.users, { headers });
  },

  getSingleUsers: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(`${endPoints.users}/${id}/edit`, { headers });
  },

  updateUser: (token, data, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", data.image);
    if (data.password) {
      formData.append("password", data.password);
    }
    formData.append("contact", data.contact);
    formData.append("country_id", data.country_id);
    formData.append("status", data.status);
    formData.append("verify", data.verify);
    formData.append("_method", "PUT");

    return axiosInstance.post(`${endPoints.users}/${id}`, formData, {
      headers,
    });
  },

  changeUserStatus: (token, id, status) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new URLSearchParams();
    formData.append("status", status);
    return axiosInstance.patch(`${endPoints.users}/${id}`, formData, {
      headers,
    });
  },

  deleteUser: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.users}/${id}`, {
      headers,
    });
  },

  getUserById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.users + `/${id}`, { headers });
  },

  // Web Section Listings
  getAllPages: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.listingPages, { headers });
  },

  CreatePages: (
    token,
    title,
    heading,
    short_description,
    long_description,
    meta_keywords,
    meta_description,
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
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("heading", heading);
    formData.append("short_description", short_description);
    formData.append("long_description", long_description);
    formData.append("meta_keywords", meta_keywords);
    formData.append("meta_description", meta_description);
    formData.append("is_header", isHeader);
    formData.append("display", display);
    formData.append("page_main_title", page_main_title);
    formData.append("card_heading_one", card_heading_one);
    formData.append("card_heading_two", card_heading_two);
    formData.append("card_heading_three", card_heading_three);
    formData.append("card_description_one", card_description_one);
    formData.append("card_description_two", card_description_two);
    formData.append("card_description_three", card_description_three);
    formData.append("show_boxes", show_boxes);
    return axiosInstance.post(endPoints.listingPages, formData, { headers });
  },

  deletePage: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.listingPages + `/${id}`, { headers });
  },

  getSinglePage: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.listingPages + `/${id}`, { headers });
  },

  updatePage: (
    token,
    id,
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
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("title", pageTitle);
    formData.append("heading", pageHeading);
    formData.append("short_description", pageShortDescription);
    formData.append("long_description", pageLongDescription);
    formData.append("meta_keywords", pageMetaKey);
    formData.append("meta_description", pageMetaDescription);
    formData.append("is_header", isHeader);
    formData.append("display", display);
    formData.append("page_main_title", page_main_title);
    formData.append("card_heading_one", card_heading_one);
    formData.append("card_heading_two", card_heading_two);
    formData.append("card_heading_three", card_heading_three);
    formData.append("card_description_one", card_description_one);
    formData.append("card_description_two", card_description_two);
    formData.append("card_description_three", card_description_three);
    formData.append("show_boxes", show_boxes);
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.listingPages + `/${id}`, formData, {
      headers,
    });
  },
  // Slider
  getAllSliders: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.sliders, {
      headers,
    });
  },

  createSlider: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const { name, image } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    return axiosInstance.post(endPoints.sliders, formData, {
      headers,
    });
  },

  getSliderById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.sliders + `/${id}`, {
      headers,
    });
  },

  updateSlider: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const { id, name, image, sort, status } = data;

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("sort", sort);
    formData.append("status", status);
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.sliders + `/${id}`, formData, {
      headers,
    });
  },

  deleteSlider: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.sliders + `/${id}`, { headers });
  },
  // Partners
  getAllPartners: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.partners, { headers });
  },

  createPartner: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const { name, image } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    return axiosInstance.post(endPoints.partners, formData, {
      headers,
    });
  },

  deletePartner: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.partners + `/${id}`, { headers });
  },

  getPartnerById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.partners + `/${id}/edit`, { headers });
  },

  updatePartner: (token, data) => {
    const { id, name, image } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.partners + `/${id}`, formData, {
      headers,
    });
  },
  // Faqs
  getAllFaqs: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.faqs, { headers });
  },

  updateFaq: (token, data) => {
    let { id, question, answer, sort, status, page } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      question: question,
      answer: answer,
      sort: sort,
      status: status,
      page: page,
    };

    return axiosInstance.put(endPoints.faqs + `/${id}`, null, {
      headers,
      params: queryParams,
    });
  },

  createFaq: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("page", data.page);
    formData.append("question", data.question);
    formData.append("answer", data.answer);

    return axiosInstance.post(endPoints.faqs, formData, { headers });
  },

  getFaqById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.faqs + `/${id}`, { headers });
  },

  deleteFaq: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.faqs + `/${id}`, { headers });
  },
  // Resume Templates
  getAllResumeTemplates: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.resumeTemplates, { headers });
  },

  updateResumeTemplate: (token, data) => {
    let {
      id,
      name,
      image,
      is_paid,
      sort,
      status,
      category_id,
      is_example,
      jobPositions,
      template_id,
      price,
    } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("category_id", category_id);
    formData.append("sort", sort);
    formData.append("status", status);
    formData.append("is_paid", is_paid);
    formData.append("is_example", is_example);
    formData.append("template_id", Number(template_id));
    formData.append("price", Number(price));
    jobPositions.map((position, idx) =>
      formData.append(`job_positions[${idx}]`, Number(position.value))
    );
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.resumeTemplates + `/${id}`, formData, {
      headers,
    });
  },

  createResumeTemplate: (token, data) => {
    let {
      name,
      image,
      category_id,
      is_paid,
      is_example,
      jobPositions,
      template_id,
      price,
    } = data;

    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category_id", Number(category_id));
    formData.append("is_paid", Number(is_paid));
    formData.append("is_example", Number(is_example));
    formData.append("template_id", Number(template_id));
    formData.append("price", Number(price));
    jobPositions.map((position, idx) =>
      formData.append(`job_positions[${idx}]`, Number(position.value))
    );

    return axiosInstance.post(endPoints.resumeTemplates, formData, { headers });
  },

  showResumeTemplates: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.resumeTemplates + `/${id}`, { headers });
  },

  deleteResume: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.resumeTemplates + `/${id}`, {
      headers,
    });
  },

  showAllCategoriesAndPositions: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.resumeTemplates + `/create`, {
      headers,
    });
  },
  // Cover Templates
  getAllCoverTemplates: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.CoverTemplates, { headers });
  },

  updateCoverTemplate: (token, data) => {
    let {
      id,
      name,
      image,
      is_paid,
      sort,
      status,
      category_id,
      is_example,
      jobPositions,
      template_id,
      price,
    } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("category_id", category_id);
    formData.append("sort", sort);
    formData.append("status", status);
    formData.append("is_paid", is_paid);
    formData.append("is_example", is_example);
    formData.append("template_id", template_id);
    formData.append("price", price);
    jobPositions.map((position, idx) =>
      formData.append(`job_positions[${idx}]`, Number(position.value))
    );
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.CoverTemplates + `/${id}`, formData, {
      headers,
    });
  },

  createCoverTemplate: (token, data) => {
    let {
      name,
      image,
      category_id,
      is_example,
      is_paid,
      jobPositions,
      template_id,
      price,
    } = data;

    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category_id", Number(category_id));
    formData.append("is_example", Number(is_example));
    formData.append("is_paid", Number(is_paid));
    formData.append("template_id", Number(template_id));
    formData.append("price", Number(price));
    jobPositions.map((position, idx) =>
      formData.append(`job_positions[${idx}]`, Number(position.value))
    );

    return axiosInstance.post(endPoints.CoverTemplates, formData, { headers });
  },

  showCoverTemplates: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.CoverTemplates + `/${id}`, { headers });
  },

  deleteCoverTemplate: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.CoverTemplates + `/${id}`, {
      headers,
    });
  },
  // Admin Settings
  getAllSettingsAdmin: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.adminSettings, { headers });
  },

  updateSettingsAdmin: (token, data) => {
    let {
      id,
      header_logo,
      footer_logo,
      contact_email,
      favicon,
      website_email,
      location_address,
      contact_number,
      facebook_account_link,
      instagram_account_link,
      linkedin_account_link,
      twitter_account_link,
      footer_content,
      footer_text,
      title,
      tax_type,
      tax,
      fees,
      currency,
      keywords,
      description,
      website_status,
      share_image,
    } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("contact_email", contact_email);
    formData.append("website_email", website_email);
    formData.append("location_address", location_address);
    formData.append("contact_number", contact_number);
    formData.append("facebook_account_link", facebook_account_link);
    formData.append("instagram_account_link", instagram_account_link);
    formData.append("linkedin_account_link", linkedin_account_link);
    formData.append("twitter_account_link", twitter_account_link);
    formData.append("footer_content", footer_content);
    formData.append("footer_text", footer_text);
    formData.append("title", title);
    formData.append("tax", tax);
    formData.append("tax_type", tax_type);
    formData.append("fees", fees);
    formData.append("currency", currency);
    formData.append("keywords", keywords);
    formData.append("description", description);
    formData.append("website_status", website_status);
    if (header_logo) {
      formData.append("header_logo", header_logo);
    }
    if (footer_logo) {
      formData.append("footer_logo", footer_logo);
    }
    if (favicon) {
      formData.append("favicon", favicon);
    }
    if (share_image) {
      formData.append("share_image", share_image);
    }
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.adminSettings + `/${id}`, formData, {
      headers,
    });
  },

  // My Transition Page Data for User
  getUserTransitionsData: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.userTansition, { headers });
  },

  getUserTransitionInvoiceData: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.userInvoice + `/${id}`, { headers });
  },

  // checkout
  getCheckout: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    let { success_url, cancel_url, order_details } = data;

    let rawData = {
      success_url: success_url,
      cancel_url: cancel_url,
      products: order_details,
    };

    return axiosInstance.post(endPoints.stripeCheckout, rawData, { headers });
  },

  getAccessToken: (code, redirectUrl) => {
    const formData = new FormData();
    console.log("code", code);

    formData.append("code", code);
    formData.append("redirect_uri", redirectUrl);

    return axiosInstance.post("login/linkedin/get_token", formData);
  },

  getLinkedinUserDetailsByAccessToken: (access_token) => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "cache-control": "no-cache",
      "X-Restli-Protocol-Version": "2.0.0",
    };

    return axios.get("https://api.linkedin.com/v2/userinfo", { headers });
  },

  getOpenerRecommends: () => {
    return axiosInstance.get("show-opener-suggestions");
  },

  getCloserRecommends: () => {
    return axiosInstance.get("show-body-suggestions");
  },

  getStripeKey: () => {
    return axiosInstance.get(endPoints.getStripeKey);
  },

  storeCoverLetter: (token, data) => {
    console.log(data);

    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("cover_template_id", data.cover_template_id);
    formData.append("phone_number", data.phone_number);
    formData.append("email_address", data.email_address);
    formData.append("country_id", data.country_id);
    formData.append("street_address", data.street_address);
    formData.append("state_id", data.state_id);
    formData.append("city_id", data.city_id);
    formData.append("zip_code", data.zip_code);
    formData.append("experience", data.experience);
    formData.append("job_title", data.job_title);
    formData.append("employeer_name", data.employeer_name);
    formData.append("opener_detail", data.opener_detail);
    formData.append("body_detail", data.body_detail);
    formData.append("body_skills", data.body_skills);
    formData.append("closer_detail", data.closer_detail);

    return axiosInstance.post(endPoints.cover_letter, formData, { headers });
  },

  // coverLetterDataStore: (token, data, templateId) => {
  //   const headers = {
  //     Authorization: "Bearer " + token,
  //   };

  //   const formData = new FormData();
  //   formData.append(
  //     "name",
  //     data.name ? data.name : data.first_name + " " + data.last_name
  //   );
  //   formData.append("first_name", data.first_name);
  //   formData.append("last_name", data.last_name);
  //   formData.append(
  //     "contact_person_name",
  //     data.contact_person_name ? data.contact_person_name : " "
  //   );
  //   formData.append(
  //     "contact_person_designation",
  //     data.contact_person_designation ? data.contact_person_designation : " "
  //   );
  //   formData.append("contact_person_email", data.contact_person_email);
  //   formData.append("contact_person_phone", data.contact_person_phone);
  //   formData.append(
  //     "company_address",
  //     data.company_address ? data.company_address : " "
  //   );
  //   formData.append("cover_template_id", Number(templateId));
  //   formData.append("phone_number", data.phone_number);
  //   formData.append("email_address", data.email_address);
  //   formData.append("street_address", data.street_address);
  //   formData.append("country_id", data.country_id);
  //   formData.append("state", data.state ? data.state : " ");
  //   formData.append("city", data.city ? data.city : " ");
  //   formData.append("zip_code", data.zip_code);
  //   formData.append("experience", data.experience);
  //   formData.append("job_title", data.job_title);
  //   formData.append(
  //     "employeer_name",
  //     data.employeer_name ? data.employeer_name : " "
  //   );
  //   formData.append("opener_detail", data.opener_detail);
  //   formData.append("closer_detail", data.closer_detail);
  //   formData.append(
  //     "show_personal_information",
  //     data.show_personal_information
  //   );

  //   return axiosInstance.post(`${endPoints.showCoverLetterData}`, formData, {
  //     headers,
  //   });
  // },

  storeCoverLetterRimsha: (token, data, templateId) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();

    formData.append(
      "name",
      data?.name ? data?.name : data?.first_name + " " + data?.last_name
    );
    formData.append("first_name", data?.first_name ?? "");
    formData.append("last_name", data?.last_name ?? "");

    formData.append("contact_person_name", data?.hirer_name);
    formData.append("contact_person_designation", data?.hirer_job_position);
    formData.append("contact_person_email", data?.hirer_email);

    formData.append("contact_person_phone", data?.phone_number);
    formData.append("company_address", data?.company_Address);
    formData.append("company_name", data?.company_name);

    formData.append("cover_template_id", Number(templateId));

    formData.append("phone_number", data?.phone_number);
    formData.append("email_address", data?.email_address);
    formData.append("street_address", data?.street_address);

    formData.append("country_id", data?.country_id);
    formData.append("state", data?.state);
    formData.append("city", data?.city);

    formData.append("zip_code", data?.zip_code);
    formData.append("experience", Number(data?.experience) ?? 0);
    formData.append("job_title", data?.job_title);

    formData.append("employeer_name", data?.employeer_name);
    formData.append("body_skills", data?.body_skills);
    formData.append(
      "opener_detail",
      data?.opener_detail ? data?.opener_detail : null
    );
    formData.append("job_position", data?.job_title ?? data?.job_position);

    formData.append(
      "body_detail",
      data?.body_detail ? data?.body_detail : null
    );
    formData.append(
      "closer_detail",
      data?.closer_detail ? data?.closer_detail : null
    );
    formData.append(
      "show_personal_information",
      data?.show_personal_information
    );

    return axiosInstance.post(endPoints.showCoverLetterData, formData, {
      headers,
    });
  },

  createUserDigitalSignature: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("alignment", data.alignment);
    formData.append("size", data.size);
    formData.append("text", data.text);
    formData.append("font", data.font);
    formData.append("is_draw", data.is_draw);
    formData.append("is_upload", data.is_upload);
    formData.append("is_text", data.is_text);
    // formData.append("profile_id", data.profile_id);
    formData.append("cover_letter_id", data.cover_letter_id);
    if (data.image) {
      formData.append("image", data.image);
    }

    return axiosInstance.post(endPoints.digitalSignatureStore, formData, {
      headers,
    });
  },

  // Cover letters Examples
  getExampleCoverLetterCategories: () => {
    return axiosInstance.get("/show-categories?parent_category=2");
  },

  getExampleResumeCategories: () => {
    return axiosInstance.get("/template-categories?parent_category=2");
  },

  //  resume examples search by job
  resumeSearchByJob: (jobName) => {
    return axiosInstance.get(`/search-resume-examples?search=${jobName}`);
  },

  //  cover letter examples search by job
  coverLetterSearchByJob: (jobName) => {
    return axiosInstance.get(`/search-cover-examples?search=${jobName}`);
  },
  // show Job All Positions

  getAllJobPositionsNames: () => {
    return axiosInstance.get("/job-positions");
  },

  // Get Current User Swervices
  getMyAllServices: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-type": "multipart/form-data",
    };

    return axiosInstance.get("/my-services", { headers });
  },

  revisionforservice: (token, data, service_user_id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("user_comments", data.user_comments);
    formData.append("service_user_id", service_user_id);
    formData.append("admin_comments", "");
    formData.append("status", "pending");

    return axiosInstance.post("service-user-revisions", formData, {
      headers,
    });
  },

  // Download My Service File
  downloadMyServiceFile: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`/service-file/${id}`, { headers });
  },

  // Admin Side Career
  getAllCareerJobs: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.adminCareer, { headers });
  },

  createCareerJob: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    let {
      title,
      name,
      location,
      meta_keywords,
      meta_description,
      short_description,
      long_description,
    } = data;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("title", title);
    formData.append("short_description", short_description);
    formData.append("long_description", long_description);
    formData.append("location", location);
    formData.append("meta_keywords", meta_keywords);
    formData.append("meta_description", meta_description);

    return axiosInstance.post(endPoints.adminCareer, formData, { headers });
  },

  deleteCareerVacancy: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.adminCareer}/${id}`, { headers });
  },

  getSingleCareerVacancy: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.adminCareer}/${id}`, { headers });
  },

  updateCareerVacancy: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      name: data.name,
      title: data.title,
      short_description: data.short_description,
      long_description: data.long_description,
      location: data.location,
      meta_keywords: data.meta_keywords,
      meta_description: data.meta_description,
      status: data.status,
    };

    return axiosInstance.put(`${endPoints.adminCareer}/${data.id}`, null, {
      headers: headers,
      params: queryParams,
    });
  },

  getAllCoverLetterExamplesTemplates: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.coverExamples, { headers });
  },

  getCoverLetterSuggestData: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.coverExamples}/create`, { headers });
  },

  storeCoverExample: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("cover_template_id", data.cover_template_id);
    formData.append("category_id", data.category_id);
    formData.append("phone_number", data.phone_number);
    formData.append("email_address", data.email_address);
    formData.append("street_address", data.street_address);
    formData.append("country_id", data.country_id);
    formData.append("state", data.state_id);
    formData.append("city", data.city_id);
    formData.append("zip_code", data.zip_code);
    formData.append("experience", data.experience);
    formData.append("opener_detail", data.opener_detail);
    formData.append("job_title", data.job_title);
    formData.append("employeer_name", data.employeer_name);
    formData.append("body_skills", data.body_skills);
    data.job_positions.forEach((job_positions, index) => {
      formData.append(`job_positions[${index}]`, job_positions);
    });
    formData.append("body_detail", data.body_detail);
    formData.append("preview_image", data.preview_image);
    formData.append("closer_detail", data.closer_detail);

    return axiosInstance.post(endPoints.coverExamples, formData, { headers });
  },

  getCoverExampleById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.coverExamples}/${id}`, { headers });
  },

  updateCoverExamplesTemplateById: (token, data, id, isImageUpdate) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("cover_template_id", data.cover_template_id);
    formData.append("category_id", data.category_id);
    formData.append("phone_number", data.phone_number);
    formData.append("email_address", data.email_address);
    formData.append("street_address", data.street_address);
    formData.append("country_id", data.country_id);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("zip_code", data.zip_code);
    formData.append("experience", data.experience);
    formData.append("opener_detail", data.opener_detail);
    formData.append("job_title", data.job_title);
    formData.append("employeer_name", data.employeer_name);
    formData.append("body_skills", data.body_skills);
    data.job_positions.forEach((job_positions, index) => {
      formData.append(`job_positions[${index}]`, job_positions);
    });
    formData.append("body_detail", data.body_detail);
    formData.append("closer_detail", data.closer_detail);
    formData.append("preview_image", isImageUpdate ? data.preview_image : "");

    formData.append("_method", "PUT");

    return axiosInstance.post(`${endPoints.coverExamples}/${id}`, formData, {
      headers,
    });
  },

  deleteCoverExample: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.delete(`${endPoints.coverExamples}/${id}`, {
      headers,
    });
  },

  // Coins
  // User Website Coins
  getCoins: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get("get-coins", { headers });
  },

  updateUserCoins: (token, updatedCoins) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log("updatedCoins: ", updatedCoins);

    const formData = new FormData();
    formData.append("remaining_coins", updatedCoins);

    return axiosInstance.post("update-coins", formData, { headers });
  },

  //  Admin Side Coins Crud
  getAllCoins: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.coins, { headers });
  },

  deleteCoins: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.delete(endPoints.coins + `/${id}`, { headers });
  },

  storeCoins: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const { coins, duration, referrals } = data;

    const formData = new FormData();

    formData.append("coins", coins);
    formData.append("duration", duration);
    formData.append("referrals", referrals);

    return axiosInstance.post(endPoints.coins, formData, { headers });
  },

  showCoinDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.coins + `/${id}`, { headers });
  },

  updateCoins: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.coins + `/${id}`, data, {
      headers,
    });
  },

  //Reviews
  getAllReviews: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.reviews, { headers });
  },

  updateReview: (token, data) => {
    let { id, user_name, status, rating, description } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      user_name: user_name,
      rating: rating,
      description: description,
      status: status,
    };

    return axiosInstance.put(endPoints.reviews + `/${id}`, null, {
      headers,
      params: queryParams,
    });
  },

  createReview: (token, data) => {
    let { user_name, rating, description } = data;

    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("user_name", user_name);
    formData.append("rating", rating);
    formData.append("description", description);
    return axiosInstance.post(endPoints.reviews, formData, { headers });
  },

  getReviewById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.reviews + `/${id}`, { headers });
  },

  deleteReview: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.reviews + `/${id}`, { headers });
  },
  // Kashish work
  // Certificates
  getAllCertificates: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.certificate, { headers });
  },

  showCertificateDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.certificate + `/${id}`, { headers });
  },

  updateCertificate: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.certificate + `/${id}`, data, {
      headers,
    });
  },

  deleteCertificate: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.certificate + `/${id}`, { headers });
  },

  createCertificate: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.post(endPoints.certificate, data, { headers });
  },

  // Experience
  getAllExperience: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.experience, { headers });
  },

  showExperienceDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.experience + `/${id}`, { headers });
  },

  updateExperience: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.experience + `/${id}`, data, {
      headers,
    });
  },

  deleteExperience: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.experience + `/${id}`, { headers });
  },

  createExperience: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.post(endPoints.experience, data, { headers });
  },

  // Resume Example Apis

  getAllResumeExamples: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.resumeExamples, { headers });
  },

  getResumeExamplesSuggest: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(`${endPoints.resumeExamples}/create`, { headers });
  },

  getResumeExamplesSuggestEdit: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(`${endPoints.resumeExamples}/${id}/edit`, {
      headers,
    });
  },

  getResumeExampleByid: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(`${endPoints.resumeExamples}/${id}`, { headers });
  },

  storeResumeExamplesData: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("resume_name", data.template_name);
    formData.append("first_name", data.first_name);
    formData.append("middle_name", data.middle_name);
    formData.append("last_name", data.last_name);
    formData.append("email_address", data.email_address);
    formData.append("phone_number", data.phone_number);
    formData.append("contact_number", data.contact_number);
    formData.append("template_id", data.template_id);
    formData.append("country_id", data.country_id);
    formData.append("state", data.state_id);
    formData.append("city", data.city_id);
    formData.append("street_address", data.street_address);
    formData.append("postal_code", data.postal_code);

    if (!data.date_of_birth) {
      formData.append("date_of_birth", "");
    } else {
      formData.append("date_of_birth", data.date_of_birth);
    }

    formData.append("gander", data.gander);
    formData.append("martitial_status", data.martitial_status);
    formData.append("id_no", data.id_no);
    formData.append("summary_id", data.summary_id);

    data.certificate_id.forEach((certificate, index) => {
      formData.append(`certificate_ids[${index}]`, certificate);
    });

    data.education_id.forEach((education, index) => {
      formData.append(`education_ids[${index}]`, education);
    });

    data.experience_id.forEach((experience, index) => {
      formData.append(`experience_ids[${index}]`, experience);
    });

    data.soft_skill_id.forEach((soft_skill, index) => {
      formData.append(`soft_skill_ids[${index}]`, soft_skill);
    });

    data.technical_skill_id.forEach((tech_skill, index) => {
      formData.append(`tech_skill_ids[${index}]`, tech_skill);
    });
    formData.append("job_title", "example");
    formData.append("category_id", Number(data.categorie_id));
    data.job_position.forEach((position, index) => {
      formData.append(`job_positions[${index}]`, position);
    });

    formData.append("preview_image", data.preview_image);

    return axiosInstance.post(`${endPoints.resumeExamples}`, formData, {
      headers,
    });
  },

  updateResumeExamplesData: (token, data, id, isImageUpdate) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log(data);

    const formData = new FormData();

    formData.append("resume_name", data.template_name);
    formData.append("first_name", data.first_name);
    formData.append("middle_name", data.middle_name);
    formData.append("last_name", data.last_name);
    formData.append("email_address", data.email_address);
    formData.append("phone_number", data.phone_number);
    formData.append("contact_number", data.contact_number);
    formData.append("template_id", data.template_id);
    formData.append("country_id", data.country_id);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("street_address", data.street_address);
    formData.append("postal_code", data.postal_code);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("gander", data.gander);
    formData.append("martitial_status", data.martitial_status);
    formData.append("id_no", data.id_no);
    formData.append("summary_id", data.summary_id);

    data.certificate_id.forEach((certificate, index) => {
      formData.append(`certificate_ids[${index}]`, certificate);
    });

    data.education_id.forEach((education, index) => {
      formData.append(`education_ids[${index}]`, education);
    });

    data.experience_id.forEach((experience, index) => {
      formData.append(`experience_ids[${index}]`, experience);
    });

    data.soft_skill_id.forEach((soft_skill, index) => {
      formData.append(`soft_skill_ids[${index}]`, soft_skill);
    });

    data.technical_skill_id.forEach((tech_skill, index) => {
      formData.append(`tech_skill_ids[${index}]`, tech_skill);
    });
    formData.append("job_title", "example");
    formData.append("category_id", Number(data.category_id));

    data.job_positions.forEach((position, index) => {
      formData.append(`job_positions[${index}]`, Number(position));
    });

    formData.append("preview_image", isImageUpdate ? data.preview_image : "");

    formData.append("_method", "PUT");

    return axiosInstance.post(`${endPoints.resumeExamples}/${id}`, formData, {
      headers,
    });
  },

  deleteResumeExample: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(`${endPoints.resumeExamples}/${id}`, {
      headers,
    });
  },

  // User Services Methods
  getAllUserServices: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.userServices, { headers });
  },

  getUserServicesList: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.userServices + `/create`, { headers });
  },

  showUserServicesDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.userServices + `/${id}`, { headers });
  },

  updateUserServices: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const { modified_file, delievered } = data;

    const formData = new FormData();
    formData.append("modified_file", modified_file);
    formData.append("delievered", delievered);
    formData.append("_method", "PUT");

    return axiosInstance.post(`${endPoints.userServices}/${id}`, formData, {
      headers,
    });
  },

  updateUserServicesRevision: (token, id, data, service_user_id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("status", data.status);
    formData.append("user_comments", data.user_comments);
    formData.append("service_user_id", service_user_id);
    formData.append("_method", "PUT");

    // Log key-value pairs
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return axiosInstance.post(`${endPoints.revision}/${id}`, formData, {
      headers,
    });
  },

  getUserRefferalById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.usersReferral + `/${id}`, { headers });
  },

  // Education
  getAllEducation: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.education, { headers });
  },

  showEducationDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.education + `/${id}`, { headers });
  },

  updateEducation: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.education + `/${id}`, data, {
      headers,
    });
  },

  deleteEducation: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.education + `/${id}`, { headers });
  },

  createEducation: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.post(endPoints.education, data, { headers });
  },

  getDegreeValues: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get("show-degrees", { headers });
  },

  // Soft-Skills
  getAllSoftSkills: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.soft_skills, { headers });
  },

  showSoftSkills: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.soft_skills + `/${id}`, { headers });
  },

  updateSoftSkills: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.soft_skills + `/${id}`, data, {
      headers,
    });
  },

  deleteSoftSkills: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.soft_skills + `/${id}`, { headers });
  },

  createSoftSkills: (token, arr, isExample, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    // console.log("api service array", arr.toString(","));

    const formData = new FormData();

    formData.append("name", arr.join(", "));

    formData.append("job_position_id", id);
    formData.append("is_example", isExample);

    return axiosInstance.post(endPoints.soft_skills, formData, { headers });
  },

  // Tech-Skills
  getAllTechSkills: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.tech_skills, { headers });
  },

  showTechSkills: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.tech_skills + `/${id}`, { headers });
  },

  updateTechSkills: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.tech_skills + `/${id}`, data, {
      headers,
    });
  },

  deleteTechSkills: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.tech_skills + `/${id}`, { headers });
  },

  createTechSkills: (token, arr, id, isExample) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    // console.log("api service array", arr.toString(","));

    const formData = new FormData();

    formData.append("name", arr.join(", "));

    formData.append("job_position_id", id);
    formData.append("is_example", isExample);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return axiosInstance.post(endPoints.tech_skills, formData, { headers });
  },

  // Summary
  getAllSummary: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.summary, { headers });
  },

  showSummaryDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.summary + `/${id}`, { headers });
  },

  updateSummary: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.summary + `/${id}`, data, {
      headers,
    });
  },

  deleteSummary: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.summary + `/${id}`, { headers });
  },

  createSummary: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.post(endPoints.summary, data, { headers });
  },

  // subscriber
  getAllSubscriber: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.subscriber, { headers });
  },

  showSubscriberDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.subscriber + `/${id}`, { headers });
  },

  updateSubscriber: (token, id, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.put(endPoints.subscriber + `/${id}`, data, {
      headers,
    });
  },

  deleteSubscriber: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.subscriber + `/${id}`, { headers });
  },

  createSubscriber: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.post(endPoints.subscriber, data, { headers });
  },

  subscribeNewsLetter: (email) => {
    const formData = new FormData();
    console.log("codeg", email);

    formData.append("email", email);

    return axiosInstance.post("/subscribe", formData);
  },

  getAllObjective: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.objective, { headers });
  },

  showObjectiveDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.objective + `/${id}`, { headers });
  },

  createObjective: (token, data, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    console.log(data);

    const formData = new FormData();
    data.map((item, idx) => {
      formData.append(`detail[${idx}]`, item);
    });

    formData.append("job_position_ids", id);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    return axiosInstance.post(endPoints.objective, formData, { headers });
  },

  updateObjective: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      detail: data.detail,
      job_position_ids: JSON.stringify(data.job_position_ids),
      sort: data.sort,
      status: data.status,
    };

    return axiosInstance.put(endPoints.objective + `/${data.id}`, null, {
      headers: headers,
      params: queryParams,
    });
  },

  deleteObjective: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.objective + `/${id}`, { headers });
  },
  getAllCoupon: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.coupon, { headers });
  },

  getSingleCouponsDetails: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${endPoints.coupon}/${id}`, { headers });
  },

  createCoupon: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const { name, code, discount, expiry_date, maximum_uses } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("discount_rate", Number(discount));
    formData.append("expiry_date", expiry_date);
    formData.append("maximum_uses", maximum_uses);

    return axiosInstance.post(endPoints.coupon, formData, { headers });
  },

  showCouponDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.coupon + `/${id}`, { headers });
  },

  updateCoupon: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      name: data.name,
      code: data.code,
      discount_rate: data.discount,
      expiry_date: data.expiry_date,
      maximum_uses: data.maximum_uses,
    };

    return axiosInstance.put(endPoints.coupon + `/${data.id}`, null, {
      headers: headers,
      params: queryParams,
    });
  },

  deleteCoupon: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.coupon + `/${id}`, { headers });
  },
  getSettingForWebsite: () => {
    return axiosInstance.get("settings-for-website");
  },
  // Admins Methods
  getAllAppliedJobs: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.appliedJobs, { headers });
  },

  showAppliedJobDetails: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.appliedJobs + `/${id}`, { headers });
  },
  AddUserPassword: (token, newPassWord, confirmPassword) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();
    formData.append("password", newPassWord);
    formData.append("c_password", confirmPassword);

    return axiosInstance.post(endPoints.addPassword, formData, {
      headers,
    });
  },

  getHeaderDynamicPages: () => {
    return axiosInstance.get("show-header-pages");
  },
  downloadResumeAppliedFile: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(`${endPoints.appliedJobs}/${id}`, { headers });
  },

  //
  getAllPackages: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.package, { headers });
  },

  updatePackage: (
    token,
    id,
    name,
    resume_templates,
    cover_templates,
    description,
    price,
    duration,
    sort,
    status,
    ai_based_cover_letter_tries,
    max_services,
    resume_parser_tries,
    spell_and_grammer_tries
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      name: name,
      resume_templates: resume_templates,
      cover_templates: cover_templates,
      description: description,
      sort: sort,
      status: status ? 1 : 0,
      price: price,
      duration: duration,
      ai_based_cover_letter_tries: ai_based_cover_letter_tries,
      max_services: max_services,
      resume_parser_tries: resume_parser_tries,
      spell_and_grammer_tries: spell_and_grammer_tries,
    };

    console.log(queryParams);

    return axiosInstance.put(`${endPoints.package}/${id}`, null, {
      headers,
      params: queryParams,
    });
  },

  getPackageById: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`${endPoints.package}/${id}`, { headers });
  },

  // cover leter body suggestions
  getAllCoverLetterBodySuddestions: (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(endPoints.bodySuggestions, { headers });
  },

  DeleteCoverLetterBodySuddestions: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.delete(`${endPoints.bodySuggestions}/${id}`, {
      headers,
    });
  },

  createCovertLetterBodySuggestion: (token, body) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("body", body);

    return axiosInstance.post(`${endPoints.bodySuggestions}`, formData, {
      headers,
    });
  },

  getSingleCoverLetterBodySuggestion: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${endPoints.bodySuggestions}/${id}`, { headers });
  },

  updateCoverLetterSuggestionById: (token, id, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const queryParams = {
      body: data.body,
      status: data.status,
      sort: data.sort,
    };

    return axiosInstance.put(`${endPoints.bodySuggestions}/${id}`, null, {
      headers,
      params: queryParams,
    });
  },

  getAllCoverLetterOpenerSuggestions: (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(endPoints.openerSuggestions, { headers });
  },

  DeleteCoverLetterOpenerSuddestions: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.delete(`${endPoints.openerSuggestions}/${id}`, {
      headers,
    });
  },

  createCovertLetterOpenerSuggestion: (token, body) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("body", body);

    return axiosInstance.post(`${endPoints.openerSuggestions}`, formData, {
      headers,
    });
  },

  getSingleCoverLetterOpenerSuggestion: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.get(`${endPoints.openerSuggestions}/${id}`, {
      headers,
    });
  },

  updateCoverLetterOpenerSuggestionById: (token, id, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const queryParams = {
      body: data.body,
      status: data.status,
      sort: data.sort,
    };

    return axiosInstance.put(`${endPoints.openerSuggestions}/${id}`, null, {
      headers,
      params: queryParams,
    });
  },

  showProfileResumeData: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`${endPoints.showProfileResumeData}/${id}`, {
      headers,
    });
  },

  showProfileSectionUpload: (token, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("profile_id", data.profile_id);
    formData.append("show_experience", data.show_experience);
    formData.append("show_certificates", data.show_certificates);
    formData.append("show_awards", data.show_awards);
    formData.append("show_references", data.show_references);
    formData.append("show_languages", data.show_languages);
    formData.append("show_soft_skills", data.show_soft_skills);

    return axiosInstance.post(endPoints.showProfileSectionUpload, formData, {
      headers,
    });
  },

  // get Coins PLan
  getCoinsPlan: () => {
    return axiosInstance.get("coin-plans");
  },

  purchaseCoins: (token, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    formData.append("payment_type", data.payment_type);
    formData.append("card_number", data.card_number ? data.card_number : "");
    formData.append("card_name", data.card_name ? data.card_name : "");
    formData.append("tax", data.tax);
    formData.append("tax_type", data.tax_type);
    formData.append("total_amount", data.total_amount);

    return axiosInstance.post(`coin-plans/purchase/${data.planId}`, formData, {
      headers,
    });
  },

  purchaseCoinsUpdate: (token, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("payment_type", data.payment_type);
    formData.append("card_number", data.card_number ? data.card_number : "");
    formData.append("card_name", data.card_name ? data.card_name : "");
    formData.append("tax", data.tax);
    formData.append("tax_type", data.tax_type);
    formData.append("total_amount", data.total_amount);

    return axiosInstance.post(
      `coin-plans/update/${data.planId}/${data.id}`,
      formData,
      {
        headers,
      }
    );
  },

  getAllExperenceSuggestion: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.experience_suggestion, { headers });
  },

  showExperenceSuggestion: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.experience_suggestion + `/${id}`, {
      headers,
    });
  },

  createExperenceSuggestion: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const { detail, job_position_ids } = data;

    // Debugging: Check if detail exists and is an array
    if (!Array.isArray(detail)) {
      console.error("Error: 'detail' is not an array or is undefined", detail);
      throw new Error("'detail' must be an array");
    }

    const formData = new FormData();

    // Append each detail suggestion with its specific key (detail[0], detail[1], etc.)
    detail.forEach((item, index) => {
      formData.append(`detail[${index}]`, item); // Dynamically set the keys
    });

    // Append job_position_ids (converted to a JSON string if it's an array)
    formData.append("job_position_ids", JSON.stringify(job_position_ids));

    console.log("FormData:", Object.fromEntries(formData.entries())); // Debugging the FormData

    return axiosInstance.post(endPoints.experience_suggestion, formData, {
      headers,
    });
  },

  // createExperenceSuggestion: (token, data) => {
  //   const headers = {
  //     Authorization: "Bearer " + token,
  //   };
  //   const { detail, job_position_ids } = data;
  //   console.log(data);

  //   const formData = new FormData();
  //   formData.append("detail", detail);
  //   formData.append("job_position_ids", JSON.stringify(job_position_ids));

  //   return axiosInstance.post(endPoints.experience_suggestion, formData, {
  //     headers,
  //   });
  // },

  updateExperenceSuggestion: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      detail: data.detail,
      job_position_ids: JSON.stringify(data.job_position_ids),
      sort: data.sort,
      status: data.status,
    };

    return axiosInstance.put(
      endPoints.experience_suggestion + `/${data.id}`,
      null,
      {
        headers: headers,
        params: queryParams,
      }
    );
  },

  deleteExperenceSuggestion: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(endPoints.experience_suggestion + `/${id}`, {
      headers,
    });
  },

  // Ads LIST
  getAllAds: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.ads, { headers });
  },

  getAdsById: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.ads + `/${id}/edit`, { headers });
  },

  getandupdateAds: (token, data) => {
    const { id, ad_script, is_script, image, ad_url } = data;
    const headers = {
      Authorization: "Bearer " + token,
    };

    const formData = new FormData();

    formData.append("ad_script", ad_script);
    formData.append("is_script", is_script);
    if (image) {
      formData.append("image", image);
    }
    formData.append("ad_url", ad_url);
    formData.append("_method", "PUT");

    return axiosInstance.post(endPoints.ads + `/${id}`, formData, {
      headers,
    });
  },

  getAllAdsWeb: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.webads, { headers });
  },
  UserServicesAdmin: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.userServiceAdmin + `/${id}`, {
      headers,
    });
  },
  UserTransactionAdmin: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.get(endPoints.getUsertransactionAdmin + `/${id}`, {
      headers,
    });
  },
  deleteUserResumeAdminSide: (token, id) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    return axiosInstance.delete(
      endPoints.deleteUserResumeAdmin + `/${id}`,

      {
        headers,
      }
    );
  },
  deleteUserCoverAdminSide: (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axiosInstance.delete(endPoints.deleteUserCoverAdmin + `/${id}`, {
      headers,
    });
  },
  getAllInterstedUsers: (token) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    return axiosInstance.get(endPoints.interstedUserCandidate, { headers });
  },

  shareUsersIds: (token, userIds) => {
    const formData = new FormData();
    userIds.forEach((idshare, idx) => {
      formData.append(`ids[${idx}]`, idshare);
    });

    console.log("FormData before sending:", ...formData.entries());

    return axiosInstance
      .post(endPoints.shareusersIds, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },
  shareUserCvs: (token, urls) => {
    const formData = new FormData();
    urls.forEach((urls, idx) => {
      formData.append(`links[${idx}]`, urls);
    });

    console.log("FormData before sending:", ...formData.entries());

    return axiosInstance
      .post(endPoints.shareuserscvs, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },
  // Admin Can Create User Resume and Cover Letters Apis
  userResumeHeaderSubmit: (token, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("resume_name", data.resume_name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email_address", data.email_address);
    formData.append("job_title", data.job_title);
    formData.append("phone_number", data.phone_number);
    formData.append("contact_number", data.contact_number);
    formData.append("template_id", data.template_id);
    formData.append("country_id", data.country_id);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("street_address", data.street_address);
    formData.append("postal_code", data.postal_code);
    formData.append("gender", data.gender);
    formData.append("website", data.website);

    return axiosInstance.post(`${endPoints.adminUserResume}/add`, formData, {
      headers,
    });
  },

  userResumeHeaderupdate: (token, resume_id, profile_image, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("first_name", data.first_name ? data.first_name : "");
    formData.append("last_name", data.last_name ? data.last_name : "");
    formData.append(
      "email_address",
      data.email_address ? data.email_address : ""
    );
    formData.append("job_title", data.job_title ? data.job_title : "");
    formData.append("phone_number", data.phone_number ? data.phone_number : "");
    formData.append(
      "contact_number",
      data.contact_number ? data.contact_number : ""
    );
    formData.append("template_id", data.template_id);
    formData.append("country_id", data.country_id ? data.country_id : "");
    formData.append("state", data.state ? data.state : "");
    formData.append("city", data.city ? data.city : "");
    formData.append(
      "street_address",
      data.street_address ? data.street_address : ""
    );
    formData.append("postal_code", data.postal_code ? data.postal_code : "");
    formData.append("website", data.website ? data.website : "");
    formData.append("status", "1");
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    return axiosInstance.post(
      `${endPoints.adminUserResume}/update/${resume_id}`,
      formData,
      {
        headers,
      }
    );
  },

  createJobDescriptionSuggestion: (token, data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const SubData = {
      job_title: data.job_title,
    };

    // const formData = new FormData();
    // formData.append("job_title", data.job_title);

    return axiosInstance2.post(endPoints.createExperienceSection, SubData, {
      headers,
    });
  },

  updateExperenceSuggestion: (token, data) => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const queryParams = {
      detail: data.detail,
      job_position_ids: JSON.stringify(data.job_position_ids),
      sort: data.sort,
      status: data.status,
    };

    return axiosInstance.put(
      endPoints.experience_suggestion + `/${data.id}`,
      null,
      {
        headers: headers,
        params: queryParams,
      }
    );
  },

  //Rimsha ChatBot Work:
  getChatBotContent: (key) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const queryParams = {
      key: key,
    };
    return axiosInstance.get(endPoints.chatbot_contents, {
      params: queryParams,
      headers,
    });
  },

  getChatBotContentAnswers: (question) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const formData = new FormData();
    formData.append("question", question);
    return axiosInstanceForAi.post(
      endPoints.chatbot_contents_answer_ai,
      formData,
      { headers }
    );
  },

  aiSpell_Check: (text) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      text,
    };

    return axios.post(
      "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
      data,
      { headers }
    );
  },
  aiGrammer_Check: (text) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      text,
    };

    return axios.post(
      "https://ai.grmcheck.aiproresume.com/api/v1/grammar-correction",

      data,
      { headers }
    );
  },
  createCoverLetterAiByJobTitleAndDescription: (data) => {
    const dataa = {
      ...data.jsonData,
      job_title: data.job_title,
      job_description: data.job_description,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const formData = new FormData();

    for (const [key, value] of Object.entries(dataa)) {
      formData.append(key, value);
    }

    return axiosInstanceAiCoverLetter2.post(
      `${endPoints.coverletterTitleAndDescription}`,
      formData,
      { headers }
    );
  },

  updateCoverLetterTries: (token, usage, name) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();

    formData.append("usage", usage);
    formData.append("tries", name);

    return axiosInstance.post(endPoints.updateCoverLetterTries, formData, {
      headers,
    });
  },

  aiSummaryGen: (job_title, keywords) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      job_title,
      keywords,
    };

    return axios.post(
      "https://ai.smrysugst.aiproresume.com/api/v1/job-summary-suggestion",
      JSON.stringify(data),
      { headers }
    );
  },

  ai_createTechSkills_suggestion: (job_title) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      job_title,
    };

    return axios.post(
      "https://ai.skillsgen.aiproresume.com/api/v1/technical-skill-generation",
      data,
      { headers }
    );
  },
};
