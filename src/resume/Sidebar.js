import React from 'react';
import { BiLockOpenAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from '../services/Auth';

const Sidebar = ({ checkOpen, isOpen, postId, handleOpen, isLink }) => {
  const { user } = useAuth()
  //const user_name = global.getCookie("name");
  //const user_image = global.getCookie("user_image");
  const logins_email = global.getCookie('user_name');
  const profile_id = Cookies.get('profile_id');
  const doc_uuid = Cookies.get('doc_uuid');
  const page_uuid = useParams().uuid;
  const isExampleTrue = new URLSearchParams(window.location.search).get('example');
  const nameParts = user?.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  // const user_name = user?.name;
  // const user_image = user?.user_image;
  // var check_profile_id ='';
  // const profile_id=global.getCookie('profile_id');
  // if(profile_id){
  //   check_profile_id = '/'+profile_id;
  // }Number(doc_uuid)==''


  return (
    <section id='sidebar' className="bg-[#f4f2f3] hidden w-full  lg:w-[25%] xl:w-[20%] 2xl:w-[15%] lg:block sticky top-0  z-[9999] ">

      <div className="flex items-center justify-between flex-wrap">
        <div className='bg-[#0072b1] w-full font_1 text-md py-6 px-4'>
          {user?.image !== null ? (
            <img
              src={global.imageUrl + user?.image}
              alt="My Image"
              width={100}
              height={100}
              className="w-28 h-28 border-4 border-white rounded-full m-auto"
            />
          ) : (
            <span className="user-profile-image border-4 border-white rounded-full w-28 h-28 flex justify-center items-center text-4xl text-white bg-black m-auto">
              {firstNameInitial}
            </span>
          )}
          {/* <img src={user_image === '' || user_image === undefined || user_image === null ? testi_1 : global.imageUrl+'/'+user_image} alt="My Image" width={100} height={100} className='border-4 border-white rounded-full m-auto' /> */}
          <h1 className="text-sm text-white text-center mt-2">{user?.name}</h1>
        </div>
      </div>
      <a href={isExampleTrue === 'true' ? global.localPath + 'resume/header/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/header' : global.localPath + 'resume/header/' + doc_uuid}>
        <div className="flex items-center justify-between flex-wrap">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/header' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl'}>HEADER</div>
          </div>
        </div>
      </a>
      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/summary' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>SUMMARY <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/summary/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/summary' : global.localPath + 'resume/summary/' + profile_id}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/summary' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>SUMMARY</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/experience' || checkOpen === 'resume/experience-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>EXPERIENCE <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/experience/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/experience' : global.localPath + 'resume/experience-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/experience' || checkOpen === 'resume/experience-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>EXPERIENCE</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/education' || checkOpen === 'resume/education-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>EDUCATION <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/education/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/education' : global.localPath + 'resume/education-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/education' || checkOpen === 'resume/education-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>EDUCATION</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/technical-skills' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>TECHNICAL SKILLS <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/technical-skills/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/technical-skills' : global.localPath + 'resume/technical-skills/' + profile_id}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/technical-skills' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>TECHNICAL SKILLS</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/soft-skills' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>SOFT SKILLS <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/soft-skills/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/soft-skills' : global.localPath + 'resume/soft-skills/' + profile_id}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/soft-skills' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>SOFT SKILLS</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/certificates' || checkOpen === 'resume/certificates-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>CERTIFICATES <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={isExampleTrue === 'true' ? global.localPath + 'resume/certificates/' + page_uuid + "?example=true" : Number(doc_uuid) == '' ? global.localPath + 'resume/certificates' : global.localPath + 'resume/certificates-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/certificates' || checkOpen === 'resume/certificates-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>CERTIFICATES</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/honors_and_awards' || checkOpen === 'resume/honors-and-awards-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>HONORS AND AWARDS <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/honors_and_awards' : global.localPath + 'resume/honors-and-awards-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/honors_and_awards' || checkOpen === 'resume/honors-and-awards-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>HONORS AND AWARDS</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/languages' || checkOpen === 'resume/languages-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>LANGUAGES <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/languages' : global.localPath + 'resume/languages-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/languages' || checkOpen === 'resume/languages-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>LANGUAGES</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/custom-section' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>CUSTOM SECTION <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/custom-section' : global.localPath + 'resume/custom-section-details/'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/custom-section' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>CUSTOM SECTION</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/references' || checkOpen === 'resume/references-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>REFERENCES <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/references' : global.localPath + 'resume/references-details'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/references' || checkOpen === 'resume/references-details' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>REFERENCES</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className={checkOpen === 'resume/digital-signature' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>DIGITAL SIGNATURE <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/digital-signature' : global.localPath + 'resume/digital-signature/' + profile_id}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className={checkOpen === 'resume/digital-signature' ? 'bg-[#f4f2f3] text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start' : 'bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'}>DIGITAL SIGNATURE</div>
            </div>
          </div>
        </a>
      }

      {!profile_id ?
        <div className="flex items-center justify-between flex-wrap cursor-not-allowed">
          <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
            <div className='bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'>FINALIZE <BiLockOpenAlt size={20} /></div>
          </div>
        </div>
        :
        <a href={Number(doc_uuid) == '' ? global.localPath + 'resume/formatting' : global.localPath + 'resume/formatting'}>
          <div className="flex items-center justify-between flex-wrap">
            <div className='bg-[#0072b1] w-full font_3 text-md py-1 '>
              <div className='bg-[#0072b1] text-[#f4f2f3] hover:bg-[#f4f2f3] hover:text-[#00caa5] px-4 py-2 ml-4 rounded-l-3xl flex justify-between items-start'>FINALIZE</div>
            </div>
          </div>
        </a>
      }












      <div className="flex items-center justify-between flex-wrap">
        <div className='bg-[#0072b1] w-full font_1 text-md py-20 '>
        </div>
      </div>
    </section>

  )
}

export default Sidebar