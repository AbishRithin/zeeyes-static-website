/**
 * ZEEYES Books - Integrations Hub Engine
 * Real-time search, category filtering, and modal detail inspector.
 */

const INTEGRATIONS_DATA = [
  {
    id: 'qbo',
    name: 'QuickBooks Online',
    category: 'accounting',
    badge: 'Certified Partner',
    sync: 'Real-Time Bi-Directional',
    desc: 'Seamless dual-sync for general ledger, chart of accounts, and automated journal entries.',
    features: ['Direct Chart of Accounts Mapping', 'Automated Journal Entries', 'Vendor & Customer Sync', 'Audit Log Trail'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'xero',
    name: 'Xero',
    category: 'accounting',
    badge: 'Gold Partner',
    sync: 'Real-Time Bi-Directional',
    desc: 'Native cloud sync for multi-currency reconciliations, fixed assets, and custom tax codes.',
    features: ['Multi-Currency Ledger Reconciliations', 'Fixed Asset Tracking', 'Automated Bank Feeds', 'Tax Rate Auto-Detection'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payments',
    badge: 'Popular',
    sync: 'Instant Webhooks',
    desc: 'Pulls net revenue, merchant processing fees, customer refunds, and dispute reserves.',
    features: ['Gross vs Net Revenue Splitting', 'Automated Processing Fee Segregation', 'Dispute & Chargeback Tracking', 'SaaS MRR Breakdown'],
    setupTime: 'Instant'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'ecommerce',
    badge: 'Direct API',
    sync: 'Hourly Sync',
    desc: 'Integrates store orders, gift card liabilities, inventory COGS, and state sales tax liabilities.',
    features: ['Order-Level COGS Recognition', 'Sales Tax Remittance Tracking', 'Inventory Valuation Sync', 'Discounts & Promo Auditing'],
    setupTime: '< 3 minutes'
  },
  {
    id: 'gusto',
    name: 'Gusto Payroll',
    category: 'payroll',
    badge: 'Preferred',
    sync: 'Per-Pay-Period',
    desc: 'Automates payroll journal entries, employer tax allocations, employee benefits, and reimbursements.',
    features: ['W-2 & 1099 Split Categorization', 'Employer Payroll Tax Tracking', 'Departmental Cost Centers', 'Health & 401(k) Liability Sync'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'mercury',
    name: 'Mercury Bank',
    category: 'banking',
    badge: 'Direct API',
    sync: 'Real-Time Read-Only',
    desc: 'Instant, secure bank statement sync for tech startups, checking, treasury, and venture debt.',
    features: ['Direct Open-Banking Feed', 'Check & Wire Reconciliation', 'Treasury Yield Tracking', 'Sub-Account Segregation'],
    setupTime: 'Instant'
  },
  {
    id: 'brex',
    name: 'Brex',
    category: 'banking',
    badge: 'Official Integration',
    sync: 'Hourly Sync',
    desc: 'Corporate card transactions with receipt image attachments, department tags, and spend limits.',
    features: ['Automated Receipt OCR Capture', 'Employee Card Policy Enforcement', 'Rewards & Cashback Accounting', 'Multi-Entity Spend Tracking'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'plaid',
    name: 'Plaid Bank Feeds',
    category: 'banking',
    badge: '12,000+ Banks',
    sync: 'Daily Auto-Refresh',
    desc: 'Connects over 12,000+ banks worldwide via end-to-end 256-bit encrypted bank-grade connections.',
    features: ['Bank-Level 256-bit AES Encryption', 'Tokenized Credentials (No password stored)', 'Daily Balance Verification', 'Duplicate Tx Prevention'],
    setupTime: 'Instant'
  },
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    category: 'ecommerce',
    badge: 'E-Com Suite',
    sync: 'Daily Settlement Sync',
    desc: 'Decodes complicated Amazon bi-weekly settlement summaries, FBA fees, storage costs, and advertising spend.',
    features: ['FBA Fee Disaggregation', 'Amazon Advertising Ad-Spend Accrual', 'Return Reserves Allocation', 'Multi-Marketplace (US, UK, CA, EU)'],
    setupTime: '< 5 minutes'
  },
  {
    id: 'rippling',
    name: 'Rippling',
    category: 'payroll',
    badge: 'Enterprise HR',
    sync: 'Per-Pay-Period',
    desc: 'Global workforce payroll sync, international contractor invoices, and multi-entity benefits.',
    features: ['Global PEO / EOR Payroll Mapping', 'Contractor 1099-NEC Aggregation', 'State Tax Registration Sync', 'Executive Comp Split'],
    setupTime: '< 3 minutes'
  },
  {
    id: 'bill',
    name: 'Bill.com',
    category: 'invoicing',
    badge: 'AP/AR Pro',
    sync: 'Real-Time',
    desc: 'Synchronizes accounts payable approvals, automated check mailings, ACH payments, and incoming wire status.',
    features: ['AP Approval Workflow Sync', 'Vendor Tax ID / W-9 Verification', 'Aging Receivables Tracking', 'Foreign Vendor FX Wire Rates'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'expensify',
    name: 'Expensify',
    category: 'invoicing',
    badge: 'SmartScan',
    sync: 'Daily Auto-Sync',
    desc: 'Employee expense report sync, corporate receipt tracking, mileage calculations, and client bill-backs.',
    features: ['SmartScan Receipt Auditing', 'Reimbursable Expense Routing', 'Project-Based Billing Tags', 'Currency Auto-Conversion'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'paypal',
    name: 'PayPal for Business',
    category: 'payments',
    badge: 'Direct Feed',
    sync: 'Real-Time Sync',
    desc: 'Merchant transactions, dispute holds, cross-border currency conversion fees, and checkout payments.',
    features: ['Multi-Currency Wallet Reconciliation', 'PayPal Working Capital Loan Sync', 'Refund Reversals', 'Dispute Hold Ledgering'],
    setupTime: 'Instant'
  },
  {
    id: 'square',
    name: 'Square POS',
    category: 'payments',
    badge: 'Retail & POS',
    sync: 'Hourly Sync',
    desc: 'Brick-and-mortar register sync, tips distribution, hardware fees, and customer checkout payments.',
    features: ['Daily Cash Drawer Reconciliation', 'Employee Tip Pooling', 'Gift Card Sales & Redemptions', 'Sales Tax by Municipal Zip Code'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'wise',
    name: 'Wise Business',
    category: 'banking',
    badge: 'Global FX',
    sync: 'Real-Time',
    desc: 'Multi-currency international bank accounts, real mid-market exchange rate sync, and cross-border transfers.',
    features: ['Real-Time Mid-Market FX Rate Sync', 'Multi-Currency Account Balancing', 'Global Contractor Payouts', 'Low-Fee Cross-Border Auditing'],
    setupTime: '< 2 minutes'
  },
  {
    id: 'ramp',
    name: 'Ramp Card',
    category: 'banking',
    badge: 'Automated AP',
    sync: 'Instant Sync',
    desc: 'Corporate charge card, automated receipt matching via SMS/email, and intelligent expense policy controls.',
    features: ['Autonomous Receipt Matching', 'Vendor Contract Price Intelligence', 'Automated GL Code Suggestions', 'Savings Insights Integration'],
    setupTime: '< 2 minutes'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initIntegrationsHub();
});

function initIntegrationsHub() {
  const grid = document.getElementById('integrations-grid');
  const searchInput = document.getElementById('integration-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const countBadge = document.getElementById('integrations-count');

  if (!grid) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderCards() {
    grid.innerHTML = '';

    const filtered = INTEGRATIONS_DATA.filter(item => {
      const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (countBadge) countBadge.textContent = `${filtered.length} Integrations`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px dashed var(--border-medium);">
          <div style="width: 52px; height: 52px; margin: 0 auto 0.75rem auto; background: #f1f5f9; color: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No matching integrations found</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Need a custom API or ERP connection like NetSuite or SAP?</p>
          <button class="btn btn-primary btn-sm" data-modal-target="contact-modal">Request Custom Connector</button>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'integration-card';
      card.innerHTML = `
        <div class="integration-card-top">
          <div class="integration-logo-badge">${item.name.substring(0, 2).toUpperCase()}</div>
          <span class="sync-badge">${item.sync}</span>
        </div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <div class="integration-card-footer">
          <span><strong style="color: var(--text-main);">${item.badge}</strong></span>
          <span style="color: var(--color-primary); font-weight: 600;">View Details &rarr;</span>
        </div>
      `;

      card.addEventListener('click', () => openIntegrationDetailModal(item));
      grid.appendChild(card);
    });
  }

  // Filter Pill Click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderCards();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderCards();
    });
  }

  // Initial render
  renderCards();
}

// Open Integration Detail Modal
function openIntegrationDetailModal(item) {
  let modal = document.getElementById('integration-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'integration-detail-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 42px; height: 42px; border-radius: 10px; background: var(--color-primary-light); color: var(--color-primary); font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
            ${item.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem;">${item.name}</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Category: ${item.category}</span>
          </div>
        </div>
        <button class="modal-close-btn" data-modal-close>&times;</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom: 1.25rem; background: var(--bg-subtle); padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; font-size: 0.85rem;">
          <span><strong>Sync Frequency:</strong> ${item.sync}</span>
          <span><strong>Setup Time:</strong> ${item.setupTime}</span>
        </div>
        <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${item.desc} ZEEYES Books automatically connects via secure API tokens to pull, verify, and categorize your business data without manual CSV exports.
        </p>

        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
          Key Sync Capabilities
        </h4>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem;">
          ${item.features.map(f => `
            <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem;">
              <span style="color: var(--color-accent); font-weight: 800;">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary btn-block" onclick="simulateConnect('${item.name}')">Connect ${item.name} Now</button>
          <button class="btn btn-outline" data-modal-close>Close</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach close events
  modal.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Expose globally for clickable badges and modals across the site
window.openIntegrationDetailModal = openIntegrationDetailModal;

window.openIntegrationById = function(id) {
  if (!id) return;
  const target = id.toLowerCase();
  const item = INTEGRATIONS_DATA.find(i => 
    i.id.toLowerCase() === target || 
    i.name.toLowerCase().includes(target)
  );
  if (item) {
    openIntegrationDetailModal(item);
  } else {
    window.showToast(`Integration information for "${id}" is loading...`, 'info');
  }
};

// Simulate Connect
window.simulateConnect = function(name) {
  const modal = document.getElementById('integration-detail-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.showToast(`Connecting to ${name}... Redirecting to OAuth authentication flow.`, 'success');
  setTimeout(() => {
    window.location.href = 'login.html?ref=connect_' + encodeURIComponent(name);
  }, 1200);
};
