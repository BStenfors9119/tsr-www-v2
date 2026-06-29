const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

import { trackEvent } from '../lib/analytics.js';

const renderSpotlightMedia = (media) => {
  if (!media) return '';

  if (media.gallery && media.gallery.length) {
    const count = media.gallery.length;
    const shots = media.gallery
      .map(
        (g, gi) => `
          <li class="spotlight__shot" aria-roledescription="slide" aria-label="${gi + 1} of ${count}">
            <img src="${g.src}" alt="${escapeHtml(g.label ?? '')}" data-caption="${escapeHtml(g.label ?? '')}" loading="lazy" />
          </li>`,
      )
      .join('');
    const dots =
      count > 1
        ? `<div class="spotlight__dots" role="tablist">${media.gallery
            .map(
              (_, gi) =>
                `<button type="button" class="spotlight__dot${gi === 0 ? ' is-active' : ''}" data-index="${gi}" aria-label="Show screenshot ${gi + 1}"></button>`,
            )
            .join('')}</div>`
        : '';
    const chevron = (d) =>
      `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const arrows =
      count > 1
        ? `
        <button type="button" class="spotlight__arrow spotlight__arrow--prev" data-dir="-1" aria-label="Previous screenshot">
          ${chevron('M15 18l-6-6 6-6')}
        </button>
        <button type="button" class="spotlight__arrow spotlight__arrow--next" data-dir="1" aria-label="Next screenshot">
          ${chevron('M9 18l6-6-6-6')}
        </button>`
        : '';
    const zoom = `
        <button type="button" class="spotlight__zoom" aria-label="View full size">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M21 21l-4.5-4.5M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0zM10 7v6M7 10h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          View full size
        </button>`;
    const lightbox = `
      <div class="spotlight__lightbox" hidden>
        <button type="button" class="spotlight__lightbox-close" aria-label="Close full size view">&times;</button>
        <img class="spotlight__lightbox-img" alt="" />
      </div>`;
    const anyLabel = media.gallery.some((g) => g.label);
    const firstLabel = media.gallery[0]?.label ?? '';
    const caption = anyLabel
      ? `<p class="spotlight__caption">${escapeHtml(firstLabel)}</p>`
      : '';
    return `
      <div class="spotlight__gallery">
        <div class="spotlight__viewport">
          <ul class="spotlight__shots" tabindex="0">${shots}</ul>
          ${arrows}
          ${zoom}
        </div>
        ${dots}
        ${lightbox}
      </div>
      ${caption}`;
  }

  const caption = media.label
    ? `<p class="spotlight__caption">${escapeHtml(media.label)}</p>`
    : '';
  const el =
    media.type === 'video'
      ? `<video
          src="${media.src}"
          controls
          muted
          playsinline
          preload="metadata"
          aria-label="${escapeHtml(media.label ?? '')}"></video>`
      : `<img src="${media.src}" alt="${escapeHtml(media.label ?? '')}" loading="lazy" />`;
  return `${el}\n      ${caption}`;
};

export const renderHome = ({
  headline,
  subhead,
  ctaLabel,
  heroImage,
  quote,
  quoteAuthor,
  testimonials,
  features,
  clients,
  spotlight,
  prismTeaser,
  pwaCallout,
}) => {
  const items =
    testimonials && testimonials.length
      ? testimonials
      : quote
        ? [{ quote, author: quoteAuthor }]
        : [];

  const slides = items
    .map(
      (t, i) => `
        <li class="testimonials__slide" id="testimonial-${i}" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">
          <blockquote>${escapeHtml(t.quote)}</blockquote>
          <cite>— ${escapeHtml(t.author)}</cite>
        </li>`,
    )
    .join('');

  const dots = items
    .map(
      (_, i) => `
        <button type="button" class="testimonials__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Show testimonial ${i + 1}"></button>`,
    )
    .join('');

  const clientItems = (clients ?? [])
    .map(
      (c) => `
        <div class="clients__item">
          <img src="${c.logo}" alt="${c.name}" loading="lazy" />
        </div>`,
    )
    .join('');

  return `
  <section class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url('${heroImage}');">
    <div class="tsr-container hero__inner">
      <h1>${headline}</h1>
      <p class="hero__sub">${subhead}</p>
      <div class="hero__ctas">
        <a href="/products" data-link data-cta="hero_see_products" class="tsr-button">${ctaLabel}</a>
        <a href="/free-channel-sheets" data-link data-cta="hero_free_game_sheets" class="tsr-button hero__free-cta">Print FREE Channel Sheets</a>
      </div>
    </div>
  </section>

  ${
    items.length
      ? `
    <section class="testimonials" aria-roledescription="carousel" aria-label="Customer testimonials">
      <div class="tsr-container">
        <ul class="testimonials__track" tabindex="0">
          ${slides}
        </ul>
        ${
          items.length > 1
            ? `<div class="testimonials__dots" role="tablist">${dots}</div>`
            : ''
        }
      </div>
    </section>`
      : ''
  }

  ${
    prismTeaser
      ? `
    <section class="prism-teaser">
      <div class="tsr-container prism-teaser__inner">
        <div class="prism-teaser__copy">
          <p class="prism-teaser__eyebrow">${escapeHtml(prismTeaser.eyebrow)}</p>
          <h2>${escapeHtml(prismTeaser.title)}</h2>
          <p class="prism-teaser__body">${escapeHtml(prismTeaser.body)}</p>
        </div>
        <a href="${prismTeaser.href}" data-link data-cta="home_prism_teaser" class="tsr-button prism-teaser__cta">${escapeHtml(prismTeaser.ctaLabel)}</a>
      </div>
    </section>`
      : ''
  }

  ${
    clients && clients.length
      ? `
    <section class="clients">
      <div class="tsr-container">
        <h2>Trusted by</h2>
        <div class="clients__viewport" aria-label="Client logos">
          <div class="clients__track">
            ${clientItems}
            ${clientItems}
          </div>
        </div>
      </div>
    </section>`
      : ''
  }

  ${
    spotlight && spotlight.tabs && spotlight.tabs.length
      ? `
    <section class="spotlight">
      <div class="tsr-container">
        <div class="spotlight__tabs" role="tablist" aria-label="${escapeHtml(spotlight.ariaLabel ?? 'What TSR can do')}">
          ${spotlight.tabs
            .map(
              (t, i) => `
            <button type="button" role="tab" id="spotlight-tab-${i}" class="spotlight__tab${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="spotlight-panel-${i}"${i === 0 ? '' : ' tabindex="-1"'}>${escapeHtml(t.label)}</button>`,
            )
            .join('')}
        </div>
        ${spotlight.tabs
          .map((t, i) => {
            const actions = (t.actions ?? [])
              .map((a, ai) => {
                const cls = ai === 0 ? 'tsr-button' : 'spotlight__secondary';
                const attrs = a.external
                  ? 'target="_blank" rel="noopener"'
                  : 'data-link';
                return `<a href="${a.href}" ${attrs} data-cta="${a.cta}" class="${cls}">${escapeHtml(a.label)}</a>`;
              })
              .join('');
            return `
          <div class="spotlight__panel" role="tabpanel" id="spotlight-panel-${i}" aria-labelledby="spotlight-tab-${i}"${i === 0 ? '' : ' hidden'}>
            <div class="spotlight__copy">
              <h2>${escapeHtml(t.title)}</h2>
              <p>${escapeHtml(t.body)}</p>
              ${
                t.points && t.points.length
                  ? `<ul class="spotlight__points">${t.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`
                  : ''
              }
              <div class="spotlight__actions">${actions}</div>
            </div>
            <div class="spotlight__media">
              ${renderSpotlightMedia(t.media)}
            </div>
          </div>`;
          })
          .join('')}
      </div>
    </section>`
      : ''
  }

  <section class="features">
    <div class="tsr-container">
      <h2>Why TSR</h2>
      <div class="features__grid">
        ${features
          .map(
            (f) => `
          <div class="feature">
            <h3>${f.title}</h3>
            <p>${f.body}</p>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  ${
    pwaCallout
      ? `
    <section class="pwa-callout">
      <div class="tsr-container pwa-callout__inner">
        <div class="pwa-callout__copy">
          <p class="pwa-callout__eyebrow">${escapeHtml(pwaCallout.eyebrow)}</p>
          <h2>${pwaCallout.title}</h2>
          <p class="pwa-callout__body">${pwaCallout.body}</p>
        </div>
        <a href="${pwaCallout.href}" target="_blank" rel="noopener" data-cta="home_try_pwa" class="tsr-button pwa-callout__cta">${pwaCallout.ctaLabel}</a>
      </div>
    </section>`
      : ''
  }

  <style>
    .hero {
      padding: 6rem 0;
      background-size: cover;
      background-position: center;
      color: #fff;
      border-bottom: 1px solid var(--tsr-border);
    }
    .hero h1 { font-size: clamp(2rem, 4vw, 3.25rem); margin: 0 0 1rem; color: #fff; }
    .hero__sub { font-size: 1.125rem; color: #d4d4d8; max-width: 640px; margin: 0 0 1.5rem; }
    .hero__ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
    .hero__free-cta { box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.85); }
    .hero__free-cta:hover { box-shadow: 0 0 0 2px #fff; }
    .testimonials { padding: 3rem 0; }
    .testimonials__track {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .testimonials__track::-webkit-scrollbar { display: none; }
    .testimonials__track:focus { outline: none; }
    .testimonials__slide {
      flex: 0 0 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      min-width: 0;
    }
    .testimonials__slide blockquote {
      font-size: 1.25rem;
      font-style: italic;
      margin: 0 0 0.5rem;
    }
    .testimonials__slide cite { color: var(--tsr-muted); }
    .testimonials__dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.25rem;
    }
    .testimonials__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--tsr-border);
      background: transparent;
      padding: 0;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;
    }
    .testimonials__dot.is-active {
      background: var(--tsr-accent, #2563eb);
      border-color: var(--tsr-accent, #2563eb);
      transform: scale(1.15);
    }
    @media (prefers-reduced-motion: reduce) {
      .testimonials__track { scroll-behavior: auto; }
    }
    .spotlight {
      padding: 3rem 0;
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      border-bottom: 1px solid var(--tsr-border);
    }
    .spotlight__tabs {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 2rem;
      border-bottom: 1px solid var(--tsr-border);
      flex-wrap: wrap;
    }
    .spotlight__tab {
      appearance: none;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      padding: 0.6rem 0.25rem;
      font: inherit;
      font-weight: 600;
      color: var(--tsr-muted);
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }
    .spotlight__tab:hover { color: var(--tsr-fg); }
    .spotlight__tab.is-active {
      color: var(--tsr-accent);
      border-bottom-color: var(--tsr-accent);
    }
    .spotlight__tab:focus-visible {
      outline: 2px solid var(--tsr-accent);
      outline-offset: 2px;
      border-radius: 2px;
    }
    .spotlight__panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      align-items: center;
    }
    .spotlight__panel[hidden] { display: none; }
    @media (max-width: 760px) {
      .spotlight__panel { grid-template-columns: 1fr; }
    }
    .spotlight__copy h2 { margin: 0 0 0.75rem; }
    .spotlight__copy > p { color: var(--tsr-muted); margin: 0 0 1rem; }
    .spotlight__points {
      margin: 0 0 1.5rem;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.4rem;
    }
    .spotlight__actions {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .spotlight__secondary {
      font-weight: 600;
      color: var(--tsr-accent, #2563eb);
      text-decoration: none;
    }
    .spotlight__secondary:hover { text-decoration: underline; }
    .spotlight__media video,
    .spotlight__media > img {
      width: 100%;
      border-radius: var(--tsr-radius);
      background: #000;
      display: block;
    }
    .spotlight__caption {
      margin: 0.5rem 0 0;
      font-size: 0.85rem;
      color: var(--tsr-muted);
      text-align: center;
    }
    .spotlight__viewport { position: relative; }
    .spotlight__shots {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      border-radius: var(--tsr-radius);
    }
    .spotlight__shots::-webkit-scrollbar { display: none; }
    .spotlight__shots:focus { outline: none; }
    .spotlight__shot {
      flex: 0 0 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: clamp(320px, 55vh, 520px);
      background: var(--tsr-bg);
      border-radius: var(--tsr-radius);
    }
    .spotlight__shot img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      border-radius: var(--tsr-radius);
      display: block;
      object-fit: contain;
    }
    .spotlight__zoom {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.7rem;
      border-radius: 999px;
      border: 1px solid var(--tsr-border);
      background: var(--tsr-surface);
      color: var(--tsr-fg);
      font: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
    .spotlight__zoom:hover {
      background: var(--tsr-accent);
      border-color: var(--tsr-accent);
      color: var(--tsr-bg);
    }
    .spotlight__zoom:focus-visible {
      outline: 2px solid var(--tsr-accent);
      outline-offset: 2px;
    }
    .spotlight__lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.85);
    }
    .spotlight__lightbox[hidden] { display: none; }
    .spotlight__lightbox-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: var(--tsr-radius);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
    }
    .spotlight__lightbox-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      font-size: 1.75rem;
      line-height: 1;
      cursor: pointer;
    }
    .spotlight__lightbox-close:hover { background: rgba(255, 255, 255, 0.3); }
    .spotlight__lightbox-close:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
    .spotlight__arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--tsr-border);
      background: var(--tsr-surface);
      color: var(--tsr-fg);
      cursor: pointer;
      padding: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s, opacity 0.2s;
    }
    .spotlight__arrow:hover {
      background: var(--tsr-accent);
      border-color: var(--tsr-accent);
      color: var(--tsr-bg);
      transform: translateY(-50%) scale(1.06);
    }
    .spotlight__arrow:focus-visible {
      outline: 2px solid var(--tsr-accent);
      outline-offset: 2px;
    }
    .spotlight__arrow[disabled] { opacity: 0.3; cursor: default; box-shadow: none; }
    .spotlight__arrow[disabled]:hover {
      background: var(--tsr-surface);
      border-color: var(--tsr-border);
      color: var(--tsr-fg);
      transform: translateY(-50%);
    }
    .spotlight__arrow--prev { left: 0.75rem; }
    .spotlight__arrow--next { right: 0.75rem; }
    .spotlight__dots {
      display: flex;
      justify-content: center;
      gap: 0.6rem;
      margin-top: 1rem;
    }
    .spotlight__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--tsr-accent);
      background: transparent;
      padding: 0;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;
    }
    .spotlight__dot:hover { background: color-mix(in srgb, var(--tsr-accent) 35%, transparent); }
    .spotlight__dot.is-active {
      background: var(--tsr-accent);
      transform: scale(1.25);
    }
    @media (prefers-reduced-motion: reduce) {
      .spotlight__shots { scroll-behavior: auto; }
    }
    .features { padding: 3rem 0; }
    .features h2 { margin: 0 0 1.5rem; }
    .features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .feature {
      padding: 1.25rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .feature h3 { margin: 0 0 0.5rem; }
    .feature p { margin: 0; color: var(--tsr-muted); }

    .prism-teaser {
      padding: 3rem 0;
      background: linear-gradient(90deg, #042316 0%, #0c3622 48%, #3f3f46 80%, #71717a 150%);
      color: #fff;
      border-top: 1px solid var(--tsr-border);
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-teaser__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .prism-teaser__copy { flex: 1 1 420px; }
    .prism-teaser__eyebrow {
      margin: 0 0 0.35rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #d4d4d8;
    }
    .prism-teaser__copy h2 { margin: 0 0 0.5rem; color: #fff; }
    .prism-teaser__body { margin: 0; max-width: 560px; color: rgba(255, 255, 255, 0.9); }
    .prism-teaser__cta {
      flex: 0 0 auto;
      background: #fff;
      color: #18181b;
      border-color: #fff;
    }
    .prism-teaser__cta:hover { background: #e4e4e7; }

    .pwa-callout {
      padding: 3rem 0;
      background: var(--tsr-accent, #2563eb);
      color: #fff;
      border-top: 1px solid var(--tsr-border);
    }
    .pwa-callout__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .pwa-callout__copy { flex: 1 1 420px; }
    .pwa-callout__eyebrow {
      margin: 0 0 0.35rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.85;
    }
    .pwa-callout__copy h2 { margin: 0 0 0.5rem; color: #fff; }
    .pwa-callout__body { margin: 0; max-width: 560px; color: rgba(255, 255, 255, 0.9); }
    .pwa-callout__cta {
      flex: 0 0 auto;
      background: #fff;
      color: var(--tsr-accent, #2563eb);
      border-color: #fff;
    }
    .pwa-callout__cta:hover { background: #f1f5f9; }

    .clients { padding: 2.5rem 0; background: var(--tsr-surface); border-top: 1px solid var(--tsr-border); border-bottom: 1px solid var(--tsr-border); }
    .clients h2 { margin: 0 0 1.25rem; }
    .clients__viewport {
      overflow: hidden;
      width: 100%;
      mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
    }
    .clients__track {
      display: flex;
      gap: 5rem;
      width: max-content;
      align-items: center;
      animation: tsr-marquee 45s linear infinite;
    }
    .clients__viewport:hover .clients__track {
      animation-play-state: paused;
    }
    .clients__item {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
    }
    .clients__item.is-transparent {
      padding: 0 1.25rem;
      border-radius: var(--tsr-radius);
    }
    .clients__item img {
      max-height: 120px;
      max-width: 260px;
      object-fit: contain;
    }
    @keyframes tsr-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .clients__track { animation: none; }
    }
  </style>
`;
};

export class TsrHomePres extends HTMLElement {
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

  disconnectedCallback() {
    this._stopTestimonialsAuto();
  }

  _render() {
    this._stopTestimonialsAuto();
    if (!this._props) return;
    this.innerHTML = renderHome(this._props);
    this._tagTransparentLogos();
    this._initTestimonials();
    this._initSpotlightTabs();
    this._initSpotlightGalleries();
  }

  _initSpotlightGalleries() {
    const galleries = Array.from(this.querySelectorAll('.spotlight__gallery'));
    galleries.forEach((gallery) => {
      const track = gallery.querySelector('.spotlight__shots');
      if (!track) return;
      const shots = Array.from(track.children);
      if (!shots.length) return;

      const currentIndex = () =>
        Math.round(track.scrollLeft / track.clientWidth);

      // Lightbox — works regardless of how many screenshots there are.
      const lightbox = gallery.querySelector('.spotlight__lightbox');
      const lightboxImg = gallery.querySelector('.spotlight__lightbox-img');
      const closeBtn = gallery.querySelector('.spotlight__lightbox-close');
      const zoom = gallery.querySelector('.spotlight__zoom');
      const onKey = (e) => {
        if (e.key === 'Escape') closeLightbox();
      };
      const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.removeEventListener('keydown', onKey);
      };
      const openLightbox = () => {
        if (!lightbox || !lightboxImg) return;
        const img = shots[currentIndex()]?.querySelector('img');
        if (!img) return;
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.hidden = false;
        document.addEventListener('keydown', onKey);
        closeBtn?.focus();
      };
      zoom?.addEventListener('click', openLightbox);
      closeBtn?.addEventListener('click', closeLightbox);
      lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      if (shots.length < 2) return;

      const dots = Array.from(gallery.querySelectorAll('.spotlight__dot'));
      const arrows = Array.from(gallery.querySelectorAll('.spotlight__arrow'));
      const prev = gallery.querySelector('.spotlight__arrow--prev');
      const next = gallery.querySelector('.spotlight__arrow--next');
      const caption = gallery.parentElement?.querySelector('.spotlight__caption');
      const last = shots.length - 1;

      const setActive = (i) => {
        dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
        if (prev) prev.disabled = i <= 0;
        if (next) next.disabled = i >= last;
        if (caption) {
          const img = shots[i]?.querySelector('img');
          caption.textContent = img?.dataset.caption ?? '';
        }
      };

      const goTo = (i) => {
        const clamped = Math.max(0, Math.min(last, i));
        const target = shots[clamped];
        if (target) track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
        setActive(clamped);
      };

      dots.forEach((dot) => {
        dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
      });

      arrows.forEach((arrow) => {
        arrow.addEventListener('click', () =>
          goTo(currentIndex() + Number(arrow.dataset.dir)),
        );
      });

      let scrollRaf = 0;
      track.addEventListener('scroll', () => {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          setActive(Math.max(0, Math.min(last, currentIndex())));
        });
      });

      setActive(0);
    });
  }

  _initSpotlightTabs() {
    const tabs = Array.from(this.querySelectorAll('.spotlight__tab'));
    if (tabs.length < 2) return;
    const panels = Array.from(this.querySelectorAll('.spotlight__panel'));

    const select = (i) => {
      tabs.forEach((tab, ti) => {
        const active = ti === i;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel, pi) => {
        panel.hidden = pi !== i;
      });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        select(i);
        const label = this._props?.spotlight?.tabs?.[i]?.label;
        trackEvent('spotlight_tab_select', { index: i, label });
      });
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (i + dir + tabs.length) % tabs.length;
        select(next);
        tabs[next].focus();
      });
    });
  }

  _initTestimonials() {
    const track = this.querySelector('.testimonials__track');
    if (!track) return;
    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    const dots = Array.from(this.querySelectorAll('.testimonials__dot'));
    const setActive = (i) => {
      dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
    };
    const scrollTo = (i) => {
      const target = slides[i];
      if (!target) return;
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const i = Number(dot.dataset.index);
        scrollTo(i);
        setActive(i);
        this._restartTestimonialsAuto();
        trackEvent('testimonial_select', { index: i });
      });
    });

    let scrollRaf = 0;
    track.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(slides.length - 1, i)));
      });
    });

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) return;

    const advance = () => {
      const current = Math.round(track.scrollLeft / track.clientWidth);
      const next = (current + 1) % slides.length;
      scrollTo(next);
    };
    this._testimonialsAdvance = advance;
    this._startTestimonialsAuto();

    const pause = () => this._stopTestimonialsAuto();
    const resume = () => this._startTestimonialsAuto();
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', resume);
  }

  _startTestimonialsAuto() {
    if (this._testimonialsTimer || !this._testimonialsAdvance) return;
    this._testimonialsTimer = setInterval(this._testimonialsAdvance, 6000);
  }

  _stopTestimonialsAuto() {
    if (this._testimonialsTimer) {
      clearInterval(this._testimonialsTimer);
      this._testimonialsTimer = 0;
    }
  }

  _restartTestimonialsAuto() {
    this._stopTestimonialsAuto();
    this._startTestimonialsAuto();
  }

  _tagTransparentLogos() {
    const cache = (TsrHomePres._transparencyCache ??= new Map());
    const imgs = this.querySelectorAll('.clients__item img');

    imgs.forEach((img) => {
      const apply = (result) => {
        if (!result) return;
        const parent = img.parentElement;
        if (!parent) return;
        parent.classList.add('is-transparent');
        parent.style.background = result.bg;
      };

      if (cache.has(img.src)) {
        apply(cache.get(img.src));
        return;
      }

      const check = () => {
        try {
          const canvas = document.createElement('canvas');
          const w = (canvas.width = img.naturalWidth);
          const h = (canvas.height = img.naturalHeight);
          if (!w || !h) return;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const { data } = ctx.getImageData(0, 0, w, h);

          let sampled = 0;
          let transparent = 0;
          let opaque = 0;
          let r = 0;
          let g = 0;
          let b = 0;
          for (let i = 0; i < data.length; i += 4 * 25) {
            sampled++;
            const a = data[i + 3];
            if (a < 250) transparent++;
            if (a > 200) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              opaque++;
            }
          }

          let result = null;
          const transparentPct = sampled ? transparent / sampled : 0;
          if (transparentPct > 0.25 && opaque > 0) {
            const avgLum = (0.299 * r + 0.587 * g + 0.114 * b) / opaque;
            const f = Math.min(1, Math.max(0, avgLum / 255));
            const cr = Math.round(63 * (1 - f));
            const cg = Math.round(63 * (1 - f));
            const cb = Math.round(70 * (1 - f));
            result = { bg: `rgb(${cr}, ${cg}, ${cb})` };
          }
          cache.set(img.src, result);
          apply(result);
        } catch {
          cache.set(img.src, null);
        }
      };

      if (img.complete && img.naturalWidth) check();
      else img.addEventListener('load', check, { once: true });
    });
  }
}

customElements.define('tsr-home-pres', TsrHomePres);
