/**
 * ChatMessages Component
 * Scrollable container for all chat messages
 * 
 * UX Decisions:
 * - Auto-scrolls to latest message
 * - Custom styled scrollbar
 * - Consistent spacing between messages
 * - Groups messages by sender for visual clarity
 */

import React, { useRef, useEffect } from 'react';
import type { Message, QuickReply } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickReplies from './QuickReplies';

interface ChatMessagesProps {
  messages: Message[];
  quickReplies: QuickReply[];
  isTyping: boolean;
  onQuickReply: (reply: QuickReply) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  quickReplies,
  isTyping,
  onQuickReply,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 bg-chat-bg chat-scrollbar"
    >
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            showTimestamp={true}
          />
        ))}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        {/* Quick replies */}
        {!isTyping && quickReplies.length > 0 && (
          <QuickReplies
            replies={quickReplies}
            onSelect={onQuickReply}
            disabled={isTyping}
          />
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
