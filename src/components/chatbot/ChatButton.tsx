/**
 * ChatButton Component
 * Floating action button to open/close the chat
 * 
 * UX Decisions:
 * - Fixed position at bottom-right for easy access
 * - Transforms between chat and close icons
 * - Subtle pulse animation when closed to attract attention
 * - Hover and active states for feedback
 */

import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  isOpen, 
  onClick,
  hasUnread = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-primary text-primary-foreground
        shadow-chat-button
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 hover:shadow-lg
        active:scale-95
        focus:outline-none focus:ring-4 focus:ring-primary/30
        ${!isOpen && 'animate-chat-button-pulse'}
      `}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={isOpen}
    >
      <div 
        className={`
          transition-transform duration-300 ease-out
          ${isOpen ? 'rotate-0' : 'rotate-0'}
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </div>
      
      {/* Unread indicator */}
      {!isOpen && hasUnread && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-destructive rounded-full border-2 border-white" />
      )}
    </button>
  );
};

export default ChatButton;
