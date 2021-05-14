'use strict'

const core = require('@aws-cdk/core')
const Api = require('./constructs/Api')
const AppWeb = require('./constructs/AppWeb')

class Stack extends core.Stack {
  /**
   * @param {import('@aws-cdk/core').Construct} scope
   * @param {string} id
   * @param {import('@aws-cdk/core').StackProps} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    new Api(this, 'Api')
    new AppWeb(this, 'App')
  }
}

module.exports = Stack
