const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>

  <slot></slot>
`

export class SectionCentered extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this
        .attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
}

customElements.define('lp-section-centered', SectionCentered)
