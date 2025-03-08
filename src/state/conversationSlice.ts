import { ChatMessageType, ConversationState } from "@/types/chat.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ConversationState = {
  loading: false,
  conversation: [],
};

export const conversationSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    botAnswerReceived: (state, action: PayloadAction<string>) => {
      if (
        state.conversation.length === 0 ||
        state.conversation[state.conversation.length - 1].type ===
          ChatMessageType.USER
      ) {
        state.conversation.push({
          type: ChatMessageType.BOT,
          text: "",
        });
      }

      state.conversation[state.conversation.length - 1].text += action.payload;
    },
    addPatientMessage: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.conversation.push({
        type: ChatMessageType.USER,
        text: action.payload,
      });
    },
    botFinished: (state) => {
      state.loading = false;
    },
  },
});

export const { addPatientMessage, botAnswerReceived, botFinished } =
  conversationSlice.actions;
export default conversationSlice.reducer;
