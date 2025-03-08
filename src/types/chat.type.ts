export type ChatResponse = {
  text: string;
};

export enum ChatMessageType {
  USER = "USER",
  BOT = "BOT",
}

export interface ConversationState {
  loading: boolean;
  conversation: ChatMessage[];
}

export interface ChatMessage {
  type: ChatMessageType;
  text: string;
}
