const util = require('../src/util')

describe('toCamelCase()', () => {
  it('changes all keys in objects to camel case', () => {
    const data = { Foo: 'bar', BazBoz: 'Tiz' }
    const res = util.toCamelCase(data)

    expect(res).toEqual({ foo: 'bar', bazBoz: 'Tiz' })
  })
})

describe('toPascalCase()', () => {
  it('changes all keys in objects to pascal case', () => {
    const data = { foo: 'bar', bazBoz: 'Tiz' }
    const res = util.toPascalCase(data)

    expect(res).toEqual({ Foo: 'bar', BazBoz: 'Tiz' })
  })
})
