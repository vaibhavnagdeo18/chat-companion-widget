# Embeddable Chatbot Widget

A modern, clean, and fully embeddable chatbot widget built with React and Tailwind CSS. Designed for easy integration into any website with smooth animations, intelligent conversation flow, and lead collection capabilities.

![Chatbot Widget Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)

---

##  Features

### UI/UX
- **Clean, Modern Design** — Minimalist aesthetic that complements any website
- **Smooth Animations** — Polished open/close transitions and message animations
- **Responsive Layout** — Full-screen on mobile, floating window on desktop
- **Typing Indicator** — Realistic "bot is typing" animation
- **Auto-scroll** — Automatically scrolls to newest messages
- **Custom Scrollbar** — Styled scrollbar for a premium feel

### Functionality
- **Quick Reply Buttons** — Pre-defined options for common queries (Pricing, Features, Support, Demo)
- **FAQ Handling** — Keyword matching for automated responses
- **Lead Collection** — Collects Name, Email, and Reason for visit with validation
- **Email Validation** — Validates email format before proceeding
- **Conversation State Management** — Maintains logical flow through conversation steps
- **Simulated Response Delay** — 500-1000ms delay for realistic bot behavior

### Developer Experience
- **Fully Typed** — Complete TypeScript support
- **Modular Architecture** — Clean component separation
- **Easy Customization** — Design tokens in CSS variables
- **Zero Dependencies** — Uses only React and Tailwind (no external chat libraries)

---

## 📁 Project Structure

```
src/
├── components/
│   └── chatbot/
│       ├── index.ts              # Main exports
│       ├── types.ts              # TypeScript interfaces
│       ├── constants.ts          # FAQ data & configuration
│       ├── utils.ts              # Helper functions
│       ├── useChatbot.ts         # Main conversation logic hook
│       ├── ChatWidget.tsx        # Top-level widget component
│       ├── ChatButton.tsx        # Floating action button
│       ├── ChatWindow.tsx        # Main chat container
│       ├── ChatHeader.tsx        # Header with title & close
│       ├── ChatMessages.tsx      # Messages container
│       ├── ChatInput.tsx         # Text input & send button
│       ├── MessageBubble.tsx     # Individual message component
│       ├── QuickReplies.tsx      # Quick reply buttons
│       └── TypingIndicator.tsx   # Animated typing dots
├── pages/
│   └── Index.tsx                 # Demo landing page
└── index.css                     # Design system & animations
```

---

##  Quick Start

### Running Locally

```bash
# Clone the repository
git clone <repository-url>
cd chatbot-widget

# Install dependencies
npm install

# Start development server
npm run dev
```

---

##  Usage

### Basic Integration

Simply import and add the `ChatWidget` component anywhere in your app:

```tsx
import ChatWidget from '@/components/chatbot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ChatWidget />
    </div>
  );
}
```

### Customization

The widget uses CSS variables for easy theming. Modify `src/index.css`:

```css
:root {
  --chat-header: 174 72% 40%;        /* Header background */
  --chat-user-bubble: 174 72% 40%;   /* User message color */
  --chat-bot-bubble: 0 0% 100%;      /* Bot message color */
  --primary: 174 72% 40%;            /* Primary accent color */
}
```

### Modifying FAQ Responses

Edit `src/components/chatbot/constants.ts`:

```typescript
export const FAQ_RESPONSES: Record<string, string> = {
  pricing: `Your custom pricing information...`,
  features: `Your custom features list...`,
  // Add more...
};
```

---

##  Design Decisions

### Why Floating Button?
- Non-intrusive entry point familiar to users from Intercom, Drift, etc.
- Pulse animation attracts attention without being annoying
- Clear open/close states with icon transformation

### Why Quick Replies?
- Reduces typing friction for common queries
- Guides users toward supported topics
- Improves response accuracy

### Why Typing Indicator?
- Creates expectation for response timing
- Makes the bot feel more "human"
- Prevents user frustration during processing

### Responsive Approach
- **Desktop**: 400×600px floating window with rounded corners
- **Mobile**: Full-screen overlay for maximum usability on small screens

### Animation Choices
- `cubic-bezier(0.32, 0.72, 0, 1)` for smooth, natural feel
- 300ms for primary transitions (not too fast, not sluggish)
- Staggered typing dots for realistic typing simulation

---

##  Demo Video Script (2-3 minutes)

### Introduction (15 seconds)
*"Hi! Today I'm demonstrating an embeddable chatbot widget I built with React and Tailwind CSS. Let me walk you through its features."*

### Opening the Chat (20 seconds)
*"Notice the floating chat button in the bottom-right corner. It has a subtle pulse animation to attract attention. When I click it, the chat window smoothly animates in with a scale and fade effect."*

### Initial Interaction (30 seconds)
*"The bot greets me immediately with a welcome message and provides quick reply buttons for common actions: Pricing, Features, Contact Support, and Request Demo. These reduce friction and guide the conversation."*

### Quick Replies Demo (30 seconds)
*"Let me click 'Pricing' — you'll see the typing indicator appear briefly before the response. The bot provides structured pricing information with markdown formatting. I can continue exploring other options."*

### Lead Collection Flow (45 seconds)
*"Now let's try 'Request Demo'. This triggers our lead collection flow. The bot asks for my name first, then my email — notice it validates the email format. Finally, it asks my reason for visiting. All this data is captured in state and logged to console."*

### Responsive Design (15 seconds)
*"On mobile, the chat takes up the full screen for better usability. The input stays at the bottom, accessible for thumbs."*

### Closing (15 seconds)
*"The widget is fully embeddable, uses no external chat libraries, and the entire design system is customizable through CSS variables. Thanks for watching!"*

---

##  Future Enhancements

- [ ] Backend integration with Flask API
- [ ] Persistent conversation history
- [ ] Webhook support for lead notifications
- [ ] Multiple language support
- [ ] Custom avatar support
- [ ] Theme switching (light/dark)
- [ ] Sound notifications

---

##  Tech Stack

- **Vite** — Lightning-fast build tool
- **React 18** — Modern UI framework
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component patterns

---

##  License

MIT License — feel free to use in your own projects!

--- 
