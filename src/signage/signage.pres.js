const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

// Every mention of Prism on this page links to the Prism page.
const prismLink = (cta) => `<a href="/prism" data-link data-cta="${cta}">Prism</a>`;

const renderStepUpSection = ({ title, body, cta }) => `
  <div class="signage-stepup__section">
    <h3>${escapeHtml(title)}</h3>
    <p>${cta ? prismLink(cta) : ''}${escapeHtml(body)}</p>
  </div>`;

// The trivia board's loop (CYCLE_SECONDS, matching the keyframes below): scores, then a timed
// question counting down from COUNTDOWN_FROM, then the winner under falling confetti.
// The digits sit where Prism draws them: 88 px at x 1080, y 238 of a 1280x720 picture.
const CYCLE_SECONDS = 24;
const QUESTION_STARTS_AT = 6;
const COUNTDOWN_FROM = 10;

const renderCountdown = () =>
  Array.from({ length: COUNTDOWN_FROM }, (_, i) => {
    const left = COUNTDOWN_FROM - i;
    return `<span class="signage-cycle__digits" style="animation-delay:${QUESTION_STARTS_AT + i}s">0:${String(left).padStart(2, '0')}</span>`;
  }).join('');

const renderCycle = ({ img, alt, cycle }) => `
  <div class="signage-cycle" role="img" aria-label="${escapeHtml(alt)}" style="--cycle:${CYCLE_SECONDS}s">
    <img src="${img}" alt="">
    <div class="signage-cycle__question">
      <img src="${cycle.question}" alt="">
      ${renderCountdown()}
    </div>
    <div class="signage-cycle__winner">
      <img src="${cycle.winner}" alt="">
      <div class="signage-cycle__confetti" style="background-image:url('${cycle.confetti}')"></div>
    </div>
  </div>`;

// A board with a second page, turning like it does on the TV.
const renderPaged = ({ img, alt, nextPage }) => `
  <div class="signage-cycle" role="img" aria-label="${escapeHtml(alt)}">
    <img src="${img}" alt="">
    <img class="signage-cycle__page2" src="${nextPage}" alt="">
  </div>`;

const renderPicture = ({ img, width, height, alt, cycle, nextPage }) => {
  if (cycle) return renderCycle({ img, alt, cycle });
  if (nextPage) return renderPaged({ img, alt, nextPage });
  return `<img src="${img}" width="${width}" height="${height}" alt="${escapeHtml(alt)}">`;
};

const renderBoard = ({ title, body, ...picture }) => `
  <article class="signage-board">
    ${renderPicture(picture)}
    <div class="signage-board__copy">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
    </div>
  </article>`;

export const renderSignage = ({ eyebrow, headline, intro, introPrism, primaryCta, textCta, boards, closing, stepUp }) => `
  <section class="signage-hero">
    <div class="tsr-container">
      <p class="signage-hero__eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(headline)}</h1>
      <p class="signage-hero__intro">${escapeHtml(intro)} ${escapeHtml(introPrism.before)}${prismLink('signage_intro_prism')}${escapeHtml(introPrism.after)}</p>
      <div class="signage-hero__actions">
        <a href="${primaryCta.href}" data-link data-cta="${primaryCta.cta}" class="tsr-button">${escapeHtml(primaryCta.label)}</a>
        <a href="${textCta.href}" data-cta="${textCta.cta}" class="signage-hero__text">${escapeHtml(textCta.label)}</a>
      </div>
    </div>
  </section>

  <section class="signage-boards">
    <div class="tsr-container">
      <div class="signage-boards__grid">
        ${boards.map(renderBoard).join('')}
      </div>
      <p class="signage-closing">${escapeHtml(closing)}</p>
      <div class="signage-stepup">
        <h2>${escapeHtml(stepUp.titleBefore)}${prismLink('signage_step_up_text')}</h2>
        <div class="signage-stepup__sections">${stepUp.sections.map(renderStepUpSection).join('')}</div>
        <a href="/prism" data-link data-cta="${stepUp.button.cta}" class="tsr-button">${escapeHtml(stepUp.button.label)}</a>
      </div>
    </div>
  </section>

  <style>
    .signage-hero {
      padding: 3.5rem 0;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
    }
    .signage-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #86efac;
    }
    .signage-hero h1 {
      margin: 0 0 1rem;
      font-size: clamp(2rem, 4vw, 3rem);
      color: #fff;
    }
    .signage-hero__intro {
      max-width: 640px;
      margin: 0 0 1.75rem;
      font-size: 1.125rem;
      color: #dcebe2;
    }
    .signage-hero__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem 1.5rem;
    }
    .signage-hero__text {
      color: #86efac;
      font-weight: 700;
      text-decoration: underline;
    }
    .signage-boards { padding: 3rem 0; }
    .signage-boards__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 700px) {
      .signage-hero { padding: 2.5rem 0; }
      .signage-boards { padding: 2rem 0; }
      .signage-boards__grid { grid-template-columns: minmax(0, 1fr); }
    }
    .signage-board {
      overflow: hidden;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 12px;
    }
    .signage-board img { display: block; width: 100%; height: auto; }
    .signage-cycle {
      position: relative;
      aspect-ratio: 16 / 9;
      container-type: inline-size;
      overflow: hidden;
      background: #03150a;
    }
    .signage-board .signage-cycle img { position: absolute; inset: 0; height: 100%; }
    .signage-board .signage-cycle__page2 {
      opacity: 0;
      animation: signage-page2 16s linear infinite;
    }
    /* 8 s on each page. */
    @keyframes signage-page2 {
      0%, 48% { opacity: 0; }
      50%, 98% { opacity: 1; }
      100% { opacity: 0; }
    }
    .signage-cycle__question,
    .signage-cycle__winner {
      position: absolute;
      inset: 0;
      opacity: 0;
      animation: var(--cycle) linear infinite;
    }
    .signage-cycle__question { animation-name: signage-question; }
    .signage-cycle__winner { animation-name: signage-winner; }
    /* 6 s of scores, 10 s of question, 8 s of winner. */
    @keyframes signage-question {
      0%, 24.9% { opacity: 0; }
      25%, 66.6% { opacity: 1; }
      66.7%, 100% { opacity: 0; }
    }
    @keyframes signage-winner {
      0%, 66.6% { opacity: 0; }
      66.7%, 99.9% { opacity: 1; }
      100% { opacity: 0; }
    }
    .signage-cycle__digits {
      position: absolute;
      left: 84.375%;
      top: 33.06%;
      transform: translate(-50%, -50%);
      opacity: 0;
      font: 700 6.875cqw/1 Arial, Helvetica, sans-serif;
      color: #fff;
      text-shadow: 0.16cqw 0.16cqw 0 rgba(0, 0, 0, 0.35);
      animation: signage-digit var(--cycle) linear infinite;
    }
    /* On for one second of the loop. */
    @keyframes signage-digit {
      0%, 4.16% { opacity: 1; }
      4.17%, 100% { opacity: 0; }
    }
    /* The strip is 1280x1665 and repeats every 1125; Prism shows a 540 tall window of it
       from y=150 and slides it down (same numbers as the Prism page). */
    .signage-cycle__confetti {
      position: absolute;
      left: 0;
      right: 0;
      top: 11.72cqw;
      height: 42.19cqw;
      background: 0 -87.89cqw / 100cqw 130.08cqw no-repeat;
      animation: signage-fall 10.4s linear infinite;
    }
    @keyframes signage-fall {
      to { background-position-y: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .signage-board .signage-cycle__page2,
      .signage-cycle__question,
      .signage-cycle__winner { animation: none; }
    }
    .signage-board__copy { padding: 1rem 1.25rem 1.25rem; }
    .signage-board h2 { margin: 0 0 0.4rem; font-size: 1.15rem; }
    .signage-board p { margin: 0; color: var(--tsr-muted); }
    .signage-closing { margin: 0 0 0.75rem; max-width: 720px; color: var(--tsr-muted); }
    .signage-hero__intro a { color: #86efac; font-weight: 700; text-decoration: underline; }
    .signage-stepup {
      margin-top: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
      border-radius: 12px;
    }
    .signage-stepup h2 { margin: 0 0 0.5rem; font-size: 1.5rem; color: #fff; }
    .signage-stepup__sections {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin: 1rem 0 1.25rem;
    }
    @media (max-width: 700px) {
      .signage-stepup__sections { grid-template-columns: minmax(0, 1fr); }
    }
    .signage-stepup__section {
      padding: 1rem 1.1rem;
      background: rgba(255, 255, 255, 0.07);
      border-radius: 10px;
    }
    .signage-stepup h3 { margin: 0 0 0.35rem; font-size: 1.05rem; color: #fff; }
    .signage-stepup p { margin: 0; color: #dcebe2; }
    .signage-stepup p a { color: #86efac; font-weight: 700; text-decoration: underline; }
    .signage-stepup h2 a { color: #86efac; text-decoration: underline; }
  </style>
`;

export class TsrSignagePres extends HTMLElement {
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
    this.innerHTML = renderSignage(this._props);
  }
}

customElements.define('tsr-signage-pres', TsrSignagePres);
