import getRestaurants from './getRestaurants'
import './Paragraph'
import { RestaurantRandomizer } from './RestaurantRandomizer'
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
  connectedCallback() {
    if (!this.shadowRoot) {
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))

      navigator.geolocation.getCurrentPosition(geoLocation => {
        const restaurants = getRestaurants({
          geoLocation: {
            latitude: geoLocation.coords.latitude,
            longitude: geoLocation.coords.longitude,
          },
          filter: {
            radius: 1000,
            openNow: true,
          },
        })

        root.querySelector('lp-paragraph')?.remove()

        const restaurantRandomizer = new RestaurantRandomizer()
        restaurantRandomizer.restaurants = restaurants

        root.querySelector('div')?.appendChild(restaurantRandomizer)
      })
    }
  }
}

customElements.define('lp-app', App)
