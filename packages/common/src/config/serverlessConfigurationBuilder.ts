import type { AWS, AwsLambdaVpcConfig } from "@serverless/typescript";
import { serverlessConfigurationTemplate } from "./serverless-template";

type ServerlessConfigurationBuilder = {
  withService: (value: string) => ServerlessConfigurationBuilder;
  withCustom: (value: AWS["custom"]) => ServerlessConfigurationBuilder;
  withPlugins: (value: string[]) => ServerlessConfigurationBuilder;
  withEnvironment: (
    value: AWS["provider"]["environment"]
  ) => ServerlessConfigurationBuilder;
  withVpcSecurityGroupIds: (value: string[]) => ServerlessConfigurationBuilder;
  withVpcSubnetIds: (value: string[]) => ServerlessConfigurationBuilder;
  withFunctions: (value: AWS["functions"]) => ServerlessConfigurationBuilder;
  build: () => AWS;
};

/**
 * Fluent builder for constructing Serverless configuration
 * @returns {AWS} serverless configuration builder
 */
export function serverlessConfigurationBuilder(): ServerlessConfigurationBuilder {
  let service = "";
  let custom: AWS["custom"];
  let plugins: string[] = [];
  let environment: AWS["provider"]["environment"];
  let vpcSecurityGroupIds: AwsLambdaVpcConfig["securityGroupIds"];
  let vpcSubnetIds: AwsLambdaVpcConfig["subnetIds"];
  let functions: AWS["functions"];

  const builder = {
    withService,
    withCustom,
    withPlugins,
    withEnvironment,
    withVpcSecurityGroupIds,
    withVpcSubnetIds,
    withFunctions,
    build,
  };

  /**
   * Sets the service name
   * @param value service name
   * @returns builder
   */
  function withService(value: string) {
    service = value;
    return builder;
  }
  /**
   * Sets the custom configuration
   * @param value custom configuration
   * @returns builder
   */
  function withCustom(value: AWS["custom"]) {
    custom = value;
    return builder;
  }

  /**
   * Sets the plugins
   * @param value plugins
   * @returns builder
   */
  function withPlugins(value: string[]) {
    plugins = value;
    return builder;
  }

  /**
   * Sets the environment variables
   * @param value environment variables
   * @returns builder
   */
  function withEnvironment(value: AWS["provider"]["environment"]) {
    environment = value;
    return builder;
  }

  /**
   * Sets the VPC security group IDs
   * @param value VPC security group IDs
   * @returns builder
   */
  function withVpcSecurityGroupIds(value: string[]) {
    vpcSecurityGroupIds = value;
    return builder;
  }

  /**
   * Sets the VPC subnet IDs
   * @param value VPC subnet IDs
   * @returns builder
   */
  function withVpcSubnetIds(value: string[]) {
    vpcSubnetIds = value;
    return builder;
  }

  /**
   * Sets the functions
   * @param value functions
   * @returns builder
   */
  function withFunctions(value: AWS["functions"]) {
    functions = value;
    return builder;
  }

  /**
   * Builds the Serverless configuration
   * @returns {AWS} serverless configuration
   */
  function build(): AWS {
    return {
      ...(serverlessConfigurationTemplate as AWS),
      custom: {
        ...(serverlessConfigurationTemplate as AWS).custom,
        ...custom,
      },
      plugins: [
        ...(serverlessConfigurationTemplate.plugins as string[]),
        ...plugins,
      ],
      provider: {
        ...(serverlessConfigurationTemplate as AWS).provider,
        environment: {
          ...(serverlessConfigurationTemplate as AWS).provider.environment,
          ...environment,
        },
        vpc: {
          ...((serverlessConfigurationTemplate as AWS).provider.vpc || {}),
          ...(vpcSecurityGroupIds && {
            securityGroupIds: vpcSecurityGroupIds,
          }),
          ...(vpcSubnetIds && { subnetIds: vpcSubnetIds }),
        },
      },
      functions,
      service,
    };
  }

  return builder;
}
