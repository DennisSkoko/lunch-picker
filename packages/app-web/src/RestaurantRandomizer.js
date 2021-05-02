import './Button'
import { Paragraph } from './Paragraph'

const template = {
  main: (() => {
    const template = document.createElement('template')
    template.innerHTML = `
      <lp-button>
        Randomize restaurant
      </lp-button>
    `
    return template
  })(),

  loading: (() => {
    const template = document.createElement('template')
    template.innerHTML = `
      <lp-paragraph>
        Fetching restaurants near you...
      </lp-paragraph>
    `
    return template
  })(),

  error: (() => {
    const template = document.createElement('template')
    template.innerHTML = `
      <lp-paragraph>
        Apologies, something unexpected happened and I can't provide a
        restaurant to you. Please contact my creator if this keeps happening.
      </lp-paragraph>
    `
    return template
  })(),
}

/**
 * @param {number} max
 */
function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export class RestaurantRandomizer extends HTMLElement {
  constructor() {
    super()

    /** @type {Promise<import('./getRestaurants').Restaurant[]>} */
    this.restaurants
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.main.content.cloneNode(true))

      root.querySelector('lp-button')?.addEventListener('click', async () => {
        root.querySelector('lp-button')?.remove()
        root.appendChild(template.loading.content.cloneNode(true))

        try {
          const restaurants = await this.restaurants
          root.querySelector('lp-paragraph')?.remove()
          const restaurant = restaurants[getRandomNumber(restaurants.length)]

          const element = new Paragraph()
          element.setAttribute('size', 'large')
          element.innerText = restaurant.name
          root.appendChild(element)
        } catch (err) {
          console.error(err)
          root.querySelector('lp-paragraph')?.remove()
          root.appendChild(template.error.content.cloneNode(true))
        }
      })
    }
  }
}

customElements.define('lp-restaurant-randomizer', RestaurantRandomizer)
