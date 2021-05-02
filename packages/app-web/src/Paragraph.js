const template = document.createElement('template')
template.innerHTML = `
  <style>
    p {
      font-family: var(--font-family-body);
      font-size: var(--font-size-body-md);
      color: var(--color-text);
      margin: 0;
    }

    :host([size="large"]) p {
      font-size: var(--font-size-body-lg);
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
  connectedCallback() {
    if (!this.shadowRoot) {
      this
        .attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
}

customElements.define('lp-paragraph', Paragraph)
