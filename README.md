# ☀️ Solar Cenred — AI-Powered Solar Company Website

A complete, production-ready solar company website with an integrated AI chat assistant — built as a portfolio template that any small business can adapt.

- **Live demo:** https://solarized.bizguro.net
- **GitHub repo:** https://github.com/CenredJun/solarized

---

## ✨ Features

- **5 fully responsive pages:** Home, About, Gallery, Contact, Blog
- **AI chatbot** powered by the Anthropic Claude API (`claude-sonnet-4-20250514`) with a comprehensive solar knowledge base injected into the system prompt
- **Lead capture & re-engagement:** localStorage lead profile, UTM tracking, returning-visitor banners, page-view history
- **Quote automation:** chatbot collects name, email, kWh, system type, then emails a structured quote via EmailJS
- **Interactive savings calculator** (PHP / USD currency toggle, real-time results)
- **Filterable project gallery** with lightbox, before/after comparisons
- **Contact form** wired to EmailJS — no backend required
- **SEO-ready:** semantic HTML, meta tags, Open Graph, Schema.org LocalBusiness, sitemap, robots.txt
- **GitHub Pages compatible:** pure static HTML/CSS/JS, no build step
- **Light theme** with solar-orange accent, Inter font, Font Awesome icons
- **Smooth scroll animations** via Intersection Observer

---

## 🚀 Quick Setup (4 steps)

1. **Clone the repo**
   ```bash
   git clone https://github.com/CenredJun/solarized.git
   cd solarized
   ```

2. **Edit `config.js`** — fill in your API keys:
   ```js
   claudeApiKey:        'sk-ant-...',
   emailjsServiceId:    'service_xxx',
   emailjsTemplateId:   'template_xxx',
   emailjsQuoteTemplateId: 'template_yyy',
   emailjsPublicKey:    'public_xxx',
   companyEmail:        'you@example.com'
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial deploy"
   git push origin main
   ```

4. **Enable GitHub Pages** in repo Settings → Pages → Source: `main` / root.
   Your site is live at `https://<username>.github.io/<repo>/`.

To use a custom domain (e.g. `solarized.bizguro.net`), add a `CNAME` file containing your domain and configure DNS A/CNAME records to point at GitHub Pages.

---

## 🔑 Configuration Guide

### Anthropic Claude API
1. Create an account at [console.anthropic.com](https://console.anthropic.com).
2. Generate an API key.
3. Paste into `config.js → claudeApiKey`.

> **⚠️ Security note:** Embedding an API key in static JS exposes it to anyone visiting your site. For production, route the request through a serverless function (e.g., Netlify / Vercel / Cloudflare Workers) so the key stays server-side. The chatbot has built-in fallback responses that work without an API key for local demos.

### EmailJS (free tier)
1. Sign up at [emailjs.com](https://www.emailjs.com).
2. Add an email service (Gmail, Outlook, etc.).
3. Create two templates: one for **contact-form inquiries** and one for **AI-generated quotes**.
4. Copy the IDs into `config.js`.

### Custom Domain
- Add a `CNAME` file in the repo root containing only your domain.
- Update `siteUrl` in `config.js`, `og:url` meta tags, and `sitemap.xml`.
- Configure DNS at your registrar (`A` records to GitHub Pages IPs or a `CNAME` to `<username>.github.io`).

### Google Analytics (optional)
- Add your `GA_MEASUREMENT_ID` to `config.js → gaTrackingId`.
- Add the gtag snippet to each HTML `<head>` (not included by default for performance).

---

## 🎨 Customizing for Other Industries

This template is structured so you can re-skin it for any small business in roughly half a day:

| Industry | What to change |
|---|---|
| **Real Estate** | Knowledge base → property listings, financing terms, neighborhoods. Gallery → property photos. Calculator → mortgage estimator. Chatbot CTA → "Schedule a viewing". |
| **Dental Clinic** | Knowledge base → procedures, insurance accepted, FAQs. Gallery → before/after smile photos. Form → appointment intake. Chatbot CTA → "Book an appointment". |
| **Restaurant** | Knowledge base → menu, dietary info, hours. Gallery → dishes and ambiance. Calculator → group-booking quote. Chatbot CTA → "Reserve a table". |
| **Law Firm** | Knowledge base → practice areas, fee structures, attorney bios. Gallery → case studies (anonymized). Form → free-consultation intake. Chatbot CTA → "Speak to a paralegal". |
| **Auto Detailing** | Knowledge base → services, packages, materials. Gallery → before/after car photos. Calculator → package selector. Chatbot CTA → "Book a slot". |

The pieces that almost never change:
- Lead-capture & re-engagement system (`js/lead.js`)
- Chatbot UI shell (`js/chatbot.js`)
- EmailJS plumbing in `js/main.js`
- Page scaffolds (just rename sections)

The pieces you customize:
- `knowledge/knowledge-base.js` — replace solar content with your domain knowledge
- `config.js` — your API keys, contact email, site URLs
- `css/style.css` — change `--color-primary` and `--color-secondary` to your brand
- Hero copy, testimonials, gallery items, blog post titles

---

## 🧱 Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** (no framework, no build step)
- **Anthropic Claude API** — `claude-sonnet-4-20250514`
- **EmailJS** — client-side transactional email
- **Inter** font (Google Fonts) · **Font Awesome 6** icons
- **Intersection Observer API** — scroll-triggered animations
- **localStorage** — chat history, lead profile, newsletter subscriptions
- **GitHub Pages** — free static hosting

---

## 📁 File Structure

```
solarized/
├── index.html              ← Home (hero, calculator, testimonials)
├── about.html              ← Mission, team, certifications
├── gallery.html            ← 16-item filterable gallery + lightbox
├── contact.html            ← EmailJS contact form, map, office info
├── blog.html               ← 6 chatbot-linked blog cards + newsletter
├── config.js               ← API keys & site settings (edit before deploy)
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── style.css           ← Complete stylesheet (~900 lines)
├── js/
│   ├── main.js             ← Nav, animations, calculator, form submit
│   ├── lead.js             ← Lead capture, UTM, re-engagement banners
│   └── chatbot.js          ← Claude API integration + quote automation
├── knowledge/
│   └── knowledge-base.js   ← SOLAR_KNOWLEDGE_BASE constant (full corpus)
└── assets/
    └── images/             ← (CSS-gradient placeholders by default)
```

---

## 💼 Portfolio Value

**Solar Cenred** demonstrates how any SMB can deploy AI-powered sales automation **with no backend infrastructure** — just static files on free hosting. The pattern proven here generalizes:

- 24/7 AI sales agent that quotes, qualifies, and captures leads
- Persistent lead profiles in the browser, no database required
- Transactional email through EmailJS, no server-side SMTP
- Automated re-engagement for returning visitors
- One file (`knowledge-base.js`) holds *all* your domain expertise

Total deployment cost for a small business: **\$0/mo hosting + Claude API usage + EmailJS free tier**.

---

## 📝 License

MIT — free to use, modify, and deploy for personal or commercial projects.

---

Built with ❤️ and AI · Powered by [Claude](https://claude.ai)
