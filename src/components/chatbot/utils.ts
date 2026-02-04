/**
 * Chatbot Utility Functions
 */

import { FAQ_KEYWORDS, TYPING_DELAY_MIN, TYPING_DELAY_MAX } from './constants';

/**
 * Generates a unique ID for messages
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validates email format using a reasonable regex pattern
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Generates a random typing delay for realistic bot response timing
 */
export function getTypingDelay(): number {
  return Math.floor(Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN + 1)) + TYPING_DELAY_MIN;
}

/**
 * Attempts to match user input against FAQ keywords
 * Returns the FAQ response if matched, null otherwise
 */
export function matchFAQ(input: string): string | null {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const faq of FAQ_KEYWORDS) {
    for (const keyword of faq.keywords) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        return faq.response;
      }
    }
  }
  
  return null;
}

/**
 * Formats a timestamp for display
 */
export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
