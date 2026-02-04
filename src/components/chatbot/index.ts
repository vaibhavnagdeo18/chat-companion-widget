/**
 * Chatbot Widget Exports
 * 
 * This module exports all components needed for the embeddable chatbot.
 * For simple usage, just import ChatWidget:
 * 
 *   import ChatWidget from '@/components/chatbot';
 * 
 * For custom implementations, individual components are also available.
 */

// Main widget component
export { default as ChatWidget } from './ChatWidget';
export { default } from './ChatWidget';

// Individual components (for custom implementations)
export { default as ChatButton } from './ChatButton';
export { default as ChatWindow } from './ChatWindow';
export { default as ChatHeader } from './ChatHeader';
export { default as ChatMessages } from './ChatMessages';
export { default as ChatInput } from './ChatInput';
export { default as MessageBubble } from './MessageBubble';
export { default as QuickReplies } from './QuickReplies';
export { default as TypingIndicator } from './TypingIndicator';

// Hook for custom logic
export { useChatbot } from './useChatbot';

// Types
export type {
  Message,
  QuickReply,
  UserInfo,
  ConversationState,
  ConversationStep,
  ChatWidgetConfig,
  MessageSender,
  FAQItem,
} from './types';

// Constants (for customization)
export {
  BOT_NAME,
  WELCOME_MESSAGE,
  FAQ_RESPONSES,
  INITIAL_QUICK_REPLIES,
} from './constants';
