import React, { useEffect, useState } from "react";
import Templates_1 from "./templates/Templates_1";
import DummyTemplates_1 from "./templates/dummy/Templates_1";
import Templates_2 from "./templates/Templates_2";
import DummyTemplates_2 from "./templates/dummy/Templates_2";
import Templates_3 from "./templates/Templates_3";
import DummyTemplates_3 from "./templates/dummy/Templates_3";
import Templates_4 from "./templates/Templates_4";
import DummyTemplates_4 from "./templates/dummy/Templates_4";
import Templates_5 from "./templates/Templates_5";
import DummyTemplates_5 from "./templates/dummy/Templates_5";
import Templates_6 from "./templates/Templates_6";
import DummyTemplates_6 from "./templates/dummy/Templates_6";
import Templates_7 from "./templates/Templates_7";
import DummyTemplates_7 from "./templates/dummy/Templates_7";
import Templates_8 from "./templates/Templates_8";
import DummyTemplates_8 from "./templates/dummy/Templates_8";
import Templates_9 from "./templates/Templates_9";
import DummyTemplates_9 from "./templates/dummy/Templates_9";
import Templates_10 from "./templates/Templates_10";
import DummyTemplates_10 from "./templates/dummy/Templates_10";
import Templates_11 from "./templates/Templates_11";
import DummyTemplates_11 from "./templates/dummy/Templates_11";
import Templates_12 from "./templates/Templates_12";
import DummyTemplates_12 from "./templates/dummy/Templates_12";
import Templates_13 from "./templates/Templates_13";
import DummyTemplates_13 from "./templates/dummy/Templates_13";
import Progress from "./Progress";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCamera } from "react-icons/bi";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const Header = (props) => {
  const page_uuid = useParams().uuid;
  const [personal_info, setpersonal_info] = useState({});
  var username = global.getCookie("user_name");
  // console.log(props.zoom);
  const [my_resumes, set_my_resumes] = useState([]);

  useEffect(() => {
    const token = global.getCookie("token");

    const headers = {
      Authorization: "Bearer " + token,
    };

    axios
      .get(global.baseurl + "/show-resume-templates", { headers })
      .then((data) => {
        if (data) {
          set_my_resumes(data.data.data);
          // console.log(data.data.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {my_resumes.map((my_resumes, index_my_resumes) => (
        <div key={index_my_resumes}>
          {props.temp_id === my_resumes.id &&
          Number(index_my_resumes + 1) === 1 &&
          props.dummy === 0 ? (
            <Templates_1
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 1 &&
            props.dummy === 1 ? (
            <DummyTemplates_1
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 2 &&
            props.dummy === 0 ? (
            <Templates_2
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 2 &&
            props.dummy === 1 ? (
            <DummyTemplates_2
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 3 &&
            props.dummy === 0 ? (
            <Templates_3
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 3 &&
            props.dummy === 1 ? (
            <DummyTemplates_3
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 4 &&
            props.dummy === 0 ? (
            <Templates_4
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 4 &&
            props.dummy === 1 ? (
            <DummyTemplates_4
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 5 &&
            props.dummy === 0 ? (
            <Templates_5
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 5 &&
            props.dummy === 1 ? (
            <DummyTemplates_5
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 6 &&
            props.dummy === 0 ? (
            <Templates_6
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 6 &&
            props.dummy === 1 ? (
            <DummyTemplates_6
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 7 &&
            props.dummy === 0 ? (
            <Templates_7
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 7 &&
            props.dummy === 1 ? (
            <DummyTemplates_7
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 8 &&
            props.dummy === 0 ? (
            <Templates_8
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 8 &&
            props.dummy === 1 ? (
            <DummyTemplates_8
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 9 &&
            props.dummy === 0 ? (
            <Templates_9
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 9 &&
            props.dummy === 1 ? (
            <DummyTemplates_9
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 10 &&
            props.dummy === 0 ? (
            <Templates_11
              doc_id={props.doc_id}
              zoom={props.zoom}
              uuid={props.uuid}
              pen_color={props.pen_color}
              heading_font_size={props.heading_font_size}
              paragraph_font_size={props.paragraph_font_size}
              heading_font_style={props.heading_font_style}
              paragraph_font_style={props.paragraph_font_style}
              top_bottom_margins={props.top_bottom_margins}
              side_margins={props.side_margins}
              section_spacing={props.section_spacing}
              paragraph_spacing={props.paragraph_spacing}
              my_page={props.my_page}
              is_print={props.is_print}
              runtime_first_name={props.runtime_first_name}
              runtime_middle_name={props.runtime_middle_name}
              runtime_last_name={props.runtime_last_name}
              runtime_email_address={props.runtime_email_address}
              runtime_phone_number={props.runtime_phone_number}
              runtime_contact_number={props.runtime_contact_number}
              runtime_street_address={props.runtime_street_address}
              runtime_linkedin={props.runtime_linkedin}
              runtime_website={props.runtime_website}
              runtime_postal_code={props.runtime_postal_code}
              runtime_city_id={props.runtime_city_id}
              runtime_state_id={props.runtime_state_id}
              runtime_country_id={props.runtime_country_id}
              formatting={props.formatting}
            />
          ) : props.temp_id === my_resumes.id &&
            Number(index_my_resumes + 1) === 10 &&
            props.dummy === 1 ? (
            <DummyTemplates_11
              doc_id={props.doc_id}
              zoom={props.zoom}
              my_page={props.my_page}
            />
          ) : (
            ""
          )}
        </div>
      ))}

      {/* {
    props.temp_id === 1 && props.dummy === 0
    ? 
    <Templates_1 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}
    
    /> 
    :
    props.temp_id === 1 && props.dummy === 1
    ? 
    <DummyTemplates_1 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 2 && props.dummy === 0
    ? 
    <Templates_2 doc_id={props.doc_id} zoom={props.zoom}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 2 && props.dummy === 1
    ? 
    <DummyTemplates_2 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 3 && props.dummy === 0
    ? 
    <Templates_3 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 3 && props.dummy === 1
    ? 
    <DummyTemplates_3 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 4 && props.dummy === 0
    ? 
    <Templates_4 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 4 && props.dummy === 1
    ? 
    <DummyTemplates_4 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 5 && props.dummy === 0
    ? 
    <Templates_5 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 5 && props.dummy === 1
    ? 
    <DummyTemplates_5 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 6 && props.dummy === 0
    ? 
    <Templates_6 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 6 && props.dummy === 1
    ? 
    <DummyTemplates_6 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 7 && props.dummy === 0
    ? 
    <Templates_7 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 7 && props.dummy === 1
    ? 
    <DummyTemplates_7 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 8 && props.dummy === 0
    ? 
    <Templates_8 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 8 && props.dummy === 1
    ? 
    <DummyTemplates_8 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 9 && props.dummy === 0
    ? 
    <Templates_9 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 9 && props.dummy === 1
    ? 
    <DummyTemplates_9 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    //TEMPLATE CHANGE
    props.temp_id === 10 && props.dummy === 0
    ? 
    <Templates_10 doc_id={props.doc_id} zoom={props.zoom} uuid={props.uuid}
    pen_color={props.pen_color}
    heading_font_size={props.heading_font_size}
    paragraph_font_size={props.paragraph_font_size}
    heading_font_style={props.heading_font_style}
    paragraph_font_style={props.paragraph_font_style}
    top_bottom_margins={props.top_bottom_margins}
    side_margins={props.side_margins}
    section_spacing={props.section_spacing}
    paragraph_spacing={props.paragraph_spacing}

    runtime_first_name={props.runtime_first_name}
    runtime_middle_name={props.runtime_middle_name}
    runtime_last_name={props.runtime_last_name}
    runtime_email_address={props.runtime_email_address}
    runtime_phone_number={props.runtime_phone_number}
    runtime_contact_number={props.runtime_contact_number}
    runtime_street_address={props.runtime_street_address}
    runtime_linkedin={props.runtime_linkedin}
    runtime_website={props.runtime_website}
    runtime_postal_code={props.runtime_postal_code}
    runtime_city_id={props.runtime_city_id}
    runtime_state_id={props.runtime_state_id}
    runtime_country_id={props.runtime_country_id}
    formatting={props.formatting}/> 
    :
    props.temp_id === 10 && props.dummy === 1
    ? 
    <DummyTemplates_10 doc_id={props.doc_id} zoom={props.zoom}/> 
    :
    ''
    } */}
    </>
  );
};

export default Header;
