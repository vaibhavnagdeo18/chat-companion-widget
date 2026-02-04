/**
 * ChatInput Component
 * Text input field with send button for user messages
 * 
 * UX Decisions:
 * - Send button is always visible but disabled when empty
 * - Enter key sends message, Shift+Enter for new line
 * - Input expands slightly on focus
 * - Placeholder text guides user behavior
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');
      // Reset height after sending
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex items-end gap-2 p-4 bg-chat-input-bg border-t border-border">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={`
            w-full px-4 py-3 text-sm
            bg-secondary/50 text-foreground
            border border-border rounded-2xl
            resize-none overflow-hidden
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          `}
          aria-label="Type your message"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSend}
        className={`
          flex-shrink-0 p-3 rounded-full
          bg-primary text-primary-foreground
          transition-all duration-200 ease-out
          hover:opacity-90 hover:scale-105
          active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        `}
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
