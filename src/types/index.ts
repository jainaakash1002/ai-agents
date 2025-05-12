export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

export type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  prompt: string;
};

export type AIRole = {
  id: string;
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
};

export type Model = 'gemini-2.0-flash-lite';