const _ = require('lodash/fp')

module.exports = {
  toCamelCase: _.mapKeys(_.camelCase)
}
