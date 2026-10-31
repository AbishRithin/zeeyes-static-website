/**
 * ZEEYES Books - Client Portal Interactive Engine
 * Handles real-time messaging with dedicated CPA, document downloads,
 * receipt uploads, and simulated ledger activities.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortalSession();
  initCpaChat();
  initDocumentDownloads();
  initReceiptUpload();
  initLogout();
});

function initPortalSession() {
  const userEmail = localStorage.getItem('zeeyes_user_email') || 'alex.rivers@acmetech.io';
  const emailDisplay = document.getElementById('user-email-display');
  const greetingEl = document.getElementById('portal-greeting');

  if (emailDisplay) emailDisplay.textContent = userEmail;

  if (greetingEl) {
    const hour = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    if (hour >= 17) timeGreeting = 'Good evening';
    greetingEl.textContent = `${timeGreeting}, Alex! Here is your October 2026 financial summary.`;
  }
}

// Interactive Dedicated CPA Messenger
function initCpaChat() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  if (!chatForm || !chatInput || !messagesContainer) return;

  const CPA_RESPONSES = [
    {
      keywords: ['lunch', 'meal', 'dinner', 'food'],
      reply: "Business meals with clients or team strategy sessions are generally 50% tax deductible. Just make sure to note the business purpose and attendees on the receipt!"
    },
    {
      keywords: ['close', 'october', 'month', 'status', 'ready'],
      reply: "We are currently 85% through your October reconciliation. We've matched 412 transactions and just need to confirm 2 uncategorized wires from Stripe. Expect your completed financial package by Thursday morning!"
    },
    {
      keywords: ['deduct', 'laptop', 'macbook', 'equipment', 'computer'],
      reply: "Yes, 100%! Computer equipment and software used primarily for business can be deducted immediately under Section 179 expensing or bonus depreciation."
    },
    {
      keywords: ['tax', '1099', 'w2', 'filing', 'irs'],
      reply: "All vendor 1099-NEC thresholds are automatically being tracked. We will generate and electronically distribute your 1099s in January before the IRS deadline."
    },
    {
      keywords: ['wire', 'transfer', 'mercury', 'bank'],
      reply: "I see your latest Mercury wire transfer. I have already matched it against the invoice in your Bill.com feed. No further action needed!"
    }
  ];

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user message
    appendChatMessage('user', text);
    chatInput.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate CPA typing & response
    setTimeout(() => {
      // Find matching response or default
      let responseText = "Thanks for the message, Alex! I've logged this in your ledger notes and will review it during our afternoon reconciliation pass.";
      const lowerText = text.toLowerCase();

      for (const item of CPA_RESPONSES) {
        if (item.keywords.some(kw => lowerText.includes(kw))) {
          responseText = item.reply;
          break;
        }
      }

      appendChatMessage('cpa', responseText);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      window.showToast('New message received from Sarah Jenkins (Lead CPA)', 'info');
    }, 1100);
  });

  function appendChatMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    bubble.innerHTML = `
      <div>${text}</div>
      <div style="font-size: 0.7rem; opacity: 0.7; margin-top: 0.25rem; text-align: ${sender === 'user' ? 'right' : 'left'};">
        ${sender === 'cpa' ? 'Sarah Jenkins, CPA • ' : 'You • '} ${timeStr}
      </div>
    `;
    messagesContainer.appendChild(bubble);
  }
}

// Document Downloads
function initDocumentDownloads() {
  document.querySelectorAll('[data-doc-download]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc-download');
      window.showToast(`Generating and downloading: ${docName}...`, 'success');
    });
  });
}

// Receipt Upload Mock
function initReceiptUpload() {
  const uploadBtn = document.getElementById('btn-upload-receipt');
  if (!uploadBtn) return;

  uploadBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,image/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        window.showToast(`Securely routing "${file.name}" to your assigned CPA review desk...`, 'info');
        setTimeout(() => {
          window.showToast(`Success! "${file.name}" logged and assigned to Sarah Jenkins, CPA for manual reconciliation.`, 'success');
        }, 1600);
      }
    };

    input.click();
  });
}

// Logout
function initLogout() {
  const logoutBtn = document.getElementById('portal-logout-btn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('zeeyes_logged_in');
    window.showToast('Logged out successfully.', 'info');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 600);
  });
}
