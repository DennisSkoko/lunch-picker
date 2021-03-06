'use strict'

const { mocked } = require('ts-jest/utils')
const { GetSecretValueCommand, SecretsManagerClient } = require('@aws-sdk/client-secrets-manager')
const getApiKey = require('./getApiKey')

jest.mock('@aws-sdk/client-secrets-manager')

const originalEnv = { ...process.env }
const clientInstance = mocked(SecretsManagerClient).mock.instances[0]

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation()
})

beforeEach(() => {
  process.env.LP_GCP_PLACES_API_KEY_SECRET_ARN = 'mock-lp-gcp-places-api-key-secret-arn'
})

afterEach(() => {
  process.env = originalEnv
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('returns the api key for the secrets manager', async () => {
  mocked(clientInstance.send).mockResolvedValue(
    // @ts-ignore
    { SecretString: 'mock-api-key' }
  )

  const res = await getApiKey()

  expect(res).toBe('mock-api-key')
  expect(GetSecretValueCommand).toHaveBeenCalledWith({
    SecretId: 'mock-lp-gcp-places-api-key-secret-arn'
  })
})

it('throws if the `LP_GCP_PLACES_API_KEY_SECRET_ARN` env variable is not set', async () => {
  process.env.LP_GCP_PLACES_API_KEY_SECRET_ARN = ''

  const act = () => getApiKey()

  await expect(act).rejects.toThrow('LP_GCP_PLACES_API_KEY_SECRET_ARN')
})

it('throws if the secret value is empty', async () => {
  // @ts-ignore
  mocked(clientInstance.send).mockResolvedValue({})

  const act = () => getApiKey()

  await expect(act).rejects.toThrow(
    'Failed to retrieve the API key from SecretsManager'
  )

  expect(console.error).toHaveBeenCalledWith(
    new Error('The secret containing the api key is empty')
  )
})
