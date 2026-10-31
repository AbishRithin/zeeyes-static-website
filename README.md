# ZEEYES Books - Modern Bookkeeping & Accounting Website

A complete, modern, professional, and responsive static business website for **ZEEYES Books**, engineered with pure **HTML5, CSS3, and vanilla JavaScript** (zero external frameworks or runtime dependencies).

---

## 🌟 Project Overview

**ZEEYES Books** is a modern cloud bookkeeping, corporate tax, and fractional CFO platform designed for high-growth startups, e-commerce sellers, agencies, and modern enterprises.

The website provides an engaging, high-conversion, and interactive digital experience:
- **Brand Identity**: Clean, simple fintech aesthetic (midnight slate, crisp whites, and classic emerald/forest green).
- **Architecture**: 100% Vanilla HTML5 / CSS3 / ES6+ JavaScript.
- **Responsive**: Fluid breakpoints optimized for mobile (375px+), tablet (768px+), laptop (1024px+), and 4K displays.
- **Client Experience**: Dedicated interactive client authentication and live Client Portal dashboard with real-time CPA chat simulation and financial metrics.

---

## 📁 File Structure

```text
zeeyes-books/
├── index.html            # Homepage (Hero, Live Dashboard preview, ROI Calculator, Testimonials, FAQ)
├── services.html         # Detailed Services (Bookkeeping, Tax, Fractional CFO, Historical Cleanup)
├── pricing.html          # Transparent Pricing (Monthly/Annual switcher, Custom spend slider, Add-ons)
├── integrations.html     # Integrations Hub (Searchable & filterable directory with 16+ connectors)
├── resources.html        # Resources & Tools (Interactive Cash Runway Calculator, free guides & templates)
├── about.html            # Company & Team (Story, Values, Leadership & CPA profiles, Security)
├── contact.html          # Contact & Consultation (Discovery call scheduler, SLAs, Office locations)
├── login.html            # Client Login Portal (1-click demo test-drive, SSO options, password reset)
├── portal.html           # Interactive Client Dashboard (Live metrics, close tracker, CPA messenger)
│
├── css/
│   ├── style.css         # Design system tokens, typography, CSS reset, header, footer, toast system
│   ├── components.css    # Reusable UI components (cards, calculators, accordions, modals, tables)
│   ├── pages.css         # Page-specific layouts (hero visual, auth split screen, client dashboard)
│   └── responsive.css    # Mobile, tablet, and responsive media queries
│
├── js/
│   ├── main.js           # Header scroll, mobile drawer, accordions, modals, and toast notifications
│   ├── calculators.js    # Financial Health ROI calculator, pricing slider, and runway calculator
│   ├── integrations.js   # Live search engine, category filter pills, and integration detail modal
│   ├── auth.js           # Client login validation, 1-click demo auto-fill, and password recovery
│   └── portal.js         # Interactive CPA chat with auto-reply, document downloads, receipt upload
│
└── assets/
    └── images/
        ├── logo.svg          # Primary vector brand logo
        └── logo-white.svg    # Inverted vector logo for dark surfaces
```

---

## ✨ Key Features & Interactive Capabilities

1. **Interactive ROI & Savings Calculator** (`index.html` & `js/calculators.js`):
   - Founders can slide their monthly expenses and transaction volume to instantly compute estimated hours saved per month, tax deductions discovered, and calculated ROI multiplier.
2. **Dynamic Pricing Estimator & Switcher** (`pricing.html`):
   - Toggle between Monthly and Annual billing (-20% discount).
   - Interactive slider estimates exact monthly pricing based on operating spend.
3. **Searchable & Filterable Integrations Hub** (`integrations.html` & `js/integrations.js`):
   - Real-time search across 16+ business tools (QuickBooks, Stripe, Shopify, Mercury, Gusto, Brex, Plaid).
   - Filter pills by category (Accounting, Banking, E-Commerce, Payments, Payroll, Invoicing).
   - Click-to-inspect detail modal showing sync frequency, setup time, and features.
4. **Startup Cash Runway Calculator** (`resources.html`):
   - Computes net monthly burn, survival horizon in months, and offers financial recommendations.
5. **Interactive Client Login & Portal** (`login.html` & `portal.html`):
   - Includes a **"1-Click Test Drive Demo Account"** button for immediate exploration.
   - Month-end close progress tracker with 4-stage visual status.
   - Interactive dedicated CPA messenger with smart contextual auto-replies.
   - Simulated financial statement downloads (P&L, Balance Sheet, Form 1120-S).
   - Receipt upload queue with OCR extraction simulation.

---

## 🚀 How to Run Locally

Because this is a pure static website with no compilation or build steps required:

1. **Directly in Browser**: Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
2. **Using a Local Static Server**:
   ```bash
   # Using Python 3:
   python -m http.server 8000

   # Or using Node.js npx:
   npx serve .
   ```
   Then open `http://localhost:8000` in your browser.
