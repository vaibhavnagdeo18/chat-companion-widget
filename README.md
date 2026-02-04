Chat Companion Widget

A modern, embeddable chatbot widget built with React, TypeScript, and Tailwind CSS.
Designed for easy integration into any website, with a clean UI, structured conversation flow, and basic lead collection.

⸻

Overview

The Chat Companion Widget provides a floating chat interface similar to common customer support widgets. It supports FAQ-based responses, quick reply buttons, and a guided multi-step conversation flow to collect user information such as name, email, and intent.

The project is built with a focus on maintainability, type safety, and clean component architecture.

⸻

Features

User Interface
	•	Clean, minimalist design suitable for any website
	•	Smooth open and close animations
	•	Responsive layout with full-screen mode on mobile
	•	Typing indicator for realistic bot behavior
	•	Automatic scrolling to the latest message

Chat Functionality
	•	Quick reply buttons for common queries
	•	Keyword-based FAQ handling
	•	Guided lead collection flow (name, email, reason)
	•	Email format validation
	•	Finite-state conversation management
	•	Simulated typing delay for improved UX

Developer Experience
	•	Fully typed with TypeScript
	•	Modular and reusable components
	•	Customizable design via CSS variables
	•	No external chatbot libraries

⸻

Project Structure

src/
├── components/
│   └── chatbot/
│       ├── index.ts
│       ├── types.ts
│       ├── constants.ts
│       ├── utils.ts
│       ├── useChatbot.ts
│       ├── ChatWidget.tsx
│       ├── ChatButton.tsx
│       ├── ChatWindow.tsx
│       ├── ChatHeader.tsx
│       ├── ChatMessages.tsx
│       ├── ChatInput.tsx
│       ├── MessageBubble.tsx
│       ├── QuickReplies.tsx
│       └── TypingIndicator.tsx
├── pages/
│   └── Index.tsx
└── index.css

Getting Started

Running Locally

git clone <repository-url>
cd chat-companion-widget
npm install
npm run dev

Usage

Basic Integration

Import and include the ChatWidget component in your application:

import ChatWidget from '@/components/chatbot';

function App() {
  return (
    <div>
      <ChatWidget />
    </div>
  );
}

Customization

The widget uses CSS variables for theming. You can update these in src/index.css:

:root {
  --chat-header: 174 72% 40%;
  --chat-user-bubble: 174 72% 40%;
  --chat-bot-bubble: 0 0% 100%;
  --primary: 174 72% 40%;
}

FAQ Configuration

FAQ responses and quick reply options can be updated in:

src/components/chatbot/constants.ts
This allows easy modification of predefined responses without changing core logic.

Design Decisions
	•	A floating chat button provides a non-intrusive entry point.
	•	Quick replies reduce typing friction and guide the conversation.
	•	A finite-state machine ensures a predictable and structured flow.
	•	Frontend-driven state management keeps the system simple and responsive.

⸻

Tech Stack
	•	Vite
	•	React 18
	•	TypeScript
	•	Tailwind CSS
	•	shadcn/ui (component patterns)

⸻

Future Improvements
	•	Backend integration for persistence
	•	Server-side lead storage
	•	Multi-language support
	•	Conversation history persistence
	•	Theme switching

⸻

License

MIT License
