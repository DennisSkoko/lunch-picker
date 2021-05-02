'use strict'

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
 * @param {import('./getRestaurants.types').GetRestaurantsParams} params
 */
async function getRestaurants({ geoLocation, filter }) {
  /** @type {import('./getRestaurants.types').Restaurant[]} */
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

    const { data } = /** @type {import('./getRestaurants.types').ApiResponse} */ (await res.json())

    restaurants = [...restaurants, ...data.restaurants.items]
    pageToken = data.restaurants.pageToken
  } while (pageToken)

  return restaurants
}

export default getRestaurants
