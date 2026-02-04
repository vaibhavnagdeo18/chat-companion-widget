/**
 * Chatbot Widget Types
 * Defines all interfaces for the embeddable chatbot widget
 */

export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

export interface UserInfo {
  name: string;
  email: string;
  reason: string;
}

export type ConversationStep =
  | 'greeting'
  | 'faq_mode'
  | 'ask_project_type'
  | 'ask_name'
  | 'ask_email'
  | 'ask_reason'
  | 'collected';

export interface ConversationState {
  step: ConversationStep;
  userInfo: Partial<UserInfo>;
  isTyping: boolean;
}

// FAQ Data Structure
export interface FAQItem {
  keywords: string[];
  response: string;
}

// Widget Configuration
export interface ChatWidgetConfig {
  botName?: string;
  welcomeMessage?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left';
}
