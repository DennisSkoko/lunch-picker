'use strict'

const path = require('path')
const core = require('@aws-cdk/core')
const secretsmanager = require('@aws-cdk/aws-secretsmanager')
const appsync = require('@aws-cdk/aws-appsync')
const Function = require('./Function')

class Api extends core.Construct {
  /**
   * @param {import('@aws-cdk/core').Construct} scope
   * @param {string} id
   */
  constructor(scope, id) {
    super(scope, id)

    const gcpPlacesApiKey = new secretsmanager.Secret(this, 'GcpPlacesApiKey')

    const api = new appsync.GraphqlApi(this, `${id}GraphQL`, {
      name: `${process.env.LP_STACK_NAME}Api`,
      schema: appsync.Schema.fromAsset(
        path.resolve(__dirname, '../../res/schema.gql')
      ),
    })

    const restaurantsFunc = new Function(this, `${id}RestaurantsFunction`, {
      project: 'api-restaurants',
      handler: 'getRestaurants',
      environment: {
        LP_GCP_PLACES_API_ENDPOINT:
          process.env.LP_GCP_PLACES_API_ENDPOINT || '',
        LP_GCP_PLACES_API_KEY_SECRET_ARN: gcpPlacesApiKey.secretArn,
      },
    })

    gcpPlacesApiKey.grantRead(restaurantsFunc)

    const restaurants = api.addLambdaDataSource('Restaurants', restaurantsFunc)

    restaurants.createResolver({
      typeName: 'Query',
      fieldName: 'restaurants',
      requestMappingTemplate: appsync.MappingTemplate.lambdaRequest(
        '$util.toJson($context.arguments)'
      ),
      responseMappingTemplate: appsync.MappingTemplate.lambdaResult(),
    })
  }
}

module.exports = Api
