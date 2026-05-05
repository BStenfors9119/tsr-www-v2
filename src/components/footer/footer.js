const renderFooter = () => `
  <footer class="tsr-footer">
    <div class="tsr-container tsr-footer__inner">
      <div>
        <strong>The Sports Remote</strong>
        <p class="tsr-footer__muted">TV channel control for sports bars and venues.</p>
      </div>
    </div>
    <div class="tsr-footer__bar">
      © ${new Date().getFullYear()} SodaPop Systems LLC
    </div>
  </footer>
  <style>
    .tsr-footer {
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      margin-top: 3rem;
    }
    .tsr-footer__inner { padding: 2rem 1.25rem; }
    .tsr-footer__muted { color: var(--tsr-muted); margin: 0.25rem 0 0; }
    .tsr-footer__bar {
      text-align: center;
      padding: 1rem;
      color: var(--tsr-muted);
      border-top: 1px solid var(--tsr-border);
      font-size: 0.875rem;
    }
  </style>
`;

export class TsrFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = renderFooter();
  }
}

customElements.define('tsr-footer', TsrFooter);
