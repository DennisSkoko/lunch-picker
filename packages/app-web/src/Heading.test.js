import { Heading } from './Heading'

afterEach(() => {
  Array.from(document.body.children).forEach(child => {
    document.body.removeChild(child)
  })
})

it('defaults the level to `1` if no level is given', () => {
  const el = new Heading()
  document.body.appendChild(el)

  expect(el.shadowRoot?.querySelector('h1')).toBeVisible()
})

it('updates the heading element when `level` attribute changes', () => {
  const el = new Heading()
  el.setAttribute('level', '2')
  document.body.appendChild(el)

  expect(el.shadowRoot?.querySelector('h1')).toBeNull()
  expect(el.shadowRoot?.querySelector('h2')).toBeVisible()
})
