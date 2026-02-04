"""
Bot Response Logic
Handles FAQ matching, conversation flow, and response generation
"""

import re

# FAQ Responses
FAQ_RESPONSES = {
    'pricing': {
        'response': """Our pricing is flexible to fit your needs:

• **Starter**: $29/month - Perfect for small teams
• **Professional**: $79/month - Most popular choice
• **Enterprise**: Custom pricing - For large organizations

All plans include a 14-day free trial. Would you like to know more about any specific plan?""",
        'quickReplies': [
            {'id': 'features', 'label': '✨ Features', 'value': 'features'},
            {'id': 'demo', 'label': '🚀 Request Demo', 'value': 'demo'},
        ]
    },
    'features': {
        'response': """Here are our key features:

• 🔄 **Real-time Sync** - Stay updated across all devices
• 🔒 **Enterprise Security** - SOC2 & GDPR compliant
• 📊 **Advanced Analytics** - Deep insights into your data
• 🔗 **Integrations** - Connect with 100+ tools
• 👥 **Team Collaboration** - Work together seamlessly

Want me to elaborate on any specific feature?""",
        'quickReplies': [
            {'id': 'pricing', 'label': '💰 Pricing', 'value': 'pricing'},
            {'id': 'demo', 'label': '🚀 Request Demo', 'value': 'demo'},
        ]
    },
    'support': {
        'response': """I'd be happy to connect you with our support team!

You can reach us through:
• 📧 Email: support@company.com
• 💬 Live Chat: Available 24/7
• 📞 Phone: 1-800-XXX-XXXX (9am-6pm EST)

Would you like me to collect your information so our team can reach out to you?""",
        'quickReplies': [
            {'id': 'demo', 'label': '🚀 Request Demo', 'value': 'demo'},
            {'id': 'pricing', 'label': '💰 Pricing', 'value': 'pricing'},
        ]
    },
    'demo': {
        'response': """Great choice! 🎉 Our product demo showcases all the powerful features we offer.

Quick question — is this chatbot for a personal project or a business website?""",
        'quickReplies': [
            {'id': 'personal', 'label': '🧑‍💻 Personal Project', 'value': 'personal'},
            {'id': 'business', 'label': '🏢 Business Website', 'value': 'business'}
        ]
    }
}

# Keyword patterns for FAQ matching
FAQ_KEYWORDS = {
    'pricing': ['price', 'pricing', 'cost', 'how much', 'subscription', 'plan', 'payment'],
    'features': ['feature', 'features', 'what can', 'capabilities', 'functionality', 'does it'],
    'support': ['support', 'help', 'contact', 'reach', 'speak', 'human', 'agent', 'phone', 'email'],
    'demo': ['demo', 'trial', 'try', 'test', 'see', 'show me']
}

# Default quick replies
DEFAULT_QUICK_REPLIES = [
    {'id': 'pricing', 'label': '💰 Pricing', 'value': 'pricing'},
    {'id': 'features', 'label': '✨ Features', 'value': 'features'},
    {'id': 'support', 'label': '🎧 Contact Support', 'value': 'support'},
    {'id': 'demo', 'label': '🚀 Request Demo', 'value': 'demo'},
]


def match_faq(message: str):
    message_lower = message.lower()
    for category, keywords in FAQ_KEYWORDS.items():
        for keyword in keywords:
            if keyword in message_lower:
                return category
    return None


def validate_email(email: str) -> bool:
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return bool(re.match(pattern, email))


def get_bot_response(message: str, context: dict) -> dict:
    step = context.get('step', 'faq_mode')
    user_info = context.get('userInfo', {})
    message = message.strip()
    message_lower = message.lower()

    # 🔹 Step 1: Project type
    if step == 'ask_project_type':
        return {
            'response': "Got it! 😊 What should I call you?",
            'quickReplies': [],
            'nextStep': 'ask_name',
            'userInfo': {**user_info, 'projectType': message_lower}
        }

    # 🔹 Step 2: Name
    if step == 'ask_name':
        return {
            'response': f"Nice to meet you, {message}! 😊 What's the best email to reach you at?",
            'quickReplies': [],
            'nextStep': 'ask_email',
            'userInfo': {**user_info, 'name': message}
        }

    # 🔹 Step 3: Email
    if step == 'ask_email':
        if not validate_email(message):
            return {
                'response': "Hmm, that doesn't look like a valid email. Could you please try again?",
                'quickReplies': [],
                'nextStep': 'ask_email'
            }

        return {
            'response': "Great! And what brings you here today? (Just a brief description is fine)",
            'quickReplies': [],
            'nextStep': 'ask_reason',
            'userInfo': {**user_info, 'email': message}
        }

    # 🔹 Step 4: Reason
    if step == 'ask_reason':
        name = user_info.get('name', 'friend')
        return {
            'response': f"Thank you, {name}! 🎉 Our team will be in touch with you shortly.\n\nIs there anything else I can help you with?",
            'quickReplies': DEFAULT_QUICK_REPLIES,
            'nextStep': 'collected',
            'userInfo': {**user_info, 'reason': message}
        }

    # 🔹 Handle quick reply values
    if message_lower in FAQ_RESPONSES:
        faq = FAQ_RESPONSES[message_lower]
        next_step = 'ask_project_type' if message_lower == 'demo' else step
        return {
            'response': faq['response'],
            'quickReplies': faq['quickReplies'] or DEFAULT_QUICK_REPLIES,
            'nextStep': next_step
        }

    # 🔹 Goodbye
    if message_lower in ['bye', 'goodbye', "that's all, thanks!", 'thanks']:
        return {
            'response': "You're welcome! Have a wonderful day! 🌟",
            'quickReplies': []
        }

    # 🔹 Keyword-based FAQ
    faq_match = match_faq(message)
    if faq_match:
        faq = FAQ_RESPONSES[faq_match]
        next_step = 'ask_project_type' if faq_match == 'demo' else step
        return {
            'response': faq['response'],
            'quickReplies': faq['quickReplies'] or DEFAULT_QUICK_REPLIES,
            'nextStep': next_step
        }

    # 🔹 Fallback
    return {
        'response': "I'm not quite sure I understand. Could you rephrase that, or choose one of the options below?",
        'quickReplies': DEFAULT_QUICK_REPLIES,
        'nextStep': step
    }