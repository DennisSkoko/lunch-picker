'use strict'

const childProcess = require('child_process')
const path = require('path')
const core = require('@aws-cdk/core')
const cloudFront = require('@aws-cdk/aws-cloudfront')
const origins = require('@aws-cdk/aws-cloudfront-origins')
const s3 = require('@aws-cdk/aws-s3')
const deploy = require('@aws-cdk/aws-s3-deployment')
const acm = require('@aws-cdk/aws-certificatemanager')
const route53 = require('@aws-cdk/aws-route53')
const alias = require('@aws-cdk/aws-route53-targets')

class AppWeb extends core.Construct {
  /**
   * @param {import('@aws-cdk/core').Construct} scope
   * @param {string} id
   */
  constructor(scope, id) {
    super(scope, id)

    const projectPath = path.resolve(__dirname, '../../../app-web')
    const appDomain = `${process.env.LP_SUB_DOMAIN}${process.env.LP_HOSTED_ZOME_DOMAIN}`

    // Prepare the project for deployment by building the application
    childProcess.execSync('npm run build', { cwd: projectPath })

    const bucket = new s3.Bucket(this, `${id}Bucket`, {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      autoDeleteObjects: true,
      removalPolicy: core.RemovalPolicy.DESTROY,
    })

    new deploy.BucketDeployment(this, `${id}Deployment`, {
      destinationBucket: bucket,
      sources: [deploy.Source.asset(path.resolve(projectPath, 'public'))],
    })

    const hostedZone = route53.HostedZone.fromLookup(this, `${id}HostedZone`, {
      domainName: process.env.LP_HOSTED_ZOME_DOMAIN,
    })

    const certificate = new acm.DnsValidatedCertificate(
      this,
      `${id}Certificate`,
      {
        domainName: appDomain,
        hostedZone,
        // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-certificatemanager-readme.html#cross-region-certificates
        region: 'us-east-1',
      }
    )

    const distribution = new cloudFront.Distribution(
      this,
      `${id}Distribution`,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        domainNames: [appDomain],
        certificate,
      }
    )

    new route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: appDomain,
      target: route53.RecordTarget.fromAlias(
        new alias.CloudFrontTarget(distribution)
      ),
    })
  }
}

module.exports = AppWeb
