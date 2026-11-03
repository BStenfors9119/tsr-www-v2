const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const renderExample = ({ img, alt, title, body }) => `
  <article class="voice-example">
    <img src="${img}" width="1280" height="720" alt="${escapeHtml(alt)}">
    <div class="voice-example__copy">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
    </div>
  </article>`;

const renderActivationStep = ({ title, text, bullets }) => `
  <li>
    <b>${escapeHtml(title)}</b>${text ? ` ${escapeHtml(text)}` : ''}
    ${bullets ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
  </li>`;

const renderPart = (part) => {
  if (typeof part === 'string') return escapeHtml(part);
  if (part.ui) return `<b>${escapeHtml(part.ui)}</b>`;
  return `<q class="voice-say">${escapeHtml(part.say)}</q>`;
};

const renderSteps = (steps) =>
  `<ol class="voice-steps">${steps.map((parts) => `<li>${parts.map(renderPart).join(' ')}</li>`).join('')}</ol>`;

const renderDevice = ({ title, lead, start, steps, note, extra }) => `
  <article class="voice-device">
    <h3>${escapeHtml(title)}</h3>
    ${lead ? `<p class="voice-device__lead">${escapeHtml(lead)}</p>` : ''}
    ${start ? `<h4 class="voice-device__start">${escapeHtml(start)}</h4>` : ''}
    ${renderSteps(steps)}
    ${note ? `<p>${escapeHtml(note)}</p>` : ''}
    ${extra ? `
    <h4>${escapeHtml(extra.title)}</h4>
    ${renderSteps(extra.steps)}
    <p>${escapeHtml(extra.note)}</p>` : ''}
  </article>`;

export const renderVoiceControl = ({
  eyebrow,
  headline,
  intro,
  primaryCta,
  setupLink,
  examples,
  control,
  activation,
  setup,
  newToTsr,
}) => `
  <section class="voice-hero">
    <div class="tsr-container">
      <p class="voice-hero__eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(headline)}</h1>
      <p class="voice-hero__intro">${escapeHtml(intro)}</p>
      <div class="voice-hero__actions">
        <a href="${primaryCta.href}" data-link data-cta="${primaryCta.cta}" class="tsr-button">${escapeHtml(primaryCta.label)}</a>
        <a href="${setupLink.href}" data-cta="${setupLink.cta}" class="voice-hero__link">${escapeHtml(setupLink.label)}</a>
      </div>
    </div>
  </section>

  <section class="voice-section">
    <div class="tsr-container">
      <div class="voice-examples">${examples.map(renderExample).join('')}</div>
      <p class="voice-control-note">${escapeHtml(control)}</p>

      <div class="voice-activation">
        <h2>${escapeHtml(activation.title)}</h2>
        <p>${escapeHtml(activation.notice)}</p>
        <ol>${activation.steps.map(renderActivationStep).join('')}</ol>
        <a href="${primaryCta.href}" data-link data-cta="voice_request_activation" class="tsr-button">${escapeHtml(primaryCta.label)}</a>
      </div>

      <h2 class="voice-setup-title" id="setup">${escapeHtml(setup.title)}</h2>
      <div class="voice-devices">${setup.devices.map(renderDevice).join('')}</div>

      <div class="voice-new">
        <h2>${escapeHtml(newToTsr.title)}</h2>
        <p>${escapeHtml(newToTsr.body)}</p>
        <a href="${newToTsr.link.href}" data-link data-cta="${newToTsr.link.cta}">${escapeHtml(newToTsr.link.label)}</a>
      </div>
    </div>
  </section>

  <style>
    .voice-hero {
      padding: 3.5rem 0;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
    }
    .voice-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #86efac;
    }
    .voice-hero h1 { margin: 0 0 1rem; font-size: clamp(2rem, 4vw, 3rem); color: #fff; }
    .voice-hero__intro { max-width: 640px; margin: 0 0 1.75rem; font-size: 1.125rem; color: #dcebe2; }
    .voice-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
    .voice-hero__link { color: #86efac; font-weight: 700; text-decoration: underline; }
    .voice-section { padding: 3rem 0; }
    .voice-examples,
    .voice-devices {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 900px) {
      .voice-hero { padding: 2.5rem 0; }
      .voice-section { padding: 2rem 0; }
      .voice-examples,
      .voice-devices { grid-template-columns: minmax(0, 1fr); }
    }
    .voice-example,
    .voice-device {
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 12px;
    }
    .voice-example { overflow: hidden; }
    .voice-example img { display: block; width: 100%; height: auto; }
    .voice-example__copy { padding: 1rem 1.25rem 1.25rem; }
    .voice-example h2 { margin: 0 0 0.4rem; font-size: 1.15rem; }
    .voice-example p { margin: 0; color: var(--tsr-muted); }
    .voice-control-note { max-width: 720px; margin: 2rem 0; color: var(--tsr-muted); }
    .voice-activation {
      padding: 1.5rem;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
      border-radius: 12px;
    }
    .voice-activation h2 { margin: 0 0 0.5rem; font-size: 1.5rem; color: #fff; }
    .voice-activation p { max-width: 720px; margin: 0 0 1rem; color: #dcebe2; }
    .voice-activation ol { margin: 0 0 1.25rem; padding-left: 1.25rem; display: grid; gap: 0.5rem; color: #dcebe2; }
    .voice-activation ul { margin: 0.35rem 0 0; padding-left: 1.1rem; display: grid; gap: 0.25rem; }
    .voice-activation b { color: #fff; }
    .voice-setup-title { margin: 2.5rem 0 1rem; font-size: 1.5rem; scroll-margin-top: 5rem; }
    .voice-device { padding: 1.25rem; }
    .voice-device h3 { margin: 0 0 0.6rem; font-size: 1.15rem; }
    .voice-device__lead { margin: -0.3rem 0 0.75rem !important; font-size: 0.9rem; }
    .voice-steps { margin: 0; padding-left: 1.5rem; display: grid; gap: 0.35rem; }
    .voice-steps li::marker { color: var(--tsr-accent); font-weight: 800; }
    .voice-device h4 { margin: 1.25rem 0 0.4rem; font-size: 1rem; }
    .voice-device h4.voice-device__start { margin-top: 0; }
    .voice-say { font-weight: 700; color: var(--tsr-accent); quotes: '“' '”'; }
    .voice-device p { margin: 0.75rem 0 0; font-size: 0.9rem; color: var(--tsr-muted); }
    .voice-new { margin-top: 2.5rem; max-width: 720px; }
    .voice-new h2 { margin: 0 0 0.5rem; font-size: 1.5rem; }
    .voice-new p { margin: 0 0 0.75rem; color: var(--tsr-muted); }
    .voice-new a { color: var(--tsr-accent); font-weight: 700; text-decoration: underline; }
  </style>
`;

export class TsrVoiceControlPres extends HTMLElement {
  set props(value) {
    this._props = value;
    this._render();
  }

  get props() {
    return this._props;
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (!this._props) return;
    this.innerHTML = renderVoiceControl(this._props);
  }
}

customElements.define('tsr-voice-control-pres', TsrVoiceControlPres);
