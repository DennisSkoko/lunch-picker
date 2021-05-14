namespace NodeJS {
  interface ProcessEnv {
    LP_STACK_NAME: string
    LP_GCP_PLACES_API_ENDPOINT: string
    LP_HOSTED_ZOME_DOMAIN: string
    LP_SUB_DOMAIN?: string
    CDK_DEPLOY_REGION: string
    CDK_DEPLOY_ACCOUNT?: string
  }
}
