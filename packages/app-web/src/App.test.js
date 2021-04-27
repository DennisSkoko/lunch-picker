import { App } from './App'

/** @type {jest.MockedFunction<typeof navigator.geolocation.getCurrentPosition>} */
let mockGetCurrentPosition = jest.fn()

beforeAll(() => {
  Object.defineProperty(navigator, 'geolocation', {
    value: { getCurrentPosition: mockGetCurrentPosition }
  })
})

afterEach(() => {
  Array.from(document.body.children).forEach(child => {
    document.body.removeChild(child)
  })
})

it('prompts the user for the geo location', () => {
  const el = new App()
  document.body.appendChild(el)

  expect(el.shadowRoot).toHaveTextContent('need to know where you are')
  expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
})

it('removes the geo location prompt when the user has accepted', async () => {
  mockGetCurrentPosition.mockImplementation((callback) => {
    callback(/** @type {GeolocationPosition} */ ({
      coords: { latitude: 10, longitude: 20 }
    }))
  })

  const el = new App()
  document.body.appendChild(el)

  expect(el.shadowRoot).not.toHaveTextContent('need to know where you are')
})
