import { sendInfoRequest } from '../../lib/info-request.js';
import { trackEvent } from '../../lib/analytics.js';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

const getTurnstileSiteKey = () =>
  document.querySelector('meta[name="turnstile-site-key"]')?.content?.trim() || '';

const loadTurnstileScript = () => {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener('load', resolve, { once: true }));
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = TURNSTILE_SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
};

const renderForm = ({ prompt, submitLabel }) => `
  <form class="inquiry-form" novalidate>
    <div class="inquiry-form__field">
      <label for="if-contact">Your name <span aria-hidden="true">*</span></label>
      <input id="if-contact" name="contact" type="text" autocomplete="name" required />
    </div>

    <div class="inquiry-form__field">
      <label for="if-email">Email <span aria-hidden="true">*</span></label>
      <input id="if-email" name="fromEmail" type="email" autocomplete="email" required />
    </div>

    <div class="inquiry-form__field">
      <label for="if-message">${prompt} <span aria-hidden="true">*</span></label>
      <textarea id="if-message" name="message" rows="5" required></textarea>
    </div>

    <div class="inquiry-form__hp" aria-hidden="true">
      <label for="if-website">Website</label>
      <input id="if-website" name="website" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <div class="inquiry-form__turnstile"></div>

    <button type="submit" class="tsr-button inquiry-form__submit">${submitLabel}</button>
    <p class="inquiry-form__status" hidden role="status" aria-live="polite"></p>
  </form>
  <style>
    .inquiry-form {
      display: grid;
      gap: 1.25rem;
      width: 100%;
      padding: 1.75rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .inquiry-form__field { display: grid; gap: 0.5rem; }
    .inquiry-form label {
      font-weight: 600;
      font-size: 1rem;
      color: var(--tsr-fg);
    }
    .inquiry-form label span { color: var(--tsr-accent); }
    .inquiry-form input,
    .inquiry-form textarea {
      padding: 0.875rem 1rem;
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      background: var(--tsr-bg);
      color: var(--tsr-fg);
      font: inherit;
      font-size: 1rem;
      width: 100%;
      line-height: 1.4;
    }
    .inquiry-form input:focus-visible,
    .inquiry-form textarea:focus-visible {
      outline: none;
      border-color: var(--tsr-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--tsr-accent) 35%, transparent);
    }
    .inquiry-form__submit {
      justify-self: start;
      font-size: 1rem;
      padding: 0.875rem 1.75rem;
    }
    .inquiry-form__status {
      margin: 0;
      font-weight: 600;
    }
    .inquiry-form__hp {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  </style>
`;

export class TsrInquiryForm extends HTMLElement {
  static get observedAttributes() {
    return ['prompt', 'submit-label'];
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._render();
  }

  _render() {
    const prompt = this.getAttribute('prompt') ?? 'How can we help?';
    const submitLabel = this.getAttribute('submit-label') ?? 'Send message';
    this.innerHTML = renderForm({ prompt, submitLabel });

    const form = this.querySelector('form');
    const status = this.querySelector('.inquiry-form__status');
    const turnstileContainer = this.querySelector('.inquiry-form__turnstile');
    const renderedAt = Date.now();

    const siteKey = getTurnstileSiteKey();
    let turnstileWidgetId = null;
    let turnstileToken = '';

    if (siteKey) {
      loadTurnstileScript()
        .then(() => {
          const tryRender = () => {
            if (!window.turnstile) return setTimeout(tryRender, 100);
            turnstileWidgetId = window.turnstile.render(turnstileContainer, {
              sitekey: siteKey,
              callback: (token) => { turnstileToken = token; },
              'error-callback': () => { turnstileToken = ''; },
              'expired-callback': () => { turnstileToken = ''; },
            });
          };
          tryRender();
        })
        .catch((err) => console.warn('[inquiry-form] turnstile load failed', err));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        trackEvent('inquiry_submit', { status: 'invalid' });
        return;
      }
      if (siteKey && !turnstileToken) {
        status.hidden = false;
        status.textContent = 'Please complete the verification challenge.';
        status.style.color = '#c0392b';
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      data.ts = renderedAt;
      data.turnstileToken = turnstileToken;

      status.hidden = false;
      status.textContent = 'Sending…';
      status.style.color = 'var(--tsr-muted)';

      try {
        await sendInfoRequest(data);
        form.reset();
        if (turnstileWidgetId !== null && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
          turnstileToken = '';
        }
        status.textContent = 'Thanks — your message has been sent.';
        status.style.color = 'var(--tsr-accent)';
        trackEvent('inquiry_submit', { status: 'success' });
      } catch (err) {
        console.error('[inquiry-form]', err);
        status.textContent = 'Sorry — something went wrong. Please try again.';
        status.style.color = '#c0392b';
        trackEvent('inquiry_submit', { status: 'error' });
      }
    });
  }
}

customElements.define('tsr-inquiry-form', TsrInquiryForm);