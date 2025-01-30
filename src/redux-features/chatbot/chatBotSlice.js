import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataResponse: null,
    isDocResponse: false,
    lastUpdated: null,

};

export const chatBotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        updateChatBotResponse: (state, action) => {
            const { dataResponse, isDocResponse } = action.payload;
            state.dataResponse = dataResponse;
            state.isDocResponse = isDocResponse;
            state.lastUpdated = Date.now();
        },
    },
});

export const { updateChatBotResponse } = chatBotSlice.actions;
export default chatBotSlice.reducer;
