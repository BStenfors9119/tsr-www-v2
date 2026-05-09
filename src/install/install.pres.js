const portVisuals = {
  'usb-a': {
    label: 'USB-A connector',
    description:
      'Flat silver rectangle, about the size of a thumbnail. Only fits one way — flip it over if it does not slide in.',
    svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="USB-A connector">
      <rect x="20" y="20" width="160" height="40" rx="2" fill="#d4d4d8" stroke="#52525b" stroke-width="2"/>
      <rect x="30" y="30" width="140" height="20" fill="#27272a"/>
      <rect x="40" y="36" width="120" height="3" fill="#fafafa"/>
      <rect x="40" y="44" width="120" height="3" fill="#fafafa"/>
    </svg>`,
  },
  'ethernet-wan': {
    label: 'Ethernet (WAN) plug',
    description:
      'Square plug with a small clip on top. Push it in until you hear a soft click. Goes into the port labeled "WAN" or "Internet".',
    svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ethernet WAN plug">
      <rect x="50" y="15" width="100" height="50" rx="4" fill="#27272a" stroke="#16a34a" stroke-width="3"/>
      <rect x="80" y="10" width="40" height="8" fill="#16a34a"/>
      <rect x="65" y="25" width="70" height="30" fill="#3f3f46"/>
    </svg>`,
  },
  'barrel-jack-power': {
    label: 'Round power jack',
    description:
      'A round hole on the back of the router for the included power adapter — the tip is round, not flat.',
    svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Round power jack">
      <circle cx="100" cy="40" r="30" fill="#27272a" stroke="#52525b" stroke-width="2"/>
      <circle cx="100" cy="40" r="15" fill="#3f3f46"/>
      <circle cx="100" cy="40" r="5" fill="#a1a1aa"/>
    </svg>`,
  },
  'pi-zero-edge': {
    wide: true,
    label: 'Raspberry Pi receiver — which port goes where',
    description:
      'The two micro-USB slots look identical. Only the one outlined in red — the one farthest from the mini-HDMI — provides power.',
    svg: `<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raspberry Pi Zero port edge diagram">
      <rect x="10" y="40" width="580" height="50" rx="4" fill="#14532d" stroke="#052e16" stroke-width="2"/>
      <rect x="60" y="55" width="80" height="20" fill="#27272a"/>
      <polygon points="240,65 250,57 290,57 300,65 290,73 250,73" fill="#27272a"/>
      <polygon points="430,65 440,57 480,57 490,65 480,73 440,73" fill="#27272a" stroke="#dc2626" stroke-width="3"/>
      <text x="100" y="115" text-anchor="middle" font-size="14" font-family="system-ui, sans-serif" fill="#3f3f46">Mini-HDMI</text>
      <text x="100" y="132" text-anchor="middle" font-size="11" font-family="system-ui, sans-serif" fill="#71717a">(video — don&apos;t use)</text>
      <text x="270" y="115" text-anchor="middle" font-size="14" font-family="system-ui, sans-serif" fill="#3f3f46">Micro-USB</text>
      <text x="270" y="132" text-anchor="middle" font-size="11" font-family="system-ui, sans-serif" fill="#71717a">(data — don&apos;t use)</text>
      <text x="460" y="115" text-anchor="middle" font-size="14" font-family="system-ui, sans-serif" fill="#dc2626" font-weight="700">PWR IN ← plug here</text>
      <text x="460" y="132" text-anchor="middle" font-size="11" font-family="system-ui, sans-serif" fill="#dc2626">(power)</text>
    </svg>`,
  },
};

const renderHotspots = (hotspots) => {
  if (!hotspots || !hotspots.length) return '';
  return hotspots
    .map(
      (h) => `
        <span class="install-hotspot"
              style="left:${h.x}%;top:${h.y}%;width:${h.width}%;height:${h.height}%"
              role="img"
              aria-label="Step ${h.number}: ${h.label}">
          <span class="install-hotspot__num">${h.number}</span>
        </span>`,
    )
    .join('');
};

const renderVisuals = (visuals) => {
  if (!visuals || !visuals.length) return '';
  const cards = visuals
    .map((key) => {
      const v = portVisuals[key];
      if (!v) return '';
      return `
        <figure class="install-visual${v.wide ? ' install-visual--wide' : ''}">
          ${v.svg}
          <figcaption>
            <strong>${v.label}</strong>
            <span>${v.description}</span>
          </figcaption>
        </figure>`;
    })
    .join('');
  return `<aside class="install-step__visuals" aria-label="What to look for">${cards}</aside>`;
};

export const renderInstall = ({ intro, steps }) => `
  <section class="tsr-container install">
    <h1>TSR Installation</h1>
    <p class="install__intro">${intro}</p>

    <ol class="install__steps">
      ${steps
        .map(
          (s, i) => `
        <li class="install-step">
          <header class="install-step__header">
            <span class="install-step__number">${i + 1}</span>
            <h2>${s.title}</h2>
            ${s.optional ? `<span class="install-step__badge">Optional — as needed</span>` : ''}
          </header>

          ${
            s.video
              ? `<div class="install-step__video">
                   <video
                     src="${s.video}"
                     controls
                     preload="metadata"
                     playsinline
                     aria-label="${s.title} — video"></video>
                 </div>`
              : ''
          }

          ${
            s.image
              ? `<figure class="install-step__image">
                   <button
                     type="button"
                     class="install-step__image-button"
                     data-zoom-src="${s.image.src}"
                     data-zoom-alt="${s.image.alt || s.title}"
                     data-zoom-hotspots="${
                       s.image.hotspots
                         ? encodeURIComponent(JSON.stringify(s.image.hotspots))
                         : ''
                     }"
                     aria-label="Click to enlarge image">
                     <img src="${s.image.src}" alt="${s.image.alt || s.title}" loading="lazy" />
                     ${renderHotspots(s.image.hotspots)}
                     <span class="install-step__image-hint" aria-hidden="true">Click to enlarge</span>
                   </button>
                   ${s.image.caption ? `<figcaption>${s.image.caption}</figcaption>` : ''}
                 </figure>`
              : ''
          }

          ${renderVisuals(s.visuals)}

          ${
            s.shortInstructions && s.shortInstructions.length
              ? `<ol class="install-step__instructions install-step__instructions--short">
                   ${s.shortInstructions.map((line) => `<li>${line}</li>`).join('')}
                 </ol>`
              : ''
          }

          ${
            s.instructions && s.instructions.length
              ? s.shortInstructions && s.shortInstructions.length
                ? `<details class="install-step__details">
                     <summary>Show detailed instructions if needed</summary>
                     <ol class="install-step__instructions">
                       ${s.instructions.map((line) => `<li>${line}</li>`).join('')}
                     </ol>
                   </details>`
                : `<ol class="install-step__instructions">
                     ${s.instructions.map((line) => `<li>${line}</li>`).join('')}
                   </ol>`
              : ''
          }

          ${s.note ? `<p class="install-step__note">${s.note}</p>` : ''}
        </li>`,
        )
        .join('')}
    </ol>
  </section>

  <style>
    .install { padding: 2.5rem 1.25rem; }
    .install__intro { color: var(--tsr-muted); max-width: 720px; margin: 0 0 2rem; }
    .install__steps { list-style: none; padding: 0; display: grid; gap: 2rem; }
    .install-step {
      padding: 1.5rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .install-step__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .install-step__header h2 { margin: 0; font-size: 1.25rem; }
    .install-step__badge {
      margin-left: auto;
      padding: 0.25rem 0.6rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--tsr-muted);
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: 999px;
      white-space: nowrap;
    }
    .install-step__number {
      flex: 0 0 auto;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: var(--tsr-accent);
      color: #27272a;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .install-step__video {
      position: relative;
      padding-bottom: 56.25%;
      margin: 0 0 1rem;
      background: #000;
      border-radius: var(--tsr-radius);
      overflow: hidden;
    }
    .install-step__video video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .install-step__image {
      margin: 0 0 1.25rem;
      padding: 0.85rem;
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }
    .install-step__image-button {
      position: relative;
      display: inline-block;
      padding: 0;
      margin: 0;
      background: transparent;
      border: 0;
      cursor: zoom-in;
      border-radius: var(--tsr-radius);
      overflow: hidden;
      transition: transform 0.15s ease;
      line-height: 0;
    }
    .install-hotspot {
      position: absolute;
      box-sizing: border-box;
      border: 3px solid var(--tsr-accent, #facc15);
      border-radius: 6px;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.45);
      background: rgba(250, 204, 21, 0.12);
      pointer-events: none;
      animation: install-hotspot-pulse 2.4s ease-in-out infinite;
    }
    .install-hotspot__num {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 1.6rem;
      height: 1.6rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--tsr-accent, #facc15);
      color: #18181b;
      border: 2px solid #18181b;
      border-radius: 50%;
      font-size: 0.85rem;
      font-weight: 700;
      line-height: 1;
    }
    @keyframes install-hotspot-pulse {
      0%, 100% { box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.45), 0 0 0 0 rgba(250, 204, 21, 0.55); }
      50% { box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.45), 0 0 0 8px rgba(250, 204, 21, 0); }
    }
    .install-step__image-button:hover,
    .install-step__image-button:focus-visible {
      transform: scale(1.02);
      outline: 2px solid var(--tsr-accent);
      outline-offset: 2px;
    }
    .install-step__image img {
      max-width: 100%;
      max-height: 320px;
      height: auto;
      display: block;
      border-radius: var(--tsr-radius);
    }
    .install-step__image-hint {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      padding: 0.2rem 0.55rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #fafafa;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 999px;
      pointer-events: none;
    }
    .install-step__image figcaption {
      font-size: 0.85rem;
      color: var(--tsr-muted);
      line-height: 1.4;
    }
    .install-lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      cursor: zoom-out;
      overflow: auto;
    }
    .install-lightbox__stage {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
    }
    .install-lightbox__img {
      display: block;
      transform-origin: center center;
      transition: transform 0.15s ease;
      user-select: none;
      -webkit-user-drag: none;
    }
    .install-lightbox__controls {
      position: fixed;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
      z-index: 2;
    }
    .install-lightbox__btn {
      width: 2.5rem;
      height: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.15);
      color: #fafafa;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      line-height: 1;
    }
    .install-lightbox__btn:hover,
    .install-lightbox__btn:focus-visible {
      background: rgba(255, 255, 255, 0.28);
      outline: none;
    }
    .install-step__visuals {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
      margin: 0 0 1.25rem;
    }
    .install-visual {
      flex: 1 1 200px;
      margin: 0;
      padding: 0.85rem;
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }
    .install-visual--wide { flex: 1 1 100%; }
    .install-visual svg {
      width: 100%;
      max-width: 220px;
      height: auto;
      display: block;
    }
    .install-visual--wide svg { max-width: 600px; }
    .install-visual figcaption {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .install-visual figcaption strong { font-size: 0.9rem; }
    .install-visual figcaption span {
      font-size: 0.8rem;
      color: var(--tsr-muted);
      line-height: 1.35;
    }
    .install-step__instructions {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.4rem;
    }
    .install-step__instructions--short { font-weight: 500; }
    .install-step__details {
      margin-top: 0.85rem;
      padding: 0.65rem 0.85rem;
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .install-step__details > summary {
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--tsr-muted);
      list-style: none;
      user-select: none;
    }
    .install-step__details > summary::-webkit-details-marker { display: none; }
    .install-step__details > summary::before {
      content: '▸ ';
      display: inline-block;
      transition: transform 0.15s ease;
    }
    .install-step__details[open] > summary::before { content: '▾ '; }
    .install-step__details > .install-step__instructions { margin-top: 0.75rem; }
    .install-step__note {
      margin: 1rem 0 0;
      padding: 0.75rem 1rem;
      background: var(--tsr-bg);
      border-left: 3px solid var(--tsr-accent);
      border-radius: var(--tsr-radius);
      color: var(--tsr-muted);
    }
  </style>
`;

const openLightbox = (src, alt, hotspots) => {
  const existing = document.querySelector('.install-lightbox');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'install-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', alt || 'Enlarged image');
  overlay.innerHTML = `
    <div class="install-lightbox__controls">
      <button type="button" class="install-lightbox__btn" data-zoom-out aria-label="Zoom out">−</button>
      <button type="button" class="install-lightbox__btn" data-zoom-in aria-label="Zoom in">+</button>
      <button type="button" class="install-lightbox__btn" data-zoom-reset aria-label="Reset zoom">⟲</button>
      <button type="button" class="install-lightbox__btn" data-close aria-label="Close">×</button>
    </div>
    <div class="install-lightbox__stage">
      <div class="install-lightbox__frame">
        <img class="install-lightbox__img" src="${src}" alt="${alt || ''}" />
        ${renderHotspots(hotspots)}
      </div>
    </div>
  `;

  const img = overlay.querySelector('.install-lightbox__img');
  const frame = overlay.querySelector('.install-lightbox__frame');
  let scale = 1;
  const applyScale = () => {
    frame.style.transform = `scale(${scale})`;
    img.style.cursor = scale > 1 ? 'zoom-out' : 'zoom-in';
  };
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === '+' || e.key === '=') {
      scale = Math.min(scale + 0.25, 5);
      applyScale();
    }
    if (e.key === '-') {
      scale = Math.max(scale - 0.25, 0.5);
      applyScale();
    }
    if (e.key === '0') {
      scale = 1;
      applyScale();
    }
  };

  overlay.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-close]')) return close();
    if (t.closest('[data-zoom-in]')) {
      scale = Math.min(scale + 0.25, 5);
      return applyScale();
    }
    if (t.closest('[data-zoom-out]')) {
      scale = Math.max(scale - 0.25, 0.5);
      return applyScale();
    }
    if (t.closest('[data-zoom-reset]')) {
      scale = 1;
      return applyScale();
    }
    if (t === img) {
      scale = scale > 1 ? 1 : 2;
      return applyScale();
    }
    if (t === overlay || t.classList.contains('install-lightbox__stage')) {
      close();
    }
  });

  overlay.addEventListener('wheel', (e) => {
    if (!e.target.closest('.install-lightbox__stage')) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    scale = Math.min(5, Math.max(0.5, scale + delta));
    applyScale();
  }, { passive: false });

  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
};

export class TsrInstallPres extends HTMLElement {
  set props(value) {
    this._props = value;
    this._render();
  }
  get props() {
    return this._props;
  }
  connectedCallback() {
    this._render();
    this._onClick = (e) => {
      const btn = e.target.closest('.install-step__image-button');
      if (!btn || !this.contains(btn)) return;
      e.preventDefault();
      let hotspots = null;
      if (btn.dataset.zoomHotspots) {
        try {
          hotspots = JSON.parse(decodeURIComponent(btn.dataset.zoomHotspots));
        } catch {
          hotspots = null;
        }
      }
      openLightbox(btn.dataset.zoomSrc, btn.dataset.zoomAlt, hotspots);
    };
    this.addEventListener('click', this._onClick);
  }
  disconnectedCallback() {
    if (this._onClick) this.removeEventListener('click', this._onClick);
  }
  _render() {
    if (!this._props) return;
    this.innerHTML = renderInstall(this._props);
  }
}

customElements.define('tsr-install-pres', TsrInstallPres);
