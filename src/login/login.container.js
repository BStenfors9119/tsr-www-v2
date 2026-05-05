import './login.pres.js';

const initialState = { mode: 'login', error: null };

const submit = async ({ mode, email, password }) => {
  console.log(`[login] ${mode} for ${email}`);
  return { ok: true };
};

export class TsrLogin extends HTMLElement {
  connectedCallback() {
    this._state = { ...initialState };
    this._render();
  }

  _render() {
    const el = document.createElement('tsr-login-pres');
    el.props = this._state;
    this.replaceChildren(el);

    const form = this.querySelector('#login-form');
    form?.addEventListener('submit', this._onSubmit);

    this.querySelectorAll('[data-mode]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this._state = { ...this._state, mode: a.dataset.mode, error: null };
        this._render();
      });
    });
  }

  _onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const result = await submit({ mode: this._state.mode, ...data });
    if (!result.ok) {
      this._state = { ...this._state, error: result.error ?? 'Something went wrong' };
      this._render();
    }
  };
}

customElements.define('tsr-login', TsrLogin);
