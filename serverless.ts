import type { AWS } from "@serverless/typescript";

import { hello } from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "serverless-workspaces-pnp",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  plugins: ["serverless-webpack"],
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      packager: "yarn",
      packagerOptions: {
        noInstall: true,
      },
    },
  },
  functions: {
    hello
  },
};

module.exports = serverlessConfiguration;
