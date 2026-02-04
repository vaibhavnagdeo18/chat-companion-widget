/**
 * ChatHeader Component
 * Top section of the chat window with title and close button
 * 
 * UX Decisions:
 * - Clear branding with bot avatar
 * - Status indicator shows "Online"
 * - Minimize button is clearly accessible
 * - Gradient background adds visual interest
 */

import React from 'react';
import { X, Minus } from 'lucide-react';
import { BOT_NAME } from './constants';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onMinimize }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-chat-header text-chat-header-foreground rounded-t-2xl">
      <div className="flex items-center gap-3">
        {/* Bot Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">💬</span>
          </div>
          {/* Online indicator */}
          <span 
            className="absolute bottom-0 right-0 w-3 h-3 bg-accent border-2 border-chat-header rounded-full"
            style={{ backgroundColor: 'hsl(142 76% 45%)' }}
            aria-label="Online"
          />
        </div>
        
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{BOT_NAME}</span>
          <span className="text-xs text-white/80">Online • Ready to help</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {onMinimize && (
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Minimize chat"
          >
            <Minus className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-all duration-150 hover:scale-110 active:scale-95"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
