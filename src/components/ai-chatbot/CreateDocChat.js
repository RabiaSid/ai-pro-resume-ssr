import React from 'react'
import { MdNavigateNext } from "react-icons/md";
import bubblePoint from "../../assets/images/whiteBubbleLeft.webp"
import BubbleRightPoint from "../../assets/images/rightBubblePoint.webp"
import coverLetterImg from "../../assets/images/coverLetter.webp"
import createResumeLogo from "../../assets/images/ResumeCreate.webp"
import importResume from "../../assets/images/ImportResume.webp"
import { ApiService } from '../../services/ApiService';
import { updateChatBotResponse } from '../../redux-features/chatbot/chatBotSlice';
import { useDispatch } from 'react-redux';

const CreateDocChat = ({ sender, setIsLoadingChat }) => {

    const dispatch = useDispatch();
    const handleShowChatBotResponse = (key) => {
        setIsLoadingChat(true)
        ApiService.getChatBotContent(key).then((res) => {
            setIsLoadingChat(false);
            dispatch(updateChatBotResponse({
                dataResponse: res?.data?.data?.content,
                isDocResponse: true
            }));
        }).catch((err) => {
            setIsLoadingChat(false);
            console.log(err, "Error in response");
        })
    }

    return (
        <div className={`relative font-medium p-3 rounded-xl bg-[#F7FBFF]`}>
            <p className={`font-normal text-sm break-words text-[#192A3E]`}>Welcome! How can I assist you today? Please select an option below to get started.</p>
            <div className='flex flex-col gap-2 mt-2'>

                <div onClick={() => handleShowChatBotResponse('resume')} className='cursor-pointer shadow-custom-shadow px-2 flex items-center justify-between bg-white rounded-lg h-full'>
                    <div className='flex items-center gap-2'>
                        <div className="relative flex items-center justify-center h-[48px] w-[40px]">
                            <div className="p-4 rounded-lg bg-[#D3FFFC] ">
                            </div>
                            <img src={createResumeLogo} className="absolute h-[22px] text-[#19B2A6]" />
                        </div>
                        <span className='font-normal text-sm font-Lexend text-[#192A3E]'>Create Resume</span>
                    </div>
                    <MdNavigateNext className='text-2xl cursor-pointer text-[#19B2A6]' />
                </div>

                <div onClick={() => handleShowChatBotResponse('cover_letter')} className='cursor-pointer shadow-custom-shadow px-2 flex items-center justify-between bg-white rounded-lg h-full'>
                    <div className='flex items-center gap-2'>
                        <div className="relative flex items-center justify-center h-[48px] w-[40px]">
                            <div className="p-4 rounded-lg bg-[#E9F7FF] ">
                            </div>
                            <img src={coverLetterImg} className="absolute mx-auto text-center  h-[22px] text-[#0072B1]"
                            />
                        </div>
                        <span className='font-normal text-sm font-Lexend text-[#192A3E]'>Create Cover Letter</span>
                    </div>
                    <MdNavigateNext className='text-2xl cursor-pointer text-[#19B2A6]' />
                </div>

                <div onClick={() => handleShowChatBotResponse('parser')} className='cursor-pointer shadow-custom-shadow px-2 flex items-center justify-between bg-white rounded-lg h-full'>
                    <div className='flex items-center gap-2'>
                        <div className="relative flex items-center justify-center h-[48px] w-[40px]">
                            <div className="p-4 rounded-lg bg-[#ECF0FF] ">
                            </div>
                            <img src={importResume} className="absolute h-[22px] text-[#5F80F8]" />
                        </div>
                        <span className='font-normal text-sm font-Lexend text-[#192A3E]'>Import Resume</span>
                    </div>
                    <MdNavigateNext className='text-2xl cursor-pointer text-[#19B2A6]' />
                </div>

                {/* <div onClick={() => handleShowChatBotResponse('ats')} className='cursor-pointer shadow-custom-shadow px-2 flex items-center justify-between bg-white rounded-lg h-full'>
                    <div className='flex items-center gap-2'>
                        <div className="relative flex items-center justify-center h-[48px] w-[40px]">
                            <div className="p-4 rounded-lg bg-[#ECF0FF] ">
                            </div>
                            <img src={importResume} className="absolute h-[22px] text-[#5F80F8]" />
                        </div>
                        <span className='font-normal text-sm font-Lexend text-[#192A3E]'>ATS Checker</span>
                    </div>
                    <MdNavigateNext className='text-2xl cursor-pointer text-[#19B2A6]' />
                </div> */}

            </div>
            <img src={`${sender ? bubblePoint : BubbleRightPoint}`} alt="bubble point" className={`absolute h-[14px] z-10 w-[12px] ${sender ? "left-[-9px] top-[16px]" : "right-[-12px] top-[16px]"}`} />
        </div>
    )
}

export default CreateDocChat;



