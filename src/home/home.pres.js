const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

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
      <a href="/products" data-link class="tsr-button">${ctaLabel}</a>
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

  disconnectedCallback() {
    this._stopTestimonialsAuto();
  }

  _render() {
    this._stopTestimonialsAuto();
    if (!this._props) return;
    this.innerHTML = renderHome(this._props);
    this._tagTransparentLogos();
    this._initTestimonials();
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
