/**
 * TypingIndicator Component
 * Displays animated dots with text to indicate bot is "typing"
 * 
 * UX Decision: Shows "Assistant is typing..." text alongside
 * bouncing dots for clear user feedback
 */

import React from 'react';

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className = '' }) => {
  return (
    <div 
      className={`flex items-center gap-2 px-4 py-3 bg-chat-bot-bubble rounded-2xl rounded-bl-md w-fit ${className}`}
      role="status"
      aria-label="Assistant is typing"
    >
      <span className="text-xs text-muted-foreground">Assistant is typing</span>
      <div className="flex items-center gap-1">
        <span 
          className="w-1.5 h-1.5 bg-chat-typing-dot rounded-full animate-typing-dot"
          aria-hidden="true"
        />
        <span 
          className="w-1.5 h-1.5 bg-chat-typing-dot rounded-full animate-typing-dot animate-typing-dot-delay-1"
          aria-hidden="true"
        />
        <span 
          className="w-1.5 h-1.5 bg-chat-typing-dot rounded-full animate-typing-dot animate-typing-dot-delay-2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
