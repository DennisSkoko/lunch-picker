const template = document.createElement('template')
template.innerHTML = `
  <style>
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-family-heading);
      color: var(--color-text);
      margin: 0 0 var(--spacing-sm);
      font-weight: var(--font-size-heading-weight);
    }

    h1 {
      font-size: var(--font-size-heading-h1);
    }

    h2 {
      font-size: var(--font-size-heading-h2);
    }

    h3 {
      font-size: var(--font-size-heading-h3);
    }

    h4 {
      font-size: var(--font-size-heading-h4);
    }

    h5 {
      font-size: var(--font-size-heading-h5);
    }

    h6 {
      font-size: var(--font-size-heading-h6);
    }

    :host([centered]) {
      text-align: center;
    }
  </style>
`

export class Heading extends HTMLElement {
  static get observedAttributes() {
    return ['level']
  }

  constructor() {
    super()

    /** @private */
    this.rendered = false

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.rendered && this.isConnected) {
      this.rendered = true
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
      this.addHeadingEl()
    }
  }

  /**
   * @param {'level' | 'centered'} name
   * @param {string | null} oldValue
   */
  attributeChangedCallback(name, oldValue) {
    if (this.rendered) {
      switch (name) {
        case 'level':
          this.shadowRoot?.querySelector(`h${oldValue || '1'}`)?.remove()
          this.addHeadingEl()
          break;
      }
    }
  }

  /**
   * @private
   */
  addHeadingEl() {
    const el = document.createElement(`h${this.getAttribute('level') || '1'}`)
    el.innerHTML = `<slot></slot>`

    this.shadowRoot?.appendChild(el)
  }
}

customElements.define('lp-heading', Heading)
