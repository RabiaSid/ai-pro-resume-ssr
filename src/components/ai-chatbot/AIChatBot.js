import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import AiChatBotIcon from "../../assets/images/robot.webp";
import { ImCross } from "react-icons/im";
import sendQuestion from "../../assets/images/Vector (1).webp";
import bubblePoint from "../../assets/images/whiteBubbleLeft.webp";
import BubbleRightPoint from "../../assets/images/rightBubblePoint.webp";
import userAvatar from "../../assets/images/Avatar Photo.webp";
import userAvatarInner from "../../assets/images/userAvataaar.webp";
import onlineDot from "../../assets/images/Connect.webp";
import { useEffect, useRef, useState } from "react";
import CreateDocChat from "./CreateDocChat";
import { useSelector } from "react-redux";
import moment from "moment";
import chatLoader from "../../assets/images/chatLoader5.gif";
import { ApiService } from "../../services/ApiService";
import { useDispatch } from "react-redux";
import { updateChatBotResponse } from "../../redux-features/chatbot/chatBotSlice";

const AIChatBot = ({ open, setOpen }) => {
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { dataResponse, isDocResponse, lastUpdated } = useSelector(
    (state) => state.chatbot
  );
  const [addNewMsg, setAddNewMsg] = useState([]);
  const [msgText, setMsgText] = useState("");
  const [isDisabled, setIsDisabled] = useState();
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [modalHeight, setModalHeight] = useState(false)

  const handleSendMessage = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          top: 0,
        });
      }
    }, 100);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMsgChange = (e) => {
    const value = e.target.value;
    setMsgText(value);
  };
  const fetchAnswer = () => {
    setIsLoadingChat(true);
    ApiService.getChatBotContentAnswers(msgText)
      .then((res) => {
        setIsLoadingChat(false);
        console.log(res, "====>ressss");
        if (res?.status === 200) {
          dispatch(
            updateChatBotResponse({
              dataResponse: res.data.Answer,
              isDocResponse: true,
            })
          );
        }
      })
      .catch((err) => {
        setIsLoadingChat(false);
        setIsDisabled(false);
        console.log(err, "=====>error");
      });
  };
  const handleSendMsg = () => {
    if (msgText.trim() !== "") {
      setIsDisabled(true);
      setAddNewMsg([
        ...addNewMsg,
        {
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          text: msgText,
          sender: false,
        },
      ]);
      handleSendMessage();
      setMsgText("");
      fetchAnswer();
    }
  };
  useEffect(() => {
    const timestamp = Date.now();
    const formattedTime = moment(timestamp).format("hh:mm a");
    const messages = [
      { id: 1, text: "Hi there!", time: formattedTime, sender: true },
      { id: 2, text: "Hello!", time: formattedTime, sender: true },
    ];
    setAddNewMsg(messages);
  }, []);

  useEffect(() => {
    const timestamp = Date.now();
    const formattedTime = moment(timestamp).format("hh:mm a");
    if (dataResponse) {
      setIsDisabled(false);
      setAddNewMsg((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          text: dataResponse,
          time: formattedTime,
          sender: isDocResponse,
        },
      ]);
    }
    setIsDisabled(false);
    handleSendMessage();
  }, [dataResponse, lastUpdated]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 700) {
        setModalHeight(true);
        console.log("++++++++++");
      } else {
        setModalHeight(false);
        console.log("----------");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <Modal
      disableScrollLock

      hideBackdrop
      onClose={handleClose}
      className="z-0"
      open={open}
      sx={{
        pointerEvents: "none",
      }}
    >
      <Box
        className={`chatBotScreenHide z-50 h-full ${modalHeight ? "md:h-[500px]" : "md:h-[650px]"} w-full md:w-[375px] bottom-0 right-0 md:right-24 md:bottom-[30px] fixed mx-auto bg-white rounded-[25px]`}
        sx={{
          outline: "none",
          boxShadow: "0px 0px 10px 0px #00000040",
          pointerEvents: "auto",
        }}
      >
        <div className={` ${modalHeight ? "h-[90px]" : "h-[100px]"} rounded-t-[25px] mb-5  absolute w-full top-0 bg-[#F7F8FB] overflow-hidden`}>
          <div className="flex px-5 items-center justify-between h-full">
            <div className=" flex items-center gap-2">
              <div className="relative">
                <img
                  src={AiChatBotIcon}
                  alt="ai chatBot image"
                  className="animate-pulse"
                />
                <img
                  src={onlineDot}
                  alt="show online"
                  className="absolute right-[-3px] top-1 animate-pulse"
                />
              </div>
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <ImCross onClick={handleClose} className="text-lg cursor-pointer" />
          </div>
        </div>

        <div
          style={{ overflowY: "scroll" }}
          className={`${modalHeight ? "top-[90px]" : "top-[100px]"} absolute w-full h-[75%] bg-blue-200 flex flex-col gap-3 p-4`}
        >
          <>
            {addNewMsg.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex items-start ${msg.sender ? "justify-start" : "justify-end"
                  }`}
              >
                {msg.sender && (
                  <img
                    src={AiChatBotIcon}
                    alt="ai chatBot image"
                    className="h-[48px] w-[48px] mr-1"
                  />
                )}
                <div
                  className={`flex max-w-[80%] flex-col ${msg.sender ? "items-start" : "items-end"
                    }`}
                >
                  {index === 1 && msg.sender ? (
                    <CreateDocChat
                      sender={msg.sender}
                      setIsLoadingChat={setIsLoadingChat}
                    />
                  ) : (
                    <div
                      ref={chatContainerRef}
                      className={`relative font-medium min-w-[95%] max-w-[100%] p-3 rounded-xl  ${msg.sender ? "bg-[#F7FBFF]" : " bg-[#19B2A6]"
                        }`}
                    >
                      <div
                        className={`font-normal text-sm break-words ${msg.sender ? "text-black" : "text-white"
                          }`}
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />

                      <img
                        src={`${msg.sender ? bubblePoint : BubbleRightPoint}`}
                        alt="bubble point"
                        className={`absolute h-[14px] z-10 w-[12px] ${msg.sender
                          ? "left-[-9px] top-[16px]"
                          : "right-[-12px] top-[16px]"
                          }`}
                      />
                    </div>
                  )}
                  <p className="font-normal text-[10px] mt-1">{msg.time}</p>
                </div>
                {!msg.sender && (
                  <div className="relative flex items-center justify-center h-[48px] w-[48px] ml-2">
                    <img
                      src={userAvatar}
                      alt="user avatar"
                      className="h-full w-full"
                    />
                    <img
                      src={userAvatarInner}
                      alt="user avatar inner"
                      className="absolute h-[22px] w-[22px]"
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        </div>

        <div className={`border z-[999] flex items-center justify-center rounded-b-[25px] m-auto absolute w-full bg-white ${modalHeight ? "-bottom-4" : "bottom-0"}  overflow-hidden py-3`}>
          <div className="border-[#EBF5FF] rounded-full border flex items-center gap-4 px-4 w-[90%] py-3 ">
            <input
              value={msgText}
              onChange={handleMsgChange}
              placeholder={"Ask Something..."}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isDisabled) {
                  handleSendMsg();
                }
              }}
              className="relative w-[90%] focus-visible:outline-none"
            />
            <button
              disabled={isDisabled}
              className={`text-lg cursor-pointer ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handleSendMsg}
            >
              <img src={sendQuestion} alt="Send Message" />
            </button>
            <div
              style={{
                position: 'fixed',
                width: "40px", height: "40px",
                marginBottom: '95px'
              }}
            >
              {isLoadingChat && <img src={chatLoader} alt="ai chatBot image" />}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AIChatBot;
