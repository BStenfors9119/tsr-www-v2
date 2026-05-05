export const renderHome = ({
  headline,
  subhead,
  ctaLabel,
  heroImage,
  quote,
  quoteAuthor,
  features,
  clients,
}) => {
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
      <a href="/products" data-link class="tsr-button">${ctaLabel}</a>
    </div>
  </section>

  <section class="quote">
    <div class="tsr-container">
      <blockquote>${quote}</blockquote>
      <cite>— ${quoteAuthor}</cite>
    </div>
  </section>

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
    .quote { padding: 3rem 0; }
    .quote blockquote { font-size: 1.25rem; font-style: italic; margin: 0 0 0.5rem; }
    .quote cite { color: var(--tsr-muted); }
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

  _render() {
    if (!this._props) return;
    this.innerHTML = renderHome(this._props);
    this._tagTransparentLogos();
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
