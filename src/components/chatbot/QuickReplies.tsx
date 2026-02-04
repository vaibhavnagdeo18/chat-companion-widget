/**
 * QuickReplies Component
 * Renders clickable quick reply buttons
 * 
 * UX Decisions:
 * - Buttons are visually distinct from messages
 * - Hover state provides feedback
 * - Compact design that doesn't overwhelm the chat
 * - Wraps naturally on smaller screens
 */

import React from 'react';
import type { QuickReply } from './types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  disabled?: boolean;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ 
  replies, 
  onSelect,
  disabled = false 
}) => {
  if (replies.length === 0) return null;

  return (
    <div 
      className="flex flex-wrap gap-2 animate-message-slide-in"
      role="group"
      aria-label="Quick reply options"
    >
      {replies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className={`
            px-4 py-2 text-sm font-medium rounded-full
            bg-chat-quick-reply text-chat-quick-reply-foreground
            border border-primary/20
            transition-all duration-200 ease-out
            hover:bg-chat-quick-reply-hover hover:text-primary-foreground
            hover:scale-[1.02] hover:shadow-sm
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1
          `}
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
