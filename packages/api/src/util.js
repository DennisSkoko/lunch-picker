const _ = require('lodash/fp')

module.exports = {
  toCamelCase: _.mapKeys(_.camelCase),

  toPascalCase: _.mapKeys(key => key.charAt(0).toUpperCase() + key.slice(1))
}
