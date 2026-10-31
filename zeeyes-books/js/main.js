/**
 * ZEEYES Books - Main Global JavaScript
 * Handles navigation, mobile drawer, accordions, modals, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure all standalone buttons default to type="button" to avoid accidental form submit
  document.querySelectorAll('button:not([type])').forEach(btn => {
    // If the button is inside a form, keep default (submit) unless explicitly defined
    if (!btn.closest('form')) {
      btn.setAttribute('type', 'button');
    }
  });

  // Generic button action handler
  // Buttons can declare data-action="navigate" with data-href, or data-action="download" with data-file
  document.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      if (action === 'navigate') {
        const target = btn.getAttribute('data-href');
        if (target) {
          window.location.href = target;
        }
      } else if (action === 'download') {
        const file = btn.getAttribute('data-file');
        if (file) {
          // Create a temporary link to trigger download
          const a = document.createElement('a');
          a.href = file;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.showToast('Downloading file...', 'success');
        }
      } else {
        // Fallback: just show a toast indicating the button was clicked
        const label = btn.textContent.trim();
        window.showToast(`${label} button clicked.`, 'info');
      }
    });
  });

  initStickyHeader();
  initMobileDrawer();
  initAccordions();
  initModals();
  initNewsletterForm();
  initTopbarClose();
  initSmoothScroll();
  initAuditWorkbenchToggle();
}); {
  initStickyHeader();
  initMobileDrawer();
  initAccordions();
  initModals();
  initNewsletterForm();
  initTopbarClose();
  initSmoothScroll();
  initAuditWorkbenchToggle();
});

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Drawer Navigation
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close on pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

// FAQ Accordion
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other accordions in the same list
      const parent = item.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
      }
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Global Modals
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close when clicking outside modal box
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

// Global Toast System
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem; color: ${type === 'success' ? 'var(--color-accent)' : 'var(--color-danger)'};">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Newsletter Form Submit
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim() && input.checkValidity()) {
        window.showToast(`Thank you! ${input.value.trim()} is now subscribed to ZEEYES Financial Weekly.`, 'success');
        input.value = '';
      } else {
        window.showToast('Please enter a valid business email address.', 'error');
      }
    });
  });
}

// Topbar Close
function initTopbarClose() {
  const closeBtn = document.querySelector('.topbar-close');
  const topbar = document.querySelector('.topbar');
  if (closeBtn && topbar) {
    closeBtn.addEventListener('click', () => {
      topbar.style.display = 'none';
    });
  }
}

// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Interactive Hero CPA Audit Workbench Switcher
function initAuditWorkbenchToggle() {
  const btnHuman = document.getElementById('tab-audit-human');
  const btnAi = document.getElementById('tab-audit-ai');
  const panelHuman = document.getElementById('panel-audit-human');
  const panelAi = document.getElementById('panel-audit-ai');

  if (!btnHuman || !btnAi || !panelHuman || !panelAi) return;

  btnHuman.addEventListener('click', () => {
    btnHuman.classList.add('active');
    btnAi.classList.remove('active');
    panelHuman.style.display = 'flex';
    panelAi.style.display = 'none';
  });

  btnAi.addEventListener('click', () => {
    btnAi.classList.add('active');
    btnHuman.classList.remove('active');
    panelHuman.style.display = 'none';
    panelAi.style.display = 'flex';
  });
}
}
