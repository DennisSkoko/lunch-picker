import getRestaurants from './getRestaurants'

/** @type {jest.MockedFunction<typeof window.fetch>} */
const mockFetch = jest.fn()

beforeAll(() => {
  window.fetch = mockFetch

  jest.spyOn(console, 'error')
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('fetches all restaurants near the given geo location', async () => {
  const response = /** @type {Response} */ ({
    ok: true,
    /**
     * @returns {Promise<import('./getRestaurants').ApiResponse>}
     */
    json: async () => ({
      data: {
        restaurants: {
          pageToken: undefined,
          items: [
            {
              id: 'foo',
              name: 'Foo',
              address: 'Fooboulevard',
              price: {},
              rating: { reviewsCount: 0, level: 0 }
            }
          ]
        }
      }
    })
  })

  mockFetch.mockResolvedValue(response)

  const res = await getRestaurants({
    geoLocation: { latitude: 1, longitude: 1 }
  })

  expect(res).toEqual([
    {
      id: 'foo',
      name: 'Foo',
      address: 'Fooboulevard',
      price: {},
      rating: { reviewsCount: 0, level: 0 }
    }
  ])
})

it('fetches from the configured API with the configured API key', async () => {
  const response = /** @type {Response} */ ({
    ok: true,
    /**
     * @returns {Promise<import('./getRestaurants').ApiResponse>}
     */
    json: async () => ({
      data: { restaurants: { pageToken: undefined, items: [] } }
    })
  })

  mockFetch.mockResolvedValue(response)

  await getRestaurants({ geoLocation: { latitude: 1, longitude: 1 } })

  expect(window.fetch).toHaveBeenCalledWith(
    process.env.LP_API_ENDPOINT,
    expect.objectContaining({
      headers: { 'x-api-key': process.env.LP_API_KEY }
    })
  )
})

it('throws if the request was not successful', async () => {
  const response = /** @type {Response} */ ({
    ok: false,
    json: async () => ({ foo: 'bar' })
  })

  mockFetch.mockResolvedValue(response)

  const act = () => getRestaurants({
    geoLocation: { latitude: 1, longitude: 1 }
  })

  await expect(act).rejects.toThrow(
    'The request failed when fetching restaurants'
  )
})

it('keeps fetching restaurants until page token is empty', async () => {
  const firstResponse = /** @type {Response} */ ({
    ok: true,
    /**
     * @returns {Promise<import('./getRestaurants').ApiResponse>}
     */
    json: async () => ({
      data: {
        restaurants: {
          pageToken: 'mock-page-token',
          items: [
            {
              id: 'foo',
              name: 'Foo',
              address: 'Fooboulevard',
              price: {},
              rating: { reviewsCount: 0, level: 0 }
            }
          ]
        }
      }
    })
  })

  const secondResponse = /** @type {Response} */ ({
    ok: true,
    /**
     * @returns {Promise<import('./getRestaurants').ApiResponse>}
     */
    json: async () => ({
      data: {
        restaurants: {
          pageToken: undefined,
          items: [
            {
              id: 'bar',
              name: 'Bar',
              address: 'Barboulevard',
              price: {},
              rating: { reviewsCount: 0, level: 0 }
            }
          ]
        }
      }
    })
  })

  mockFetch
    .mockResolvedValueOnce(firstResponse)
    .mockResolvedValueOnce(secondResponse)

  const res = await getRestaurants({
    geoLocation: { latitude: 1, longitude: 1 }
  })

  expect(fetch).toHaveBeenCalledTimes(2)

  expect(fetch).toHaveBeenNthCalledWith(
    1,
    expect.anything(),
    expect.objectContaining({
      body: expect.not.stringContaining('"pageToken"')
    })
  )

  expect(fetch).toHaveBeenNthCalledWith(
    2,
    expect.anything(),
    expect.objectContaining({
      body: expect.stringContaining('"pageToken":"mock-page-token"')
    })
  )

  expect(res).toEqual([
    expect.objectContaining({ id: 'foo' }),
    expect.objectContaining({ id: 'bar' }),
  ])
})
