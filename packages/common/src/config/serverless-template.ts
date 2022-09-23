import type { AWS } from "@serverless/typescript";

/**
 * This is the base configuration for all serverless.ts files.
 */
const serverlessConfigurationTemplate: Partial<AWS> = {
  frameworkVersion: "3",
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      keepOutputDirectory: false,
      packager: "yarn",
    }
  },
  // Builder requires string[] not object syntax
  plugins: ["serverless-webpack"] as string[],
  provider: {
    name: "aws",
    // TODO: to put stage in front of stack name
    // stackName: ${opt:stage, 'dev'}-${self:service}
    region: "us-east-1",
    runtime: "nodejs14.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    deploymentBucket: {
      maxPreviousDeploymentArtifacts: 2,
    },
  },
  functions: {},
};

export { serverlessConfigurationTemplate };
