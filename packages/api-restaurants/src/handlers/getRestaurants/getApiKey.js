'use strict'

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

const client = new SecretsManagerClient({ apiVersion: '2017-10-17' })

/**
 * @returns {Promise<string>}
 */
async function getApiKey() {
  if (!process.env.LP_GCP_PLACES_API_KEY_SECRET_ARN) {
    throw new Error(
      'You must specify the `LP_GCP_PLACES_API_KEY_SECRET_ARN` env variable'
    )
  }

  try {
    const command = new GetSecretValueCommand({
      SecretId: process.env.LP_GCP_PLACES_API_KEY_SECRET_ARN,
    })

    const response = await client.send(command)

    if (!response.SecretString) {
      throw new Error('The secret containing the api key is empty')
    }

    return response.SecretString
  } catch (err) {
    console.error(err)
    throw new Error('Failed to retrieve the API key from SecretsManager')
  }
}

module.exports = getApiKey
