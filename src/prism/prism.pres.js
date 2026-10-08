const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

// Sample TV pictures. The scoreboard, drum roll, winner, menu and ad images in
// assets/prism/ were drawn by the PWA's own board and ad code (pwa/src/location/
// banner-template.js), so they are the real designs; every name on them is made up.
const IMG = '/assets/prism';
// What a source is showing: a stock photo of a game (assets/prism/event-1..4.jpg,
// free Unsplash photos, credited in assets/prism/CREDITS.md).
const pane = (n, extra = '') => `
  <div class="ptv-pane">
    <img class="ptv-img" src="${IMG}/event-${n}.jpg" alt="" loading="lazy">
    <span class="ptv-pane__label">Box ${n}</span>${extra}
  </div>`;

// Pictures that take turns, like an ad rotation: each shows for `seconds`.
const rotate = (names, seconds, cls) =>
  names
    .map(
      (name, i) =>
        `<img class="ptv-img ${cls}" src="${IMG}/${name}.webp" alt="" loading="lazy" style="animation-delay:${i * seconds}s">`,
    )
    .join('');
const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((d) => `day-${d}`);
const PANELS = ['panel-a', 'panel-b', 'panel-c'];
const SOUND = '<span class="ptv-pane__sound">Sound on</span>';

// The ticker on a beam's ad space, as Prism draws it (core/src/scores/strip.rs):
// one card per message, the label in a chip at its left end, a badge in the accent.
const MESSAGES = [
  ['Trivia', 'Every Tuesday at 7', 'Free to play'],
  ['Brunch', 'On the patio Saturday and Sunday', '10 – 2'],
  ['Parties', 'Ask about the back room', ''],
];
const ticker = () => {
  const run = MESSAGES.map(
    ([label, text, badge]) =>
      `<span class="ptk-msg"><b class="ptk-msg__chip">${label}</b><span>${text}</span>${badge ? `<em>${badge}</em>` : ''}</span>`,
  ).join('');
  return `<div class="ptv-ticker"><div class="ptk-run">${run}${run}</div></div>`;
};

// The score band under a two-up, as Prism draws it: a chip per league, then a
// two-row card per game with the team colours down its left edge.
const SCORES = [
  [
    'Football',
    [
      ['HAR', 21, '#f4f4f5', 'BAY', 17, '#b91c1c', '2:10 - 4th', true],
      ['RVR', 10, '#0e7490', 'MTN', 13, '#7c3aed', 'Final', false],
    ],
  ],
  ['Hoops', [['NOR', 88, '#f59e0b', 'STH', 84, '#1e3a8a', '5:42 - 3rd', true]]],
  ['Baseball', [['CST', 3, '#0f766e', 'VLY', 2, '#be123c', 'Top 7th', true]]],
];
const scoreSide = (abbr, score, color, dim) =>
  `<span class="psc-side${dim ? ' psc-side--dim' : ''}"><i style="background:${color}"></i><b>${abbr}</b><b>${score}</b></span>`;
const scoreCard = ([a, as, ac, h, hs, hc, status, live]) => {
  const final = status === 'Final';
  return `
    <span class="psc-card" style="--away:${ac};--home:${hc}">
      <span class="psc-teams">${scoreSide(a, as, ac, final && as < hs)}${scoreSide(h, hs, hc, final && hs < as)}</span>
      <span class="psc-status${final ? ' psc-status--final' : ''}">${live ? '<i></i>' : ''}${status}</span>
    </span>`;
};
const scores = () => {
  const run = SCORES.map(
    ([league, games]) => `<b class="psc-chip">${league}</b>${games.map(scoreCard).join('')}`,
  ).join('');
  return `<div class="ptv-scores"><div class="ptk-run">${run}${run}</div></div>`;
};

// A board with two pages, turning like it does on the TV.
const paged = (name, lazy = ' loading="lazy"') => `
    <img class="ptv-img" src="${IMG}/${name}-1.webp" alt=""${lazy}>
    <img class="ptv-img ptv-page2" src="${IMG}/${name}-2.webp" alt=""${lazy}>`;

const MOCKS = {
  // A trivia night in one loop: both pages of standings, drum roll, then the winner under
  // falling confetti (the strip Prism slides over the winner frame).
  night: () => `
    <img class="ptv-img" src="${IMG}/trivia-1.webp" alt="">
    <img class="ptv-img ptv-night__page2" src="${IMG}/trivia-2.webp" alt="">
    <img class="ptv-img ptv-night__drum" src="${IMG}/drumroll.webp" alt="">
    <div class="ptv-night__win">
      <img class="ptv-img" src="${IMG}/winner.webp" alt="">
      <div class="ptv-confetti"></div>
    </div>`,
  scoreboard: () => paged('trivia'),
  menu: () => paged('menu'),
  // Prism's two-up layout: the venue's banner in the band above the two sources and
  // the score band below them.
  split2: () => `
    <div class="ptv-split">
      <img class="ptv-split__banner" src="${IMG}/banner.webp" alt="" loading="lazy">
      <div class="ptv-split__tiles">
        ${pane(1, SOUND)}
        ${pane(2)}
      </div>
      ${scores()}
    </div>`,
  split4: () => `
    <div class="ptv-quad">
      ${pane(1)}
      ${pane(2)}
      ${pane(3, SOUND)}
      ${pane(4)}
    </div>`,
  // A normal beam with its ad space showing: side panel and ticker.
  ads: () => `
    <div class="ptv-ads">
      ${pane(1)}
      <div class="ptv-ads__panel">${rotate(PANELS, 4, 'ptv-rot3')}</div>
      ${ticker()}
    </div>`,
  // An Ad Rotator beam: the whole screen, one daily special after another.
  rotator: () => rotate(DAYS, 3, 'ptv-rot7'),
};

const renderTv = (mock) =>
  MOCKS[mock]
    ? `<div class="ptv" aria-hidden="true"><div class="ptv__screen">${MOCKS[mock]()}</div><div class="ptv__stand"></div></div>`
    : '';

// "Now on the beams" as it reads on a phone: one line per beam.
const MOCK_BEAMS = [
  ['Beam 1', 'Box 1', '4 TVs'],
  ['Beam 2', 'Trivia scoreboard', '3 TVs'],
  ['Beam 3', 'Menu board', '2 TVs'],
  ['Beam 4', 'Split screen', '3 TVs'],
];

const renderNow = () => `
  <div class="pnow" aria-hidden="true">
    <p class="pnow__title">Now on the beams</p>
    ${MOCK_BEAMS.map(
      ([beam, what, tvs]) => `
      <div class="pnow__row">
        <span class="pnow__dot"></span>
        <span class="pnow__beam">${beam}</span>
        <span class="pnow__what">${what}</span>
        <span class="pnow__tvs">${tvs}</span>
      </div>`,
    ).join('')}
  </div>`;

const renderBadge = (badge) =>
  badge ? `<span class="prism-feature__badge">${escapeHtml(badge)}</span>` : '';

export const renderPrism = ({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  heroMock,
  showcase,
  features,
  control,
  earlyAccess,
  inquiryPrompt,
}) => `
  <section class="prism-hero">
    <div class="tsr-container prism-hero__inner">
      <div class="prism-hero__copy">
      ${eyebrow ? `<p class="prism-hero__eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
      <h1>${escapeHtml(headline)}</h1>
      <p class="prism-hero__sub">${escapeHtml(subhead)}</p>
      ${
        primaryCta
          ? `<a href="${primaryCta.href}" data-cta="${primaryCta.cta}" class="tsr-button">${escapeHtml(primaryCta.label)}</a>`
          : ''
      }
      </div>
      ${heroMock ? `<div class="prism-hero__art">${renderTv(heroMock)}</div>` : ''}
    </div>
  </section>

  ${
    showcase && showcase.rows && showcase.rows.length
      ? `
  <section class="prism-show">
    <div class="tsr-container">
      <h2>${escapeHtml(showcase.title)}</h2>
      ${showcase.intro ? `<p class="prism-show__intro">${escapeHtml(showcase.intro)}</p>` : ''}
      ${showcase.rows
        .map(
          (r) => `
        <div class="prism-show__row">
          <div class="prism-show__art">${(r.mocks || [{ mock: r.mock }])
            .map(
              (m) =>
                `<figure class="prism-show__fig">${renderTv(m.mock)}${m.caption ? `<figcaption>${escapeHtml(m.caption)}</figcaption>` : ''}</figure>`,
            )
            .join('')}</div>
          <div class="prism-show__copy">
            <h3>${escapeHtml(r.title)} ${renderBadge(r.badge)}</h3>
            <p>${escapeHtml(r.body)}</p>
            ${
              r.points && r.points.length
                ? `<ul>${r.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`
                : ''
            }
            ${
              r.note
                ? `<p class="prism-show__note">${renderBadge(r.note.badge)} ${escapeHtml(r.note.text)}</p>`
                : ''
            }
          </div>
        </div>`,
        )
        .join('')}
    </div>
  </section>`
      : ''
  }

  ${
    features && features.length
      ? `
  <section class="prism-features">
    <div class="tsr-container">
      <h2>Also in the box</h2>
      <div class="prism-features__grid">
        ${features
          .map(
            (f) => `
          <div class="prism-feature">
            <h3>
              ${escapeHtml(f.title)}
              ${f.badge ? `<span class="prism-feature__badge">${escapeHtml(f.badge)}</span>` : ''}
            </h3>
            <p>${escapeHtml(f.body)}</p>
            ${
              f.action
                ? `<a href="${f.action.href}" data-link data-cta="${f.action.cta}" class="tsr-button prism-feature__cta">${escapeHtml(f.action.label)}</a>`
                : ''
            }
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  ${
    control
      ? `
  <section class="prism-control">
    <div class="tsr-container prism-control__inner">
      <div class="prism-control__copy">
        <h2>${escapeHtml(control.title)}</h2>
        <p>${escapeHtml(control.body)}</p>
      </div>
      ${control.mock === 'now' ? renderNow() : ''}
    </div>
  </section>`
      : ''
  }

  ${
    earlyAccess
      ? `
  <section class="prism-early">
    <div class="tsr-container prism-early__inner">
      <div class="prism-early__copy">
        <h2>${escapeHtml(earlyAccess.title)}</h2>
        <p>${escapeHtml(earlyAccess.body)}</p>
      </div>
      ${
        earlyAccess.points && earlyAccess.points.length
          ? `<ul class="prism-early__points">${earlyAccess.points
              .map((p) => `<li>${escapeHtml(p)}</li>`)
              .join('')}</ul>`
          : ''
      }
    </div>
  </section>`
      : ''
  }

  <section class="prism-inquiry" id="prism-inquiry">
    <div class="tsr-container">
      <h2>Book a Prism demo</h2>
      <p>Tell us about your venue and we will reach out to schedule a walkthrough. In-person demos are currently available in the San Diego and Los Angeles areas only — if you are outside that range, contact us and we will explore options for your venue.</p>
      <tsr-inquiry-form prompt="${escapeHtml(inquiryPrompt)}" submit-label="Request a demo"></tsr-inquiry-form>
    </div>
  </section>

  <style>
    .prism-hero {
      padding: 5rem 0;
      background: linear-gradient(90deg, #042316 0%, #0c3622 48%, #3f3f46 80%, #71717a 140%);
      color: #fff;
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #d4d4d8;
    }
    .prism-hero h1 {
      font-size: clamp(2rem, 4vw, 3.25rem);
      margin: 0 0 1rem;
      color: #fff;
    }
    .prism-hero__sub {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 640px;
      margin: 0 0 1.75rem;
    }
    .prism-hero__inner {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 2.5rem;
      align-items: center;
    }
    @media (max-width: 900px) {
      .prism-hero { padding: 3rem 0; }
      .prism-hero__inner { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
    }

    /* Mock TV. Sizes inside the screen are in cqw so the picture scales as one. */
    .ptv { width: 100%; }
    .ptv__screen {
      position: relative;
      aspect-ratio: 16 / 9;
      container-type: inline-size;
      overflow: hidden;
      border-radius: 10px;
      border: 6px solid #0b0b0d;
      outline: 1px solid #3f3f46;
      background: #05070a;
      color: #fff;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    }
    .ptv__stand {
      width: 26%;
      height: 8px;
      margin: 0 auto;
      background: #27272a;
      border-radius: 0 0 6px 6px;
    }
    .ptv p { margin: 0; }
    .ptv-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .ptv-page2 { animation: ptv-page2 12s linear infinite; }
    @keyframes ptv-page2 {
      0%, 46% { opacity: 0; }
      50%, 96% { opacity: 1; }
      100% { opacity: 0; }
    }
    .ptv-night__page2 { animation: ptv-night2 24s linear infinite; }
    .ptv-night__drum { animation: ptv-drum 24s linear infinite; }
    .ptv-night__win { position: absolute; inset: 0; animation: ptv-win 24s linear infinite; }
    @keyframes ptv-night2 {
      0%, 23% { opacity: 0; }
      25%, 98% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ptv-drum {
      0%, 48% { opacity: 0; }
      50%, 98% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ptv-win {
      0%, 64% { opacity: 0; }
      66%, 98% { opacity: 1; }
      100% { opacity: 0; }
    }
    /* The confetti strip is 1280x1665 and repeats every 1125; Prism shows a 540 tall
       window of it from y=150 and slides it down. Same numbers here, in cqw. */
    .ptv-confetti {
      position: absolute;
      left: 0;
      right: 0;
      top: 11.72cqw;
      height: 42.19cqw;
      background: url('/assets/prism/confetti.webp') 0 -87.89cqw / 100cqw 130.08cqw no-repeat;
      animation: ptv-fall 10.4s linear infinite;
    }
    @keyframes ptv-fall {
      to { background-position-y: 0; }
    }
    @font-face {
      font-family: 'Barlow Condensed';
      font-weight: 700;
      font-display: swap;
      src: url('/assets/fonts/BarlowCondensed-Bold.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Barlow Condensed';
      font-weight: 500;
      font-display: swap;
      src: url('/assets/fonts/BarlowCondensed-Medium.ttf') format('truetype');
    }
    .ptv-pane { position: relative; overflow: hidden; background: #0b0b0d; }
    .ptv-pane__label,
    .ptv-pane__sound {
      position: absolute;
      left: 1.6cqw;
      bottom: 1.6cqw;
      padding: 0.4cqw 1.4cqw;
      font-size: 2cqw;
      font-weight: 700;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .ptv-pane__sound { left: auto; right: 1.6cqw; background: #16a34a; border-color: #4ade80; }

    /* Prism's glass finish (strip.rs glass()): lighter at the top, a touch darker at
       the bottom, a thin light edge just inside the outline. */
    .ptk-msg,
    .psc-chip,
    .psc-card {
      position: relative;
      flex: none;
      overflow: hidden;
      font-family: 'Barlow Condensed', var(--tsr-font);
    }
    .ptk-msg::after,
    .psc-chip::after,
    .psc-card::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.14));
      box-shadow: inset 0 0 0 0.16cqw rgba(255, 255, 255, 0.3);
      pointer-events: none;
    }
    .ptv-ticker,
    .ptv-scores { display: flex; align-items: center; overflow: hidden; background: #000; }
    .ptk-run { display: flex; align-items: center; flex: none; animation: ptv-ticker 30s linear infinite; }
    @keyframes ptv-ticker {
      to { transform: translateX(-50%); }
    }

    /* Ad ticker (sizes are strip.rs's, of a 1920 wide picture). */
    .ptv-ticker .ptk-run { gap: 1.46cqw; padding-left: 1.46cqw; }
    .ptk-msg {
      display: flex;
      align-items: center;
      gap: 1.25cqw;
      height: 4.38cqw;
      padding-right: 1.46cqw;
      border-radius: 0.73cqw;
      background: #27272a;
      font-size: 2.6cqw;
      font-weight: 500;
      white-space: nowrap;
    }
    .ptk-msg__chip {
      align-self: stretch;
      display: flex;
      align-items: center;
      padding: 0 1.25cqw;
      background: #16a34a;
      color: #0a0a0a;
      font-size: 2.08cqw;
      font-weight: 700;
      text-transform: uppercase;
    }
    .ptk-msg em { font-style: normal; font-weight: 700; color: #16a34a; }

    /* Score band (sizes are strip.rs's, of a 1280 wide picture). */
    .ptv-scores .ptk-run { gap: 1.09cqw; padding-left: 1.09cqw; animation-duration: 36s; }
    .psc-chip {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 9.69cqw;
      height: 10.31cqw;
      border-radius: 0.94cqw;
      background: #16a34a;
      color: #0a0a0a;
      font-size: 2.7cqw;
      font-weight: 700;
      text-transform: uppercase;
    }
    .psc-card {
      display: grid;
      grid-template-columns: 21.56cqw 1fr;
      width: 35.31cqw;
      height: 10.31cqw;
      border-radius: 0.94cqw;
      background: linear-gradient(var(--away) 50%, var(--home) 50%) left / 0.63cqw 100% no-repeat, #27272a;
    }
    .psc-teams { display: grid; grid-template-rows: 1fr 1fr; border-right: 1px solid #4e4e51; margin: 0; }
    .psc-side {
      display: grid;
      grid-template-columns: 4.06cqw 1fr auto;
      align-items: center;
      gap: 0.94cqw;
      padding: 0 1.1cqw 0 1.56cqw;
      font-size: 4.06cqw;
      line-height: 1;
    }
    .psc-side i { width: 4.06cqw; height: 4.06cqw; border-radius: 0.63cqw; }
    .psc-side b { font-weight: 700; }
    .psc-side--dim b { color: #9d9d9f; }
    .psc-status {
      display: flex;
      align-items: center;
      gap: 0.6cqw;
      height: 50%;
      padding-left: 1.25cqw;
      font-size: 2.66cqw;
      font-weight: 500;
      white-space: nowrap;
    }
    .psc-status i { width: 0.94cqw; height: 0.94cqw; border-radius: 50%; background: #ef4444; }
    .psc-status--final { color: #9d9d9f; }

    /* Two-up: banner band, two 640x360 tiles, score band (of 1280x720). */
    .ptv-split {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-rows: 14.06cqw 28.13cqw 1fr;
      background: #000;
    }
    .ptv-split__banner { width: 98.75%; height: 12.5cqw; margin: auto; display: block; }
    .ptv-split__tiles { display: grid; grid-template-columns: 1fr 1fr; }
    .ptv-quad {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      background: #000;
    }
    /* Ad space on a normal beam: 240x955 panel and the ticker under it (of 1920x1080). */
    .ptv-ads {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: 1fr 12.5cqw;
      grid-template-rows: 49.74cqw 1fr;
      background: #000;
    }
    .ptv-ads__panel { position: relative; }
    /* Rotations: every picture runs the same loop, offset by its turn. The first of a
       set also sits underneath, so there is never a gap between two pictures. */
    .ptv-rot3 { opacity: 0; animation: ptv-rot3 12s linear infinite; }
    .ptv-rot7 { opacity: 0; animation: ptv-rot7 21s linear infinite; }
    .ptv-rot3:first-child,
    .ptv-rot7:first-child { opacity: 1; }
    @keyframes ptv-rot3 {
      0% { opacity: 0; }
      3%, 33.3% { opacity: 1; }
      36.3%, 100% { opacity: 0; }
    }
    @keyframes ptv-rot7 {
      0% { opacity: 0; }
      2%, 14.3% { opacity: 1; }
      16.3%, 100% { opacity: 0; }
    }
    .ptv-ads .ptv-ticker { grid-column: 1 / -1; }
    @media (prefers-reduced-motion: reduce) {
      .ptv-page2, .ptv-night__page2, .ptv-night__drum { animation: none; opacity: 0; }
      .ptv-night__win { animation: none; }
      .ptv-confetti { animation: none; }
      .ptk-run, .ptv-rot3, .ptv-rot7 { animation: none; }
    }

    .prism-show { padding: 3.5rem 0 1rem; }
    .prism-show h2 { margin: 0 0 0.5rem; }
    .prism-show__intro { margin: 0 0 1rem; max-width: 680px; color: var(--tsr-muted); }
    .prism-show__row {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      gap: 3rem;
      align-items: center;
      padding: 2.5rem 0;
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-show__row:last-child { border-bottom: 0; }
    .prism-show__row:nth-child(even) .prism-show__art { order: 2; }
    @media (max-width: 800px) {
      .prism-show__row { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; padding: 2rem 0; }
      .prism-show__row:nth-child(even) .prism-show__art { order: 0; }
    }
    .prism-show__art { display: grid; gap: 1.5rem; }
    .prism-show__fig { margin: 0; }
    .prism-show__fig figcaption { margin-top: 0.5rem; font-size: 0.85rem; color: var(--tsr-muted); text-align: center; }
    .prism-show__copy h3 {
      margin: 0 0 0.6rem;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .prism-show__copy p { margin: 0 0 0.9rem; color: var(--tsr-muted); }
    .prism-show__copy ul { margin: 0; padding-left: 1.25rem; display: grid; gap: 0.4rem; }
    .prism-show__note { margin: 1rem 0 0 !important; }

    .prism-control { padding: 3rem 0; }
    .prism-control__inner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 2.5rem;
      align-items: center;
    }
    @media (max-width: 760px) {
      .prism-control__inner { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
    }
    .prism-control__copy h2 { margin: 0 0 0.75rem; }
    .prism-control__copy p { margin: 0; color: var(--tsr-muted); }
    .pnow {
      padding: 1rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 14px;
      display: grid;
      gap: 0.5rem;
    }
    .pnow__title {
      margin: 0 0 0.25rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tsr-muted);
    }
    .pnow__row {
      display: grid;
      grid-template-columns: auto auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 0.75rem;
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: 10px;
      font-size: 0.9rem;
    }
    .pnow__dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: var(--tsr-accent); }
    .pnow__beam { font-weight: 700; }
    .pnow__what { color: var(--tsr-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .pnow__tvs { font-size: 0.8rem; color: var(--tsr-muted); white-space: nowrap; }

    .prism-features { padding: 3rem 0; }
    .prism-features h2 { margin: 0 0 1.5rem; }
    .prism-features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .prism-feature {
      padding: 1.25rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .prism-feature h3 {
      margin: 0 0 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .prism-feature__badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #042316;
      background: #facc15;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      white-space: nowrap;
    }
    .prism-feature p { margin: 0; color: var(--tsr-muted); }
    .prism-feature__cta { margin-top: 1rem; }
    .prism-early {
      padding: 3rem 0;
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-early__inner {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    @media (max-width: 760px) {
      .prism-early__inner { grid-template-columns: 1fr; gap: 1.5rem; }
    }
    .prism-early__copy h2 { margin: 0 0 0.75rem; }
    .prism-early__copy p { margin: 0; color: var(--tsr-muted); }
    .prism-early__points {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.6rem;
    }
    .prism-inquiry { padding: 3rem 0; }
    .prism-inquiry h2 { margin: 0 0 0.5rem; }
    .prism-inquiry > .tsr-container > p { color: var(--tsr-muted); margin: 0 0 1.5rem; }
  </style>
`;

export class TsrPrismPres extends HTMLElement {
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
    this.innerHTML = renderPrism(this._props);
  }
}

customElements.define('tsr-prism-pres', TsrPrismPres);
