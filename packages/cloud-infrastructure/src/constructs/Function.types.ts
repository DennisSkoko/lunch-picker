import { FunctionProps } from '@aws-cdk/aws-lambda'

export type Project = 'api-restaurants'

export type Props =
  Omit<FunctionProps, 'runtime'|'handler'|'code'> &
  { project: Project, handler: string }
