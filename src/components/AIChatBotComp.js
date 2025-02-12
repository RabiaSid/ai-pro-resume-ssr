import React, { useState } from "react";
import AIChatBot from "./ai-chatbot/AIChatBot";

const AiChatBotIcon = "/images/robot.webp";

export default function AiChatBotComp() {
    const [open, setOpen] = useState(false);
    return (
        <>
            {open && <AIChatBot open={open} setOpen={setOpen} />}
            <div className="z-20 chatBot block sm:hidden cursor-pointer">
                <span onClick={() => setOpen(!open)}>
                    <img src={AiChatBotIcon} alt="whatsapp" width={300} height={300} />
                </span>
            </div>
        </>
    );
}
