'use strict'

const path = require('path')
const lambda = require('@aws-cdk/aws-lambda')

class Function extends lambda.Function {
  /**
   * @param {import('@aws-cdk/core').Construct} scope
   * @param {string} id
   * @param {import('./Function.types').Props} props
   */
  constructor(scope, id, props) {
    super(scope, id, {
      ...props,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: `src/handlers/${props.handler}/index.handler`,
      code: lambda.Code.fromAsset(
        path.resolve(`${__dirname}/../../../${props.project}`)
      )
    })
  }
}

module.exports = Function
