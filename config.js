// Solar Cenred — Site Configuration
// Replace all placeholder values before deploying to production.
// SECURITY NOTE: This is a static site. For production, move API calls
// to a serverless function (Netlify Functions or Vercel Edge Functions)
// so your API key is never exposed in the browser.

const SITE_CONFIG = {
  // Anthropic Claude API
  claudeApiKey: 'using-netlify-proxy',
  claudeModel: 'claude-sonnet-4-20250514',
  claudeMaxTokens: 1000,

  // EmailJS — get free account at https://emailjs.com
  emailjsServiceId: 'service_959ruiw',
  emailjsTemplateId: 'template_rz3pi7h',
  emailjsQuoteTemplateId: 'b4r8g4g',
  emailjsPublicKey: 'nBzagPSANU0gjdJ1o',

  // Company emails
  companyEmail: 'cenredgonzales@gmail.com',

  // Site URLs
  siteUrl: 'https://solar.bizguro.net',
  githubRepo: 'https://github.com/CenredJun/solarized',

  // Google Analytics (optional)
  gaTrackingId: 'YOUR_GA_ID_HERE'
};
