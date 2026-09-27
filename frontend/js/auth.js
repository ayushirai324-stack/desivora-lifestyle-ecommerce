/* ==========================================================================
   DESIVORA AUTHENTICATION & USER SESSION CONTROLLER
   ========================================================================== */

const TOKEN_KEY = 'desivora_token';
const USER_KEY = 'desivora_user';
const LEGACY_TOKEN_KEY = 'valene_token';
const LEGACY_USER_KEY = 'valene_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY) || localStorage.getItem(LEGACY_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  updateAuthUI();
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(LEGACY_USER_KEY);
  updateAuthUI();
}

export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  setSession(data.token, data.user);
  return data;
}

export async function register(name, email, password) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  setSession(data.token, data.user);
  return data;
}

export function logout() {
  clearSession();
  window.location.href = 'index.html';
}

// Update header account button
export function updateAuthUI() {
  const accountLinks = document.querySelectorAll('.header-account-link');
  const user = getCurrentUser();

  accountLinks.forEach(link => {
    if (user) {
      link.setAttribute('href', 'account.html');
      link.setAttribute('title', `Account: ${user.name}`);
      const icon = link.querySelector('svg');
      if (icon) {
        link.innerHTML = `
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--accent-light); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;">
            ${user.name.charAt(0).toUpperCase()}
          </div>
        `;
      }
    } else {
      link.setAttribute('href', 'login.html');
      link.setAttribute('title', 'Sign In');
    }
  });
}
