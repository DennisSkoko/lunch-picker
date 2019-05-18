const util = require('../src/util')

describe('toCamelCase()', () => {
  it('changes all keys in objects to camel case', () => {
    const data = { Foo: 'bar', BazBoz: 'Tiz' }
    const res = util.toCamelCase(data)

    expect(res).toEqual({ foo: 'bar', bazBoz: 'Tiz' })
  })
})
