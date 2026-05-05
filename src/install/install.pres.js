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
          </header>

          ${
            s.video
              ? `<div class="install-step__video">
                   <iframe
                     src="${s.video}"
                     title="${s.title} — video"
                     loading="lazy"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen></iframe>
                 </div>`
              : ''
          }

          ${
            s.instructions && s.instructions.length
              ? `<ol class="install-step__instructions">
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
    .install-step__video iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .install-step__instructions {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.4rem;
    }
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
  }
  _render() {
    if (!this._props) return;
    this.innerHTML = renderInstall(this._props);
  }
}

customElements.define('tsr-install-pres', TsrInstallPres);
