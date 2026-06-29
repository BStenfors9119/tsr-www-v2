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

// Build the free-text message the backend emails. The /tsr/info/request endpoint
// only carries contact / fromEmail / message, so the venue details ride along here.
// The email renders message as one HTML line, so fields are joined with " | ".
const buildMessage = (d) => {
  const addressParts = [d.address, d.city, d.zip].map((p) => (p || '').trim()).filter(Boolean);
  const orNot = (v) => ((v || '').trim() ? v.trim() : '(not provided)');
  return [
    'The Starting Lineup — Venue Request',
    `Venue: ${d.venueName.trim()}`,
    `Address: ${addressParts.join(', ')}`,
    `# of TVs: ${orNot(d.numTvs)}`,
    `# of Cable Boxes: ${orNot(d.numBoxes)}`,
    `Cable Box Models: ${orNot(d.boxModels)}`,
    `Provider: ${orNot(d.provider)}`,
    `Phone: ${orNot(d.phone)}`,
  ].join(' | ');
};

const renderTrigger = (label) => `
  <button type="button" class="tsr-button venue-request__trigger">${label}</button>

  <dialog class="venue-request__dialog">
    <form method="dialog" class="venue-request__close-row">
      <button class="venue-request__close" value="cancel" aria-label="Close">&times;</button>
    </form>

    <h3 class="venue-request__title">Request The Starting Lineup</h3>
    <p class="venue-request__intro">Tell us about your venue and we'll be in touch to get you set up.</p>

    <form class="venue-request__form" novalidate>
      <fieldset class="venue-request__group">
        <legend>Your venue</legend>
        <div class="venue-request__field">
          <label for="vr-venue">Venue name <span aria-hidden="true">*</span></label>
          <input id="vr-venue" name="venueName" type="text" autocomplete="organization" required />
        </div>
        <div class="venue-request__field">
          <label for="vr-address">Street address <span aria-hidden="true">*</span></label>
          <input id="vr-address" name="address" type="text" autocomplete="street-address" required />
        </div>
        <div class="venue-request__row">
          <div class="venue-request__field">
            <label for="vr-city">City <span aria-hidden="true">*</span></label>
            <input id="vr-city" name="city" type="text" autocomplete="address-level2" required />
          </div>
          <div class="venue-request__field">
            <label for="vr-zip">ZIP <span aria-hidden="true">*</span></label>
            <input id="vr-zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" required />
          </div>
        </div>
      </fieldset>

      <fieldset class="venue-request__group">
        <legend>Your setup <span class="venue-request__opt">(optional)</span></legend>
        <div class="venue-request__row">
          <div class="venue-request__field">
            <label for="vr-tvs"># of TVs</label>
            <input id="vr-tvs" name="numTvs" type="number" min="0" inputmode="numeric" />
          </div>
          <div class="venue-request__field">
            <label for="vr-boxes"># of cable boxes</label>
            <input id="vr-boxes" name="numBoxes" type="number" min="0" inputmode="numeric" />
          </div>
        </div>
        <div class="venue-request__field">
          <label for="vr-models">Cable box models <span class="venue-request__hint">(if known)</span></label>
          <input id="vr-models" name="boxModels" type="text" placeholder="e.g. DirecTV H24, H25" />
        </div>
        <div class="venue-request__field">
          <label for="vr-provider">TV provider</label>
          <input id="vr-provider" name="provider" type="text" placeholder="e.g. DirecTV, Spectrum" />
        </div>
      </fieldset>

      <fieldset class="venue-request__group">
        <legend>How we reach you</legend>
        <div class="venue-request__field">
          <label for="vr-contact">Contact name <span aria-hidden="true">*</span></label>
          <input id="vr-contact" name="contact" type="text" autocomplete="name" required />
        </div>
        <div class="venue-request__row">
          <div class="venue-request__field">
            <label for="vr-email">Email <span aria-hidden="true">*</span></label>
            <input id="vr-email" name="fromEmail" type="email" autocomplete="email" required />
          </div>
          <div class="venue-request__field">
            <label for="vr-phone">Phone <span aria-hidden="true">*</span></label>
            <input id="vr-phone" name="phone" type="tel" autocomplete="tel" required />
          </div>
        </div>
      </fieldset>

      <div class="venue-request__hp" aria-hidden="true">
        <label for="vr-website">Website</label>
        <input id="vr-website" name="website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="venue-request__turnstile"></div>

      <button type="submit" class="tsr-button venue-request__submit">Send request</button>
      <p class="venue-request__status" hidden role="status" aria-live="polite"></p>
    </form>
  </dialog>
  <style>
    .venue-request__dialog {
      width: min(560px, calc(100vw - 2rem));
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      background: var(--tsr-surface);
      color: var(--tsr-fg);
      padding: 1.75rem;
    }
    .venue-request__dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
    .venue-request__close-row { margin: 0; display: flex; justify-content: flex-end; }
    .venue-request__close {
      background: none;
      border: none;
      color: var(--tsr-muted);
      font-size: 1.6rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
    }
    .venue-request__title { margin: 0.25rem 0 0.5rem; }
    .venue-request__intro { margin: 0 0 1.25rem; color: var(--tsr-muted); }
    .venue-request__form { display: grid; gap: 1.25rem; }
    .venue-request__group {
      display: grid;
      gap: 1rem;
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      padding: 1rem 1.1rem 1.2rem;
      margin: 0;
    }
    .venue-request__group legend {
      font-weight: 700;
      padding: 0 0.4rem;
      color: var(--tsr-fg);
    }
    .venue-request__opt, .venue-request__hint {
      font-weight: 400;
      color: var(--tsr-muted);
      font-size: 0.85rem;
    }
    .venue-request__row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .venue-request__field { display: grid; gap: 0.45rem; }
    .venue-request__form label { font-weight: 600; font-size: 0.95rem; }
    .venue-request__form label span[aria-hidden] { color: var(--tsr-accent); }
    .venue-request__form input {
      padding: 0.85rem 1rem;
      border: 2px solid color-mix(in srgb, var(--tsr-fg) 28%, transparent);
      border-radius: var(--tsr-radius);
      background: var(--tsr-bg);
      color: var(--tsr-fg);
      font: inherit;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
      box-shadow: inset 0 1px 2px color-mix(in srgb, var(--tsr-fg) 8%, transparent);
      transition: border-color 0.12s ease, box-shadow 0.12s ease;
    }
    .venue-request__form input::placeholder {
      color: var(--tsr-muted);
      opacity: 0.8;
    }
    .venue-request__form input:hover {
      border-color: color-mix(in srgb, var(--tsr-fg) 45%, transparent);
    }
    .venue-request__form input:focus-visible {
      outline: none;
      border-color: var(--tsr-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--tsr-accent) 35%, transparent);
    }
    .venue-request__submit { justify-self: start; }
    .venue-request__status { margin: 0; font-weight: 600; }
    .venue-request__hp {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    @media (max-width: 480px) {
      .venue-request__row { grid-template-columns: 1fr; }
    }
  </style>
`;

export class TsrVenueRequest extends HTMLElement {
  static get observedAttributes() {
    return ['label'];
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._render();
  }

  _render() {
    const label = this.getAttribute('label') ?? 'Request The Starting Lineup';
    this.innerHTML = renderTrigger(label);

    const trigger = this.querySelector('.venue-request__trigger');
    const dialog = this.querySelector('.venue-request__dialog');
    const form = this.querySelector('.venue-request__form');
    const status = this.querySelector('.venue-request__status');
    const turnstileContainer = this.querySelector('.venue-request__turnstile');

    let renderedAt = 0;
    const siteKey = getTurnstileSiteKey();
    let turnstileWidgetId = null;
    let turnstileToken = '';

    const mountTurnstile = () => {
      if (!siteKey || turnstileWidgetId !== null) return;
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
        .catch((err) => console.warn('[venue-request] turnstile load failed', err));
    };

    trigger.addEventListener('click', () => {
      renderedAt = Date.now();
      status.hidden = true;
      mountTurnstile();
      dialog.showModal();
      trackEvent('venue_request_open', {});
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        trackEvent('venue_request_submit', { status: 'invalid' });
        return;
      }
      if (siteKey && !turnstileToken) {
        status.hidden = false;
        status.textContent = 'Please complete the verification challenge.';
        status.style.color = '#c0392b';
        return;
      }

      const d = Object.fromEntries(new FormData(form));
      const payload = {
        contact: d.contact,
        fromEmail: d.fromEmail,
        message: buildMessage(d),
        website: d.website,
        ts: renderedAt,
        turnstileToken,
      };

      status.hidden = false;
      status.textContent = 'Sending…';
      status.style.color = 'var(--tsr-muted)';

      try {
        await sendInfoRequest(payload);
        form.reset();
        if (turnstileWidgetId !== null && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
          turnstileToken = '';
        }
        status.textContent = 'Thanks — your request is on its way. We\'ll reach out shortly.';
        status.style.color = 'var(--tsr-accent)';
        trackEvent('venue_request_submit', { status: 'success' });
      } catch (err) {
        console.error('[venue-request]', err);
        status.textContent = 'Sorry — something went wrong. Please try again.';
        status.style.color = '#c0392b';
        trackEvent('venue_request_submit', { status: 'error' });
      }
    });
  }
}

customElements.define('tsr-venue-request', TsrVenueRequest);
