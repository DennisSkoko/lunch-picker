const template = document.createElement('template')
template.innerHTML = `
  <style>
    button {
      border: none;
      font-family: var(--font-family-body);
      font-size: var(--font-size-body-lg);
      background-color: var(--color-primary);
      padding: var(--spacing-md) var(--spacing-lg);
      color: var(--color-background);
      margin: var(--spacing-md) auto;
      display: block;
      cursor: pointer;
      box-shadow: var(--spacing-xs) var(--spacing-xs) var(--color-primary-light);
      transition: box-shadow 400ms;
    }

    button:focus, button:hover {
      box-shadow: 0 0 var(--color-primary-light);
    }
  </style>

  <button>
    <slot></slot>
  </button>
`

export class Button extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this
        .attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true))
    }
  }
}

customElements.define('lp-button', Button)
