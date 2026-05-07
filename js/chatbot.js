// Solar Cenred — AI Chat Bot (Claude-powered)
//
// Depends on:
//   • SITE_CONFIG       (from config.js)
//   • SOLAR_KNOWLEDGE_BASE (from knowledge/knowledge-base.js)
//   • emailjs SDK       (loaded via CDN in HTML)
//   • lead.js helpers   (updateLeadData)

// ─── State ──────────────────────────────────────────────────
let chatHistory = [];
let isWaitingForResponse = false;
let quoteData = {};
let conversationStage = 'greeting'; // greeting | collecting | quoting | followup

// ─── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  loadChatHistory();

  // First-visit greeting nudge
  if (!localStorage.getItem('sc_visited')) {
    setTimeout(() => {
      const fab = document.getElementById('chat-fab');
      if (fab) fab.classList.add('pulse');
      showNotificationDot();
    }, 3000);
    localStorage.setItem('sc_visited', Date.now());
  }

  // Enter-to-send
  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

function initEmailJS() {
  if (typeof emailjs !== 'undefined' &&
      SITE_CONFIG.emailjsPublicKey &&
      SITE_CONFIG.emailjsPublicKey.indexOf('YOUR_') === -1) {
    try {
      emailjs.init({ publicKey: SITE_CONFIG.emailjsPublicKey });
    } catch (e) {
      console.warn('EmailJS init failed:', e);
    }
  }
}

// ─── Toggle Chat Window ─────────────────────────────────────
function toggleChat() {
  const win = document.getElementById('chat-window');
  if (!win) return;
  const isOpen = win.style.display !== 'none' && win.style.display !== '';
  win.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen && chatHistory.length === 0) {
    sendGreeting();
  }
  if (!isOpen) hideNotificationDot();
}

function showNotificationDot() {
  const dot = document.getElementById('chat-notification-dot');
  if (dot) dot.classList.add('show');
}
function hideNotificationDot() {
  const dot = document.getElementById('chat-notification-dot');
  if (dot) dot.classList.remove('show');
  const fab = document.getElementById('chat-fab');
  if (fab) fab.classList.remove('pulse');
}

// ─── Send Greeting ───────────────────────────────────────────
function sendGreeting() {
  const greeting = `Hi there! 👋 I'm the Solar Cenred AI Assistant.

I can help you with:
• Product information & pricing
• System sizing & recommendations
• Instant cost estimates
• Free quotation by email

How can I help you today?`;
  appendMessage('bot', greeting);
  showQuickReplies([
    { label: '💰 Get a Free Quote',  msg: 'I want a free solar quote' },
    { label: '⚡ System Types',       msg: 'What are the different types of solar systems?' },
    { label: '🔧 How It Works',       msg: 'How does solar installation work?' },
    { label: '📞 Contact Us',         msg: 'How can I contact Solar Cenred?' }
  ]);
}

// ─── Send Message ────────────────────────────────────────────
async function sendMessage(text) {
  const input = document.getElementById('chat-input');
  const userMessage = (text || (input ? input.value.trim() : '')).trim();
  if (!userMessage || isWaitingForResponse) return;

  if (input && !text) input.value = '';
  hideQuickReplies();
  appendMessage('user', userMessage);
  chatHistory.push({ role: 'user', content: userMessage });

  // Extract quote-relevant data
  handleQuoteCollection(userMessage);

  // Auto-trigger email flow when user supplies email after a quote
  if (quoteData.email && quoteData.systemType && !quoteData.emailSent) {
    showTypingIndicator();
    isWaitingForResponse = true;
    setTimeout(() => {
      hideTypingIndicator();
      isWaitingForResponse = false;
      emailQuote();
    }, 600);
    return;
  }

  showTypingIndicator();
  isWaitingForResponse = true;

  try {
    if (!SITE_CONFIG.claudeApiKey || SITE_CONFIG.claudeApiKey.indexOf('YOUR_') !== -1) {
      // Fallback: simple rule-based response when API key is not configured
      const reply = fallbackReply(userMessage);
      hideTypingIndicator();
      appendMessage('bot', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      saveChatHistory();
      showContextualReplies(userMessage, reply);
    } else {
      const systemPrompt = buildSystemPrompt();
      const response = await callClaudeAPI(systemPrompt, chatHistory);
      hideTypingIndicator();
      appendMessage('bot', response);
      chatHistory.push({ role: 'assistant', content: response });
      saveChatHistory();
      showContextualReplies(userMessage, response);
    }
  } catch (error) {
    console.error(error);
    hideTypingIndicator();
    appendMessage(
      'bot',
      "Sorry, I'm having a connection issue. Please try again or email us directly at " +
      "**cenredgonzales@gmail.com** or call **(082) 123-4567**."
    );
  }

  isWaitingForResponse = false;
}

// ─── Claude API Call ─────────────────────────────────────────
async function callClaudeAPI(systemPrompt, messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':                              'application/json',
      'x-api-key':                                 SITE_CONFIG.claudeApiKey,
      'anthropic-version':                         '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model:      SITE_CONFIG.claudeModel,
      max_tokens: SITE_CONFIG.claudeMaxTokens,
      system:     systemPrompt,
      messages:   messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'Claude API error');
  if (!data.content || !data.content[0]) throw new Error('Empty response from Claude');
  return data.content[0].text;
}

// ─── System Prompt ───────────────────────────────────────────
function buildSystemPrompt() {
  const kb = (typeof SOLAR_KNOWLEDGE_BASE !== 'undefined') ? SOLAR_KNOWLEDGE_BASE : '';
  return `You are the Solar Cenred AI Assistant, a knowledgeable and friendly solar energy consultant for Solar Cenred Corp. (Philippines) and Solar Cenred LLC (USA).

COMPANY CONTACT: cenredgonzales@gmail.com | PH: (082) 123-4567 | US: (512) 555-0198
WEBSITE: https://solarized.bizguro.net

${kb}

BEHAVIOR:
1. Be warm, professional, and helpful. Use simple language — not technical jargon unless asked.
2. For pricing questions, use the formulas in the knowledge base to calculate estimates.
3. For quote requests, collect: name, email, daily kWh consumption, system type (on-grid/off-grid/hybrid), and backup hours needed.
4. Format quotes clearly with line items: panels, inverter, battery (if needed), estimated total, payback period.
5. If you don't know something, say: "Let me connect you with our team — email cenredgonzales@gmail.com or call (082) 123-4567"
6. Always end quote responses with: "Would you like me to email this quote to you? Just share your name and email address."
7. If user seems ready to proceed, suggest: "Would you like to schedule a free site assessment? Our team can visit and give you an exact price."
8. Keep responses concise: max 4 sentences for general questions, up to 12 lines for quotes.
9. Detect language: respond in English, Filipino (Tagalog), or Bisaya/Cebuano based on user's language.
10. If user provides email, acknowledge it and confirm a quote will be emailed to them.
11. Use markdown-style **bold** for emphasis on key numbers (system size, total cost, monthly savings, payback). Avoid headings.
12. NEVER invent prices outside the ranges in the knowledge base.`;
}

// ─── Fallback (no API key) ───────────────────────────────────
function fallbackReply(msg) {
  const m = msg.toLowerCase();
  if (/quote|price|cost/.test(m)) {
    return `Great — here's a quick estimate. A typical **5 kW hybrid system** costs **₱400,000–₱600,000** installed, saves **₱4,000–₱5,000/mo**, and pays back in about **8 years**. For a tailored quote, share your monthly bill and email and I'll send a detailed proposal.`;
  }
  if (/hybrid/.test(m)) {
    return `Hybrid systems combine solar panels, a battery (e.g., MUST 100Ah LiFePO4), and a hybrid inverter (Sol-Ark 12K). They give you backup during brownouts plus net-metering credit. Pricing is **₱80,000–₱120,000 per kW** installed. Want a personalized estimate?`;
  }
  if (/off.grid/.test(m)) {
    return `Off-grid systems are fully independent of the utility — perfect for remote sites. Expect **₱100,000–₱160,000 per kW** since you'll need a larger battery bank for autonomy. Tell me your daily kWh need and I'll size a system for you.`;
  }
  if (/on.grid|grid.tied/.test(m)) {
    return `On-grid (grid-tied) is the most affordable option. No battery — your panels offset daytime use and net-meter exports the rest. Cost: **₱60,000–₱90,000 per kW** installed. Payback usually **5–7 years**.`;
  }
  if (/contact|email|phone|call/.test(m)) {
    return `You can reach us at **cenredgonzales@gmail.com** or call **(082) 123-4567** in the Philippines / **(512) 555-0198** in the US. We'd love to schedule a free site assessment for you.`;
  }
  return `Thanks for your question! I can help with system pricing, sizing, types (on-grid, off-grid, hybrid), installation steps, and quotes. What would you like to know more about?`;
}

// ─── Quote Collection Logic ──────────────────────────────────
function handleQuoteCollection(message) {
  // Detect email
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    quoteData.email = emailMatch[0];
    updateLeadData({ email: emailMatch[0], quoteRequested: true, stage: 'lead' });
  }
  // Detect name after "my name is" / "I'm" / "I am"
  const nameMatch = message.match(/(?:my name is|i am|i'm)\s+([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)?)/i);
  if (nameMatch) {
    quoteData.name = nameMatch[1].trim();
    updateLeadData({ name: nameMatch[1].trim() });
  }
  // Detect kWh
  const kwhMatch = message.match(/(\d+(?:\.\d+)?)\s*kwh/i);
  if (kwhMatch) quoteData.dailyKwh = parseFloat(kwhMatch[1]);
  // Detect monthly bill
  const billMatch = message.match(/(?:bill|electricity).*?[₱$]?\s*(\d{1,3}(?:,\d{3})*|\d+)/i);
  if (billMatch) quoteData.monthlyBill = parseInt(billMatch[1].replace(/,/g, ''));
  // Detect system type
  if (/hybrid/i.test(message))            quoteData.systemType = 'hybrid';
  else if (/off.grid|offgrid/i.test(message)) quoteData.systemType = 'off-grid';
  else if (/on.grid|grid.tied/i.test(message)) quoteData.systemType = 'on-grid';
}

// ─── Email Quote ─────────────────────────────────────────────
async function emailQuote() {
  if (!quoteData.email) {
    appendMessage(
      'bot',
      'To send you a detailed quote, I just need your **name** and **email address**. What are they?'
    );
    const win = document.getElementById('chat-window');
    if (win) win.style.display = 'flex';
    return;
  }

  const quoteText = generateQuoteText();

  // EmailJS configured?
  const canSend = typeof emailjs !== 'undefined' &&
                  SITE_CONFIG.emailjsServiceId &&
                  SITE_CONFIG.emailjsServiceId.indexOf('YOUR_') === -1;

  if (!canSend) {
    appendMessage(
      'bot',
      `I've prepared your quote, but our email integration isn't configured yet on this demo. Please email **cenredgonzales@gmail.com** and reference: *${quoteData.systemType || 'hybrid'} system, ${quoteData.dailyKwh || 'TBD'} kWh/day*. We'll send your full proposal within 24 hours.`
    );
    quoteData.emailSent = true;
    updateLeadData({ quoteEmailed: false, stage: 'prospect' });
    return;
  }

  try {
    await emailjs.send(
      SITE_CONFIG.emailjsServiceId,
      SITE_CONFIG.emailjsQuoteTemplateId,
      {
        to_email:     quoteData.email,
        to_name:      quoteData.name || 'Valued Customer',
        cc_email:     SITE_CONFIG.companyEmail,
        quote_content: quoteText,
        system_type:  quoteData.systemType || 'Not specified',
        daily_kwh:    quoteData.dailyKwh   || 'Not specified'
      },
      SITE_CONFIG.emailjsPublicKey
    );
    appendMessage(
      'bot',
      `✅ Your quote has been sent to **${quoteData.email}**! Check your inbox (and spam folder). We'll also follow up within 24 hours. Is there anything else I can help you with?`
    );
    quoteData.emailSent = true;
    updateLeadData({ quoteEmailed: true, stage: 'prospect' });
  } catch (e) {
    console.warn(e);
    appendMessage(
      'bot',
      `I wasn't able to send the email automatically. Please email us directly at **cenredgonzales@gmail.com** and we'll send your quote within the hour.`
    );
  }
}

function generateQuoteText() {
  const kwh       = quoteData.dailyKwh || 10;
  const systemKw  = Math.ceil((kwh / 4) / 0.9 * 10) / 10;
  const panels    = Math.ceil((systemKw * 1000) / 575);
  const annualSave = Math.round(kwh * 365 * 11 * 0.85);
  const lowCost   = Math.round(systemKw * 80000);
  const highCost  = Math.round(systemKw * 120000);
  const payback   = Math.max(1, Math.round((lowCost + highCost) / 2 / annualSave));

  return `
SOLAR CENRED — PRELIMINARY QUOTATION
=====================================
Client: ${quoteData.name || 'Valued Customer'}
Email: ${quoteData.email}
System Type: ${quoteData.systemType || 'Hybrid (recommended)'}
Daily Consumption: ~${kwh} kWh

ESTIMATED SYSTEM COMPONENTS:
- Solar Panels: ${panels}× LONGi Hi-MO 7 575W = ${systemKw} kW total
- Inverter: Sol-Ark 12K Hybrid or equivalent
- Battery: MUST MH1900 Series ${kwh <= 10 ? '100Ah' : '200Ah'} LiFePO4
- Mounting, wiring, protection devices

ESTIMATED COST RANGE: ₱${lowCost.toLocaleString()} – ₱${highCost.toLocaleString()}
ESTIMATED ANNUAL SAVINGS: ₱${annualSave.toLocaleString()}
ESTIMATED PAYBACK PERIOD: ${payback} years

NEXT STEPS:
1. Schedule a free site visit for exact assessment
2. Receive a detailed, binding quotation
3. System design & permit application
4. Professional installation (1–3 days)

Contact us: cenredgonzales@gmail.com | (082) 123-4567
Website: https://solarized.bizguro.net

Note: This is a preliminary estimate. Final price depends on site assessment, roof type, and exact components selected.
  `.trim();
}

// ─── Quick Replies ───────────────────────────────────────────
function showQuickReplies(replies) {
  const container = document.getElementById('quick-replies');
  if (!container) return;
  container.innerHTML = '';
  replies.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply-btn';
    btn.textContent = r.label;
    btn.onclick = () => sendMessage(r.msg);
    container.appendChild(btn);
  });
  container.style.display = 'flex';
}

function showContextualReplies(userMsg, botMsg) {
  const msg = (userMsg + ' ' + botMsg).toLowerCase();
  if (/hybrid|on.grid|off.grid/.test(msg)) {
    showQuickReplies([
      { label: '💲 Get Cost Estimate',  msg: 'How much does this system cost?' },
      { label: '📅 Schedule Visit',     msg: 'I want to schedule a site assessment' },
      { label: '🔋 Battery Options',    msg: 'What battery options do you have?' }
    ]);
  } else if (/cost|price|quote|payback|savings/.test(msg)) {
    showQuickReplies([
      { label: '✉️ Email Me Quote',     msg: 'Please email me this quote' },
      { label: '📞 Call Me',            msg: 'I want someone to call me' },
      { label: '📅 Book Visit',         msg: 'Schedule a free site assessment' }
    ]);
  } else if (/installation|process|how.*work/.test(msg)) {
    showQuickReplies([
      { label: '⏱️ Timeline',           msg: 'How long does installation take?' },
      { label: '📜 Permits',            msg: 'Do you handle permits?' },
      { label: '💰 Financing',          msg: 'What financing options are available?' }
    ]);
  }
}

function hideQuickReplies() {
  const container = document.getElementById('quick-replies');
  if (container) container.style.display = 'none';
}

// ─── Message Rendering ───────────────────────────────────────
function appendMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'message message-' + role;
  div.innerHTML = formatMessage(text);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function formatMessage(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'message message-bot typing-indicator';
  div.id = 'typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

// ─── Persistence ─────────────────────────────────────────────
function saveChatHistory() {
  try {
    localStorage.setItem('sc_chat', JSON.stringify(chatHistory.slice(-20)));
  } catch (e) { /* quota exceeded — silently ignore */ }
}

function loadChatHistory() {
  const saved = localStorage.getItem('sc_chat');
  if (saved) {
    try {
      chatHistory = JSON.parse(saved);
      chatHistory.forEach(m => appendMessage(m.role, m.content));
    } catch (e) { chatHistory = []; }
  }
}

function clearChat() {
  chatHistory = [];
  quoteData = {};
  const c = document.getElementById('chat-messages');
  if (c) c.innerHTML = '';
  hideQuickReplies();
  localStorage.removeItem('sc_chat');
  sendGreeting();
}

// ─── Pre-fill from page context ──────────────────────────────
function openChatWithMessage(msg) {
  const win = document.getElementById('chat-window');
  if (!win) return;
  win.style.display = 'flex';
  hideNotificationDot();
  if (chatHistory.length === 0) sendGreeting();
  setTimeout(() => sendMessage(msg), 600);
}
