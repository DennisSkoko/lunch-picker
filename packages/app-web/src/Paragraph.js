const template = document.createElement('template')
template.innerHTML = `
  <style>
    p {
      font-family: var(--font-family-body);
      font-size: var(--font-size-body);
      color: var(--color-text);
      margin: 0;
    }

    :host(:not(:last-child)) p {
      margin-bottom: var(--spacing-md);
    }

    :host([centered]) p {
      text-align: center;
    }
  </style>

  <p>
    <slot></slot>
  </p>
`

export class Paragraph extends HTMLElement {
  constructor() {
    super()

    /** @private */
    this.rendered = false

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.rendered && this.isConnected) {
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
}

customElements.define('lp-paragraph', Paragraph)
