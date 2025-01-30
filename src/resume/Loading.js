import React, { useEffect, useState } from 'react';
import temp from "../assets/images/temp.webp";
import Footer from "./Footer";
import Progress from "./Progress";
import $ from 'jquery';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCheck } from 'react-icons/bi';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import swal from 'sweetalert'

const Header = ({ isOpen }) => {

  const [our_settings, set_our_settings] = useState([]);
  const [our_settings_random_blogs, set_our_settings_random_blogs] = useState([]);

  var token = global.getCookie('token');



  useEffect(() => {

    Cookies.remove('profile_id');
    Cookies.set('is_edit', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_header', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_summary', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_experience', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_education', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_technical_skills', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_soft_skills', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_certificate', 0, { expires: 1 }); // Expires in 1 day
    Cookies.set('res_per_awards', 0, { expires: 1 }); // Expires in 1 day

    axios.get(global.baseurl + '/our-settings')
      .then(response => {
        set_our_settings(response.data.data.settings);
        set_our_settings_random_blogs(response.data.data.randomBlogs);
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(function () {
      $('#load_1').fadeIn(300);
      $('#load_1').css('display', 'flex');
    }, 1000);
    setTimeout(function () {
      $('#load_2').fadeIn(300);
      $('#load_2').css('display', 'flex');
    }, 1700);
    setTimeout(function () {
      $('#load_3').fadeIn(300);
      $('#load_3').css('display', 'flex');
    }, 2500);
    setTimeout(function () {
      $('#load_4').fadeIn(300);
      $('#load_4').css('display', 'flex');
    }, 3200);
    setTimeout(function () {
      window.location.href = global.localPath + "resume/choose-template";
    }, 3500);

  }, []);






  return (
    <section className=''>

      <div id='main_contents' className='lg:w-[100%] lg:ml-[0%]'>
        <section className='flex justify-between items-start lg:w-[90%] m-auto flex-wrap'>

          <div className='flex justify-between items-start lg:w-[550px] m-auto flex-wrap mt-[10%] p-4'>
            <img src={global.imageUrl + our_settings.header_logo} alt="My Image" width={150} height={40} className='m-auto py-2' />

            <h1 className='font_1 text-slate-900 text-4xl mt-8 w-full text-center animate-pulse'>RESUME LOADING...</h1>
            <h1 id='load_1' className='hidden font_1 text-slate-900 text-md md:text-2xl mt-8 w-full justify-start items-center'><BiCheck className='bg-[#0072b1] text-white text-lg md:text-2xl rounded-md mr-2' /> 10+ PROFESSIONAL RESUME DESIGNS</h1>
            <h1 id='load_2' className='hidden font_1 text-slate-900 text-md md:text-2xl mt-8 w-full justify-start items-center'><BiCheck className='bg-[#0072b1] text-white text-lg md:text-2xl rounded-md mr-2' /> 1000+ PRE-WRITTEN PHRASES</h1>
            <h1 id='load_3' className='hidden font_1 text-slate-900 text-md md:text-2xl mt-8 w-full justify-start items-center'><BiCheck className='bg-[#0072b1] text-white text-lg md:text-2xl rounded-md mr-2' /> 15,00+ JOB TITLES</h1>
            <h1 id='load_4' className='hidden font_1 text-slate-900 text-md md:text-2xl mt-8 w-full justify-start items-center'><BiCheck className='bg-[#0072b1] text-white text-lg md:text-2xl rounded-md mr-2' /> 15 TEMPLATE COLOR OPTIONS</h1>
          </div>

        </section>
      </div>

    </section>
  )
}

export default Header