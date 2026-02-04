/**
 * MessageBubble Component
 * Renders individual chat messages with proper styling for user/bot
 * 
 * UX Decisions:
 * - User messages align right with primary color
 * - Bot messages align left with neutral background
 * - Rounded corners with tail on the appropriate side
 * - Supports markdown-like formatting (bold with **)
 */

import React from 'react';
import type { Message } from './types';
import { formatTimestamp } from './utils';

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
}

/**
 * Simple markdown parser for bold text
 */
function parseContent(content: string): React.ReactNode[] {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle line breaks
    return part.split('\n').map((line, lineIndex, arr) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  });
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  showTimestamp = true 
}) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex flex-col gap-1 animate-message-slide-in ${
        isUser ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-chat-user-bubble text-chat-user-bubble-foreground rounded-2xl rounded-br-md'
            : 'bg-chat-bot-bubble text-chat-bot-bubble-foreground rounded-2xl rounded-bl-md shadow-sm'
        }`}
      >
        {parseContent(message.content)}
      </div>
      
      {showTimestamp && (
        <span className="text-[10px] text-muted-foreground px-1">
          {formatTimestamp(message.timestamp)}
        </span>
      )}
    </div>
  );
};

export default MessageBubble;
