// ─── Sticky Navigation ───────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Smooth Scroll ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = a.getAttribute('href');
      if (target.length > 1) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Set initial nav state
  const nav = document.querySelector('nav');
  if (nav && window.scrollY > 50) nav.classList.add('scrolled');
});

// ─── Intersection Observer for fade-in animations ────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// ─── Counter Animation ───────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = Math.floor(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
});

// ─── Mobile Menu ─────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

// ─── Gallery Filter ──────────────────────────────────────────
function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.display = (category === 'all' || item.dataset.category === category) ? 'flex' : 'none';
  });
}

// ─── Lightbox ────────────────────────────────────────────────
function openLightbox(title, type, size, desc) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.style.display = 'flex';
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-type').textContent = 'Type: ' + type;
  document.getElementById('lightbox-size').textContent = 'System size: ' + size;
  document.getElementById('lightbox-desc').textContent = desc;
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.style.display = 'none';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', e => {
      if (e.target === lb) closeLightbox();
    });
  }
});

// ─── Solar Calculator ────────────────────────────────────────
let calcCurrency = 'PHP';

function setCurrency(curr, btn) {
  calcCurrency = curr;
  document.querySelectorAll('.currency-toggle button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const slider = document.getElementById('bill-slider');
  if (!slider) return;
  if (curr === 'PHP') {
    slider.min = 500; slider.max = 20000; slider.step = 500; slider.value = 5000;
  } else {
    slider.min = 50; slider.max = 500; slider.step = 10; slider.value = 150;
  }
  updateCalculator();
}

function calculateSolar(monthlyBill, currency) {
  const ratePerKwh = currency === 'PHP' ? 11 : 0.20;
  const dailyKwh = (monthlyBill / ratePerKwh) / 30;
  const systemSizeKw = Math.ceil((dailyKwh / 4) / 0.9 * 10) / 10;
  const monthlySavings = monthlyBill * 0.85;
  const perKwLow  = currency === 'PHP' ? 80000 : 1500;
  const perKwHigh = currency === 'PHP' ? 120000 : 2200;
  const systemCostLow  = systemSizeKw * perKwLow;
  const systemCostHigh = systemSizeKw * perKwHigh;
  const paybackYears = ((systemCostLow + systemCostHigh) / 2) / (monthlySavings * 12);
  return { dailyKwh, systemSizeKw, monthlySavings, systemCostLow, systemCostHigh, paybackYears };
}

function fmt(n, currency) {
  const symbol = currency === 'PHP' ? '₱' : '$';
  return symbol + Math.round(n).toLocaleString();
}

function updateCalculator() {
  const slider = document.getElementById('bill-slider');
  if (!slider) return;
  const bill = parseFloat(slider.value);
  const r = calculateSolar(bill, calcCurrency);
  const symbol = calcCurrency === 'PHP' ? '₱' : '$';
  document.getElementById('bill-display').textContent = symbol + Math.round(bill).toLocaleString();
  document.getElementById('result-kwh').textContent = r.dailyKwh.toFixed(1) + ' kWh';
  document.getElementById('result-size').textContent = r.systemSizeKw + ' kW';
  document.getElementById('result-savings').textContent = fmt(r.monthlySavings, calcCurrency) + ' /mo';
  document.getElementById('result-cost').textContent = fmt(r.systemCostLow, calcCurrency) + ' – ' + fmt(r.systemCostHigh, calcCurrency);
  document.getElementById('result-payback').textContent = r.paybackYears.toFixed(1) + ' years';
}

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('bill-slider');
  if (slider) {
    slider.addEventListener('input', updateCalculator);
    updateCalculator();
  }
});

// ─── Send calculator data to chatbot ─────────────────────────
function sendCalcToChat() {
  const slider = document.getElementById('bill-slider');
  if (!slider) return;
  const bill = parseFloat(slider.value);
  const r = calculateSolar(bill, calcCurrency);
  const sym = calcCurrency === 'PHP' ? '₱' : '$';
  const msg = `I'd like a detailed quote. My monthly bill is ${sym}${bill.toLocaleString()} (${calcCurrency}), about ${r.dailyKwh.toFixed(1)} kWh/day. The calculator suggests a ${r.systemSizeKw} kW system. Please recommend the best system type and exact components.`;
  if (typeof openChatWithMessage === 'function') openChatWithMessage(msg);
}

// ─── Newsletter signup ───────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (!input || !input.value) return false;
  const subs = JSON.parse(localStorage.getItem('sc_newsletter') || '[]');
  subs.push({ email: input.value, date: Date.now() });
  localStorage.setItem('sc_newsletter', JSON.stringify(subs));
  const msg = document.getElementById('newsletter-msg');
  if (msg) msg.textContent = 'Thank you for subscribing! Check your inbox for solar tips.';
  input.value = '';
  return false;
}

// ─── Contact form submission ─────────────────────────────────
async function submitContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name:        form.elements.name.value,
    email:       form.elements.email.value,
    phone:       form.elements.phone.value,
    location:    form.elements.location.value,
    system:      form.elements.system.value,
    bill:        form.elements.bill.value,
    consumption: form.elements.consumption.value,
    contactPref: form.elements.contactPref.value,
    message:     form.elements.message.value
  };

  // Save to localStorage as a lead
  if (typeof updateLeadData === 'function') {
    updateLeadData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      systemInterest: data.system,
      consumptionLevel: data.consumption,
      stage: 'lead',
      quoteRequested: true
    });
  }

  // Try to send via EmailJS
  if (typeof emailjs !== 'undefined' && SITE_CONFIG.emailjsServiceId.indexOf('YOUR_') === -1) {
    try {
      await emailjs.send(
        SITE_CONFIG.emailjsServiceId,
        SITE_CONFIG.emailjsTemplateId,
        {
          to_email:    SITE_CONFIG.companyEmail,
          from_name:   data.name,
          from_email:  data.email,
          phone:       data.phone,
          location:    data.location,
          system:      data.system,
          bill:        data.bill,
          consumption: data.consumption,
          contact_pref: data.contactPref,
          message:     data.message
        },
        SITE_CONFIG.emailjsPublicKey
      );
    } catch (err) {
      console.warn('EmailJS send failed:', err);
    }
  }

  const success = document.getElementById('form-success');
  if (success) {
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  form.reset();

  // Trigger chatbot to generate preliminary quote
  setTimeout(() => {
    if (typeof openChatWithMessage === 'function') {
      const quoteMsg = `Hi, I just submitted the contact form. My name is ${data.name}, email ${data.email}. I'm interested in a ${data.system} system. My monthly bill is ${data.bill} and daily consumption is ${data.consumption}. Please give me a preliminary quote.`;
      openChatWithMessage(quoteMsg);
    }
  }, 1500);

  return false;
}
