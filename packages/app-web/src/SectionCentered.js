const style = document.createElement('template')
style.innerHTML = `
  <style>
    :host {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
`

const template = document.createElement('template')
template.innerHTML = `
  <slot></slot>
`

export class SectionCentered extends HTMLElement {
  constructor() {
    super()

    /** @private */
    this.rendered = false

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.rendered && this.isConnected) {
      this.shadowRoot?.appendChild(style.content.cloneNode(true))
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
  }
}

customElements.define('lp-section-centered', SectionCentered)
