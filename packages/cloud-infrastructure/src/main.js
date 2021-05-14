'use strict'

const core = require('@aws-cdk/core')
const Stack = require('./Stack')

function main() {
  const app = new core.App()

  new Stack(app, process.env.LP_STACK_NAME, {
    env: {
      account:
        process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
    },
  })
}

module.exports = main
