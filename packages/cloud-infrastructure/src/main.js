'use strict'

const core = require('@aws-cdk/core')
const Stack = require('./Stack')

function main() {
  if (!process.env.LP_STACK_NAME) {
    throw new Error('You must specify the `LP_STACK_NAME` env variable')
  }

  if (!process.env.LP_GCP_PLACES_API_ENDPOINT) {
    throw new Error(
      'You must specify the `LP_GCP_PLACES_API_ENDPOINT` env variable'
    )
  }

  const app = new core.App()

  // eslint-disable-next-line no-new
  new Stack(app, process.env.LP_STACK_NAME, {
    env: {
      account: process.env.CDK_DEPLOY_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION,
    },
  })
}

module.exports = main
