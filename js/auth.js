/**
 * ZEEYES Books - Client Portal Authentication Script
 * Validations, Demo Test-Drive shortcut, and session mock.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initDemoAccountQuickFill();
  initForgotPassword();
});

function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      window.showToast('Please provide both email and password.', 'error');
      return;
    }

    // Visual loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Verifying credentials...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Mock successful login
      localStorage.setItem('zeeyes_logged_in', 'true');
      localStorage.setItem('zeeyes_user_email', email);
      window.showToast('Login successful! Loading your financial portal...', 'success');
      
      setTimeout(() => {
        window.location.href = 'portal.html';
      }, 800);
    }, 900);
  });
}

function initDemoAccountQuickFill() {
  const demoBtn = document.getElementById('demo-login-btn');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.querySelector('#login-form button[type="submit"]');

  if (!demoBtn || !emailInput || !passwordInput) return;

  demoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emailInput.value = 'founder@acmeinnovations.com';
    passwordInput.value = 'DemoPass2026!';
    window.showToast('Demo credentials pre-filled! Logging you in...', 'success');

    if (submitBtn) {
      setTimeout(() => {
        submitBtn.click();
      }, 500);
    }
  });
}

function handleGoogleCredentialResponse(response) {
  console.log('Google credential response', response);
  // For demo purposes, treat any response as successful login.
  // Extract email if needed: const decoded = JSON.parse(atob(response.credential.split('.')[1]));
  localStorage.setItem('zeeyes_logged_in', 'true');
  window.showToast('Google login successful! Redirecting to portal...', 'success');
  setTimeout(() => window.location.href = 'portal.html', 1200);
}

// Simple mock Google login handler for the custom button
function handleGoogleLogin() {
  // In a real implementation, this would trigger the Google Identity Service.
  // Here we simulate a successful login for demo purposes.
  window.showToast('Google login (demo) successful! Redirecting...', 'success');
  setTimeout(() => {
    localStorage.setItem('zeeyes_logged_in', 'true');
    window.location.href = 'portal.html';
  }, 1200);
}

  console.log('Google credential response', response);
  // For demo purposes, treat any response as successful login.
  // Extract email if needed: const decoded = JSON.parse(atob(response.credential.split('.')[1]));
  localStorage.setItem('zeeyes_logged_in', 'true');
  window.showToast('Google login successful! Redirecting to portal...', 'success');
  setTimeout(() => {
    window.location.href = 'portal.html';
  }, 1200);
}


  const forgotForm = document.getElementById('forgot-password-form');
  if (!forgotForm) return;

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value.trim();
    if (!email) {
      window.showToast('Please enter your account email.', 'error');
      return;
    }

    const modal = document.getElementById('forgot-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    window.showToast(`Password recovery instructions sent to ${email}`, 'success');
  });
}

