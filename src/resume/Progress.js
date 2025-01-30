import React, { useEffect,useState } from 'react';
import { BiMenuAltLeft,BiCaretDown,BiUserCircle,BiSolidUser,BiSolidBell } from "react-icons/bi";

import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import $ from 'jquery';
import axios from "axios";
function Progress() {

  const is_edit = Cookies.get('is_edit');
  const res_per_header = Cookies.get('res_per_header');
  const res_per_summary = Cookies.get('res_per_summary');
  const res_per_experience = Cookies.get('res_per_experience');
  const res_per_education = Cookies.get('res_per_education');
  const res_per_technical_skills = Cookies.get('res_per_technical_skills');
  const res_per_soft_skills = Cookies.get('res_per_soft_skills');
  const res_per_certificate = Cookies.get('res_per_certificate');
  const res_per_awards = Cookies.get('res_per_awards');

  var total_progress = Number(res_per_header) + 
  Number(res_per_summary) + Number(res_per_experience) 
  + Number(res_per_education) + Number(res_per_technical_skills) 
  + Number(res_per_soft_skills) + Number(res_per_certificate) 
  + Number(res_per_awards);
    
    
  return (
    <> 
    {Number(is_edit) === 0 ?
      <>
      <h1 className='w-full font_1 text-slate-900 text-2xl mt-32'>YOUR TOTAL RESUME MAKING PROGRESS</h1>
      <div className="w-full bg-gray-300 rounded-full mt-1">
        <div className="bg-[#00caa5]  text-blue-100 p-2 leading-none rounded-full" style={{'width':total_progress+'%'}}></div>
      </div>
      <h1 className='w-full font_1 text-[#0072b1] text-xl text-right'>{total_progress}% Complete</h1>
      </>
    : 
    
    <div className='h-[100px]'></div>

    }
      
    </>
  )
}

export default Progress
