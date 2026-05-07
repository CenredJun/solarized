// Solar Cenred — Lead capture, follow-up, and re-engagement

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function captureUTM() {
  const params = new URLSearchParams(window.location.search);
  return {
    source:   params.get('utm_source')   || 'direct',
    medium:   params.get('utm_medium')   || '',
    campaign: params.get('utm_campaign') || ''
  };
}

function getLead() {
  const d = localStorage.getItem('sc_lead');
  return d ? JSON.parse(d) : null;
}

function saveLead(data) {
  localStorage.setItem('sc_lead', JSON.stringify(data));
}

function defaultLead() {
  return {
    sessionId: generateUUID(),
    name: '', email: '', phone: '',
    firstVisit: Date.now(),
    lastVisit:  Date.now(),
    pageViews:  [],
    chatHistory: [],
    quoteRequested: false,
    quoteEmailed:   false,
    systemInterest: '',
    consumptionLevel: '',
    stage: 'visitor', // visitor → lead → prospect → customer
    utm: captureUTM()
  };
}

function updateLeadData(updates) {
  const lead = getLead() || defaultLead();
  Object.assign(lead, updates);
  saveLead(lead);
}

function initLead() {
  let lead = getLead();
  if (!lead) {
    lead = defaultLead();
    lead.pageViews.push({ page: window.location.pathname, time: Date.now() });
    saveLead(lead);
  } else {
    lead.lastVisit = Date.now();
    lead.pageViews = lead.pageViews || [];
    lead.pageViews.push({ page: window.location.pathname, time: Date.now() });
    // Keep only last 50 page views to limit storage
    if (lead.pageViews.length > 50) lead.pageViews = lead.pageViews.slice(-50);
    saveLead(lead);
  }
  checkReturningUser(lead);
}

function checkReturningUser(lead) {
  if (!lead) return;
  const daysSinceFirst = (Date.now() - lead.firstVisit) / (1000 * 60 * 60 * 24);

  // Returning visitor browsing without quoting
  if (lead.pageViews.length > 2 && !lead.quoteRequested && lead.stage === 'visitor') {
    setTimeout(() => {
      showReEngagementBanner('Still comparing solar options? Get a free estimate in 2 minutes →');
    }, 6000);
  }

  // Quote was emailed but a few days have passed
  if (lead.quoteEmailed && daysSinceFirst > 3 && lead.stage !== 'customer') {
    setTimeout(() => {
      showReEngagementBanner('We sent you a quote! Have questions? Our AI can help →');
    }, 4000);
  }
}

function showReEngagementBanner(message) {
  if (document.getElementById('re-engagement-banner')) return;
  if (sessionStorage.getItem('sc_banner_dismissed')) return;

  const banner = document.createElement('div');
  banner.id = 're-engagement-banner';
  banner.innerHTML = `
    <span>${message}</span>
    <button class="banner-cta" onclick="openChatWithMessage('I want to continue my solar inquiry')">
      Chat Now ☀️
    </button>
    <button class="banner-close" aria-label="Close">&times;</button>
  `;
  banner.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    background: linear-gradient(135deg, #F5A623 0%, #ff8c00 100%);
    color: white;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  `;

  // Apply inner styles to children
  const style = document.createElement('style');
  style.textContent = `
    #re-engagement-banner .banner-cta {
      background: white; color: #F5A623;
      padding: 6px 14px;
      border: none; border-radius: 999px;
      font-weight: 600; font-size: 13px;
      cursor: pointer;
    }
    #re-engagement-banner .banner-cta:hover { opacity: 0.9; }
    #re-engagement-banner .banner-close {
      background: none; border: none; color: white;
      font-size: 22px; line-height: 1; cursor: pointer;
      padding: 0 6px;
    }
    @media (max-width: 600px) {
      #re-engagement-banner { font-size: 12px; padding: 10px; }
    }
  `;
  document.head.appendChild(style);

  document.body.prepend(banner);
  document.body.classList.add('has-banner');

  banner.querySelector('.banner-close').addEventListener('click', () => {
    banner.remove();
    document.body.classList.remove('has-banner');
    sessionStorage.setItem('sc_banner_dismissed', '1');
  });
}

document.addEventListener('DOMContentLoaded', initLead);
