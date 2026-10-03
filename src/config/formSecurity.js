// Shared client-side form protection helpers (validation, cooldown, sanitising).
// NOTE: client-side checks reduce abuse but cannot replace server-side filtering;
// Web3Forms spam filtering + domain restriction + Turnstile should also be enabled.

// Cloudflare Turnstile site key (public). Create at dash.cloudflare.com -> Turnstile.
// Leave empty to disable the widget until the key is available.
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

export const LIMITS = { name: 100, email: 120, phone: 20, message: 1000 };

const COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;
const STORAGE_KEY = 'dd_form_guard';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9\s\-()]{6,20}$/;
const URL_RE = /(https?:\/\/|www\.)/i;

export const clean = (value = '') =>
  String(value).replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();

export const cleanMultiline = (value = '') =>
  String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

// Returns an error string, or '' when valid.
export const validateContact = ({ fullName, email, phone, message }) => {
  if (!fullName || fullName.length < 2) return 'Please enter your full name.';
  if (fullName.length > LIMITS.name) return 'Name is too long.';
  if (URL_RE.test(fullName)) return 'Links are not allowed in the name field.';
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return 'Please enter a valid email address.';
  if (!PHONE_RE.test(phone)) return 'Please enter a valid phone number.';
  if (message !== undefined) {
    if (message.length < 5) return 'Please enter a longer message.';
    if (message.length > LIMITS.message) return `Message must be under ${LIMITS.message} characters.`;
    if ((message.match(URL_RE) || []).length > 2) return 'Too many links in message.';
  }
  return '';
};

const readGuard = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || { last: 0, count: 0 };
  } catch {
    return { last: 0, count: 0 };
  }
};

// Returns an error string if the user must wait / exceeded attempts, else ''.
export const checkRateLimit = () => {
  const { last, count } = readGuard();
  if (count >= MAX_ATTEMPTS) return 'Too many submissions from this session. Please try again later.';
  const wait = COOLDOWN_MS - (Date.now() - last);
  if (wait > 0) return `Please wait ${Math.ceil(wait / 1000)}s before sending again.`;
  return '';
};

export const recordSubmission = () => {
  const { count } = readGuard();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ last: Date.now(), count: count + 1 }));
  } catch {
    /* storage unavailable */
  }
};
