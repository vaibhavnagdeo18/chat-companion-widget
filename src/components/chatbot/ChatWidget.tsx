/**
 * ChatWidget Component
 * Main embeddable chatbot widget that can be added to any website
 * 
 * This is the top-level component that manages:
 * - Open/close state with smooth animations
 * - Rendering the floating button and chat window
 * - Can be used as a standalone component
 * 
 * Usage:
 *   <ChatWidget />
 * 
 * Or with custom config:
 *   <ChatWidget config={{ botName: 'Support', primaryColor: '#0066cc' }} />
 */

import React, { useState, useCallback } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import type { ChatWidgetConfig } from './types';

interface ChatWidgetProps {
  config?: ChatWidgetConfig;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  /**
   * Opens the chat window
   */
  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
  }, []);

  /**
   * Closes the chat window with animation
   */
  const closeChat = useCallback(() => {
    setIsClosing(true);
    // Wait for close animation to complete
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200); // Match animation duration
  }, []);

  /**
   * Toggles chat open/close
   */
  const toggleChat = useCallback(() => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isOpen, openChat, closeChat]);

  return (
    <>
      {/* Chat Window */}
      <ChatWindow 
        isOpen={isOpen} 
        onClose={closeChat}
        isClosing={isClosing}
      />
      
      {/* Floating Button */}
      <ChatButton 
        isOpen={isOpen} 
        onClick={toggleChat}
      />
    </>
  );
};

export default ChatWidget;
