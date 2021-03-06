'use strict'

const querystring = require('querystring')
const fetch = require('node-fetch').default
const getApiKey = require('./getApiKey')

/**
 * @param {import('./handler.types').Event} event
 * @returns {Promise<import('./handler.types').Result>}
 */
async function handler({ geoLocation, filter, pageToken }) {
  if (!process.env.LP_GCP_PLACES_API_ENDPOINT) {
    throw new Error(
      'You must specify the `LP_GCP_PLACES_API_ENDPOINT` env variable'
    )
  }

  const endpoint = process.env.LP_GCP_PLACES_API_ENDPOINT
  const queryParams = querystring.stringify({
    key: await getApiKey(),
    language: 'en',
    type: 'restaurant',
    location: `${geoLocation.latitude},${geoLocation.longitude}`,
    radius: (filter && filter.radius) || 800,
    opennow: (filter && filter.openNow) || undefined,
    minprice: filter && filter.price && filter.price.min,
    maxprice: filter && filter.price && filter.price.max,
    pagetoken: pageToken
  })

  const response = await fetch(`${endpoint}?${queryParams}`)

  if (!response.ok) {
    const message = 'The request to Google Places API has failed'
    console.error(message, { body: await response.json() })
    throw new Error(message)
  }

  const data = /** @type {import('./handler.types').GcpPlacesApiResponseBody} */
    (await response.json())

  return {
    items: data.results.map(result => ({
      id: result.place_id,
      name: result.name,
      address: result.vicinity,
      price: {
        level: result.price_level
      },
      rating: {
        level: result.rating,
        reviewsCount: result.user_ratings_total
      }
    })),
    pageToken: data.next_page_token
  }
}

module.exports = handler
