import { botAnswerReceived, botFinished } from "@/state/conversationSlice";
import { ChatResponse } from "@/types/chat.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface StreamAnswerParams {
  id: string;
  text: string;
}

export const streamAnswer = createAsyncThunk(
  "streamAnswer",
  async ({ id, text }: StreamAnswerParams, { dispatch, rejectWithValue }) => {
    try {
      const eventSource = new EventSource(
        process.env.NEXT_PUBLIC_CHAT_SERVER +
          `/chats/${id}?text=${encodeURIComponent(text)}`
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

export const getConversationId = createAsyncThunk(
  "getConversationId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CHAT_SERVER + "/chats"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversation id");
      }

      return await response.text();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
