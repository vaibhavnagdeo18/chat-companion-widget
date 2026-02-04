/**
 * useChatbot Hook
 * Manages all chatbot state and conversation logic
 */

import { useState, useCallback, useRef } from 'react';
import type { Message, QuickReply, ConversationState, UserInfo } from './types';
import {
  WELCOME_MESSAGE,
  INITIAL_QUICK_REPLIES,
  FAQ_RESPONSES,
  CONVERSATION_MESSAGES,
  POST_COLLECTION_QUICK_REPLIES,
  GOODBYE_MESSAGE,
} from './constants';
import { generateId, isValidEmail, getTypingDelay, matchFAQ } from './utils';

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);

  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 'greeting',
    userInfo: {},
    isTyping: false,
  });

  const hasGreeted = useRef(false);

  /* ---------------- BOT MESSAGE ---------------- */
  const addBotMessage = useCallback((content: string, replies: QuickReply[] = []) => {
    setConversationState((prev) => ({ ...prev, isTyping: true }));

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          content,
          sender: 'bot',
          timestamp: new Date(),
          quickReplies: replies,
        },
      ]);
      setQuickReplies(replies);
      setConversationState((prev) => ({ ...prev, isTyping: false }));
    }, getTypingDelay());
  }, []);

  /* ---------------- USER MESSAGE ---------------- */
  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        content,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);
    setQuickReplies([]);
  }, []);

  /* ---------------- INIT ---------------- */
  const initializeChat = useCallback(() => {
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      addBotMessage(WELCOME_MESSAGE, INITIAL_QUICK_REPLIES);
      setConversationState((prev) => ({ ...prev, step: 'faq_mode' }));
    }
  }, [addBotMessage]);

  /* ---------------- RESET ---------------- */
  const resetChat = useCallback(() => {
    hasGreeted.current = false;
    setMessages([]);
    setQuickReplies([]);
    setConversationState({
      step: 'greeting',
      userInfo: {},
      isTyping: false,
    });
  }, []);

  /* ---------------- USER INPUT FSM ---------------- */
  const processUserInput = useCallback(
    (input: string) => {
      addUserMessage(input);

      const { step, userInfo } = conversationState;
      const trimmed = input.trim();

      switch (step) {
        case 'faq_mode':
        case 'collected': {
          const faq = matchFAQ(trimmed);
          if (faq) {
            addBotMessage(
              faq,
              step === 'collected' ? POST_COLLECTION_QUICK_REPLIES : INITIAL_QUICK_REPLIES
            );
          } else {
            addBotMessage(
              CONVERSATION_MESSAGES.fallback,
              step === 'collected' ? POST_COLLECTION_QUICK_REPLIES : INITIAL_QUICK_REPLIES
            );
          }
          break;
        }

        case 'ask_name': {
          setConversationState((prev) => ({
            ...prev,
            step: 'ask_email',
            userInfo: { ...prev.userInfo, name: trimmed },
          }));
          addBotMessage(CONVERSATION_MESSAGES.askEmail(trimmed));
          break;
        }

        case 'ask_email': {
          if (!isValidEmail(trimmed)) {
            addBotMessage(CONVERSATION_MESSAGES.invalidEmail);
          } else {
            setConversationState((prev) => ({
              ...prev,
              step: 'ask_reason',
              userInfo: { ...prev.userInfo, email: trimmed },
            }));
            addBotMessage(CONVERSATION_MESSAGES.askReason);
          }
          break;
        }

        case 'ask_reason': {
          const name = userInfo.name || 'friend';
          setConversationState((prev) => ({
            ...prev,
            step: 'collected',
            userInfo: { ...prev.userInfo, reason: trimmed },
          }));
          addBotMessage(CONVERSATION_MESSAGES.collected(name), POST_COLLECTION_QUICK_REPLIES);
          break;
        }

        default:
          addBotMessage(CONVERSATION_MESSAGES.fallback, INITIAL_QUICK_REPLIES);
      }
    },
    [conversationState, addUserMessage, addBotMessage]
  );

  /* ---------------- QUICK REPLIES ---------------- */
  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      // Add user-visible message
      addUserMessage(reply.label);

      switch (reply.value) {
        case 'pricing':
          addBotMessage(FAQ_RESPONSES.pricing, INITIAL_QUICK_REPLIES);
          break;

        case 'features':
          addBotMessage(FAQ_RESPONSES.features, INITIAL_QUICK_REPLIES);
          break;

        case 'support':
          addBotMessage(FAQ_RESPONSES.support, INITIAL_QUICK_REPLIES);
          break;

        case 'demo':
          setConversationState((prev) => ({ ...prev, step: 'ask_project_type' }));
          addBotMessage(
            'Is this chatbot for a personal project or a business website?',
            [
              { id: 'personal', label: '🧑‍💻 Personal Project', value: 'personal' },
              { id: 'business', label: '🏢 Business Website', value: 'business' },
            ]
          );
          break;

        case 'personal':
        case 'business':
          setConversationState((prev) => ({
            ...prev,
            step: 'ask_name',
            userInfo: { ...prev.userInfo, projectType: reply.value },
          }));
          addBotMessage(CONVERSATION_MESSAGES.askName);
          break;

        case 'bye':
          addBotMessage(GOODBYE_MESSAGE);
          break;

        default:
          processUserInput(reply.label);
      }
    },
    [addUserMessage, addBotMessage, processUserInput]
  );

  return {
    messages,
    quickReplies,
    isTyping: conversationState.isTyping,
    userInfo: conversationState.userInfo as Partial<UserInfo>,
    initializeChat,
    resetChat,
    processUserInput,
    handleQuickReply,
  };
}