import type { AWS } from "@serverless/typescript";

/**
 * This is the base configuration for all serverless.ts files.
 */
const serverlessConfigurationTemplate: Partial<AWS> = {
  frameworkVersion: "2",
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.ts",
      includeModules: {
        nodeModulesRelativeDir: "../",
        forceExclude: ["aws-sdk"],
      },
      packager: "yarn",
      packagerOptions: {
        // TODO (jameskmonger) revisit this - we are currently turning off the noInstall step because it doesnt play nicely with Yarn
        noInstall: true,
      },
    },
  },
  // Builder requires string[] not object syntax
  plugins: ["serverless-webpack"] as string[],
  provider: {
    name: "aws",
    // TODO: to put stage in front of stack name
    // stackName: ${opt:stage, 'dev'}-${self:service}
    region: "eu-west-2",
    runtime: "nodejs14.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    vpc: {
      // these are the security groups and subnets of the RDS instance
      securityGroupIds: ["sg-05cbfc6ac6e29e954"],
      subnetIds: [
        "subnet-0e6bbd52897d7c15c",
        "subnet-034574c500b0395be",
        "subnet-0d0d0429c66e01ba5",
        "subnet-05014b52852670d7e",
      ],
    },
    deploymentBucket: {
      maxPreviousDeploymentArtifacts: 2,
    },
  },
  functions: {},
};

export { serverlessConfigurationTemplate };
