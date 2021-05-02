'use strict'

/**
 * @typedef {object} GeoLocation
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {0 | 1 | 2 | 3 | 4} Price
 */

/**
 * @typedef {object} Filter
 * @property {{ min?: Price, max?: Price }} [price]
 * @property {boolean} [openNow]
 * @property {number} [radius]
 */

/**
 * @typedef {object} Restaurant
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {{ level?: Price }} price
 * @property {{ reviewsCount: number, level: number }} rating
 */

/**
 * @typedef {object} ApiResponse
 * @property {{ restaurants: { pageToken?: string, items: Restaurant[] } }} data
 */

/**
 * @typedef {object} GetRestaurantsParams
 * @property {GeoLocation} geoLocation
 * @property {Filter} [filter]
 */

const query = `
  query MyQuery(
    $geoLocation: GeoLocation!,
    $filter: RestaurantFilter!,
    $pageToken: String
  ) {
    restaurants(
      geoLocation: $geoLocation,
      filter: $filter,
      pageToken: $pageToken
    ) {
      pageToken
      items {
        id
        name
        address
        rating {
          reviewsCount
          level
        }
        price {
          level
        }
      }
    }
  }
`

/**
 * @param {GetRestaurantsParams} params
 */
async function getRestaurants({ geoLocation, filter }) {
  /** @type {Restaurant[]} */
  let restaurants = []
  /** @type {string | undefined} */
  let pageToken

  do {
    const res = await fetch(process.env.LP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'x-api-key': process.env.LP_API_KEY },
      body: JSON.stringify({
        query,
        variables: { geoLocation, filter, pageToken }
      })
    })

    if (!res.ok) {
      const message = 'The request failed when fetching restaurants'
      console.error(message, { body: await res.json() })
      throw new Error(message)
    }

    const { data } = /** @type {ApiResponse} */ (await res.json())

    restaurants = [...restaurants, ...data.restaurants.items]
    pageToken = data.restaurants.pageToken
  } while (pageToken)

  return restaurants
}

export default getRestaurants
