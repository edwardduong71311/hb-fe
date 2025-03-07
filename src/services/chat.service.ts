import { ChatResponse } from "@/types/chat.type";

export const chatWithBot = (text: string) => {
  const eventSource = new EventSource(
    process.env.NEXT_PUBLIC_CHAT_SERVER + "/chats?text=" + text
  );

  eventSource.onmessage = (event: MessageEvent<string>) => {
    try {
      const data: ChatResponse = JSON.parse(event.data);

      if (data.done) {
        eventSource.close();
      }

      console.log(data);
    } catch (error) {
      console.error("SSE onmessage", error);
    }
  };

  eventSource.onerror = () => {
    console.error("SSE onerror");
    eventSource.close();
  };
};
