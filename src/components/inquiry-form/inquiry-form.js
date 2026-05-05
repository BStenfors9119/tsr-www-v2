import { sendInfoRequest } from '../../lib/info-request.js';

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

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form));

      status.hidden = false;
      status.textContent = 'Sending…';
      status.style.color = 'var(--tsr-muted)';

      try {
        await sendInfoRequest(data);
        form.reset();
        status.textContent = 'Thanks — your message has been sent.';
        status.style.color = 'var(--tsr-accent)';
      } catch (err) {
        console.error('[inquiry-form]', err);
        status.textContent = 'Sorry — something went wrong. Please try again.';
        status.style.color = '#c0392b';
      }
    });
  }
}

customElements.define('tsr-inquiry-form', TsrInquiryForm);
