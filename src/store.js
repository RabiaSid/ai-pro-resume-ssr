import { configureStore } from "@reduxjs/toolkit";
import chatBotReducer from "./redux-features/chatbot/chatBotSlice";

export const store = configureStore({
    reducer: {
        chatbot: chatBotReducer,
    },
});