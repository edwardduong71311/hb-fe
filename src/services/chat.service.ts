import { botAnswerReceived, botFinished } from "@/state/conversationSlice";
import { ChatResponse } from "@/types/chat.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const streamAnswer = createAsyncThunk(
  "streamAnswer",
  async (text: string, { dispatch, rejectWithValue }) => {
    try {
      const eventSource = new EventSource(
        process.env.NEXT_PUBLIC_CHAT_SERVER +
          "/chats?text=" +
          encodeURIComponent(text)
      );

      eventSource.onmessage = (event: MessageEvent<string>) => {
        try {
          const data: ChatResponse = JSON.parse(event.data);
          dispatch(botAnswerReceived(data.text));
        } catch (error) {
          eventSource.close();
          dispatch(botFinished());
        }
      };

      eventSource.onerror = (error) => {
        eventSource.close();
        dispatch(botFinished());
        return rejectWithValue("SSE connection failed");
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
