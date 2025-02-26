import { html, LitElement, unsafeCSS } from 'lit';
import style from 'baks-components-styles/src/css/baks-button.css?inline';
import variant from 'baks-components-styles/src/css/variant.css?inline';
import { customElement, property } from 'lit/decorators.js';

@customElement('baks-button')
export class BaksButton extends LitElement {
  static styles = unsafeCSS([style, variant]);
  static formAssociated = true;
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#internals.ariaRole = 'button';
  }

  connectedCallback(): void {
    super.connectedCallback();
    /**
     * This is a workaround to mimic native sumit button behavior,
     * just until web components support this out of the box
     * @see https://github.com/WICG/webcomponents/issues/814
     */
    if (this.#internals.form !== null && this.type === 'submit') {
      this.addEventListener('click', () => {
        this.#internals.form.requestSubmit();
      });
    }
  }

  @property({ type: String })
  variant = 'primary';

  get _variantClassName() {
    return `bk-${this.variant}`;
  }

  @property({ type: String })
  size = 'normal';

  @property({ type: String })
  type = 'button';

  @property({ type: Boolean })
  disabled = false;

  render() {
    const { disabled, _variantClassName, size, type } = this;

    return html`<button
      ?disabled="${disabled}"
      type="${type}"
      class="${disabled ? 'disabled' : ''} ${size === 'block'
        ? 'w-full'
        : ''} ${_variantClassName} bk-button hover shadow-xs shadow-black px-6 py-1.5 cursor-pointer rounded-sm min-w-24"
    >
      <slot></slot>
    </button>`;
  }
}
