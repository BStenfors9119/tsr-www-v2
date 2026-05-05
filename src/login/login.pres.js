export const renderLogin = ({ mode, error }) => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem; max-width: 480px;">
    <h1>${mode === 'signup' ? 'Create account' : 'Log in'}</h1>
    ${error ? `<p class="login__error">${error}</p>` : ''}
    <form class="login-form" id="login-form">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required minlength="6" />
      <button type="submit" class="tsr-button">
        ${mode === 'signup' ? 'Sign up' : 'Log in'}
      </button>
    </form>
    <div class="login__links">
      ${
        mode === 'signup'
          ? `<a href="#" data-mode="login">Already have an account? Log in</a>`
          : `
              <a href="#" data-mode="signup">Need an account? Sign up</a>
              <a href="#" data-mode="reset">Forgot password?</a>
            `
      }
    </div>
  </section>
  <style>
    .login-form { display: grid; gap: 0.75rem; }
    .login-form input {
      padding: 0.75rem;
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      background: var(--tsr-bg);
      color: var(--tsr-fg);
      font: inherit;
    }
    .login__links { display: flex; justify-content: space-between; margin-top: 1rem; }
    .login__error { color: #c0392b; }
  </style>
`;

export class TsrLoginPres extends HTMLElement {
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
    this.innerHTML = renderLogin(this._props);
  }
}

customElements.define('tsr-login-pres', TsrLoginPres);
