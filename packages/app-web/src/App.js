import './Paragraph'
import './SectionCentered'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    div {
      max-width: 48em;
    }
  </style>

  <lp-section-centered>
    <div>
      <lp-paragraph>
        Having a hard time deciding where to eat? I know it can sometimes be
        hard and I'm here to help you! But before I can help you, I will need to
        know where you are so I can choose a restaurant near you.
      </lp-paragraph>
    </div>
  </lp-section-centered>
`

export class App extends HTMLElement {
  constructor() {
    super()

    /** @private */
    this.rendered = false;
    /** @private @type {{ latitude: number, longitude: number } | null} */
    this.geoLocation = null

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.rendered && this.isConnected) {
      this.rendered = true
      this.shadowRoot?.append(template.content.cloneNode(true))

      navigator.geolocation.getCurrentPosition(geoLocation => {
        this.geoLocation = {
          latitude: geoLocation.coords.latitude,
          longitude: geoLocation.coords.longitude,
        }

        this.shadowRoot?.querySelector('lp-paragraph')?.remove()
      })
    }
  }
}

customElements.define('lp-app', App)
