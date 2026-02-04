/**
 * ChatWindow Component
 * Main chat interface container
 * 
 * UX Decisions:
 * - Fixed size on desktop, full-screen on mobile
 * - Smooth open/close animations
 * - Clean shadow for depth
 * - Organized into header, messages, and input sections
 */

import React, { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatbot } from './useChatbot';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, isClosing }) => {
  const {
    messages,
    quickReplies,
    isTyping,
    initializeChat,
    processUserInput,
    handleQuickReply,
  } = useChatbot();

  // Initialize chat when window opens
  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen, initializeChat]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed z-50
        w-full h-full sm:w-[360px] sm:h-[520px]
        bottom-0 right-0 sm:bottom-24 sm:right-6
        flex flex-col
        bg-card rounded-none sm:rounded-2xl
        shadow-chat overflow-hidden
        transition-all duration-200 ease-out
        ${isClosing ? 'animate-chat-window-exit' : 'animate-chat-window-enter'}
      `}
      role="dialog"
      aria-label="Chat window"
      aria-modal="true"
    >
      {/* Header */}
      <ChatHeader onClose={onClose} />
      
      {/* Messages Area */}
      <ChatMessages
        messages={messages}
        quickReplies={quickReplies}
        isTyping={isTyping}
        onQuickReply={handleQuickReply}
      />
      
      {/* Input Area */}
      <ChatInput
        onSend={processUserInput}
        disabled={isTyping}
        placeholder="Type your message..."
      />
    </div>
  );
};

export default ChatWindow;
