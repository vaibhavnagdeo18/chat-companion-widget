/**
 * Chatbot Constants
 * Static data for FAQ responses and configuration
 */

import type { FAQItem, QuickReply } from './types';

// Bot configuration
export const BOT_NAME = 'Assistant';
export const TYPING_DELAY_MIN = 700;
export const TYPING_DELAY_MAX = 900;

// Welcome message displayed when chat opens
export const WELCOME_MESSAGE = `Hi there! 👋 I'm your virtual assistant. I can help you with questions about our services, pricing, and more.

How can I assist you today?`;

// Initial quick reply options
export const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { id: 'pricing', label: '💰 Pricing', value: 'pricing' },
  { id: 'features', label: '✨ Features', value: 'features' },
  { id: 'support', label: '🎧 Contact Support', value: 'support' },
  { id: 'demo', label: '🚀 Request Demo', value: 'demo' },
];

// FAQ responses for quick replies and keyword matching
export const FAQ_RESPONSES: Record<string, string> = {
  pricing: `Our pricing is flexible to fit your needs:

• **Starter**: $29/month - Perfect for small teams
• **Professional**: $79/month - Most popular choice
• **Enterprise**: Custom pricing - For large organizations

All plans include a 14-day free trial. Would you like to know more about any specific plan?`,

  features: `Here are our key features:

• 🔄 **Real-time Sync** - Stay updated across all devices
• 🔒 **Enterprise Security** - SOC2 & GDPR compliant
• 📊 **Advanced Analytics** - Deep insights into your data
• 🔗 **Integrations** - Connect with 100+ tools
• 👥 **Team Collaboration** - Work together seamlessly

Want me to elaborate on any specific feature?`,

  support: `I'd be happy to connect you with our support team!

You can reach us through:
• 📧 Email: support@company.com
• 💬 Live Chat: Available 24/7
• 📞 Phone: 1-800-XXX-XXXX (9am-6pm EST)

Would you like me to collect your information so our team can reach out to you?`,

  demo: `Great choice! 🎉 Our product demo showcases all the powerful features we offer.

I'll need to collect a few details to schedule your personalized demo. Let's start with your name - what should we call you?`,
};

// Keyword-based FAQ matching for natural language queries
export const FAQ_KEYWORDS: FAQItem[] = [
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'subscription', 'plan', 'plans', 'payment'],
    response: FAQ_RESPONSES.pricing,
  },
  {
    keywords: ['feature', 'features', 'what can', 'capabilities', 'functionality', 'does it'],
    response: FAQ_RESPONSES.features,
  },
  {
    keywords: ['support', 'help', 'contact', 'reach', 'speak', 'human', 'agent', 'phone', 'email'],
    response: FAQ_RESPONSES.support,
  },
  {
    keywords: ['demo', 'trial', 'try', 'test', 'see', 'show me'],
    response: FAQ_RESPONSES.demo,
  },
];

// Conversation flow messages
export const CONVERSATION_MESSAGES = {
  askName: "Quick question — is this chatbot for a personal project or a business website? Also, what should I call you?",
  askEmail: (name: string) => `Nice to meet you, ${name}! 😊 What's the best email to reach you at?`,
  invalidEmail: "Hmm, that doesn't look like a valid email. Could you please try again?",
  askReason: "Great! And what brings you here today? (Just a brief description is fine)",
  collected: (name: string) => `Thank you, ${name}! 🎉 Our team will be in touch with you shortly at the email you provided.

Is there anything else I can help you with in the meantime?`,
  fallback: "I'm not quite sure I understand. Could you rephrase that, or choose one of the options below?",
};

// Quick replies for after info collection
export const POST_COLLECTION_QUICK_REPLIES: QuickReply[] = [
  { id: 'pricing', label: '💰 Pricing', value: 'pricing' },
  { id: 'features', label: '✨ Features', value: 'features' },
  { id: 'bye', label: '👋 That\'s all, thanks!', value: 'bye' },
];

// Goodbye message
export const GOODBYE_MESSAGE = `You're welcome! Have a wonderful day! 🌟

Feel free to reach out anytime if you have more questions. The chat will always be here to help!`;
