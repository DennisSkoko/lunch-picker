'use strict'

const { mocked } = require('ts-jest/utils')
const fetch = require('node-fetch').default
const getApiKey = require('./getApiKey')
const handler = require('./handler')

jest.mock('node-fetch')
jest.mock('./getApiKey')

const originalEnv = { ...process.env }

/**
 * @param {{ status?: number, body: unknown }} params
 * @returns {import('node-fetch').Response}
 */
function createMockResponse({ status = 200, body }) {
  return /** @type {import('node-fetch').Response} */ ({
    ok: status === 200,
    json: async () => body
  })
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation()
})

beforeEach(() => {
  process.env.LP_GCP_PLACES_API_ENDPOINT = 'mock-lp-gcp-places-api-endpoint'
  mocked(getApiKey).mockResolvedValue('mock-api-key')
})

afterEach(() => {
  process.env = originalEnv
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('returns an array of restaurants from Google Places API', async () => {
  /** @type {import('./handler.types').GcpPlacesApiResponseBody} */
  const mockResponseBody = {
    results: [
      {
        place_id: 'foo',
        name: 'Foo',
        price_level: 2,
        rating: 3,
        user_ratings_total: 230,
        vicinity: 'Bar'
      }
    ]
  }

  mocked(fetch).mockResolvedValue(
    createMockResponse({ body: mockResponseBody })
  )

  const res = await handler({ geoLocation: { latitude: 1, longitude: 1 } })

  expect(res).toEqual({
    items: [
      {
        id: 'foo',
        name: 'Foo',
        address: 'Bar',
        price: {
          level: 2
        },
        rating: {
          level: 3,
          reviewsCount: 230
        }
      }
    ]
  })
})

it('returns a page token if more than 60 items are returned from the Google Places API', async () => {
  /** @type {import('./handler.types').GcpPlacesApiResponseBody} */
  const mockResponseBody = { next_page_token: 'mock-page-token', results: [] }

  mocked(fetch).mockResolvedValue(
    createMockResponse({ body: mockResponseBody })
  )

  const res = await handler({ geoLocation: { latitude: 1, longitude: 1 } })

  expect(res).toEqual({ items: [], pageToken: 'mock-page-token' })
})

it('fetches restaurants based on the given geo location coordinates', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({ geoLocation: { latitude: 15.75, longitude: 8.5 } })

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('location=15.75%2C8.5')
  )
})

it('can take a page token for querying more restaurants', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({
    geoLocation: { latitude: 1, longitude: 1 },
    pageToken: 'mock-page-token'
  })

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('pagetoken=mock-page-token')
  )
})

it('allows for configuring the radius that is listed', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({
    geoLocation: { latitude: 1, longitude: 1 },
    filter: { radius: 50 }
  })

  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('radius=50'))
})

it('defaults to an reasonable radius if not specified', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({ geoLocation: { latitude: 1, longitude: 1 } })

  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('radius=800'))
})

it('allows for seaching only the restaurants that are open now', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({
    geoLocation: { latitude: 1, longitude: 1 },
    filter: { openNow: true }
  })

  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('opennow=true'))
})

it('allows for configuring the price range that is listed', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({
    geoLocation: { latitude: 1, longitude: 1 },
    filter: { price: { min: 1, max: 3 } }
  })

  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('minprice=1'))
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('maxprice=3'))
})

it('fetches and adds the api key to the request to Google Places API', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ body: { results: [] } }))

  await handler({ geoLocation: { latitude: 1, longitude: 1 } })

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('key=mock-api-key')
  )
})

it('throws if the `LP_GCP_PLACES_API_ENDPOINT` env variable is not set', async () => {
  process.env.LP_GCP_PLACES_API_ENDPOINT = ''

  const act = () => handler({ geoLocation: { latitude: 1, longitude: 1 } })

  await expect(act).rejects.toThrow('LP_GCP_PLACES_API_ENDPOINT')
})

it('throws if the request to Google Places API is not successful', async () => {
  mocked(fetch).mockResolvedValue(createMockResponse({ status: 500, body: {} }))

  const act = () => handler({ geoLocation: { latitude: 1, longitude: 1 } })

  await expect(act).rejects.toThrow('request to Google Places API has failed')
})
