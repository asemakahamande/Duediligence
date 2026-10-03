import React, { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '../config/formSecurity';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const loadScript = () =>
  new Promise((resolve) => {
    if (window.turnstile) return resolve();
    let el = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!el) {
      el = document.createElement('script');
      el.src = SCRIPT_SRC;
      el.async = true;
      document.head.appendChild(el);
    }
    el.addEventListener('load', () => resolve());
  });

// Renders nothing when no site key is configured.
const TurnstileWidget = ({ onToken }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let widgetId;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !ref.current || !window.turnstile) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken('')
      });
    });
    return () => {
      cancelled = true;
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className="flex justify-center" />;
};

export default TurnstileWidget;
