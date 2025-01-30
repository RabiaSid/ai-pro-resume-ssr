import React, { useEffect, useState } from "react";
import AllborderInputGroup from "../../../../components/AllborderInputGroup";
import TextAreaGroup from "../../../../components/TextAreaGroup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ApiService } from "../../../../services/ApiService";
import LoadingSpiner from "../../../../components/LoadingSpinner";
import swal from "sweetalert";
//
import PropTypes from "prop-types";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import SelectDropdown from "../../../../components/SelectDropdown";
import DropdownWithIdValue from "../../../../components/DropdownWithIdValue";
import ToggleSwitch from "../../../../components/ToggleSwitch";
import { useAuth } from "../../../../services/Auth";
import PlaceholderImage from "../../../../assets/images/placeholder.webp";
import { PiPencilBold } from "react-icons/pi";
import citiesJson from "../../../../data/cities.json";
import StatesJson from "../../../../data/states.json";
// import {
//   Autocomplete,
//   Box,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const animatedComponents = makeAnimated();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Summary = ({
  // exmaple id
  example_id,
  // reusme Header Data
  first_name,
  middle_name,
  last_name,
  email_address,
  phone_number,
  contact_number,
  country_id,
  state,
  city,
  street_address,
  postal_code,
  date_of_birth,
  gander,
  martitial_status,
  id_no,
  // Summary
  summary_examples,
  summary_ids,
  // certificat
  certificate_examples,
  certificate_ids,
  // education
  education_examples,
  education_ids,
  // experience
  experience_examples,
  experience_ids,
  // soft_skill
  soft_skill_examples,
  soft_skill_ids,
  // technical_skill
  technical_skill_examples,
  technical_skill_ids,
  // fun load data
  loadData,
  categories,
  // dropdown Values
  jobPositionsDropdownValues,
  // template
  template_id,
  job_positions,
  template_name,
  category_id,
  preview_image,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsloading] = useState(false);

  const [resumeData, setResumeData] = useState({
    first_name,
    middle_name,
    last_name,
    email_address,
    phone_number,
    contact_number,
    template_id,
    country_id,
    state,
    city,
    street_address,
    postal_code,
    date_of_birth,
    gander,
    martitial_status,
    id_no,
    // others
    summary_id: 0,
    certificate_id: [],
    education_id: [],
    experience_id: [],
    soft_skill_id: [],
    technical_skill_id: [],
    // template
    template_id,
    job_positions,
    template_name,
    category_id,
    preview_image,
  });

  useEffect(() => {
    if (preview_image) {
      setResumeData((prev) => ({
        ...prev,
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name,
        city: city,
        contact_number: contact_number,
        id_no: id_no,
        gander: gander,
        country_id: country_id,
        date_of_birth: date_of_birth,
        email_address: email_address,
        martitial_status: martitial_status,
        phone_number: phone_number,
        state: state,
        preview_image: preview_image,
        template_id: template_id,
        template_name: template_name,
        category_id: category_id,
      }));
    }
  }, [
    preview_image,
    template_id,
    template_name,
    category_id,
    first_name,
    last_name,
    middle_name,
    city,
    contact_number,
    id_no,
    gander,
    country_id,
    date_of_birth,
    email_address,
    martitial_status,
    phone_number,
    state,
  ]);

  const [mainFormErrors, setMainFormErrors] = useState(null);

  const handleStepData = (e) => {
    e.preventDefault();

    if (!resumeData.preview_image) {
      set_preview_image_error(true);
      return;
    }
    set_preview_image_error(false);

    setIsloading(true);
    ApiService.updateResumeExamplesData(
      user?.token,
      resumeData,
      example_id,
      previewImageUpdate
    )
      .then((res) => {
        setIsloading(false);
        Cookies.remove("resumeExampleStep1");

        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate("/admin/resume-examples"))
          .catch(() => navigate("/admin/resume-examples"));
      })
      .catch((err) => {
        setMainFormErrors(Object.values(err.response.data.errors));
        console.log(err);
        setIsloading(false);
      });
  };

  // Templates
  const [allTemplates, setAllTemplates] = useState();

  useEffect(() => {
    ApiService.getAllResumeTemplates(user?.token)
      .then((response) => {
        let templates = [];

        response.data.data.templates.map((temp, idx) => {
          if (temp.is_example === 0) {
            templates.push(temp);
          }
        });
        setAllTemplates(templates);
      })
      .catch((err) => console.log(err));
  }, []);
  // Make All dropdowns Options Here
  const [certificat, setCertificate] = useState();
  const [educations, setEducations] = useState();
  const [experience, setExperience] = useState();
  const [softSkills, setSoftSkills] = useState();
  const [technicalSkill, setTechnicalSkill] = useState();
  const [job_positions_opt, setJob_positions_opt] = useState("");
  useEffect(() => {
    // 1
    if (certificate_examples) {
      const certifacteData = certificate_examples?.map((item) => ({
        value: item.id.toString(),
        label: item.title,
      }));

      setCertificate(certifacteData);
    }
    // 2
    if (education_examples) {
      const educationsData = education_examples?.map((item) => ({
        value: item.id.toString(),
        label: item.field,
      }));

      setEducations(educationsData);
    }
    // 3
    if (experience_examples) {
      const experienceData = experience_examples?.map((item) => ({
        value: item.id.toString(),
        label: item.company_name,
      }));

      setExperience(experienceData);
    }
    // 4
    if (soft_skill_examples) {
      const softSkillsData = soft_skill_examples?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      setSoftSkills(softSkillsData);
    }
    // 5
    if (technical_skill_examples) {
      const technicalSkillsData = technical_skill_examples?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      setTechnicalSkill(technicalSkillsData);
    }
    // 6
    if (jobPositionsDropdownValues) {
      const jobPositionValues = jobPositionsDropdownValues?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      setJob_positions_opt(jobPositionValues);
    }
  }, [
    certificate_examples,
    education_examples,
    experience_examples,
    soft_skill_examples,
    technical_skill_examples,
    jobPositionsDropdownValues,
  ]);

  useEffect(() => {
    if (summary_ids) {
      if (summary_ids.length > 0) {
        console.log(summary_ids.length);
        setResumeData((prev) => ({
          ...prev,
          summary_id: summary_ids[0].id,
        }));
      }
    }
  }, [summary_ids]);

  useEffect(() => {
    // Certificates
    if (certificate_ids) {
      const certifacteData = certificate_ids?.map((item) => ({
        value: item.id.toString(),
        label: item.title,
      }));

      const certificateIdsArray = certifacteData.map((item) =>
        Number(item.value)
      );

      setResumeData((prev) => ({
        ...prev,
        certificate_id: certificateIdsArray,
      }));
      setSelectedCertificates(certifacteData);
    }
    // education_ids
    if (education_ids) {
      const data = education_ids?.map((item) => ({
        value: item.id.toString(),
        label: item.field,
      }));

      const certificateIdsArray = data.map((item) => Number(item.value));

      setResumeData((prev) => ({
        ...prev,
        education_id: certificateIdsArray,
      }));
      setSelectedEducations(data);
    }
    // Certificates
    if (experience_ids) {
      const data = experience_ids?.map((item) => ({
        value: item.id.toString(),
        label: item.company_name,
      }));

      const ArrayData = data.map((item) => Number(item.value));

      setResumeData((prev) => ({
        ...prev,
        experience_id: ArrayData,
      }));
      setSelectedExperince(data);
    }
    // soft_skill_ids
    if (soft_skill_ids) {
      const data = soft_skill_ids?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      const ArrayData = data.map((item) => Number(item.value));

      setResumeData((prev) => ({
        ...prev,
        soft_skill_id: ArrayData,
      }));
      setSelectedSoftSkills(data);
    }
    // technical_skill_ids
    if (technical_skill_ids) {
      const data = technical_skill_ids?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      const ArrayData = data.map((item) => Number(item.value));

      setResumeData((prev) => ({
        ...prev,
        technical_skill_id: ArrayData,
      }));
      setSelectedTechnicalSkill(data);
    }

    if (job_positions) {
      const job_positionsData = job_positions?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));

      const ArrayData = job_positionsData.map((item) => item.value);

      setResumeData((prev) => ({
        ...prev,
        job_positions: ArrayData,
      }));

      setSelectedJobPositions(job_positionsData);
    }
  }, [
    certificate_ids,
    education_ids,
    experience_ids,
    soft_skill_ids,
    technical_skill_ids,
    job_positions,
  ]);

  // Multiple selectedCertificates Selections Array
  const [selectedCertificates, setSelectedCertificates] = useState();
  const setCertificatesData = (array) => {
    setSelectedCertificates(array);
    const itemIds = array?.map((item) => Number(item.value));

    setResumeData((prev) => ({ ...prev, certificate_id: itemIds }));
  };
  // Multiple selectedEducations Selections Array
  const [selectedEducations, setSelectedEducations] = useState();
  const setEducationsData = (array) => {
    setSelectedEducations(array);
    const itemIds = array?.map((item) => Number(item.value));

    setResumeData((prev) => ({ ...prev, education_id: itemIds }));
  };
  // Multiple selectedExperince Selections Array
  const [selectedExperince, setSelectedExperince] = useState();
  const setExperinceData = (array) => {
    setSelectedExperince(array);
    const itemIds = array?.map((item) => Number(item.value));

    setResumeData((prev) => ({ ...prev, experience_id: itemIds }));
  };
  // Multiple selectedSoftSkills Selections Array
  const [selectedSoftSkills, setSelectedSoftSkills] = useState();
  const setSoftSkillsData = (array) => {
    setSelectedSoftSkills(array);
    const itemIds = array?.map((item) => Number(item.value));

    setResumeData((prev) => ({ ...prev, soft_skill_id: itemIds }));
  };
  // Multiple selectedSoftSkills Selections Array
  const [selectedTechnicalSkill, setSelectedTechnicalSkill] = useState();
  const setTechnicalSkillData = (array) => {
    setSelectedTechnicalSkill(array);
    const itemIds = array?.map((item) => Number(item.value));

    setResumeData((prev) => ({ ...prev, technical_skill_id: itemIds }));
  };

  // Multiple selectedJobPositions Selections Array
  const [selectedJobPositions, setSelectedJobPositions] = useState();
  const setJobPositionsData = (array) => {
    setSelectedJobPositions(array);
    const itemIds = array?.map((item) => item.value);

    setResumeData((prev) => ({ ...prev, job_positions: itemIds }));
  };

  // Tabs Change
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Create Summary
  const [summarytitle, setSummaryTitle] = useState("");
  const [summarydescription, setSummaryDescription] = useState("");
  const handleCreateSummary = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      title: summarytitle,
      description: summarydescription,
    };

    ApiService.createSummary(user?.token, data)
      .then((res) => {
        setIsloading(false);
        // Load The Data
        loadData();
        // Empty All
        setSummaryTitle("");
        setSummaryDescription("");
        // Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  };

  // Create Curtifacate
  const [errors, setErrors] = useState(null);

  const [preview_image_error, set_preview_image_error] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState(false);

  const handleTempImageChange = (e) => {
    const file = e.target.files[0];

    setResumeData((prev) => ({ ...prev, preview_image: file }));
    setPreviewImageUpdate(true);
  };

  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateDescription, setCertificateDescription] = useState("");
  const [certificateInstitute, setCertificateInstitute] = useState("");
  const [certificateDate, setCertificateDate] = useState("");

  const handleCreateCertificate = (e) => {
    e.preventDefault();

    const data = {
      title: certificateTitle,
      description: certificateDescription,
      institute: certificateInstitute,
      date: certificateDate,
    };
    setIsloading(true);
    ApiService.createCertificate(user?.token, data)
      .then((res) => {
        setIsloading(false);
        loadData();
        // Empty All Feilds After Submit
        setCertificateTitle("");
        setCertificateDescription("");
        setCertificateInstitute("");
        setCertificateDate("");
        // Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
        setErrors(Object.values(err.response.data.errors));
      });
  };
  // Education
  const [educationErrors, setEducationErrors] = useState(null);
  const [educationDegreeDropdown, setEducationDegreeDropdown] = useState([]);
  const [educationInstitution, setEducationInstitution] = useState("");
  const [educationDegreeId, setEducationDegreeId] = useState("");
  const [educationField, setEducationField] = useState("");
  const [educationGradeType, setEducationGradeType] = useState("");
  const [educationGrade, setEducationGrade] = useState("");
  const [educationStartDate, setEducationStartDate] = useState("");
  const [educationEndDate, setEducationEndDate] = useState("");
  const [startDateIsSelected, setStartDateIsSelected] = useState(false);

  const [liveDate, setLiveDate] = useState(new Date());
  useEffect(() => {
    ApiService.getDegreeValues(user?.token)
      .then((res) => {
        setEducationDegreeDropdown(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateEducation = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      institution: educationInstitution,
      degree_id: educationDegreeId,
      field: educationField,
      grade_type: educationGradeType,
      grade: educationGrade,
      start_date: educationStartDate,
      end_date: educationEndDate,
    };

    ApiService.createEducation(user?.token, data)

      .then((res) => {
        setIsloading(false);
        loadData();
        // Empty All
        setEducationInstitution("");
        setEducationDegreeId("");
        setEducationField("");
        setEducationGradeType("");
        setEducationGrade("");
        setEducationStartDate("");
        setEducationEndDate("");
        // Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
        setEducationErrors(Object.values(err.response.data.errors));
      });
  };
  // Exprince
  const [experienceJobPosition, setExperienceJobPosition] = useState("");
  const [experienceCompanyName, setExperienceCompanyName] = useState("");
  const [experienceCountryId, setExperienceCountryId] = useState(null);
  const [experienceStateId, setExperienceStateId] = useState(null);
  const [experienceCityId, setExperienceCityId] = useState(null);
  const [experienceCountriesList, setExperienceCountriesList] = useState([]);
  const [experienceStateList, setExperienceStateList] = useState([]);
  const [experienceCitiesList, setExperienceCitiesList] = useState([]);
  const [experienceJobPositionList, setExperiencejobPositionList] = useState(
    []
  );
  const [experienceType, setExperienceType] = useState("");
  const [experienceStartDate, setExperienceStartDate] = useState("");
  const [experienceEndDate, setExperienceEndDate] = useState("");
  const [experienceCompanyDesc, setExperienceCompanyDesc] = useState("");
  const [experienceJobDesc, setExperiencejobDesc] = useState("");

  useEffect(() => {
    ApiService.getCoverLetterSuggestData(user?.token)
      .then((res) => {
        let { countries } = res.data.data;
        setExperienceCountriesList(countries);
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        // setjobPositionList(res.data.data);
        const positions = res.data.data.map((item) => item.name);
        setExperiencejobPositionList(positions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setExperienceCountryId(1);
  }, [experienceCountriesList]);

  useEffect(() => {
    setExperienceStateId("");
  }, [experienceStateList]);

  useEffect(() => {
    setExperienceCityId("");
  }, [experienceCitiesList]);

  // useEffect(() => {
  //   if (experienceCountryId) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/states/show-states/${experienceCountryId}`
  //       )
  //       .then((res) => setExperienceStateList(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [experienceCountryId]);

  // useEffect(() => {
  //   if (experienceStateId) {
  //     axios
  //       .get(
  //         `https://backend.aiproresume.com/public/api/cities/show-cities/${experienceStateId}`
  //       )
  //       .then((res) => setExperienceCitiesList(res.data.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [experienceStateId]);

  const handleCreateExperience = (e) => {
    e.preventDefault();

    const data = {
      job_position: experienceJobPosition,
      company_name: experienceCompanyName,
      country_id: experienceCountryId,
      state: experienceStateId,
      city: experienceCityId,
      type: experienceType,
      start_date: experienceStartDate,
      end_date: experienceEndDate,
      company_description: experienceCompanyDesc,
      job_description: experienceJobDesc,
    };
    setIsloading(true);
    ApiService.createExperience(user?.token, data)
      .then((res) => {
        setIsloading(false);
        loadData();
        //
        setExperienceJobPosition("");
        setExperienceCompanyName("");
        setExperienceCountryId(1);
        setExperienceStateId("");
        setExperienceCityId("");
        setExperienceType("");
        setExperienceStartDate("");
        setExperienceEndDate("");
        setExperienceCompanyDesc("");
        setExperiencejobDesc("");
        //  Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        // setFormErr(err.response.data.errors);
        console.log(err);
      });
  };

  // Soft Skill
  const [softSkillName, setSoftSkillName] = useState("");
  const [softSkillIsExample, setSoftSkillIsExample] = useState(0);

  const handleCreateSoftSkills = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      name: softSkillName,
      is_example: softSkillIsExample,
    };

    ApiService.createSoftSkills(user?.token, data)
      .then((res) => {
        setIsloading(false);
        loadData();
        // Empty
        setSoftSkillName("");
        setSoftSkillIsExample(0);
        // Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  };

  // Tech Skills
  const [techSkillName, setTechSkillName] = useState("");
  const [techSkillIsExample, setTechSkillIsExample] = useState(0);

  const handleCreateTechSkills = (e) => {
    e.preventDefault();
    setIsloading(true);
    const data = {
      name: techSkillName,
      is_example: techSkillIsExample,
    };

    ApiService.createTechSkills(user?.token, data)
      .then((res) => {
        setIsloading(false);
        loadData();
        // Empty
        setTechSkillName("");
        setTechSkillIsExample(0);
        // Swal
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  };
  // Job Position
  const [jobPosition, setJobPosition] = useState({
    name: "",
    description: "",
  });

  const handleCreateBlog = (e) => {
    e.preventDefault();

    const data = {
      name: jobPosition.name,
      description: jobPosition.description,
    };

    setIsloading(true);
    ApiService.createJobPosition(user?.token, data)
      .then((res) => {
        setIsloading(false);

        setJobPosition({
          description: "",
          name: "",
        });
        loadData();
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        swal({
          title: "Error",
          text: err.response.data.message,
          icon: "warning",
          dangerMode: true,
        });
        console.log(err);
      });
  };
  // Function to get tomorrow's date
  const getTomorrowDate = () => {
    const nextDate = new Date(liveDate);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split("T")[0];
  };

  const handleSetTemplateId = (e) => {
    const temp_id = e.target.value;

    setResumeData((prev) => ({ ...prev, template_id: temp_id }));
  };

  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);

  // set All Cities
  const cityNameValue = experienceCityId;
  useEffect(() => {
    if (cityNameValue) {
      handleInputChange(cityNameValue);
    }
  }, [cityNameValue]);
  const handleInputChange = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueCityNames = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = citiesJson.filter((city) => {
        const cityName = city.name.toLowerCase();
        if (
          cityName.includes(value.toLowerCase()) &&
          !uniqueCityNames.has(cityName)
        ) {
          uniqueCityNames.add(cityName);
          return true;
        }
        return false;
      });

      setCities(filteredOptions);
    } else {
      setCities([]);
    }
  };

  // All States
  const stateNameValue = experienceStateId;
  useEffect(() => {
    if (stateNameValue) {
      handleInputState(stateNameValue);
    }
  }, [stateNameValue]);

  const handleInputState = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueStateName = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = StatesJson.filter((state) => {
        const stateName = state.name.toLowerCase();
        if (
          stateName.includes(value.toLowerCase()) &&
          !uniqueStateName.has(stateName)
        ) {
          uniqueStateName.add(stateName);
          return true;
        }
        return false;
      });

      setAllStates(filteredOptions);
    } else {
      setAllStates([]);
    }
  };
  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      {/*  */}
      {/*  */}
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="visible arrows tabs example"
            sx={{
              "& .MuiTabs-indicator": { display: "none" },
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
            indicatorColor="red"
          >
            <Tab label="Form" />
            <Tab label="Summary" />
            <Tab label="Certifacates" />
            <Tab label="Education" />
            <Tab label="Experience" />
            <Tab label="Job Position" />
            <Tab label="Soft Skill" />
            <Tab label="Technical Skill" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <form
            action="#"
            onSubmit={handleStepData}
            className="flex flex-col justify-between"
          >
            <div className="flex-1">
              {/* Summary */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label
                  htmlFor={"summary_id"}
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  Summary
                </label>
                <select
                  id={"summary"}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                  required={true}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      summary_id: e.target.value,
                    }))
                  }
                  value={resumeData.summary_id}
                >
                  <option value={""}>Select</option>
                  {summary_examples &&
                    summary_examples?.map((opt, idx) => {
                      return (
                        <option key={idx} value={opt.id}>
                          {opt.title}
                        </option>
                      );
                    })}
                </select>
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(1)}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Certificates */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label>Certificates</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedCertificates}
                  options={certificat}
                  onChange={(val) => setCertificatesData(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                />
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(2)}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Education */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label>Education</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedEducations}
                  options={educations}
                  onChange={(val) => setEducationsData(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                />
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(3)}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Experience */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label>Experience</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedExperince}
                  options={experience}
                  onChange={(val) => setExperinceData(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                />
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(4)}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label>Soft Skills</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedSoftSkills}
                  options={softSkills}
                  onChange={(val) => setSoftSkillsData(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                />
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(6)}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Technical Skills */}
              <div className="py-2 w-full flex flex-col gap-1">
                <label>Technical Skills</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  value={selectedTechnicalSkill}
                  options={technicalSkill}
                  onChange={(val) => setTechnicalSkillData(val)}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  required
                />
                <div>
                  <span className="text-muted text-sm">
                    if the list don't have the value then
                  </span>{" "}
                  <button
                    className="text-primary text-sm italic"
                    onClick={() => setValue(7)}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Hanlde Template details */}
              <div className="border p-2 rounded-md">
                <span className="text-lg font-semibold">Template Details</span>
                {/* template_name */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"template_name"}
                    isRequired={true}
                    label={"Template Name"}
                    onchange={(val) =>
                      setResumeData((prev) => ({ ...prev, template_name: val }))
                    }
                    value={resumeData.template_name}
                    placeholder={"Template Name"}
                  />
                </div>
                {/* categry */}
                <div>
                  <label
                    htmlFor={"category_id"}
                    className="border-[#9b9b9b] text-xs sm:text-base"
                  >
                    Template Category
                  </label>
                  <select
                    id={"category_id"}
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        category_id: e.target.value,
                      }))
                    }
                    value={resumeData.category_id}
                    isRequired={true}
                  >
                    <option value={""}>Select</option>
                    {categories &&
                      categories?.map((opt, index) => {
                        return (
                          <option key={index} value={opt.id}>
                            {opt.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {/* jobs dropdown */}
                <div className="py-2 w-full flex flex-col gap-2">
                  <label>Job Positions</label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={selectedJobPositions}
                    options={job_positions_opt}
                    onChange={(val) => setJobPositionsData(val)}
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                    required
                    menuPlacement="top"
                  />
                  <div>
                    <span className="text-muted text-sm">
                      if the list don't have the value then
                    </span>{" "}
                    <button
                      className="text-primary text-sm italic"
                      onClick={() => setValue(5)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {/* Template id */}
                <div>
                  <label
                    htmlFor={"template_id"}
                    className="border-[#9b9b9b] text-xs sm:text-base"
                  >
                    Template ID
                  </label>

                  <select
                    id={"template_id"}
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                    onChange={(e) => handleSetTemplateId(e)}
                    value={resumeData.template_id}
                    isRequired={true}
                  >
                    <option value={""}>Select</option>
                    {allTemplates?.map((temp, idx) => {
                      return (
                        <option key={idx} value={temp.id}>
                          {temp.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* image Preview */}
                <div className=" ">
                  <div className="py-2 w-full flex flex-col gap-2">
                    <label className="border-[#9b9b9b] text-xs sm:text-base">
                      Template Image
                    </label>
                    <div className="relative w-[400px] rounded-full">
                      {previewImageUpdate && (
                        <img
                          src={URL.createObjectURL(resumeData.preview_image)}
                          alt="img"
                          className={`w-full border  ${preview_image_error
                            ? "border-red-500"
                            : "border-transparent"
                            }`}
                        />
                      )}

                      {!previewImageUpdate && (
                        <img
                          src={global.imageUrl + resumeData.preview_image}
                          alt="img"
                          className={`w-full border  ${preview_image_error
                            ? "border-red-500"
                            : "border-transparent"
                            }`}
                        />
                      )}

                      <input
                        type="file"
                        onChange={handleTempImageChange}
                        className="w-0 h-0 hidden"
                        accept=".jpg,.png,.jpeg"
                        id="resumeTempImage"
                      />
                      <div
                        className="absolute bottom-1 right-1 cursor-pointer"
                        onClick={() =>
                          document.getElementById("resumeTempImage").click()
                        }
                      >
                        <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
                      </div>
                    </div>
                  </div>
                  {preview_image_error && (
                    <span className="text-red-500 text-sm">
                      Image is Required*
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ul className="list-disc ml-2 py-2">
              {mainFormErrors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>
            <div className="h-24 justify-end">
              <hr />
              {/* Create */}
              <div className="py-6 px-6 gap-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-white border-primary border-2 text-lg text-primary font-bold rounded-md px-8 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-8 py-2"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Summary */}
        <CustomTabPanel value={value} index={1}>
          <form action="#" onSubmit={handleCreateSummary}>
            <div className="">
              {/* Inputs Author */}
              <h1 className="text-2xl font-bold">Create Summary</h1>

              <div>
                <AllborderInputGroup
                  htmlFor={"title"}
                  isRequired={true}
                  label={"Title"}
                  onchange={(val) => setSummaryTitle(val)}
                  value={summarytitle}
                  placeholder={"Title"}
                />
              </div>

              <div className="py-4">
                <div>
                  <TextAreaGroup
                    cols={4}
                    rows={4}
                    resize={false}
                    htmlFor={"description"}
                    isRequired={true}
                    label={"Description"}
                    onchange={(val) => setSummaryDescription(val)}
                    value={summarydescription}
                    placeholder={"Description"}
                  />
                </div>
              </div>

              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Create Certifacates */}
        <CustomTabPanel value={value} index={2}>
          <form action="#" onSubmit={handleCreateCertificate}>
            <div className="h-full">
              {/* Inputs Author */}

              <h1 className="text-2xl font-bold">Create Certificate</h1>
              {/* Title */}
              <div>
                <AllborderInputGroup
                  htmlFor={"title"}
                  isRequired={true}
                  label={"Title"}
                  onchange={(val) => setCertificateTitle(val)}
                  value={certificateTitle}
                  placeholder={"Title"}
                />
              </div>
              {/* Description */}
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"description"}
                  isRequired={false}
                  label={"Description"}
                  onchange={(val) => setCertificateDescription(val)}
                  value={certificateDescription}
                  resize={false}
                  rows={4}
                  placeholder={"Description"}
                />
              </div>
              {/* institue */}
              <div>
                <AllborderInputGroup
                  htmlFor={"institute"}
                  isRequired={true}
                  label={"Institute"}
                  onchange={(val) => setCertificateInstitute(val)}
                  value={certificateInstitute}
                  placeholder={"Institute"}
                />
              </div>
              {/* Date */}
              <div>
                <AllborderInputGroup
                  htmlFor={"date"}
                  isRequired={true}
                  label={"Date"}
                  onchange={(val) => setCertificateDate(val)}
                  value={certificateDate}
                  placeholder={"Date"}
                  type={"date"}
                />
              </div>
              {/* Errors List */}
              <ul className="list-disc ml-2 py-2">
                {errors?.map((err) => (
                  <li className="text-red-500 text-sm">{err}</li>
                ))}
              </ul>
              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Education */}
        <CustomTabPanel value={value} index={3}>
          <form action="#" onSubmit={handleCreateEducation}>
            <div className=" h-full ">
              {/* Title */}
              <h1 className="text-2xl font-bold">Create Education</h1>
              {/* institute */}
              <div>
                <AllborderInputGroup
                  htmlFor={"institution"}
                  isRequired={true}
                  label={"Institution"}
                  onchange={(val) => setEducationInstitution(val)}
                  value={educationInstitution}
                  placeholder={"Institution"}
                />
              </div>
              {/* select degree */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  for={"degree_id"}
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  Select Degree
                </label>
                <select
                  id={"degree_id"}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                  required
                  onChange={(e) => setEducationDegreeId(e.target.value)}
                  value={educationDegreeId}
                >
                  <option value={null}>Select</option>
                  {educationDegreeDropdown?.map((opt, idx) => {
                    return (
                      <option key={idx} value={opt.id}>
                        {opt.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Feild */}
              <div>
                <AllborderInputGroup
                  htmlFor={"field"}
                  isRequired={true}
                  label={"Field"}
                  onchange={(val) => setEducationField(val)}
                  value={educationField}
                  placeholder={"Field"}
                />
              </div>
              {/* Grade Type */}
              <div>
                <SelectDropdown
                  htmlFor={"Grade Type"}
                  isRequired={true}
                  label={"Grade Type"}
                  options={["Grade", "CGPA", "Percentage"]}
                  value={educationGradeType}
                  handleOnChange={(val) => setEducationGradeType(val)}
                />
              </div>

              {/* Grade */}

              {educationGradeType === "CGPA" && (
                <div>
                  <AllborderInputGroup
                    htmlFor={"grade"}
                    isRequired={true}
                    label={"CGPA"}
                    onchange={(val) => {
                      // Parse the input value as a float number and limit it to 5.00
                      let cgpaValue = parseFloat(val);
                      cgpaValue = Math.min(cgpaValue, 5.0);

                      // Round off to two decimal places
                      cgpaValue = parseFloat(cgpaValue.toFixed(2));

                      // Update the state with the rounded CGPA value
                      setEducationGrade(cgpaValue.toString());
                    }}
                    value={educationGrade}
                    placeholder={"Enter CGPA (0.01-5.00)"}
                    type={"number"}
                    step={"0.01"}
                    min={"0.01"}
                    max={"5.00"}
                  />
                </div>
              )}
              {educationGradeType === "Percentage" && (
                <div>
                  <AllborderInputGroup
                    htmlFor={"grade"}
                    isRequired={true}
                    label={"Percentage"}
                    onchange={(val) => {
                      if (parseInt(val) <= 100) {
                        setEducationGrade(val);
                      }
                    }}
                    value={educationGrade}
                    placeholder={"Enter Percentage (0-100)"}
                    type={"number"}
                    step={"1"}
                    min={"0"}
                    max={"100"}
                  />
                </div>
              )}

              {educationGradeType === "Grade" && (
                <div>
                  <label>Grade</label>
                  <select
                    value={educationGrade}
                    onChange={(e) => setEducationGrade(e.target.value)}
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-lg"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="E+">E+</option>
                    <option value="E">E</option>
                  </select>
                </div>
              )}

              {/* Start Date */}
              {/* Start Date */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  htmlFor="start_date"
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setStartDateIsSelected(true);
                    setEducationStartDate(e.target.value);
                    setEducationEndDate(""); // Reset end date when changing start date
                  }}
                  max={liveDate.toISOString().split("T")[0]} // Start date can't be before live date
                  value={educationStartDate}
                />
              </div>

              {/* End Date */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  htmlFor="end_date"
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  End Date{" "}
                  <span className="text-xs italic">
                    (Select Start Date First)
                  </span>
                </label>
                <input
                  type="date"
                  disabled={!startDateIsSelected}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  value={educationEndDate}
                  min={educationStartDate ? getTomorrowDate() : ""}
                  onChange={(e) => setEducationEndDate(e.target.value)}
                />
              </div>
              {/* Errors List */}
              <ul className="list-disc ml-2 py-2">
                {educationErrors?.map((err) => (
                  <li className="text-red-500 text-sm">{err}</li>
                ))}
              </ul>
              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Experience */}
        <CustomTabPanel value={value} index={4}>
          <form action="#" onSubmit={handleCreateExperience}>
            <div className="h-full">
              <h1 className="text-2xl font-bold ">Create Experience</h1>
              {/* Job Position */}
              <div>
                <SelectDropdown
                  htmlFor={"job_position"}
                  isRequired={true}
                  label={"Job Position"}
                  options={experienceJobPositionList}
                  value={experienceJobPosition}
                  handleOnChange={(val) => setExperienceJobPosition(val)}
                />
              </div>
              {/* Compoany Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"company_name"}
                  isRequired={true}
                  label={"Company Name"}
                  onchange={(val) => setExperienceCompanyName(val)}
                  value={experienceCompanyName}
                  placeholder={"Company Name"}
                />
              </div>
              {/* Counrty Dropdown */}
              <div>
                <DropdownWithIdValue
                  htmlFor={"country_id"}
                  isRequired={true}
                  label={"Country"}
                  handleOnChange={(val) => setExperienceCountryId(val)}
                  value={experienceCountryId}
                  options={experienceCountriesList}
                />
              </div>
              {/* State Dropdown */}
              {/* <div>
                <DropdownWithIdValue
                  htmlFor={"state_id"}
                  isRequired={true}
                  label={"State"}
                  handleOnChange={(val) => setExperienceStateId(val)}
                  value={experienceStateId}
                  options={experienceStateList}
                />
              </div> */}
              {/* City Dropdown */}
              {/* <div>
                <DropdownWithIdValue
                  htmlFor={"city_id"}
                  isRequired={true}
                  label={"City"}
                  handleOnChange={(val) => setExperienceCityId(val)}
                  value={experienceCityId}
                  options={experienceCitiesList}
                />
              </div> */}

              {/* state id */}
              <div className="py-2 w-full flex flex-col gap-2 cus_field">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  States
                </label>
                <Autocomplete
                  freeSolo
                  id="states"
                  className="mt-2"
                  required={"required"}
                  disableClearable
                  value={experienceStateId}
                  options={allStates
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((state) => state.name)}
                  onInputChange={(e, value) => {
                    //setCoverLetterData("state", value);
                    setExperienceStateId(value);
                    handleInputState(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      autoComplete="on"
                      placeholder="State"
                      sx={{ height: 10 }}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </div>
              <div className="py-2 w-full flex flex-col gap-2 cus_field">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  City
                </label>
                <Autocomplete
                  freeSolo
                  id="city"
                  className="mt-2"
                  required={"required"}
                  disableClearable
                  value={experienceCityId}
                  options={cities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cities) => cities.name)}
                  onInputChange={(e, value) => {
                    //setCoverLetterData("state", value);
                    setExperienceCityId(value);
                    handleInputChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      autoComplete="on"
                      placeholder="City"
                      sx={{ height: 10 }}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </div>
              {/* Job Type */}
              <div>
                <SelectDropdown
                  htmlFor={"Job Type"}
                  isRequired={true}
                  label={"Job Type"}
                  options={["Remote", "OnSite", "Hybrid"]}
                  value={experienceType}
                  handleOnChange={(val) => setExperienceType(val)}
                />
              </div>
              {/* Start Date  */}
              {/* Start Date */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  htmlFor="start_date"
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setStartDateIsSelected(true);
                    setEducationStartDate(e.target.value);
                    setEducationEndDate(""); // Reset end date when changing start date
                  }}
                  max={liveDate.toISOString().split("T")[0]} // Start date can't be before live date
                  value={educationStartDate}
                />
              </div>

              {/* End Date */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label
                  htmlFor="end_date"
                  className="border-[#9b9b9b] text-xs sm:text-base"
                >
                  End Date{" "}
                  <span className="text-xs italic">
                    (Select Start Date First)
                  </span>
                </label>
                <input
                  type="date"
                  disabled={!startDateIsSelected}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
                  value={educationEndDate}
                  min={educationStartDate ? getTomorrowDate() : ""}
                  onChange={(e) => setEducationEndDate(e.target.value)}
                />
              </div>
              {/* Company */}
              <div>
                <TextAreaGroup
                  cols={4}
                  htmlFor={"company_decsription"}
                  isRequired={true}
                  label={"Company Description"}
                  onchange={(val) => setExperienceCompanyDesc(val)}
                  value={experienceCompanyDesc}
                  resize={false}
                  rows={4}
                />
                <div>
                  <TextAreaGroup
                    cols={4}
                    htmlFor={"job_description"}
                    isRequired={true}
                    label={"Job Description"}
                    onchange={(val) => setExperiencejobDesc(val)}
                    value={experienceJobDesc}
                    resize={false}
                    rows={4}
                  />
                </div>
              </div>
              <hr />
              {/* Upadte */}
              <div className="py-6 flex flex-col gap-2">
                {/* <ErrorsList errors={formErr} /> */}
                <button
                  type="submit"
                  className="bg-primary w-fit text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Job Position */}
        <CustomTabPanel value={value} index={5}>
          <form action="#" onSubmit={handleCreateBlog}>
            <div>
              {/* Blog Inputs */}
              <div className="">
                <h1 className="text-2xl font-bold">Create Job Position</h1>
                {/* Name */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"job_name"}
                    isRequired={true}
                    label={"Position"}
                    onchange={(val) =>
                      setJobPosition((Prev) => ({ ...Prev, name: val }))
                    }
                    value={jobPosition.name}
                    placeholder={"Enter Position"}
                  />
                </div>
                {/* short decription */}
                <div>
                  <TextAreaGroup
                    htmlFor={"position_description"}
                    isRequired={false}
                    label={"Description"}
                    onchange={(val) =>
                      setJobPosition((Prev) => ({ ...Prev, description: val }))
                    }
                    value={jobPosition.description}
                    placeholder={"Position Description"}
                    cols={4}
                    rows={4}
                    resize={true}
                  />
                </div>
              </div>
              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Soft Skill */}
        <CustomTabPanel value={value} index={6}>
          <form action="#" onSubmit={handleCreateSoftSkills}>
            <div className="">
              <h1 className="text-2xl font-bold">Create Soft Skills</h1>

              <div>
                <AllborderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setSoftSkillName(val)}
                  value={softSkillName}
                  placeholder={"Name"}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4 mt-2">
                <span>Example</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setSoftSkillIsExample(1);
                    } else {
                      setSoftSkillIsExample(0);
                    }
                  }}
                  status={softSkillIsExample}
                />
              </div>

              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        {/* Technical Skill */}
        <CustomTabPanel value={value} index={7}>
          <form action="#" onSubmit={handleCreateTechSkills}>
            <div className="">
              <h1 className="text-2xl font-bold">Create Technical Skill</h1>

              <div>
                <AllborderInputGroup
                  htmlFor={"name"}
                  isRequired={true}
                  label={"Name"}
                  onchange={(val) => setTechSkillName(val)}
                  value={techSkillName}
                  placeholder={"Name"}
                />
              </div>
              {/*  */}
              <div className="flex flex-col gap-2 mb-4 mt-2">
                <span>Example</span>
                <ToggleSwitch
                  ChangeStatus={(val) => {
                    if (val) {
                      setTechSkillIsExample(1);
                    } else {
                      setTechSkillIsExample(0);
                    }
                  }}
                  status={techSkillIsExample}
                />
              </div>
              <hr />
              {/* Upadte */}
              <div className="py-6">
                <button
                  type="submit"
                  className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </CustomTabPanel>
      </Box>
      {/*  */}
      {/*  */}
    </div>
  );
};

export default Summary;
